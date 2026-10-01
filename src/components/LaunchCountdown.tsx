"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Particles from './reactbits/Particles';
import StarBorder from './reactbits/StarBorder';
import Magnet from './reactbits/Magnet';
import ShinyText from './reactbits/ShinyText';
import Icons8 from './Icons8';

interface LaunchCountdownProps {
  onComplete: () => void;
  onStart?: () => void;
}

export default function LaunchCountdown({ onComplete, onStart }: LaunchCountdownProps) {
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);
  const bwLayerRef = useRef<HTMLDivElement>(null);
  const countdownBoxRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const countdownAudioRef = useRef<HTMLAudioElement | null>(null);

  // Pre-fetch 3-2-1-GO countdown audio on mount
  useEffect(() => {
    fetch('/countdown-321-go.mp3?v=2026').catch(() => { });
  }, []);

  // Click Launch -> Play 3-2-1-GO audio immediately & smooth fade into countdown
  const handleLaunchClick = () => {
    if (isCounting) return;
    setIsCounting(true);
    onStart?.();

    // 1. Play 3-2-1-GO audio immediately in user gesture
    const audio = countdownAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1.0;
      audio.play().catch((err) => {
        console.warn('[Countdown Audio] play error:', err);
      });
    }

    // 2. Fade out quote layer, reveal countdown box showing "3"
    if (bwLayerRef.current) {
      gsap.to(bwLayerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          if (bwLayerRef.current) bwLayerRef.current.style.display = 'none';
          if (countdownBoxRef.current) {
            countdownBoxRef.current.style.display = 'flex';
            gsap.fromTo(
              countdownBoxRef.current,
              { scale: 0.85, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }
            );
            if (numberRef.current) {
              gsap.fromTo(
                numberRef.current,
                { scale: 1.4, opacity: 0, filter: 'blur(10px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }
              );
            }
          }
        },
      });
    }
  };

  // Synchronized Countdown timeline matching mrstokes302-321-go-sfx audio peaks:
  // t=0ms: Click & Audio starts
  // t=350ms: Countdown box displays '3' (synced with 0.60s audio hit)
  // t=1650ms: '2' (synced with 1.65s audio hit)
  // t=2750ms: '1' (synced with 2.75s audio hit)
  // t=3800ms: 'GO' (synced with 3.80s audio hit)
  // t=4600ms: Smooth fade-out into CatalytiX screen and trigger onComplete()
  useEffect(() => {
    if (!isCounting) return;

    const timers: NodeJS.Timeout[] = [];

    // 2 appears at 1650ms
    timers.push(
      setTimeout(() => {
        setCount(2);
        if (numberRef.current) {
          gsap.fromTo(
            numberRef.current,
            { scale: 1.45, opacity: 0, filter: 'blur(10px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }
          );
        }
      }, 1650)
    );

    // 1 appears at 2750ms
    timers.push(
      setTimeout(() => {
        setCount(1);
        if (numberRef.current) {
          gsap.fromTo(
            numberRef.current,
            { scale: 1.45, opacity: 0, filter: 'blur(10px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' }
          );
        }
      }, 2750)
    );

    // 'GO' appears at 3800ms
    timers.push(
      setTimeout(() => {
        setCount(0);
        if (numberRef.current) {
          gsap.fromTo(
            numberRef.current,
            { scale: 1.6, opacity: 0, filter: 'blur(12px)' },
            { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out' }
          );
        }
      }, 3800)
    );

    // Fade out countdown container and complete at 4600ms
    timers.push(
      setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.55,
            ease: 'power2.inOut',
            onComplete: () => {
              onComplete();
            },
          });
        } else {
          onComplete();
        }
      }, 4600)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isCounting, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-full h-full bg-[#08080d] flex items-center justify-center select-none overflow-hidden"
    >
      {/* Grayscale Particles */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none filter grayscale">
        <Particles
          particleCount={120}
          particleSpread={11}
          speed={0.12}
          particleColors={['#ffffff', '#cccccc', '#999999', '#666666']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.8}
        />
      </div>

      {/* Monochrome Ambient Radial Vignette (NO GRID) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.015) 50%, transparent 80%)`,
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          STAGE 1: MONOCHROME QUOTE & LAUNCH BUTTON
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={bwLayerRef}
        className="relative z-10 w-full max-w-[min(100vw,100vh)] aspect-square flex flex-col items-center justify-center px-6 sm:px-10 text-center"
      >
        <div className="w-full flex flex-col items-center justify-center text-center space-y-7">
          {/* Release Pill Badge */}
          <Magnet padding={25} magnetStrength={3}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono shadow-sm bg-white/5 border border-white/20 text-white">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Bennett Hatchery Foundation // Cohort 2026</span>
            </div>
          </Magnet>

          {/* Clean Floating Quote */}
          <div className="max-w-2xl mx-auto space-y-5 py-2">
            <blockquote className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight italic tracking-tight">
              &ldquo;The catalyst that churns raw ideas into market-ready ventures.&rdquo;
            </blockquote>

            <div className="space-y-1.5 pt-2">
              <p className="text-sm sm:text-base font-mono font-bold text-white/90">
                — Bennett Hatchery Foundation Advisory Board
              </p>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest font-semibold text-white/60">
                DPIIT &amp; SISFS Accredited
              </p>
            </div>
          </div>

          {/* Monochrome Launch Button */}
          <div className="pt-3">
            <Magnet padding={45} magnetStrength={3.5}>
              <StarBorder
                color="#FFFFFF"
                speed="3s"
                thickness={2.5}
                className="!rounded-full shadow-2xl"
              >
                <button
                  onClick={handleLaunchClick}
                  className="px-12 sm:px-14 py-4 sm:py-5 rounded-full font-black text-lg sm:text-xl tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3.5 cursor-pointer bg-gradient-to-r from-white to-slate-200 text-slate-950"
                  style={{
                    boxShadow: '0 0 35px rgba(255, 255, 255, 0.35)',
                  }}
                >
                  <Icons8 name="rocket" size={24} color="090D16" />
                  <span>Launch CATALYTIX</span>
                </button>
              </StarBorder>
            </Magnet>
          </div>

          <div className="pt-2 text-xs sm:text-sm font-mono font-bold">
            <ShinyText
              text="Click To Launch CATALYTIX"
              speed={2.5}
              color="rgba(255, 255, 255, 0.7)"
              shineColor="#FFFFFF"
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          STAGE 2: PURE BLACK & WHITE COUNTDOWN
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={countdownBoxRef}
        style={{ display: 'none' }}
        className="relative z-40 w-full flex flex-col items-center justify-center text-center space-y-4"
      >
        {/* Massive, pure floating black & white countdown number */}
        <div
          ref={numberRef}
          className="font-mono text-9xl sm:text-[11rem] md:text-[14rem] font-black select-none leading-none tracking-tight"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 55%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 0 35px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 70px rgba(255, 255, 255, 0.2))',
          }}
        >
          {count > 0 ? count : 'GO'}
        </div>

        <div className="space-y-1.5">
          <span className="font-mono text-sm sm:text-base uppercase tracking-[0.3em] text-white/90 font-black block">
            CATALYTIX COHORT 2026
          </span>
          <p className="text-xs sm:text-sm font-mono font-bold text-white/60">
            Bennett Hatchery Foundation
          </p>
        </div>
      </div>

      {/* 3-2-1-GO Sound Effect (User-provided audio) */}
      <audio
        ref={countdownAudioRef}
        preload="auto"
        playsInline
      >
        <source src="/countdown-321-go.mp3?v=2026" type="audio/mpeg" />
        <source src="/mrstokes302-321-go-sfx-mrstokes302-588516_gxZ47n3b.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
