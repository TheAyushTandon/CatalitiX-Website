"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import Aurora from './Aurora';
import CatalytiXMark from './CatalytiXMark';
import HeroWebsite from './HeroWebsite';
import ClickSpark from './reactbits/ClickSpark';
import Particles from './reactbits/Particles';
import ShinyText from './reactbits/ShinyText';
import LaunchCountdown from './LaunchCountdown';

export default function IntroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introBgRef = useRef<HTMLDivElement>(null);
  const catalytiTextRef = useRef<HTMLDivElement>(null);
  const singleXRef = useRef<HTMLDivElement>(null);
  const whiteBloomRef = useRef<HTMLDivElement>(null);
  const subtitleTopRef = useRef<HTMLSpanElement>(null);
  const subtitleBottomRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const xEntranceRef = useRef<HTMLDivElement>(null);
  
  // Launch Countdown screen state
  const [showCountdown, setShowCountdown] = useState(true);

  // Lock state: starts on the kinetic intro sequence, locks to inner webpage once X transition finishes
  const [isLocked, setIsLocked] = useState(false);
  const [isIncoming, setIsIncoming] = useState(false);
  const isLockedRef = useRef(false);
  const isTransitioningRef = useRef(false);

  const lockToWebpage = useCallback(() => {
    if (isLockedRef.current) return;
    isLockedRef.current = true;

    // Start elements incoming transition on inner webpage
    setIsIncoming(true);

    // Lock to inner webpage: intro container becomes display: none, page scrolls to top
    setIsLocked(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Compute center delta to align the X from its wordmark position to the screen center
  const computeCenterDelta = useCallback(() => {
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
  }, []);

  // Cinematic X transition triggered on click:
  // "when clicked the x animation will start leading to inner main page"
  const playXTransition = useCallback(() => {
    if (isTransitioningRef.current || isLockedRef.current) return;
    isTransitioningRef.current = true;

    const { deltaX, deltaY } = computeCenterDelta();

    const animTl = gsap.timeline({
      onComplete: () => {
        lockToWebpage();
      },
    });

    // 1. Text & subtitles float UP and fade away
    animTl.to(
      [catalytiTextRef.current, subtitleTopRef.current, subtitleBottomRef.current],
      {
        y: '-42vh',
        opacity: 0,
        duration: 0.65,
        ease: 'power2.inOut',
        stagger: 0.04,
      },
      0
    );

    // 2. Aurora dissolves gently
    animTl.to(
      introBgRef.current,
      {
        opacity: 0.25,
        duration: 0.75,
        ease: 'power1.inOut',
      },
      0
    );

    // 3. The WHITE X GLIDES TO SCREEN CENTER & SPINS 360°
    animTl.to(
      singleXRef.current,
      {
        x: deltaX,
        y: deltaY,
        rotation: 360,
        duration: 0.75,
        ease: 'power2.inOut',
      },
      0
    );

    // 4. White X expands exponentially from center into a blinding transition
    animTl.to(
      singleXRef.current,
      {
        scale: 260,
        duration: 0.85,
        ease: 'power3.in',
      },
      0.65
    );

    // 5. White bloom overlay turns canvas pure white
    if (whiteBloomRef.current) {
      animTl.to(
        whiteBloomRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        0.95
      );
    }
  }, [computeCenterDelta, lockToWebpage]);

  // Entrance animation for Wordmark screen once Countdown completes
  useEffect(() => {
    if (showCountdown || isLocked) return;

    const validLetters = lettersRef.current.filter(Boolean);
    const entranceTl = gsap.timeline({ delay: 0.1 });

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
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.055,
          ease: 'power4.out',
        },
        '-=0.25'
      );
    }

    // The "X" completes the wordmark in sequence with the letters
    if (xEntranceRef.current) {
      entranceTl.fromTo(
        xEntranceRef.current,
        { y: 55, opacity: 0 },
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

    // Listen for left click or key press to ignite X animation
    const handleClick = (e: MouseEvent) => {
      if (e.button === 0) {
        playXTransition();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ([' ', 'Enter', 'ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        playXTransition();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      entranceTl.kill();
    };
  }, [showCountdown, isLocked, playXTransition]);

  return (
    <div className="relative w-full bg-white select-none">
      {/* 0. LAUNCH & COUNTDOWN WINDOW (Before the website) */}
      {showCountdown && (
        <LaunchCountdown onComplete={() => setShowCountdown(false)} />
      )}

      {/* 1. INTRO WORDMARK SEQUENCE (Waits for Sir's click, then plays X transition to inner page) */}
      {!showCountdown && (
        <div
          ref={containerRef}
          style={{ display: isLocked ? 'none' : 'block' }}
          className="fixed inset-0 z-40 w-full h-screen bg-[#08080d] cursor-pointer overflow-hidden"
          onClick={playXTransition}
        >
          <div
            ref={stageRef}
            className="relative w-full h-screen overflow-hidden z-10"
          >
            <ClickSpark
              sparkColor={['#00F0FF', '#FF2E93', '#7cff67', '#FFD600']}
              sparkCount={12}
              sparkRadius={28}
              className="absolute inset-0 w-full h-full"
            >
              <div
                ref={overlayRef}
                className="absolute inset-0 w-full h-full z-20 overflow-hidden bg-[#08080d]"
              >
                {/* Intro Aurora & Particles */}
                <div
                  ref={introBgRef}
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{ zIndex: 10, willChange: 'opacity' }}
                >
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

                {/* White bloom overlay: turns canvas pure white as white X expands */}
                <div
                  ref={whiteBloomRef}
                  className="absolute inset-0 bg-white pointer-events-none opacity-0"
                  style={{ zIndex: 15, willChange: 'opacity' }}
                />

                {/* Hero Wordmark: "Bennett Hatchery Presents" + "CATALYTI" + The Spinning White "X" */}
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
                      <div
                        ref={catalytiTextRef}
                        className="relative inline-flex items-center justify-center"
                        style={{ willChange: 'transform, opacity' }}
                      >
                        <div
                          className="absolute -inset-16 rounded-full pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.28) 0%, rgba(124, 255, 103, 0.2) 40%, rgba(255, 46, 147, 0.16) 60%, transparent 78%)',
                            filter: 'blur(50px)',
                          }}
                        />
                        <span
                          className="relative z-10 font-asimovian select-none inline-flex items-center"
                          style={{
                            fontSize: 'clamp(2.8rem, 7vw, 6.2rem)',
                            lineHeight: 1,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {'CATALYTI'.split('').map((letter, idx) => (
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

                      {/* The White "X" */}
                      <div
                        ref={xEntranceRef}
                        className="inline-flex items-center justify-center select-none"
                        style={{
                          width: 'clamp(70px, 9vw, 150px)',
                          height: 'clamp(70px, 9vw, 150px)',
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
              </div>
            </ClickSpark>
          </div>
        </div>
      )}

      {/* 2. INNER WEBPAGE CONTAINER */}
      <div
        style={{ display: isLocked ? 'block' : 'none' }}
        className="w-full min-h-screen bg-white"
      >
        <HeroWebsite isIncoming={isIncoming} />
      </div>
    </div>
  );
}
