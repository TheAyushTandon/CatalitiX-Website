"use client";

/*!
 * liquid-glass.ts — Apple-style liquid glass refraction for any element.
 * Optimized & Normalized for high-performance 60-120fps web applications.
 * Based on https://github.com/deepika-builds/liquid-glass
 * Technique per https://aave.com/design/building-glass-for-the-web
 */

export interface LiquidGlassOptions {
  /** 
   * Whether to enable active SVG displacement map refraction.
   * Default: false for static cards/containers (uses hardware-accelerated CSS glass for max performance).
   * Set true for spotlight/hero elements or buttons.
   */
  displacement?: boolean;
  /** Displacement strength (negative = magnifying bulge, e.g. -60 subtle to -140 dramatic) */
  scale?: number;
  /** Per-channel scale stagger (prism fringe); 0 disables */
  chroma?: number;
  /** Neutral interior inset as fraction of smaller side */
  border?: number;
  /** Edge-curvature softness (px) of the map's gray inset */
  mapBlur?: number;
  /** Backdrop blur (px) behind the glass interior */
  blur?: number;
  /** Backdrop saturation boost */
  saturate?: number;
  /** Corner radius override (px); default reads computed border-radius */
  radius?: number | null;
  /** Frosted blur (px) for hardware-accelerated CSS glass */
  fallbackBlur?: number;
}

export interface LiquidGlassInstance {
  supported: boolean;
  refresh: () => void;
  destroy: () => void;
}

const SVG_NS = "http://www.w3.org/2000/svg";
let uid = 0;
let svgDefs: SVGDefsElement | null = null;
let sharedCanvas: HTMLCanvasElement | null = null;
let activeDisplacementCount = 0;
const MAX_ACTIVE_DISPLACEMENTS = 4; // Prevent GPU memory / compositor exhaustion

export const isLiquidGlassSupported = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg/.test(ua);
  const isFirefox = /Firefox/.test(ua);
  if (isSafari || isFirefox) return false;
  if (!window.CSS || !CSS.supports("backdrop-filter", "url(#lg)")) return false;
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 4;
    c.getContext("2d")?.getImageData(0, 0, 1, 1);
    return true;
  } catch {
    return false;
  }
};

function ensureDefs(): SVGDefsElement {
  if (svgDefs && svgDefs.ownerDocument?.contains(svgDefs)) return svgDefs;
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.setAttribute("aria-hidden", "true");
  svg.style.position = "absolute";
  svg.style.pointerEvents = "none";
  svg.style.overflow = "hidden";
  svgDefs = document.createElementNS(SVG_NS, "defs");
  svg.appendChild(svgDefs);
  document.body.appendChild(svg);
  return svgDefs;
}

function getSharedCanvas(): HTMLCanvasElement {
  if (!sharedCanvas) {
    sharedCanvas = document.createElement("canvas");
  }
  return sharedCanvas;
}

function makeMap(w: number, h: number, radius: number, border: number, mapBlur: number): string {
  const canvas = getSharedCanvas();
  const cw = Math.max(1, Math.min(600, Math.round(w)));
  const ch = Math.max(1, Math.min(600, Math.round(h)));
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Red left->right ramp encodes X displacement
  const gx = ctx.createLinearGradient(0, 0, cw, 0);
  gx.addColorStop(0, "rgb(0,0,0)");
  gx.addColorStop(1, "rgb(255,0,0)");
  ctx.fillStyle = gx;
  ctx.fillRect(0, 0, cw, h);

  // Blue top->bottom ramp encodes Y displacement
  const gy = ctx.createLinearGradient(0, 0, 0, ch);
  gy.addColorStop(0, "rgb(0,0,0)");
  gy.addColorStop(1, "rgb(0,0,255)");
  ctx.globalCompositeOperation = "difference";
  ctx.fillStyle = gy;
  ctx.fillRect(0, 0, cw, ch);

  // Neutral 50% gray rounded rect inset confines refraction to the rim
  ctx.globalCompositeOperation = "source-over";
  const inset = border * Math.min(cw, ch);
  ctx.filter = `blur(${mapBlur}px)`;
  ctx.fillStyle = "rgba(128,128,128,0.94)";
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(inset, inset, Math.max(0, cw - inset * 2), Math.max(0, ch - inset * 2), Math.max(radius - inset, 2));
  } else {
    ctx.rect(inset, inset, Math.max(0, cw - inset * 2), Math.max(0, ch - inset * 2));
  }
  ctx.fill();
  ctx.filter = "none";
  return canvas.toDataURL();
}

function buildFilter(id: string, scales: number[]) {
  const filter = document.createElementNS(SVG_NS, "filter");
  filter.setAttribute("id", id);
  filter.setAttribute("x", "0");
  filter.setAttribute("y", "0");
  filter.setAttribute("width", "100%");
  filter.setAttribute("height", "100%");
  filter.setAttribute("color-interpolation-filters", "sRGB");

  const feImage = document.createElementNS(SVG_NS, "feImage");
  feImage.setAttribute("x", "0");
  feImage.setAttribute("y", "0");
  feImage.setAttribute("result", "map");
  feImage.setAttribute("preserveAspectRatio", "none");
  filter.appendChild(feImage);

  const keep = [
    "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
    "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
    "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
  ];
  const channels: string[] = [];
  for (let i = 0; i < 3; i++) {
    const disp = document.createElementNS(SVG_NS, "feDisplacementMap");
    disp.setAttribute("in", "SourceGraphic");
    disp.setAttribute("in2", "map");
    disp.setAttribute("scale", String(scales[i]));
    disp.setAttribute("xChannelSelector", "R");
    disp.setAttribute("yChannelSelector", "B");
    disp.setAttribute("result", "d" + i);
    filter.appendChild(disp);

    const cm = document.createElementNS(SVG_NS, "feColorMatrix");
    cm.setAttribute("in", "d" + i);
    cm.setAttribute("type", "matrix");
    cm.setAttribute("values", keep[i]);
    cm.setAttribute("result", "c" + i);
    filter.appendChild(cm);
    channels.push("c" + i);
  }

  const blend1 = document.createElementNS(SVG_NS, "feBlend");
  blend1.setAttribute("in", channels[0]);
  blend1.setAttribute("in2", channels[1]);
  blend1.setAttribute("mode", "screen");
  blend1.setAttribute("result", "c01");
  filter.appendChild(blend1);

  const blend2 = document.createElementNS(SVG_NS, "feBlend");
  blend2.setAttribute("in", "c01");
  blend2.setAttribute("in2", channels[2]);
  blend2.setAttribute("mode", "screen");
  blend2.setAttribute("result", "c12");
  filter.appendChild(blend2);

  ensureDefs().appendChild(filter);
  return { filter, feImage };
}

function resolveRadius(el: HTMLElement, w: number, h: number, override?: number | null): number {
  if (override != null) return override;
  const raw = getComputedStyle(el).borderTopLeftRadius || "0px";
  const v = parseFloat(raw) || 0;
  return raw.trim().endsWith("%") ? (v / 100) * Math.min(w, h) : v;
}

export function liquidGlass(el: HTMLElement, opts?: LiquidGlassOptions): LiquidGlassInstance {
  const o: Required<LiquidGlassOptions> = Object.assign(
    {
      displacement: false, // Default to normalized high-performance hardware-accelerated CSS glass
      scale: -80,
      chroma: 4,
      border: 0.08,
      mapBlur: 10,
      blur: 4,
      saturate: 1.5,
      radius: null,
      fallbackBlur: 14,
    },
    opts
  );

  const applyFrosted = () => {
    const frosted = `blur(${o.fallbackBlur}px) saturate(${o.saturate})`;
    el.style.backdropFilter = frosted;
    (el.style as unknown as { webkitBackdropFilter: string }).webkitBackdropFilter = frosted;
  };

  // If displacement is not explicitly requested, or not supported, or max active displacement exceeded:
  // use the silky, 120fps hardware-accelerated CSS glass
  const supported = isLiquidGlassSupported();
  const shouldDisplace = o.displacement && supported && activeDisplacementCount < MAX_ACTIVE_DISPLACEMENTS;

  if (!shouldDisplace) {
    applyFrosted();
    return {
      supported,
      refresh: () => {},
      destroy: () => {
        el.style.backdropFilter = "";
        (el.style as unknown as { webkitBackdropFilter: string }).webkitBackdropFilter = "";
      },
    };
  }

  // Active optical displacement pipeline (limited & view-intersected)
  activeDisplacementCount++;
  const id = "lg-filter-" + (++uid);
  const scales = [o.scale, o.scale + o.chroma, o.scale + 2 * o.chroma];
  const parts = buildFilter(id, scales);

  let lastW = 0;
  let lastH = 0;
  let isVisible = true;

  function refresh() {
    if (!isVisible) return;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    if (!w || !h) return;
    // Skip if dimensions haven't significantly changed
    if (Math.abs(w - lastW) < 4 && Math.abs(h - lastH) < 4) return;
    lastW = w;
    lastH = h;

    const radius = resolveRadius(el, w, h, o.radius);
    const mapUri = makeMap(w, h, radius, o.border, o.mapBlur);
    parts.feImage.setAttribute("href", mapUri);
    parts.feImage.setAttribute("width", String(w));
    parts.feImage.setAttribute("height", String(h));
  }

  refresh();
  el.style.backdropFilter = `url(#${id}) blur(${o.blur}px) saturate(${o.saturate})`;
  (el.style as unknown as { webkitBackdropFilter: string }).webkitBackdropFilter = `blur(${o.fallbackBlur}px) saturate(${o.saturate})`;

  // Use IntersectionObserver so offscreen elements don't waste GPU passes
  let io: IntersectionObserver | null = null;
  if (typeof IntersectionObserver !== "undefined") {
    io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          el.style.backdropFilter = `url(#${id}) blur(${o.blur}px) saturate(${o.saturate})`;
          refresh();
        } else {
          // Offscreen: fallback to simple blur to drop GPU load
          applyFrosted();
        }
      }
    });
    io.observe(el);
  }

  let timer: NodeJS.Timeout | null = null;
  const ro = new ResizeObserver(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(refresh, 250);
  });
  ro.observe(el);

  return {
    supported: true,
    refresh,
    destroy: () => {
      activeDisplacementCount = Math.max(0, activeDisplacementCount - 1);
      ro.disconnect();
      if (io) io.disconnect();
      if (timer) clearTimeout(timer);
      parts.filter.remove();
      el.style.backdropFilter = "";
      (el.style as unknown as { webkitBackdropFilter: string }).webkitBackdropFilter = "";
    },
  };
}
