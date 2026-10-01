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
  const maskLayerRef = useRef<HTMLDivElement>(null);

  // Audio playback refs (dual-engine: Web Audio API + HTML5 Audio element)
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const activeGainRef = useRef<GainNode | null>(null);
  const isAudioPlayingRef = useRef<boolean>(false);
  const fadeAnimFrameRef = useRef<number | null>(null);
  const hasTriggeredClapRef = useRef<boolean>(false);
  
  // Launch Countdown screen state
  const [showCountdown, setShowCountdown] = useState(true);

  // Stop clapping audio immediately and cleanup nodes
  const stopClappingSound = useCallback(() => {
    isAudioPlayingRef.current = false;
    if (fadeAnimFrameRef.current) {
      cancelAnimationFrame(fadeAnimFrameRef.current);
      fadeAnimFrameRef.current = null;
    }
    if (activeSourceRef.current) {
      try {
        activeSourceRef.current.stop();
      } catch (_) {}
      activeSourceRef.current = null;
    }
    const audioEl = audioElementRef.current;
    if (audioEl) {
      try {
        audioEl.pause();
        audioEl.currentTime = 0;
      } catch (_) {}
    }
  }, []);

  // Smooth fade-off of clapping sound (over ~1.2s) when user clicks for the 360° X animation
  const fadeOffClappingSound = useCallback((durationSeconds = 1.2) => {
    isAudioPlayingRef.current = false;
    if (fadeAnimFrameRef.current) {
      cancelAnimationFrame(fadeAnimFrameRef.current);
      fadeAnimFrameRef.current = null;
    }

    // 1. Web Audio fade-out
    const ctx = audioCtxRef.current;
    const gain = activeGainRef.current;
    const src = activeSourceRef.current;
    if (ctx && gain && src) {
      try {
        const now = ctx.currentTime;
        const currentGain = gain.gain.value;
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(Math.max(0.0001, currentGain), now);
        gain.gain.linearRampToValueAtTime(0.0001, now + durationSeconds);
        setTimeout(() => {
          try {
            src.stop();
          } catch (_) {}
        }, durationSeconds * 1000 + 100);
      } catch (e) {
        console.warn('[CatalytiX Audio] Web Audio fade error:', e);
      }
    }

    // 2. HTML5 Audio fade-out
    const audioEl = audioElementRef.current;
    if (audioEl && !audioEl.paused) {
      const startVol = audioEl.volume;
      const startTime = performance.now();
      const durationMs = durationSeconds * 1000;

      const fadeStep = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        audioEl.volume = Math.max(0, startVol * (1 - progress));
        if (progress < 1) {
          fadeAnimFrameRef.current = requestAnimationFrame(fadeStep);
        } else {
          audioEl.pause();
          audioEl.currentTime = 0;
          fadeAnimFrameRef.current = null;
        }
      };
      fadeAnimFrameRef.current = requestAnimationFrame(fadeStep);
    }
  }, []);

  // Trigger clapping audio: starts immediately when GO ends and CatalytiX screen is displayed (plays ONCE)
  const triggerClappingSound = useCallback(() => {
    if (isLockedRef.current || hasTriggeredClapRef.current) return;
    hasTriggeredClapRef.current = true;
    console.log('[CatalytiX Audio] Triggering clapping sound now (plays ONCE)!');
    isAudioPlayingRef.current = true;

    if (fadeAnimFrameRef.current) {
      cancelAnimationFrame(fadeAnimFrameRef.current);
      fadeAnimFrameRef.current = null;
    }

    let webAudioStarted = false;

    // A. Web Audio API playback (zero latency, plays ONCE)
    const ctx = audioCtxRef.current;
    const buffer = audioBufferRef.current;
    if (ctx && buffer) {
      try {
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        if (activeSourceRef.current) {
          try {
            activeSourceRef.current.stop();
          } catch (_) {}
          activeSourceRef.current = null;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = false; // Plays only ONCE, never loops again

        source.onended = () => {
          isAudioPlayingRef.current = false;
          activeSourceRef.current = null;
          activeGainRef.current = null;
        };

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(1.0, ctx.currentTime);

        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(0);

        activeSourceRef.current = source;
        activeGainRef.current = gain;
        webAudioStarted = true;
        console.log('[CatalytiX Audio] Web Audio playing at volume 1.0 (once)');
      } catch (e) {
        console.warn('[CatalytiX Audio] Web Audio play failed, falling back to HTML5 audio:', e);
      }
    }

    // B. HTML5 Audio element fallback / backup (plays ONCE)
    const audioEl = audioElementRef.current;
    if (audioEl) {
      if (webAudioStarted) {
        audioEl.pause();
        audioEl.currentTime = 0;
      } else {
        audioEl.currentTime = 0;
        audioEl.volume = 1.0;
        audioEl.loop = false; // Plays only ONCE, never loops again
        audioEl.onended = () => {
          isAudioPlayingRef.current = false;
        };
        audioEl.play().then(() => {
          console.log('[CatalytiX Audio] HTML5 audio playing at volume 1.0 (once)');
        }).catch((err) => {
          console.warn('[CatalytiX Audio] HTML5 audio play error:', err);
        });
      }
    }
  }, []);

  // Pre-load and prime audio during user's click on Launch CatalytiX button (synchronous User Gesture)
  const handleLaunchStart = useCallback(() => {
    // 1. Initialize and resume Web Audio AudioContext inside user gesture
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch(() => {});
        }
      }
    } catch (err) {
      console.warn('[CatalytiX Audio] AudioContext init error:', err);
    }

    // 2. Fetch and decode audio buffer for instant playback
    if (audioCtxRef.current && !audioBufferRef.current) {
      fetch('/catalytix-clapping.wav?v=2026')
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.arrayBuffer();
        })
        .then((arrayBuf) => {
          if (audioCtxRef.current) {
            return audioCtxRef.current.decodeAudioData(arrayBuf);
          }
        })
        .then((decoded) => {
          if (decoded) {
            audioBufferRef.current = decoded;
            console.log('[CatalytiX Audio] Pre-decoded buffer ready');
          }
        })
        .catch((err) => {
          console.warn('[CatalytiX Audio] Web Audio decode failed:', err);
        });
    }

    // 3. Prime HTML5 Audio element synchronously inside user gesture
    const audioEl = audioElementRef.current;
    if (audioEl) {
      audioEl.volume = 0.0001;
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            audioEl.pause();
            audioEl.currentTime = 0;
          })
          .catch(() => {});
      }
    }
  }, []);

  // Lock state: starts on the kinetic intro sequence, locks to inner webpage once X transition finishes
  const [isLocked, setIsLocked] = useState(false);
  const [isIncoming, setIsIncoming] = useState(false);
  const isLockedRef = useRef(false);
  const isTransitioningRef = useRef(false);

  const lockToWebpage = useCallback(() => {
    if (isLockedRef.current) return;
    isLockedRef.current = true;

    // Ensure audio is stopped
    stopClappingSound();

    // Start elements incoming transition on inner webpage
    setIsIncoming(true);

    // Lock to inner webpage: intro container becomes display: none, page scrolls to top
    setIsLocked(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [stopClappingSound]);

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

  const entranceTlRef = useRef<gsap.core.Timeline | null>(null);

  // Measure natural resting geometry to calculate center shifts
  const measureOffsets = useCallback(() => {
    if (!xEntranceRef.current || !catalytiTextRef.current) {
      return { shiftToCenter: -280, textSlideStart: 280 };
    }
    // Temporarily clear transforms to measure natural resting positions
    gsap.set([xEntranceRef.current, catalytiTextRef.current], { x: 0, y: 0, scale: 1, rotation: 0 });
    const xRect = xEntranceRef.current.getBoundingClientRect();
    const catRect = catalytiTextRef.current.getBoundingClientRect();
    const screenCenterX = window.innerWidth / 2;
    const currentXCenter = xRect.left + xRect.width / 2;

    // How far X must shift to be centered at screenCenterX (negative value)
    const shiftToCenter = screenCenterX - currentXCenter;

    // CATALYTI starts with its left edge ('C') at the screen center (behind the centered X),
    // so it slides out from the left of the X into resting position
    const textSlideStart = screenCenterX - catRect.left;

    return { shiftToCenter, textSlideStart };
  }, []);

  // Invisible layer mask: clips CATALYTI at the boundary of the X so text only emerges to the left!
  const updateMask = useCallback(() => {
    if (!catalytiTextRef.current || !xEntranceRef.current) return;
    const xRect = xEntranceRef.current.getBoundingClientRect();
    const catRect = catalytiTextRef.current.getBoundingClientRect();

    // The emergence boundary is at the center/left of the X mark
    const boundaryX = xRect.left + (xRect.width * 0.45);
    const localCutoff = boundaryX - catRect.left;

    if (localCutoff <= 0) {
      catalytiTextRef.current.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
    } else {
      catalytiTextRef.current.style.clipPath = `polygon(-150px -100px, ${localCutoff}px -100px, ${localCutoff}px calc(100% + 100px), -150px calc(100% + 100px))`;
    }
  }, []);

  // Cinematic X transition triggered on click:
  // "when clicked the x animation will start leading to inner main page"
  const playXTransition = useCallback(() => {
    if (isTransitioningRef.current || isLockedRef.current) return;
    isTransitioningRef.current = true;

    // Fade off clapping sound when clicked again for the X animation
    fadeOffClappingSound(1.2);

    // Stop entrance timeline if still animating
    if (entranceTlRef.current) {
      entranceTlRef.current.kill();
    }
    // Ensure resting positions and clear any clip-path
    if (catalytiTextRef.current) {
      catalytiTextRef.current.style.clipPath = 'none';
    }
    gsap.set([xEntranceRef.current, catalytiTextRef.current], { x: 0, opacity: 1 });

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
  }, [computeCenterDelta, lockToWebpage, fadeOffClappingSound]);

  // Run the entrance animation:
  // 1. X appears in center alone
  // 2. X shifts towards right while CATALYTI emerges from the X towards left
  // 3. Invisible mask layer at zIndex 5 ensures nothing is seen to the right of the X
  const runEntrance = useCallback(() => {
    if (!xEntranceRef.current || !catalytiTextRef.current || !singleXRef.current) return;

    if (entranceTlRef.current) {
      entranceTlRef.current.kill();
    }

    const { shiftToCenter, textSlideStart } = measureOffsets();

    // Set initial stances before animation begins
    gsap.set(xEntranceRef.current, {
      x: shiftToCenter,
      opacity: 0,
      scale: 0.5,
      rotation: -90,
    });

    gsap.set(catalytiTextRef.current, {
      x: textSlideStart,
      opacity: 0,
    });

    // Prime mask right away
    updateMask();

    if (subtitleTopRef.current) gsap.set(subtitleTopRef.current, { opacity: 0, y: 18 });
    if (subtitleBottomRef.current) gsap.set(subtitleBottomRef.current, { opacity: 0, y: -18 });

    const entranceTl = gsap.timeline({ delay: 0.05 });
    entranceTlRef.current = entranceTl;

    // STEP 1: X comes in middle alone!
    entranceTl.to(xEntranceRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.85,
      ease: 'back.out(1.6)',
      onUpdate: updateMask,
    });

    // STEP 2: The X shifts towards the right, while CATALYTI emerges through the left of the X!
    // Invisible mask ensures no letters are ever seen to the right of the X!
    entranceTl.to(
      xEntranceRef.current,
      {
        x: 0,
        duration: 1.25,
        ease: 'power3.inOut',
      },
      '+=0.25'
    );

    entranceTl.to(
      catalytiTextRef.current,
      {
        x: 0,
        duration: 1.25,
        ease: 'power3.inOut',
        onUpdate: updateMask,
        onComplete: () => {
          if (catalytiTextRef.current) {
            catalytiTextRef.current.style.clipPath = 'none';
          }
        },
      },
      '<'
    );

    // CATALYTI fades in right as the leftward slide begins
    entranceTl.to(
      catalytiTextRef.current,
      {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
      },
      '<'
    );

    // STEP 3: Subtitles reveal smoothly once aligned
    if (subtitleTopRef.current) {
      entranceTl.fromTo(
        subtitleTopRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.45'
      );
    }

    if (subtitleBottomRef.current) {
      entranceTl.fromTo(
        subtitleBottomRef.current,
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.55'
      );
    }
  }, [measureOffsets, updateMask]);

  // Setup initial hidden state immediately on mount so there is ZERO pop
  useEffect(() => {
    if (!xEntranceRef.current || !catalytiTextRef.current) return;
    const { shiftToCenter, textSlideStart } = measureOffsets();
    gsap.set(xEntranceRef.current, {
      x: shiftToCenter,
      opacity: 0,
      scale: 0.5,
      rotation: -90,
    });
    gsap.set(catalytiTextRef.current, {
      x: textSlideStart,
      opacity: 0,
    });
    updateMask();
    if (subtitleTopRef.current) gsap.set(subtitleTopRef.current, { opacity: 0, y: 18 });
    if (subtitleBottomRef.current) gsap.set(subtitleBottomRef.current, { opacity: 0, y: -18 });
  }, [measureOffsets, updateMask]);

  // Pre-fetch clapping sound on mount
  useEffect(() => {
    fetch('/catalytix-clapping.wav?v=2026').catch(() => {});
  }, []);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      stopClappingSound();
    };
  }, [stopClappingSound]);

  // Entrance animation & celebratory clapping trigger when countdown finishes
  useEffect(() => {
    if (showCountdown || isLocked) return;

    // Trigger clapping sound: plays right after GO and when CatalytiX screen is shown
    triggerClappingSound();

    runEntrance();

    // Listen for click or key press to ignite X transition
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
      if (entranceTlRef.current) entranceTlRef.current.kill();
    };
  }, [showCountdown, isLocked, runEntrance, playXTransition, triggerClappingSound]);

  // Safety net: in case browser restricted autoplay until first interaction on the CatalytiX screen
  useEffect(() => {
    const onPointerDown = () => {
      if (isAudioPlayingRef.current && !isLockedRef.current && !isTransitioningRef.current) {
        const ctx = audioCtxRef.current;
        const audioEl = audioElementRef.current;
        if ((ctx && ctx.state === 'suspended') || (audioEl && audioEl.paused && !activeSourceRef.current)) {
          triggerClappingSound();
        }
      }
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [triggerClappingSound]);

  const handleCountdownComplete = useCallback(() => {
    triggerClappingSound();
    setShowCountdown(false);
  }, [triggerClappingSound]);

  return (
    <div
      className={`relative w-full bg-white transition-colors duration-300 ${
        isLocked ? 'min-h-screen select-auto overflow-visible' : 'h-screen select-none overflow-hidden'
      }`}
    >
      {/* 0. LAUNCH & COUNTDOWN WINDOW (Before the website) */}
      {showCountdown && (
        <LaunchCountdown
          onStart={handleLaunchStart}
          onComplete={handleCountdownComplete}
        />
      )}

      {/* 1. INTRO WORDMARK SEQUENCE (Waits for Sir's click, then plays X transition to inner page) */}
      <div
        ref={containerRef}
        style={{
          display: isLocked ? 'none' : 'block',
          visibility: showCountdown ? 'hidden' : 'visible',
          pointerEvents: showCountdown ? 'none' : 'auto',
        }}
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

                  {/* Ambient Deep Glow (NO GRID BACKGROUND) */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 50% 45%, rgba(0, 240, 255, 0.22) 0%, rgba(255, 46, 147, 0.16) 40%, transparent 75%),
                        radial-gradient(circle at 40% 60%, rgba(124, 255, 103, 0.16) 0%, transparent 65%)
                      `,
                    }}
                  />
                </div>

                {/* White bloom overlay: turns canvas pure white as white X expands */}
                <div
                  ref={whiteBloomRef}
                  className="absolute inset-0 bg-white pointer-events-none opacity-0"
                  style={{ zIndex: 15, willChange: 'opacity' }}
                />

                {/* Hero Wordmark: "Bennett Hatchery Presents" + "CATALYTI" + The Spinning White "X" (1:1 Stage) */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none px-4 sm:px-6 w-full h-full"
                  style={{ zIndex: 30 }}
                >
                  <div className="w-full max-w-[min(100vw,100vh)] aspect-square flex flex-col items-center justify-center text-center p-4">
                    <span
                      ref={subtitleTopRef}
                      className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.45em] sm:tracking-[0.55em] text-sky-400 font-black mb-6 sm:mb-10 inline-flex items-center gap-2 select-none"
                      style={{ opacity: 0, willChange: 'transform, opacity' }}
                    >
                      Bennett Hatchery Presents
                    </span>

                    {/* Pure uncontainerized Wordmark Row: Entity 1 (CATALYTI) + Invisible Mask Layer + Entity 2 (X) */}
                    <div
                      className="w-full flex items-center justify-center whitespace-nowrap select-none overflow-visible relative"
                      style={{ gap: 'clamp(2px, 0.5vmin, 6px)' }}
                    >
                      {/* Entity 1: CATALYTI (zIndex: 1 - lowest layer) */}
                      <div
                        ref={catalytiTextRef}
                        className="relative inline-flex items-center justify-center select-none"
                        style={{ opacity: 0, zIndex: 1, willChange: 'transform, opacity, clip-path' }}
                      >
                        <span
                          className="relative z-10 font-sans select-none inline-flex items-baseline"
                          style={{
                            fontFamily: "var(--font-wordmark), 'Montserrat', 'Plus Jakarta Sans', sans-serif",
                            fontSize: 'clamp(4.2rem, 16.5vmin, 16.8rem)',
                            lineHeight: 1,
                            letterSpacing: '0.02em',
                            fontWeight: 900,
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
                                lineHeight: 1.15,
                                paddingBottom: '0.12em',
                              }}
                            >
                              {letter}
                            </span>
                          ))}
                        </span>
                      </div>

                      {/* Mid Layer: The Invisible Masking Layer (zIndex: 5) */}
                      {/* Situated behind the X and above CATALYTI, ensuring text only passes out to the left of the X */}
                      <div
                        ref={maskLayerRef}
                        className="pointer-events-none select-none absolute"
                        style={{ zIndex: 5 }}
                        aria-hidden="true"
                      />

                      {/* Entity 2: The White "X" (zIndex: 10 - top layer) */}
                      <div
                        ref={xEntranceRef}
                        className="shrink-0 inline-flex items-center justify-center select-none"
                        style={{
                          opacity: 0,
                          zIndex: 10,
                          width: 'clamp(62px, 16.8vmin, 172px)',
                          height: 'clamp(62px, 16.8vmin, 172px)',
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
                      className="mt-6 sm:mt-10 text-base sm:text-lg md:text-xl lg:text-2xl font-mono tracking-[0.25em] sm:tracking-[0.32em] uppercase font-black inline-flex items-center gap-2 select-none"
                      style={{ opacity: 0, willChange: 'transform, opacity' }}
                    >
                      <ShinyText
                        text="Built to Begin, Catalized to Scale"
                        color="rgba(255, 255, 255, 0.95)"
                        shineColor="#38BDF8"
                        speed={2.6}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ClickSpark>
          </div>
        </div>

      {/* 2. INNER WEBPAGE CONTAINER */}
      <div
        style={{ display: isLocked ? 'block' : 'none' }}
        className="w-full min-h-screen bg-white"
      >
        <HeroWebsite isIncoming={isIncoming} />
      </div>

      {/* 3. CELEBRATORY CLAPPING AUDIO (Dual sources for rock-solid playback, plays ONCE) */}
      <audio
        ref={audioElementRef}
        preload="auto"
        playsInline
      >
        <source src="/catalytix-clapping.wav?v=2026" type="audio/wav" />
        <source src="/mixkit-conference-audience-clapping-strongly-476.wav" type="audio/wav" />
      </audio>
    </div>
  );
}
