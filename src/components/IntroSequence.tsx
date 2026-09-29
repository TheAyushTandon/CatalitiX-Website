"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Aurora from './Aurora';
import CatalytiXMark from './CatalytiXMark';
import HeroWebsite from './HeroWebsite';
import Icons8 from './Icons8';
import ClickSpark from './reactbits/ClickSpark';
import Particles from './reactbits/Particles';
import ShinyText from './reactbits/ShinyText';

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
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const xEntranceRef = useRef<HTMLDivElement>(null);
  
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
        if (xEntranceRef.current) {
          gsap.set(xEntranceRef.current, { x: 0, y: 0, opacity: 1 });
        }
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

            // If user starts scrolling during initial entrance, fast-forward entrance instantly
            if (p > 0.005 && entranceTl.isActive()) {
              entranceTl.progress(1);
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
      // ENTRANCE SEQUENCE: "Bennett Hatchery Presents" -> "CATALYTIX" letter-by-letter -> "Built to Begin, Catalized to Scale"
      // ─────────────────────────────────────────────────────────────
      const validLetters = lettersRef.current.filter(Boolean);

      const entranceTl = gsap.timeline({
        delay: 0.15,
      });

      // 1. "Bennett Hatchery Presents" reveals smoothly
      if (subtitleTopRef.current) {
        entranceTl.fromTo(
          subtitleTopRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' }
        );
      }

      // 2. Letter-by-letter smooth animation down to up of "CATALYTIX"
      if (validLetters.length > 0) {
        entranceTl.fromTo(
          validLetters,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.055,
            ease: 'power4.out',
          },
          '-=0.2'
        );
      }

      // The "X" completes the wordmark in sequence with the letters
      if (xEntranceRef.current) {
        entranceTl.fromTo(
          xEntranceRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power4.out',
          },
          '<+=0.35'
        );
      }

      // 3. "Built to Begin, Catalized to Scale" reveals smoothly
      if (subtitleBottomRef.current) {
        entranceTl.fromTo(
          subtitleBottomRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' },
          '-=0.25'
        );
      }

      // 4. Scroll prompt reveals
      if (scrollPromptRef.current) {
        entranceTl.fromTo(
          scrollPromptRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        );
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
                    className="font-mono text-xs uppercase tracking-[0.35em] text-cyan-300/80 mb-4 inline-flex items-center gap-2"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    Bennett Hatchery Presents
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
                        className="relative z-10 font-asimovian select-none inline-flex items-center"
                        style={{
                          fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
                          lineHeight: 1,
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {"CATALYTI".split("").map((letter, idx) => (
                          <span
                            key={idx}
                            ref={(el) => {
                              lettersRef.current[idx] = el;
                            }}
                            className="inline-block transform-gpu breathing-gradient-text"
                            style={{
                              willChange: 'transform, opacity',
                            }}
                          >
                            {letter}
                          </span>
                        ))}
                      </span>
                    </div>

                    {/* THE WHITE "X": Starts in wordmark, oriented as X, flipped vertically & increased size, spins & expands on scroll! */}
                    <div
                      ref={xEntranceRef}
                      className="inline-flex items-center justify-center select-none"
                      style={{
                        width: 'clamp(95px, 15vw, 195px)',
                        height: 'clamp(95px, 15vw, 195px)',
                        position: 'relative',
                        willChange: 'transform, opacity',
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
                      text="Built to Begin, Catalized to Scale"
                      color="rgba(255, 255, 255, 0.6)"
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
                <Icons8 name="chevronDown" size={18} color="00F0FF" className="animate-bounce mt-1" />
              </div>
            </div>


          </ClickSpark>
        </div>
      </div>

      {/* INNER WEBPAGE CONTAINER (Always retained in React DOM tree, toggled via display: none/block to eliminate any removeChild conflict) */}
      <div
        style={{ display: isLocked ? 'block' : 'none' }}
        className="w-full min-h-screen bg-white"
      >
        <HeroWebsite isIncoming={isIncoming} />
      </div>
    </div>
  );
}
