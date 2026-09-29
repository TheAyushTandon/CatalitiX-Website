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
}

export default function LaunchCountdown({ onComplete }: LaunchCountdownProps) {
  const [isColorized, setIsColorized] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);
  const bwLayerRef = useRef<HTMLDivElement>(null);
  const colorLayerRef = useRef<HTMLDivElement>(null);
  const shockwaveRef = useRef<HTMLDivElement>(null);
  const countdownBoxRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  // Click Launch -> Smoothly fill colors from middle to out, then transition to raw countdown
  const handleLaunchClick = () => {
    if (isColorized || isCounting) return;

    setIsColorized(true);

    // 1. Expand the colored layer from the middle (50% 50%) outward across the screen
    if (colorLayerRef.current) {
      gsap.fromTo(
        colorLayerRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(150% at 50% 50%)',
          duration: 1.5,
          ease: 'power2.out',
        }
      );
    }

    // 2. Expand radiant shockwave crest from center outward
    if (shockwaveRef.current) {
      gsap.fromTo(
        shockwaveRef.current,
        { scale: 0, opacity: 1 },
        {
          scale: 3.2,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
        }
      );
    }

    // 3. After the color expansion has completely swept over (1.5s), transition to countdown
    setTimeout(() => {
      setIsCounting(true);

      // Fade out both quote layers smoothly
      gsap.to([bwLayerRef.current, colorLayerRef.current], {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (bwLayerRef.current) bwLayerRef.current.style.display = 'none';
          if (colorLayerRef.current) colorLayerRef.current.style.display = 'none';
          if (countdownBoxRef.current) {
            countdownBoxRef.current.style.display = 'flex';
            gsap.fromTo(
              countdownBoxRef.current,
              { scale: 0.85, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }
            );
          }
        },
      });
    }, 1500);
  };

  // Countdown timer: 3 -> 2 -> 1 -> GO -> Complete
  useEffect(() => {
    if (!isCounting) return;

    if (count > 0) {
      if (numberRef.current) {
        gsap.fromTo(
          numberRef.current,
          { scale: 1.5, opacity: 0, filter: 'blur(12px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }
        );
      }

      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      // Final flash and completion
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete();
          },
        });
      } else {
        onComplete();
      }
    }
  }, [isCounting, count, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-full h-full bg-[#08080d] flex items-center justify-center select-none overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: MONOCHROME BLACK & WHITE (Initial State)
          Pure high-contrast black and white typography and particles
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={bwLayerRef}
        className="absolute inset-0 z-10 w-full h-full flex items-center justify-center"
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

        {/* Monochrome Ambient Radial Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 75%),
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          }}
        />

        {/* 1:1 Square Stage: Monochrome Quote */}
        <div className="relative z-10 w-full max-w-[min(100vw,100vh)] aspect-square flex flex-col items-center justify-center px-6 sm:px-10 text-center">
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
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] font-extrabold block text-white/70">
                Institutional Venture Protocol
              </span>

              <blockquote className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight italic tracking-tight">
                &ldquo;A catalyst for disruptive innovation — turning ambitious ideas into market leaders with world-class labs, capital velocity, and governance.&rdquo;
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
                    <span>Launch CatalytiX</span>
                  </button>
                </StarBorder>
              </Magnet>
            </div>

            <div className="pt-2 text-xs sm:text-sm font-mono font-bold">
              <ShinyText
                text="CLICK TO INITIATE SYSTEM LAUNCH SEQUENCE"
                speed={2.5}
                color="rgba(255, 255, 255, 0.6)"
                shineColor="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: PRESTIGIOUS COLOR LAYER (Middle-to-Out Reveal)
          Rich Royal Sapphire, Warm Solar Amber & Mint Emerald palette
          Revealed smoothly via circle clipPath expanding from center!
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={colorLayerRef}
        className="absolute inset-0 z-20 w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
          willChange: 'clip-path',
        }}
      >
        {/* Rich Colored WebGL Particles */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <Particles
            particleCount={140}
            particleSpread={11}
            speed={0.15}
            particleColors={['#38BDF8', '#60A5FA', '#F59E0B', '#F97316', '#10B981', '#FFFFFF']}
            moveParticlesOnHover={true}
            particleHoverFactor={0.8}
          />
        </div>

        {/* Sophisticated Royal Sapphire & Amber Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.32) 0%, rgba(245, 158, 11, 0.18) 45%, rgba(16, 185, 129, 0.1) 70%, transparent 85%),
              linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 48px 48px, 48px 48px',
          }}
        />

        {/* 1:1 Square Stage: Vibrant Color Version */}
        <div className="relative z-10 w-full max-w-[min(100vw,100vh)] aspect-square flex flex-col items-center justify-center px-6 sm:px-10 text-center">
          <div className="w-full flex flex-col items-center justify-center text-center space-y-7">
            {/* Colored Cohort Badge */}
            <Magnet padding={25} magnetStrength={3}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono shadow-md bg-slate-900/90 border border-sky-400/50 text-sky-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]" />
                <span className="font-bold">Bennett Hatchery Foundation // Cohort 2026</span>
              </div>
            </Magnet>

            {/* Glowing Colored Quote */}
            <div className="max-w-2xl mx-auto space-y-5 py-2">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] font-black block text-sky-400">
                Institutional Venture Protocol
              </span>

              <blockquote className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight italic tracking-tight drop-shadow-[0_2px_20px_rgba(37,99,235,0.3)]">
                &ldquo;A catalyst for disruptive innovation — turning ambitious ideas into market leaders with world-class labs, capital velocity, and governance.&rdquo;
              </blockquote>

              <div className="space-y-1.5 pt-2">
                <p className="text-sm sm:text-base font-mono font-bold text-amber-300 drop-shadow-sm">
                  — Bennett Hatchery Foundation Advisory Board
                </p>
                <p className="text-xs sm:text-sm font-mono uppercase tracking-widest font-extrabold text-sky-300/80">
                  DPIIT &amp; SISFS Accredited
                </p>
              </div>
            </div>

            {/* Radiant Colored Launch Button */}
            <div className="pt-3">
              <Magnet padding={45} magnetStrength={3.5}>
                <StarBorder
                  color="#38BDF8"
                  speed="2.5s"
                  thickness={3}
                  className="!rounded-full shadow-[0_0_40px_rgba(56,189,248,0.5)]"
                >
                  <button
                    onClick={handleLaunchClick}
                    className="px-12 sm:px-14 py-4 sm:py-5 rounded-full font-black text-lg sm:text-xl tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3.5 cursor-pointer text-white"
                    style={{
                      background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 40%, #F59E0B 80%, #EA580C 100%)',
                      boxShadow: '0 0 50px rgba(37, 99, 235, 0.6), 0 0 30px rgba(245, 158, 11, 0.45)',
                    }}
                  >
                    <Icons8 name="rocket" size={24} color="FFFFFF" />
                    <span>Launch CatalytiX</span>
                  </button>
                </StarBorder>
              </Magnet>
            </div>

            <div className="pt-2 text-xs sm:text-sm font-mono font-bold">
              <ShinyText
                text="SYSTEM LAUNCH SEQUENCE INITIATED"
                speed={2}
                color="#94a3b8"
                shineColor="#38BDF8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SHOCKWAVE CREST (Expands at leading edge from middle to out)
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={shockwaveRef}
        className="pointer-events-none absolute w-[420px] h-[420px] rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-30"
        style={{
          opacity: 0,
          border: '3px solid rgba(56, 189, 248, 0.9)',
          boxShadow: '0 0 60px rgba(56, 189, 248, 0.8), 0 0 120px rgba(245, 158, 11, 0.6), inset 0 0 40px rgba(37, 99, 235, 0.5)',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          PHASE 2: RAW COUNTDOWN (NO CONTAINER BOX!)
          Colors: Royal Sapphire to Solar Amber deeptech gradient
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={countdownBoxRef}
        style={{ display: 'none' }}
        className="relative z-40 w-full flex flex-col items-center justify-center text-center space-y-4"
      >
        {/* Massive, pure floating countdown number without any box or circle */}
        <div
          ref={numberRef}
          className="font-mono text-9xl sm:text-[11rem] md:text-[14rem] font-black select-none leading-none tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #38BDF8 0%, #2563EB 35%, #F59E0B 75%, #EA580C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            willChange: 'transform, opacity',
            filter: 'drop-shadow(0 0 40px rgba(37, 99, 235, 0.45)) drop-shadow(0 0 80px rgba(245, 158, 11, 0.35))',
          }}
        >
          {count > 0 ? count : 'GO'}
        </div>

        <div className="space-y-2">
          <span className="font-mono text-sm sm:text-base uppercase tracking-[0.35em] text-sky-400 font-black block">
            {count > 0 ? 'IGNITING CATALYTIX VENTURE RUNWAY' : 'LAUNCH COMMENCED'}
          </span>
          <p className="text-xs sm:text-sm font-mono font-bold text-slate-300">
            Bennett Hatchery Foundation // DeepTech Venture Engine
          </p>
        </div>
      </div>
    </div>
  );
}
