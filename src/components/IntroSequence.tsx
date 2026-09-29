"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Aurora from './Aurora';
import CatalytiXMark from './CatalytiXMark';
import HeroWebsite from './HeroWebsite';
import { ChevronDown, Play, Sparkles } from 'lucide-react';
import ClickSpark from './reactbits/ClickSpark';
import Particles from './reactbits/Particles';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';
import Magnet from './reactbits/Magnet';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introBgRef = useRef<HTMLDivElement>(null);
  const catalytiTextRef = useRef<HTMLDivElement>(null);
  const singleXRef = useRef<HTMLDivElement>(null);
  const whiteBloomRef = useRef<HTMLDivElement>(null);
  const subtitleTopRef = useRef<HTMLSpanElement>(null);
  const subtitleBottomRef = useRef<HTMLParagraphElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const statusBadgeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState('1. KINETIC INCEPTION');
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  
  // Lock state: starts on the kinetic intro sequence, locks to inner webpage once scrolled
  const [isLocked, setIsLocked] = useState(false);
  const [isIncoming, setIsIncoming] = useState(false);
  const isLockedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const lockToWebpage = useCallback(() => {
    if (isLockedRef.current) return;
    isLockedRef.current = true;

    // Clean up GSAP ScrollTrigger so .pin-spacer is removed from the DOM before hiding
    if (timelineRef.current?.scrollTrigger) {
      timelineRef.current.scrollTrigger.kill(true);
    }
    ScrollTrigger.getAll().forEach(t => t.kill(true));
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    // Start elements incoming transition on inner webpage
    setIsIncoming(true);

    // Lock to inner webpage: intro container becomes display: none, page scrolls to top
    setIsLocked(true);
    if ((window as unknown as { lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).lenis) {
      (window as unknown as { lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).lenis?.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const handleReplay = useCallback(() => {
    isLockedRef.current = false;
    setIsIncoming(false);
    setIsLocked(false);
    setScrollProgress(0);
    setPhaseLabel('1. KINETIC INCEPTION');
    if ((window as unknown as { lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).lenis) {
      (window as unknown as { lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).lenis?.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (isLocked) return;

    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      if (!containerRef.current || !stageRef.current || !singleXRef.current) return;

      // Calculate vector delta to bring the white X from its natural wordmark position to exact screen center
      const computeCenterDelta = () => {
        if (!singleXRef.current) return { deltaX: 0, deltaY: 0 };
        gsap.set(singleXRef.current, { x: 0, y: 0, rotation: 0, scale: 1 });
        const xRect = singleXRef.current.getBoundingClientRect();
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        const currentCenterX = xRect.left + xRect.width / 2;
        const currentCenterY = xRect.top + xRect.height / 2;
        return {
          deltaX: screenCenterX - currentCenterX,
          deltaY: screenCenterY - currentCenterY,
        };
      };

      const { deltaX, deltaY } = computeCenterDelta();

      // Master Timeline linked to ScrollTrigger with scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3400',
          pin: stageRef.current,
          pinSpacing: true,
          scrub: 1.1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(Math.round(p * 100));

            if (p < 0.22) {
              setPhaseLabel('1. KINETIC INCEPTION');
            } else if (p < 0.55) {
              setPhaseLabel('2. VORTEX FLIGHT & FOCUS');
            } else if (p < 0.92) {
              setPhaseLabel('3. SUPERNOVA WHITE BLOOM');
            } else {
              setPhaseLabel('4. UNLOCKING WEBPAGE');
            }

            // When scrolled fully (p >= 0.985), lock to inner webpage and launch incoming transition!
            if (p >= 0.985 && !isLockedRef.current) {
              lockToWebpage();
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

      gsap.set(introBgRef.current, {
        opacity: 1,
      });

      gsap.set(catalytiTextRef.current, {
        y: 0,
        opacity: 1,
      });

      if (whiteBloomRef.current) {
        gsap.set(whiteBloomRef.current, {
          opacity: 0,
        });
      }

      // ─────────────────────────────────────────────────────────────
      // CHOREOGRAPHY SEQUENCE (Total duration: 100 units)
      // ─────────────────────────────────────────────────────────────

      // 1. "Catalyti" and subtitles float UP and fade away (0 -> 24)
      tl.to(
        catalytiTextRef.current,
        {
          y: '-50vh',
          opacity: 0,
          duration: 22,
          ease: 'power2.inOut',
        },
        0
      );

      tl.to(
        subtitleTopRef.current,
        {
          y: '-35vh',
          opacity: 0,
          duration: 16,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        subtitleBottomRef.current,
        {
          y: '-35vh',
          opacity: 0,
          duration: 16,
          ease: 'power2.out',
        },
        0
      );

      tl.to(
        scrollPromptRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 12,
          ease: 'power2.out',
        },
        0
      );

      // Dissolve the dark aurora intro background (0 -> 35)
      tl.to(
        introBgRef.current,
        {
          opacity: 0,
          duration: 35,
          ease: 'power1.inOut',
        },
        0
      );

      // 2. The WHITE X GLIDES TO SCREEN CENTER & SPINS (0 -> 32)
      // Completes a full 360° spin as it reaches the center
      tl.to(
        singleXRef.current,
        {
          x: deltaX,
          y: deltaY,
          rotation: 360,
          duration: 32,
          ease: 'power2.inOut',
        },
        0
      );

      // 3. The WHITE X EXPANDS EXPONENTIALLY FROM THE CENTER (32 -> 100)
      // Anchored in the center, scales up directly without spinning any further
      tl.to(
        singleXRef.current,
        {
          scale: 240,
          duration: 68,
          ease: 'power2.in',
        },
        32
      );

      // 4. White bloom fusion (60 -> 94)
      // Turns the entire canvas pure white (#FFFFFF), fusing seamlessly with the spinning, expanding white X
      if (whiteBloomRef.current) {
        tl.to(
          whiteBloomRef.current,
          {
            opacity: 1,
            duration: 34,
            ease: 'power2.inOut',
          },
          60
        );
      }

      // 5. Fade out telemetry HUD as we near full expansion (85 -> 95)
      if (statusBadgeRef.current) {
        tl.to(
          statusBadgeRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 10,
            ease: 'power1.out',
          },
          85
        );
      }

    }, containerRef);

    ctxRef.current = ctx;

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isLocked, lockToWebpage]);

  // Quick auto-scrub demo to watch the full transition
  const runAutoPlay = () => {
    if (isPlayingDemo) return;
    setIsPlayingDemo(true);

    gsap.to(window, {
      scrollTo: { y: 3400, autoKill: false },
      duration: 3.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsPlayingDemo(false);
        lockToWebpage();
      },
    });
  };

  return (
    <div className="relative w-full bg-white">
      {/* INTRO SEQUENCE CONTAINER (Hidden with display: none when locked, avoiding any React DOM removal collision) */}
      <div
        ref={containerRef}
        style={{ display: isLocked ? 'none' : 'block' }}
        className="relative w-full bg-[#08080d]"
      >
        {/* Pinned Stage: pinned by ScrollTrigger during intro sequence */}
        <div
          ref={stageRef}
          className="relative w-full h-screen overflow-hidden z-10"
        >
          {/* INTRO OVERLAY (FIXED OVER VIEWPORT DURING PIN) */}
          <ClickSpark
            sparkColor={['#00F0FF', '#FF2E93', '#7cff67', '#FFD600']}
            sparkCount={12}
            sparkRadius={28}
            className="absolute inset-0 w-full h-full"
          >
            <div
              ref={overlayRef}
              className="absolute inset-0 w-full h-full z-20 pointer-events-auto overflow-hidden bg-[#08080d]"
            >
              {/* INTRO AURORA / GRADIENT BACKGROUND & REACTBITS PARTICLES */}
              <div
                ref={introBgRef}
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ zIndex: 10, willChange: 'opacity' }}
              >
                {/* 3D WebGL Particles */}
                <div className="absolute inset-0 z-0 opacity-70">
                  <Particles
                    particleCount={140}
                    particleSpread={11}
                    speed={0.14}
                    particleColors={['#00F0FF', '#FF2E93', '#7cff67', '#ffffff']}
                    moveParticlesOnHover={true}
                    particleHoverFactor={0.9}
                  />
                </div>

                <div className="relative z-10 w-full h-full">
                  <Aurora
                    colorStops={['#7cff67', '#00F0FF', '#FF2E93']}
                    blend={0.85}
                    amplitude={1.3}
                    speed={1.6}
                  />
                </div>

                {/* Seamless atmospheric radial glow matching brand colors */}
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

              {/* WHITE BLOOM OVERLAY: Turns the screen pure white as the white X expands */}
              <div
                ref={whiteBloomRef}
                className="absolute inset-0 bg-white pointer-events-none opacity-0"
                style={{ zIndex: 15, willChange: 'opacity' }}
              />

              {/* HERO WORDMARK: "CATALYTI" + THE SPINNING & EXPANDING WHITE "X" (zIndex: 30) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
                style={{ zIndex: 30 }}
              >
                <div className="flex flex-col items-center">
                  <span
                    ref={subtitleTopRef}
                    className="font-mono text-xs uppercase tracking-[0.4em] text-white/70 mb-4 inline-flex items-center gap-2"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                    <DecryptedText
                      text="SYSTEMS KINETIC PROTOCOL"
                      speed={35}
                      sequential={true}
                      encryptedClassName="text-[#00F0FF] font-bold"
                      animateOn="both"
                    />
                  </span>

                  {/* Wordmark Row */}
                  <div className="inline-flex items-center gap-1 sm:gap-3">
                    {/* The "CATALYTI" text with its soft feathered halo — lifts UP */}
                    <div
                      ref={catalytiTextRef}
                      className="relative inline-flex items-center justify-center"
                      style={{ willChange: 'transform, opacity' }}
                    >
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

                    {/* THE WHITE "X": Starts in wordmark, oriented as X, flipped vertically & increased size, spins & expands on scroll! */}
                    <div
                      className="inline-flex items-center justify-center select-none"
                      style={{
                        width: 'clamp(95px, 15vw, 195px)',
                        height: 'clamp(95px, 15vw, 195px)',
                        position: 'relative',
                      }}
                    >
                      <div
                        ref={singleXRef}
                        style={{
                          width: '100%',
                          height: '100%',
                          transformOrigin: '50% 50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transform: 'translate3d(0, 0, 0)',
                          willChange: 'transform',
                          opacity: 1,
                        }}
                      >
                        <CatalytiXMark
                          size="100%"
                          fill="#FFFFFF"
                          rotate={45}
                          flipVertical={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    ref={subtitleBottomRef}
                    className="mt-4 text-xs font-mono tracking-widest uppercase inline-flex items-center gap-2"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <ShinyText
                      text="SYNCHRONIZING ARCHITECTURE"
                      color="rgba(255, 255, 255, 0.5)"
                      shineColor="#00F0FF"
                      speed={2.6}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Initial Scroll Prompt (zIndex: 50) */}
              <div
                ref={scrollPromptRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
                style={{ zIndex: 50, willChange: 'transform, opacity' }}
              >
                <ShinyText
                  text="SCROLL OR SWIPE DOWN TO IGNITE"
                  color="rgba(255, 255, 255, 0.55)"
                  shineColor="#ffffff"
                  speed={2.2}
                  className="text-xs font-mono tracking-widest uppercase"
                />
                <ChevronDown className="w-5 h-5 text-[#00F0FF] animate-bounce" />
              </div>
            </div>

            {/* FLOATING TELEMETRY HUD / CONTROLLER WITH REACTBITS MAGNET */}
            <div
              ref={statusBadgeRef}
              className="fixed bottom-6 right-6 z-50 pointer-events-auto"
            >
              <Magnet padding={50} magnetStrength={3.2}>
                <div className="flex items-center gap-3 p-2 px-3.5 rounded-full bg-black/85 border border-white/20 backdrop-blur-xl shadow-2xl text-xs font-mono hover:border-cyan-400/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
                    <span className="text-[#00F0FF] font-bold">{scrollProgress}%</span>
                  </div>

                  <div className="hidden sm:block h-3 w-[1px] bg-white/20" />

                  <span className="hidden sm:inline text-white/90 font-semibold tracking-wide min-w-[170px]">
                    <DecryptedText
                      key={phaseLabel}
                      text={phaseLabel}
                      speed={22}
                      sequential={true}
                      encryptedClassName="text-[#7cff67] font-bold"
                      animateOn="view"
                    />
                  </span>

                  <div className="h-3 w-[1px] bg-white/20" />

                  <Magnet padding={30} magnetStrength={4}>
                    <button
                      onClick={runAutoPlay}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer border border-transparent hover:border-lime-400/40"
                      title="Auto-scrub through animation sequence"
                    >
                      <Play className="w-3 h-3 fill-current text-[#7cff67]" />
                      <span className="text-[11px] font-semibold">Auto Play</span>
                    </button>
                  </Magnet>
                </div>
              </Magnet>
            </div>
          </ClickSpark>
        </div>
      </div>

      {/* INNER WEBPAGE CONTAINER (Always retained in React DOM tree, toggled via display: none/block to eliminate any removeChild conflict) */}
      <div
        style={{ display: isLocked ? 'block' : 'none' }}
        className="w-full min-h-screen bg-white"
      >
        <HeroWebsite isIncoming={isIncoming} onReplayIntro={handleReplay} />
      </div>
    </div>
  );
}
