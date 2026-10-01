"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Module = {
  id: number;
  color: string;
  label: string;
  title: string;
  trl: string;
  focus: string;
  masterclasses: string[];
  workshops: string[];
  gate: string;
};

export const curriculumModulesData: Module[] = [
  {
    id: 1,
    color: "#06B6D4",
    label: "MODULE 01",
    title: "Venture Formation & Applied Prototyping",
    trl: "TRL 1 – 3",
    focus: "MVP Design & Early Tech Validation",
    masterclasses: [
      "Product Architecture",
      "MVP vs Prototype",
      "IP & Patent 101",
    ],
    workshops: [
      "Figma UI System",
      "3D Printing & IoT Sprint",
      "Product Roadmap",
      "Lean Canvas Matrix",
    ],
    gate: "Weekly prototype reviews & diagnostic scorecards",
  },
  {
    id: 2,
    color: "#16A34A",
    label: "MODULE 02",
    title: "TRL & Innovation Verification",
    trl: "TRL 3 – 4",
    focus: "Tech Feasibility & Risk De-biasing",
    masterclasses: [
      "TRL Benchmarking",
      "DeepTech Lab Prototyping",
      "System Architecture",
    ],
    workshops: [
      "Component Stress Testing",
      "Makerspace Fabrication",
      "Patent Search Matrix",
    ],
    gate: "BHF Technical Advisory Committee Gate",
  },
  {
    id: 3,
    color: "#EC4899",
    label: "MODULE 03",
    title: "Market Discovery & ICP Validation",
    trl: "TRL 4 – 5",
    focus: "User Research & Pilot Positioning",
    masterclasses: [
      "Customer Discovery Sprints",
      "B2B Pilot Structuring",
      "Pricing Strategy",
    ],
    workshops: [
      "30 Founder Interviews",
      "Pilot Agreement Draft",
      "Competitor Teardown",
    ],
    gate: "Go-To-Market Feasibility Audit",
  },
  {
    id: 4,
    color: "#8B5CF6",
    label: "MODULE 04",
    title: "Business Model & Governance",
    trl: "TRL 5 – 6",
    focus: "Unit Economics, Pricing & Legal Scaffolding",
    masterclasses: [
      "Financial Modeling",
      "Cap Table Scaffolding",
      "Compliance & DPIIT Grant Filing",
    ],
    workshops: [
      "Unit Economics Model",
      "Data Room Prep",
      "Term Sheet Scenarios",
    ],
    gate: "Institutional Investment Committee Gate",
  },
  {
    id: 5,
    color: "#F59E0B",
    label: "MODULE 05",
    title: "Investment Readiness & Growth",
    trl: "TRL 6 – 9",
    focus: "Venture Pitching, Seed Syndicates & Scaling",
    masterclasses: [
      "Venture Capital Pitch Deck",
      "Due Diligence Navigation",
      "Growth Loops",
    ],
    workshops: [
      "Pitch Deck Polish",
      "Live Mock Pitch with EIRs",
      "Seed Round Data Room",
    ],
    gate: "CATALYTIX Demo Day Final Gate",
  },
];

// -------------------------------------------------------------
// MATHEMATICAL JIGSAW PATH GENERATOR
// Produces true authentic puzzle pieces with smooth rounded necks
// and bulbous heads that lock together flush with zero floating gaps.
// -------------------------------------------------------------
function getJigsawPath({
  w = 270,
  h = 148,
  r = 16,
  top = "none",
  right = "none",
  bottom = "none",
  left = "none",
  topOffset = 0.5,
  rightOffset = 0.5,
  bottomOffset = 0.5,
  leftOffset = 0.5,
  d = 14,
}: {
  w: number;
  h: number;
  r?: number;
  top?: "none" | "tab" | "slot" | ("none" | "tab" | "slot")[];
  right?: "none" | "tab" | "slot" | ("none" | "tab" | "slot")[];
  bottom?: "none" | "tab" | "slot" | ("none" | "tab" | "slot")[];
  left?: "none" | "tab" | "slot" | ("none" | "tab" | "slot")[];
  topOffset?: number | number[];
  rightOffset?: number | number[];
  bottomOffset?: number | number[];
  leftOffset?: number | number[];
  d?: number;
}) {
  const hw = 18;

  function makeTabSegment(
    cx: number,
    cy: number,
    ax: number,
    ay: number,
    nx: number,
    ny: number,
    sign: number
  ) {
    const sx = sign * nx;
    const sy = sign * ny;

    const p0x = cx - hw * ax;
    const p0y = cy - hw * ay;

    const c1x = cx - (hw - 3) * ax + 2 * sx;
    const c1y = cy - (hw - 3) * ay + 2 * sy;
    const c2x = cx - 11 * ax + d * 0.2 * sx;
    const c2y = cy - 11 * ay + d * 0.2 * sy;
    const p1x = cx - 10 * ax + d * 0.35 * sx;
    const p1y = cy - 10 * ay + d * 0.35 * sy;

    const c3x = cx - 14.5 * ax + d * 0.6 * sx;
    const c3y = cy - 14.5 * ay + d * 0.6 * sy;
    const c4x = cx - 7.5 * ax + d * sx;
    const c4y = cy - 7.5 * ay + d * sy;
    const p2x = cx + d * sx;
    const p2y = cy + d * sy;

    const c5x = cx + 7.5 * ax + d * sx;
    const c5y = cy + 7.5 * ay + d * sy;
    const c6x = cx + 14.5 * ax + d * 0.6 * sx;
    const c6y = cy + 14.5 * ay + d * 0.6 * sy;
    const p3x = cx + 10 * ax + d * 0.35 * sx;
    const p3y = cy + 10 * ay + d * 0.35 * sy;

    const c7x = cx + 11 * ax + d * 0.2 * sx;
    const c7y = cy + 11 * ay + d * 0.2 * sy;
    const c8x = cx + (hw - 3) * ax + 2 * sx;
    const c8y = cy + (hw - 3) * ay + 2 * sy;
    const p4x = cx + hw * ax;
    const p4y = cy + hw * ay;

    return (
      `L ${p0x.toFixed(2)} ${p0y.toFixed(2)} ` +
      `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p1x.toFixed(2)} ${p1y.toFixed(2)} ` +
      `C ${c3x.toFixed(2)} ${c3y.toFixed(2)}, ${c4x.toFixed(2)} ${c4y.toFixed(2)}, ${p2x.toFixed(2)} ${p2y.toFixed(2)} ` +
      `C ${c5x.toFixed(2)} ${c5y.toFixed(2)}, ${c6x.toFixed(2)} ${c6y.toFixed(2)}, ${p3x.toFixed(2)} ${p3y.toFixed(2)} ` +
      `C ${c7x.toFixed(2)} ${c7y.toFixed(2)}, ${c8x.toFixed(2)} ${c8y.toFixed(2)}, ${p4x.toFixed(2)} ${p4y.toFixed(2)} `
    );
  }

  // 1. TOP EDGE: Left-to-Right (x: 0 -> w)
  let path = `M ${r} 0 `;
  if (top !== "none") {
    const rawOffsets = Array.isArray(topOffset) ? topOffset : [topOffset];
    const rawTypes = Array.isArray(top) ? top : [top];
    const items = rawOffsets
      .map((off, i) => ({ off, type: rawTypes[i] || rawTypes[0] }))
      .sort((a, b) => a.off - b.off);

    items.forEach(({ off, type }) => {
      if (type === "none") return;
      const sign = type === "tab" ? 1 : -1;
      path += makeTabSegment(w * off, 0, 1, 0, 0, -1, sign);
    });
  }
  path += `L ${w - r} 0 `;
  path += `A ${r} ${r} 0 0 1 ${w} ${r} `;

  // 2. RIGHT EDGE: Top-to-Bottom (y: 0 -> h)
  if (right !== "none") {
    const rawOffsets = Array.isArray(rightOffset) ? rightOffset : [rightOffset];
    const rawTypes = Array.isArray(right) ? right : [right];
    const items = rawOffsets
      .map((off, i) => ({ off, type: rawTypes[i] || rawTypes[0] }))
      .sort((a, b) => a.off - b.off);

    items.forEach(({ off, type }) => {
      if (type === "none") return;
      const sign = type === "tab" ? 1 : -1;
      path += makeTabSegment(w, h * off, 0, 1, 1, 0, sign);
    });
  }
  path += `L ${w} ${h - r} `;
  path += `A ${r} ${r} 0 0 1 ${w - r} ${h} `;

  // 3. BOTTOM EDGE: Right-to-Left (x: w -> 0)
  if (bottom !== "none") {
    const rawOffsets = Array.isArray(bottomOffset) ? bottomOffset : [bottomOffset];
    const rawTypes = Array.isArray(bottom) ? bottom : [bottom];
    const items = rawOffsets
      .map((off, i) => ({ off, type: rawTypes[i] || rawTypes[0] }))
      .sort((a, b) => b.off - a.off); // Descending for right-to-left traversal

    items.forEach(({ off, type }) => {
      if (type === "none") return;
      const sign = type === "tab" ? 1 : -1;
      path += makeTabSegment(w * off, h, -1, 0, 0, 1, sign);
    });
  }
  path += `L ${r} ${h} `;
  path += `A ${r} ${r} 0 0 1 0 ${h - r} `;

  // 4. LEFT EDGE: Bottom-to-Top (y: h -> 0)
  if (left !== "none") {
    const rawOffsets = Array.isArray(leftOffset) ? leftOffset : [leftOffset];
    const rawTypes = Array.isArray(left) ? left : [left];
    const items = rawOffsets
      .map((off, i) => ({ off, type: rawTypes[i] || rawTypes[0] }))
      .sort((a, b) => b.off - a.off); // Descending for bottom-to-top traversal

    items.forEach(({ off, type }) => {
      if (type === "none") return;
      const sign = type === "tab" ? 1 : -1;
      path += makeTabSegment(0, h * off, 0, -1, -1, 0, sign);
    });
  }
  path += `L 0 ${r} `;
  path += `A ${r} ${r} 0 0 1 ${r} 0 Z`;

  return path;
}

// Interlocking building block geometry:
// Width: 1000px, Height: 72px, Corner Radius: 14px, Tab depth: 12px
// Wide panoramic building blocks with dual tabs at 26% and 74% to provide ample space for full titles
const BLOCK_WIDTH = 1000;
const BLOCK_HEIGHT = 72;
const TAB_OFFSETS = [0.26, 0.74];

export function getModuleJigsawPath(moduleId: number): string {
  if (moduleId === 1) {
    // Module 01: Top Foundation Block
    // Flat top, 2 tabs locking downwards into Module 02
    return getJigsawPath({
      w: BLOCK_WIDTH,
      h: BLOCK_HEIGHT,
      r: 14,
      d: 12,
      top: "none",
      bottom: ["tab", "tab"],
      bottomOffset: TAB_OFFSETS,
      left: "none",
      right: "none",
    });
  }
  if (moduleId === 2) {
    // Module 02: Block 2
    // 2 slots on top receiving Module 01, 2 tabs on bottom locking into Module 03
    return getJigsawPath({
      w: BLOCK_WIDTH,
      h: BLOCK_HEIGHT,
      r: 14,
      d: 12,
      top: ["slot", "slot"],
      topOffset: TAB_OFFSETS,
      bottom: ["tab", "tab"],
      bottomOffset: TAB_OFFSETS,
      left: "none",
      right: "none",
    });
  }
  if (moduleId === 3) {
    // Module 03: Block 3
    // 2 slots on top receiving Module 02, 2 tabs on bottom locking into Module 04
    return getJigsawPath({
      w: BLOCK_WIDTH,
      h: BLOCK_HEIGHT,
      r: 14,
      d: 12,
      top: ["slot", "slot"],
      topOffset: TAB_OFFSETS,
      bottom: ["tab", "tab"],
      bottomOffset: TAB_OFFSETS,
      left: "none",
      right: "none",
    });
  }
  if (moduleId === 4) {
    // Module 04: Block 4
    // 2 slots on top receiving Module 03, 2 tabs on bottom locking into Module 05
    return getJigsawPath({
      w: BLOCK_WIDTH,
      h: BLOCK_HEIGHT,
      r: 14,
      d: 12,
      top: ["slot", "slot"],
      topOffset: TAB_OFFSETS,
      bottom: ["tab", "tab"],
      bottomOffset: TAB_OFFSETS,
      left: "none",
      right: "none",
    });
  }
  // Module 05: Block 5 (Scale / Summit)
  // 2 slots on top receiving Module 04, flat base on bottom
  return getJigsawPath({
    w: BLOCK_WIDTH,
    h: BLOCK_HEIGHT,
    r: 14,
    d: 12,
    top: ["slot", "slot"],
    topOffset: TAB_OFFSETS,
    bottom: "none",
    left: "none",
    right: "none",
  });
}

interface CatalytixPuzzleProps {
  presentationStep: number;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CatalytixPuzzle({
  presentationStep,
  onStepChange,
  onNext,
  onPrev,
}: CatalytixPuzzleProps) {
  // Step 1 to 5: Focus on Module 1 to 5 (full info piece)
  // Step 6: Zoom out & Assemble all 5 pieces one above another like interlocking building blocks
  const isZoomedOut = presentationStep === 6;
  const activeModuleIndex = Math.min(4, Math.max(0, presentationStep - 1));
  const activeModule = curriculumModulesData[activeModuleIndex];

  // Mathematically calculated stacked coordinates for the 5 building blocks:
  // Stacked vertically: center x = 0, center y spaced by exactly BLOCK_HEIGHT (72px)
  // Flush seam alignment with interlocking dual tabs
  const assembledConfig = [
    { x: 0, y: -144, w: BLOCK_WIDTH, h: BLOCK_HEIGHT, defaultZ: 5 }, // Module 01: Top Block
    { x: 0, y: -72,  w: BLOCK_WIDTH, h: BLOCK_HEIGHT, defaultZ: 4 }, // Module 02: Block 2
    { x: 0, y: 0,    w: BLOCK_WIDTH, h: BLOCK_HEIGHT, defaultZ: 3 }, // Module 03: Block 3
    { x: 0, y: 72,   w: BLOCK_WIDTH, h: BLOCK_HEIGHT, defaultZ: 2 }, // Module 04: Block 4
    { x: 0, y: 144,  w: BLOCK_WIDTH, h: BLOCK_HEIGHT, defaultZ: 1 }, // Module 05: Block 5 (Summit)
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* 1. SECTION HEADER */}
      <div className="text-center pt-1 sm:pt-2">
        <div className="badge-pill-light mb-1 text-[#16A34A] font-bold inline-flex items-center gap-1.5 border border-slate-200/90 shadow-xs text-[11px] sm:text-xs py-1 px-3.5">
          <span>✦</span> TRL 1 – 9 PIPELINE // STRUCTURED ROADMAP
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          The <span className="gradient-word">CATALYTIX</span> Venture Curriculum
        </h2>

        <p className="text-slate-600 max-w-xl mx-auto text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">
          A 5-stage progressive curriculum guiding founders from MVP prototyping to traction and scale.
        </p>

        {/* 6-Step Navigation Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2.5">
          {curriculumModulesData.map((m, idx) => {
            const stepNum = idx + 1;
            const isActive = presentationStep === stepNum;
            return (
              <button
                key={m.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStepChange(stepNum);
                }}
                className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all border cursor-pointer ${isActive && !isZoomedOut
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:bg-slate-100"
                  }`}
                style={isActive && !isZoomedOut ? { borderColor: m.color, color: "#ffffff" } : {}}
              >
                MOD 0{m.id}
              </button>
            );
          })}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStepChange(6);
            }}
            className={`px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-mono font-black transition-all border cursor-pointer flex items-center gap-1.5 ${isZoomedOut
                ? "bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white border-transparent shadow-md"
                : "bg-white text-slate-800 hover:text-slate-950 border-slate-300 hover:bg-slate-100"
              }`}
          >
            <span>✦</span>
            <span>ASSEMBLED (5/5)</span>
          </button>
        </div>
      </div>

      {/* 2. THE 1:1 INTERACTIVE PUZZLE STAGE */}
      <div className="relative w-full flex-1 flex items-center justify-center my-auto overflow-hidden">
        {/* CAMERA VIEWPORT: Smooth zoom effect */}
        <motion.div
          className="puzzle-camera relative w-full flex-1 flex items-center justify-center"
          animate={{
            scale: isZoomedOut ? 0.90 : 1,
            y: isZoomedOut ? -8 : 0,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {isZoomedOut ? (
            /* ZOOMED-OUT ASSEMBLED STATE: True interlocking 5-piece stacked building blocks with rich color fills */
            <div className="relative w-[1040px] h-[390px] max-w-full flex items-center justify-center">
              {curriculumModulesData.map((module, idx) => {
                const config = assembledConfig[idx];
                return (
                  <motion.div
                    key={module.id}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: -config.w / 2,
                      marginTop: -config.h / 2,
                      width: config.w,
                      height: config.h,
                      zIndex: config.defaultZ,
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0.9,
                      opacity: 0,
                    }}
                    animate={{
                      x: config.x,
                      y: config.y,
                      scale: 1,
                      opacity: 1,
                    }}
                    whileHover={{
                      scale: 1.025,
                      zIndex: 35,
                    }}
                    transition={{
                      delay: idx * 0.07,
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Clicking any building block zooms into that module's curriculum details
                      onStepChange(module.id);
                    }}
                    title={`Click to inspect ${module.label}: ${module.title}`}
                  >
                    <TitleOnlyPuzzlePiece module={module} />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* FOCUS MODE: Shows active piece with full detailed curriculum breakdown */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                className="relative"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.04, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                <FullPuzzlePiece
                  module={activeModule}
                  isFocused={true}
                  isAssembled={false}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* 3. SECTION FOOTER CONTROLS */}
      <div className="text-center pb-2 sm:pb-3 flex flex-col items-center gap-1.5">
        {isZoomedOut ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#EC4899] tracking-widest uppercase">CATALYTIX</span>
              <span className="text-xs text-slate-400 font-bold">•</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">5 Interlocking Building Blocks // From Venture Start to Scale</span>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between w-full max-w-[920px] px-2 text-xs font-mono font-bold text-slate-500">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>←</span> PREV
            </button>

            <span className="text-slate-400">
              MODULE {activeModule.id} OF 5
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer font-extrabold text-slate-900"
            >
              {activeModule.id === 5 ? "ZOOM OUT & ASSEMBLE ✦" : "NEXT →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// VIBRANT BUILDING BLOCK COLOR THEMES
// Fills each piece with its rich signature color, glossy highlight & crisp white text
// -------------------------------------------------------------
const moduleColorThemes: Record<
  number,
  {
    start: string;
    mid: string;
    end: string;
    stroke: string;
    shadow: string;
    badgeBg: string;
    badgeBorder: string;
  }
> = {
  1: {
    // Module 01: Cyan
    start: "#0284C7",
    mid: "#06B6D4",
    end: "#0891B2",
    stroke: "#7DD3FC",
    shadow: "rgba(6, 182, 212, 0.35)",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.35)",
  },
  2: {
    // Module 02: Green
    start: "#15803D",
    mid: "#16A34A",
    end: "#059669",
    stroke: "#86EFAC",
    shadow: "rgba(22, 163, 74, 0.35)",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.35)",
  },
  3: {
    // Module 03: Pink
    start: "#BE185D",
    mid: "#EC4899",
    end: "#DB2777",
    stroke: "#FBCFE8",
    shadow: "rgba(236, 72, 153, 0.35)",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.35)",
  },
  4: {
    // Module 04: Purple
    start: "#6D28D9",
    mid: "#8B5CF6",
    end: "#7C3AED",
    stroke: "#DDD6FE",
    shadow: "rgba(139, 92, 246, 0.35)",
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.35)",
  },
  5: {
    // Module 05: Amber/Gold
    start: "#D97706",
    mid: "#F59E0B",
    end: "#EA580C",
    stroke: "#FDE68A",
    shadow: "rgba(245, 158, 11, 0.4)",
    badgeBg: "rgba(255, 255, 255, 0.25)",
    badgeBorder: "rgba(255, 255, 255, 0.4)",
  },
};

// -------------------------------------------------------------
// TITLE-ONLY PUZZLE PIECE (USED IN THE ASSEMBLED 5-BLOCK VIEW)
// Fully filled with rich signature colors & authentic interlocking dual tabs
// -------------------------------------------------------------
function TitleOnlyPuzzlePiece({
  module,
}: {
  module: Module;
}) {
  const w = BLOCK_WIDTH;
  const h = BLOCK_HEIGHT;
  const path = getModuleJigsawPath(module.id);
  const theme = moduleColorThemes[module.id] || {
    start: module.color,
    mid: module.color,
    end: module.color,
    stroke: "#FFFFFF",
    shadow: `${module.color}33`,
    badgeBg: "rgba(255, 255, 255, 0.22)",
    badgeBorder: "rgba(255, 255, 255, 0.35)",
  };

  return (
    <div
      className="relative w-full h-full select-none cursor-pointer group"
      style={{
        filter: `drop-shadow(0 6px 18px ${theme.shadow})`,
      }}
    >
      {/* SVG Jigsaw Shape Background filled with rich gradient & glossy top highlight */}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient
            id={`jigsaw-grad-${module.id}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={theme.start} />
            <stop offset="50%" stopColor={theme.mid} />
            <stop offset="100%" stopColor={theme.end} />
          </linearGradient>

          {/* Subtle 3D glossy highlight on the top edge */}
          <linearGradient
            id={`jigsaw-gloss-${module.id}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main colored building block body */}
        <path
          d={path}
          fill={`url(#jigsaw-grad-${module.id})`}
          stroke={theme.stroke}
          strokeWidth={2}
          strokeLinejoin="round"
          className="transition-all duration-200 group-hover:brightness-110"
        />

        {/* Gloss highlight path */}
        <path
          d={path}
          fill={`url(#jigsaw-gloss-${module.id})`}
          pointerEvents="none"
        />
      </svg>

      {/* Card Content Overlay */}
      <div className="absolute inset-0 px-6 sm:px-8 flex items-center justify-between pointer-events-none z-10">
        {/* Left Side: Module Badge + Full Stage Title */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-4">
          <span
            className="font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase px-3 py-1 rounded-full text-white shrink-0 shadow-xs border"
            style={{
              backgroundColor: theme.badgeBg,
              borderColor: theme.badgeBorder,
            }}
          >
            {module.label}
          </span>
          <h3 className="font-black text-white tracking-tight text-sm sm:text-base lg:text-[1.05rem] whitespace-nowrap drop-shadow-xs">
            {module.title}
          </h3>
        </div>

        {/* Right Side: Primary Focus + TRL Badge + Inspect Prompt */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="hidden md:block text-xs font-semibold text-white/90 max-w-[340px] truncate text-right">
            {module.focus}
          </span>
          <span className="font-mono text-[11px] sm:text-xs font-black text-white px-3 py-1 rounded-md bg-black/25 border border-white/20 shadow-xs shrink-0">
            {module.trl}
          </span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[11px] font-extrabold text-white flex items-center gap-1 shrink-0 bg-white/25 px-2.5 py-1 rounded-full shadow-xs">
            INSPECT ↗
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// FULL-INFORMATION PUZZLE PIECE CARD (FOCUS MODE)
// Clean, ultra-premium presentation card with masterclasses, workshops & gate
// -------------------------------------------------------------
function FullPuzzlePiece({
  module,
  isFocused,
  isAssembled,
}: {
  module: Module;
  isFocused: boolean;
  isAssembled: boolean;
}) {
  return (
    <div
      className={`full-puzzle-piece relative bg-white rounded-3xl border-2 shadow-2xl p-6 sm:p-8 md:p-9 transition-all duration-300 w-[920px] max-w-[95vw] ${isFocused ? "is-active-piece ring-4 ring-slate-950/5" : ""
        }`}
      style={{
        borderColor: `${module.color}75`,
        boxShadow: `0 20px 50px ${module.color}22, 0 6px 18px rgba(15, 23, 42, 0.08)`,
      }}
    >
      <div className="full-puzzle-piece-inner flex flex-col justify-between h-full">
        {/* TOP ROW: Badge, Title, Primary Focus */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-5 border-b border-slate-200/90 mb-4 sm:mb-5">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span
                  className="font-mono text-xs sm:text-[13px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full border shadow-xs"
                  style={{
                    color: module.color,
                    borderColor: `${module.color}40`,
                    backgroundColor: `${module.color}15`,
                  }}
                >
                  {module.label}
                </span>
                <span className="font-mono text-xs sm:text-[13px] font-extrabold text-slate-500 uppercase bg-slate-100 px-2.5 py-0.5 rounded">
                  {module.trl}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-[2rem] font-black text-slate-950 tracking-tight leading-tight">
                {module.title}
              </h3>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase font-black block tracking-wider">
                PRIMARY FOCUS
              </span>
              <span className="text-sm sm:text-base md:text-lg font-black text-slate-900 max-w-[280px] block leading-snug mt-1">
                {module.focus}
              </span>
            </div>
          </div>

          {/* 3 COLUMNS: Masterclasses, Workshops, Review Gate */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7 mb-4 sm:mb-5 text-left">
            {/* Col 1: Masterclasses */}
            <div className="space-y-2">
              <div
                className="flex items-center gap-1.5 font-mono text-xs sm:text-[12.5px] font-extrabold uppercase tracking-wider"
                style={{ color: module.color }}
              >
                <span>✦</span> MASTERCLASSES
              </div>
              <ul className="space-y-1.5">
                {module.masterclasses.map((item, i) => (
                  <li key={i} className="text-xs sm:text-[13.5px] font-bold text-slate-800 flex items-start gap-2 leading-snug">
                    <span
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: module.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Workshops & Sprints */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-xs sm:text-[12.5px] font-extrabold uppercase tracking-wider text-[#16A34A]">
                <span>✦</span> WORKSHOPS &amp; SPRINTS
              </div>
              <div className="flex flex-wrap gap-1.5">
                {module.workshops.map((item, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs sm:text-[12.5px] font-mono font-bold text-slate-800 shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 3: Review Gate */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 font-mono text-xs sm:text-[12.5px] font-extrabold uppercase tracking-wider text-[#EC4899]">
                <span>✦</span> REVIEW GATE
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-xs">
                <p className="text-xs font-black text-slate-900 mb-1">Evaluation Gate:</p>
                <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-relaxed">{module.gate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Policy Note & Click Indicator */}
        <div className="pt-3 sm:pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs sm:text-[12.5px] font-mono font-bold text-slate-600">
          <span>↳ Program can be renewed subject to approval from BHF governance</span>
          <span className="font-extrabold flex items-center gap-1.5" style={{ color: module.color }}>
            {isAssembled ? (
              <span>ZOOM IN ↗</span>
            ) : module.id === 5 ? (
              <span>CLICK TO ZOOM OUT &amp; ASSEMBLE ✦</span>
            ) : (
              <span>CLICK TO ADVANCE →</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
