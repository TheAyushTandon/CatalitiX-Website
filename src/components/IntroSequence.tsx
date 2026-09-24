"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Aurora from './Aurora';
import CatalytiXMark from './CatalytiXMark';
import HeroWebsite from './HeroWebsite';
import { ChevronDown, Play, RotateCcw } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introBgRef = useRef<HTMLDivElement>(null);
  const catalytiTextRef = useRef<HTMLDivElement>(null);
  const singleXRef = useRef<HTMLDivElement>(null);
  const maskHoleRef = useRef<SVGGElement>(null);
  const maskIrisRef = useRef<SVGCircleElement>(null);
  const subtitleTopRef = useRef<HTMLSpanElement>(null);
  const subtitleBottomRef = useRef<HTMLParagraphElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const statusBadgeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState('1. KINETIC INCEPTION');
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const ctx = gsap.context(() => {
      if (!containerRef.current || !stageRef.current || !singleXRef.current || !maskHoleRef.current) return;

      // Calculate vector delta to bring the single X from its natural wordmark position to exact screen center
      const computeCenterDelta = () => {
        if (!singleXRef.current) return { deltaX: 0, deltaY: 0, xWidth: 160 };
        gsap.set(singleXRef.current, { x: 0, y: 0, rotation: 0, scale: 1 });
        const xRect = singleXRef.current.getBoundingClientRect();
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        const currentCenterX = xRect.left + xRect.width / 2;
        const currentCenterY = xRect.top + xRect.height / 2;
        return {
          deltaX: screenCenterX - currentCenterX,
          deltaY: screenCenterY - currentCenterY,
          xWidth: xRect.width || 160,
        };
      };

      const { deltaX, deltaY, xWidth } = computeCenterDelta();
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;
      // Exact scale for mask hole to match singleXRef scaled to 3.4 in the center
      const centerScale = 3.4;
      const startMaskScale = (xWidth * centerScale) / 84;
      const finalMaskScale = startMaskScale * 35;

      // Helper to update the native SVG mask hole transform attribute
      const updateMaskHole = (x: number, y: number, rotation: number, scale: number) => {
        if (maskHoleRef.current) {
          maskHoleRef.current.setAttribute(
            'transform',
            `translate(${x}, ${y}) rotate(${rotation}) scale(${scale}) translate(-50, -50)`
          );
        }
      };

      // State objects for mask dilation and aperture iris tween
      const maskAnim = {
        scale: 0,
      };
      const maskIrisAnim = {
        r: 0,
      };

      // Master Timeline linked to ScrollTrigger with scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3800',
          pin: stageRef.current,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(Math.round(p * 100));

            if (p < 0.15) {
              setPhaseLabel('1. KINETIC INCEPTION');
            } else if (p < 0.44) {
              setPhaseLabel('2. CONTINUOUS EAR-ARC DESCENT');
            } else if (p < 0.86) {
              setPhaseLabel('3. APERTURE MASK DILATION');
            } else {
              setPhaseLabel('4. MAIN UNIVERSE LIVE');
            }

            // Cleanly toggle overlay display and pointer events
            if (overlayRef.current) {
              if (p >= 0.88) {
                overlayRef.current.style.display = 'none';
                overlayRef.current.style.pointerEvents = 'none';
              } else {
                overlayRef.current.style.display = 'block';
                overlayRef.current.style.pointerEvents = 'auto';
              }
            }
          },
          onLeave: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none';
              overlayRef.current.style.pointerEvents = 'none';
            }
          },
          onEnterBack: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'block';
              overlayRef.current.style.pointerEvents = 'auto';
            }
          },
        },
      });

      timelineRef.current = tl;

      // Initial States
      gsap.set(singleXRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
      });

      updateMaskHole(screenCenterX, screenCenterY, 225, 0);

      gsap.set(introBgRef.current, {
        opacity: 1,
      });

      gsap.set(catalytiTextRef.current, {
        y: 0,
        opacity: 1,
      });

      gsap.set(overlayRef.current, {
        opacity: 1,
        display: 'block',
        pointerEvents: 'auto',
      });

      // ─────────────────────────────────────────────────────────────
      // CHOREOGRAPHY SEQUENCE (Total duration: 100 units)
      // ─────────────────────────────────────────────────────────────

      // 1. "Catalyti" and its soft aurora aura lift UP together (0 -> 20)
      tl.to(
        catalytiTextRef.current,
        {
          y: '-60vh',
          opacity: 0,
          duration: 20,
          ease: 'power2.inOut',
        },
        0
      );

      // Smoothly dissolve the intro ambient background
      tl.to(
        introBgRef.current,
        {
          opacity: 0,
          duration: 22,
          ease: 'power1.inOut',
        },
        0
      );

      tl.to(
        subtitleTopRef.current,
        {
          y: '-40vh',
          opacity: 0,
          duration: 14,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        subtitleBottomRef.current,
        {
          y: '-40vh',
          opacity: 0,
          duration: 14,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        scrollPromptRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 10,
          ease: 'power2.out',
        },
        0
      );

      // Waypoints defining the anatomical ear curve trajectory from wordmark to screen center
      const waypoints = [
        { x: 0, y: 0 }, // 0. Resting in wordmark
        { x: deltaX * 0.18 + window.innerWidth * 0.14, y: deltaY - window.innerHeight * 0.08 }, // 1. Ear upper helix loop
        { x: deltaX * 0.42 + window.innerWidth * 0.18, y: deltaY + window.innerHeight * 0.10 }, // 2. Outer curved rim
        { x: deltaX * 0.72 + window.innerWidth * 0.06, y: deltaY + window.innerHeight * 0.22 }, // 3. Earlobe swoop under
        { x: deltaX, y: deltaY }, // 4. Dead center target
      ];

      // Catmull-Rom cubic spline interpolation: guarantees C1 continuous velocity (zero waypoint stops)
      const getSplinePoint = (u: number) => {
        const n = waypoints.length - 1;
        const clampedU = Math.max(0, Math.min(1, u));
        const tGlobal = clampedU * n;
        const i = Math.min(Math.floor(tGlobal), n - 1);
        const t = tGlobal - i;

        const p0 = waypoints[Math.max(0, i - 1)];
        const p1 = waypoints[i];
        const p2 = waypoints[Math.min(n, i + 1)];
        const p3 = waypoints[Math.min(n, i + 2)];

        const t2 = t * t;
        const t3 = t2 * t;

        const x = 0.5 * (
          (2 * p1.x) +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
        );

        const y = 0.5 * (
          (2 * p1.y) +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
        );

        return { x, y };
      };

      const flight = { u: 0 };

      // 2. The ONE and ONLY X traces the ear curve in ONE continuous, silky flight (0 -> 44)
      tl.to(
        flight,
        {
          u: 1,
          duration: 44,
          ease: 'power2.inOut',
          onUpdate: () => {
            const u = flight.u;
            const { x, y } = getSplinePoint(u);
            const rot = 225 * u;
            const sc = 1 + (centerScale - 1) * u;

            if (singleXRef.current) {
              singleXRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${rot}deg) scale(${sc})`;
            }
          },
        },
        0
      );

      // 3. The moment X lands in center (t = 44), it seamlessly dissolves into the opening aperture (44 -> 52)
      tl.to(
        singleXRef.current,
        {
          opacity: 0,
          duration: 8,
          ease: 'power1.out',
        },
        44
      );

      // 4. MASK APERTURE ANIMATION: Sword cross appears at exact scale and orientation (t = 44)
      tl.set(
        maskAnim,
        {
          scale: startMaskScale,
          onComplete: () => {
            updateMaskHole(screenCenterX, screenCenterY, 225, startMaskScale);
            if (maskIrisRef.current) maskIrisRef.current.setAttribute('r', '0');
          },
          onReverseComplete: () => {
            updateMaskHole(screenCenterX, screenCenterY, 225, 0);
            if (maskIrisRef.current) maskIrisRef.current.setAttribute('r', '0');
          },
        },
        44
      );

      // Aperture sword cross dilates outward across the screen
      tl.to(
        maskAnim,
        {
          scale: finalMaskScale,
          duration: 34,
          ease: 'power1.inOut',
          onUpdate: () => updateMaskHole(screenCenterX, screenCenterY, 225, maskAnim.scale),
        },
        44
      );

      // Central iris circle dilates from center (50, 50), expanding to cleanly engulf the entire viewport
      tl.to(
        maskIrisAnim,
        {
          r: 80,
          duration: 34,
          ease: 'power2.in',
          onUpdate: () => {
            if (maskIrisRef.current) {
              maskIrisRef.current.setAttribute('r', maskIrisAnim.r.toString());
            }
          },
        },
        44
      );

      // 5. Dissolve overlay to 100% transparent and clear pointer events (72 -> 82)
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 10,
          ease: 'power1.out',
        },
        72
      );

      // 6. Breathing space at top of revealed universe before unpinning (82 -> 100)
      tl.to(
        {},
        {
          duration: 18,
        },
        82
      );
    }, containerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  // Quick auto-scrub demo for instant testing
  const runAutoPlay = () => {
    if (isPlayingDemo || !timelineRef.current) return;
    setIsPlayingDemo(true);

    const tl = timelineRef.current;
    const currentProgress = tl.progress();
    const targetProgress = currentProgress > 0.9 ? 0 : 1;

    gsap.to(window, {
      scrollTo: { y: targetProgress === 1 ? 3800 : 0, autoKill: false },
      duration: 4.8,
      ease: 'power2.inOut',
      onComplete: () => setIsPlayingDemo(false),
    });
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#08080d]"
    >
      {/* Pinned Stage: pinned by ScrollTrigger during intro sequence, unpins for natural full-page scroll */}
      <div
        ref={stageRef}
        className="relative w-full z-10"
      >
        {/* LAYER 1: UNDERNEATH - THE FULL EXTENDED MAIN WEBSITE (NO INNER SCROLLBAR, EXTENDS DOWN NATURALLY) */}
        <div className="w-full relative z-0">
          <HeroWebsite onReplayIntro={handleReplay} />
        </div>

        {/* LAYER 2: THE SVG CUTOUT MASK & INTRO OVERLAY (FIXED OVER VIEWPORT DURING PIN) */}
        <div
          ref={overlayRef}
          className="fixed top-0 left-0 w-full h-screen z-20 pointer-events-auto overflow-hidden"
          style={{ transition: 'opacity 0.2s linear' }}
        >
          {/* SVG with mask that cuts open the dark overlay with the matching X aperture (zIndex: 10) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 10, width: '100%', height: '100%', display: 'block' }}
            shapeRendering="geometricPrecision"
          >
            <defs>
              <mask
                id="catalytix-aperture-mask"
                maskUnits="userSpaceOnUse"
                x="-20000"
                y="-20000"
                width="40000"
                height="40000"
              >
                {/* White background: solid matte intro canvas */}
                <rect x="-20000" y="-20000" width="40000" height="40000" fill="white" />
                {/* Black X cutout in center: expands to reveal website underneath! */}
                <g ref={maskHoleRef}>
                  <path
                    d="M 14 86 L 17 77 L 77 17 L 86 14 L 83 23 L 23 83 Z"
                    fill="black"
                    shapeRendering="geometricPrecision"
                  />
                  <path
                    d="M 29 29 L 38 32 L 68 62 L 71 71 L 62 68 L 32 38 Z"
                    fill="black"
                    shapeRendering="geometricPrecision"
                  />
                  {/* Expanding central aperture iris circle that blows wide open to reveal the entire viewport */}
                  <circle
                    ref={maskIrisRef}
                    cx="50"
                    cy="50"
                    r="0"
                    fill="black"
                    shapeRendering="geometricPrecision"
                  />
                </g>
              </mask>
            </defs>

            {/* Dark Matte Intro Canvas with the dynamic cutout mask */}
            <rect
              x="-20000"
              y="-20000"
              width="40000"
              height="40000"
              fill="#08080d"
              mask="url(#catalytix-aperture-mask)"
            />
          </svg>

          {/* INTRO AURORA / GRADIENT BACKGROUND (zIndex: 20, softly dissolves 0 -> 22) */}
          <div
            ref={introBgRef}
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 20, willChange: 'opacity' }}
          >
            <Aurora
              colorStops={['#7cff67', '#00F0FF', '#FF2E93']}
              blend={0.85}
              amplitude={1.3}
              speed={1.6}
            />
            {/* Seamless atmospheric radial glow matching the X colors */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 40%, rgba(0, 240, 255, 0.22) 0%, rgba(255, 46, 147, 0.16) 40%, transparent 75%),
                  radial-gradient(circle at 40% 60%, rgba(124, 255, 103, 0.16) 0%, transparent 65%),
                  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
              }}
            />
          </div>

          {/* UNIFIED HERO WORDMARK: "CATALYTI" + ONE AND ONLY "X" (zIndex: 30) */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
            style={{ zIndex: 30 }}
          >
            <div className="flex flex-col items-center">
              <span
                ref={subtitleTopRef}
                className="font-mono text-xs uppercase tracking-[0.4em] text-white/50 mb-4"
                style={{ willChange: 'transform, opacity' }}
              >
                Systems Kinetic Protocol
              </span>

              {/* Single Wordmark Row */}
              <div className="inline-flex items-center gap-1 sm:gap-2">
                {/* The "CATALYTI" text with its soft feathered aurora glow — lifts UP with zero hard edges */}
                <div
                  ref={catalytiTextRef}
                  className="relative inline-flex items-center justify-center"
                  style={{ willChange: 'transform, opacity' }}
                >
                  {/* Soft Gaussian halo around CATALYTI that drifts up with it */}
                  <div
                    className="absolute -inset-16 rounded-full pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.28) 0%, rgba(124, 255, 103, 0.2) 40%, rgba(255, 46, 147, 0.16) 60%, transparent 78%)',
                      filter: 'blur(50px)',
                    }}
                  />
                  <span
                    className="relative z-10 font-asimovian gradient-text-playful select-none inline-block"
                    style={{
                      fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                      lineHeight: 1,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    CATALYTI
                  </span>
                </div>

                {/* THE ONE AND ONLY "X" FROM CATALYTIX — Natural layout position, detaches on scroll */}
                <div
                  className="inline-flex items-center justify-center select-none"
                  style={{
                    width: 'clamp(96px, 16vw, 210px)',
                    height: 'clamp(96px, 16vw, 210px)',
                    position: 'relative',
                  }}
                >
                  <div
                    ref={singleXRef}
                    style={{
                      width: 'clamp(96px, 16vw, 210px)',
                      height: 'clamp(96px, 16vw, 210px)',
                      transformOrigin: '50% 50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    <CatalytiXMark
                      size="100%"
                      fill="#FFFFFF"
                    />
                  </div>
                </div>
              </div>

              <p
                ref={subtitleBottomRef}
                className="mt-4 text-xs font-mono text-white/40 tracking-widest uppercase"
                style={{ willChange: 'transform, opacity' }}
              >
                Synchronizing Architecture
              </p>
            </div>
          </div>

          {/* Bottom Initial Scroll Prompt (zIndex: 50) */}
          <div
            ref={scrollPromptRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            style={{ zIndex: 50, willChange: 'transform, opacity' }}
          >
            <span className="text-xs font-mono text-white/50 tracking-widest uppercase">
              Scroll or swipe down to ignite
            </span>
            <ChevronDown className="w-5 h-5 text-white/60 animate-bounce" />
          </div>
        </div>

        {/* 3. FLOATING TELEMETRY HUD / CONTROLLER */}
        <div
          ref={statusBadgeRef}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2 px-3 rounded-full bg-black/70 border border-white/15 backdrop-blur-xl shadow-2xl text-xs font-mono"
        >
          {/* Progress Percentage Badge */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
            <span className="text-[#00F0FF] font-bold">{scrollProgress}%</span>
          </div>

          <div className="hidden sm:block h-3 w-[1px] bg-white/20" />

          {/* Current Kinetic Phase */}
          <span className="hidden sm:inline text-white/70 font-semibold tracking-wide">
            {phaseLabel}
          </span>

          <div className="h-3 w-[1px] bg-white/20" />

          {/* Auto-Scrub / Replay button */}
          <button
            onClick={runAutoPlay}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            title="Auto-scrub through animation sequence"
          >
            <Play className="w-3 h-3 fill-current text-[#7cff67]" />
            <span className="text-[11px]">Auto Play</span>
          </button>

          {scrollProgress > 80 && (
            <button
              onClick={handleReplay}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF2E93]/20 hover:bg-[#FF2E93]/30 text-[#FF2E93] transition-all cursor-pointer"
              title="Reset to Top"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline text-[11px]">Replay</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
