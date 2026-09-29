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
  // isColorized: starts false (completely black & white), becomes true when Launch is clicked (colors fill in gradually)
  const [isColorized, setIsColorized] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(3);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const countdownBoxRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  // Click Launch -> fill colors in gradually, then transition to raw countdown
  const handleLaunchClick = () => {
    if (isColorized || isCounting) return;

    // 1. Gradually fill colors into elements
    setIsColorized(true);

    // 2. After 1.2 seconds of colorful illumination, transition to countdown
    setTimeout(() => {
      setIsCounting(true);

      // Fade out quote and launch button smoothly
      gsap.to(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          if (contentRef.current) contentRef.current.style.display = 'none';
          if (countdownBoxRef.current) {
            countdownBoxRef.current.style.display = 'flex';
            gsap.fromTo(
              countdownBoxRef.current,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }
            );
          }
        },
      });
    }, 1200);
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
      {/* 3D WebGL Particles Background: starts grayscale, transitions to vivid colors */}
      <div
        className="absolute inset-0 z-0 opacity-70 pointer-events-none transition-all duration-1000"
        style={{
          filter: isColorized ? 'grayscale(0) brightness(1.1)' : 'grayscale(1) brightness(0.75)',
        }}
      >
        <Particles
          particleCount={130}
          particleSpread={11}
          speed={0.14}
          particleColors={
            isColorized
              ? ['#00F0FF', '#FF2E93', '#7cff67', '#ffffff']
              : ['#ffffff', '#cccccc', '#888888', '#555555']
          }
          moveParticlesOnHover={true}
          particleHoverFactor={0.8}
        />
      </div>

      {/* Atmospheric Radial Glow: starts monochrome, blooms into cyan/pink glow when clicked */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          backgroundImage: isColorized
            ? `
                radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.22) 0%, rgba(255, 46, 147, 0.16) 45%, transparent 75%),
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
              `
            : `
                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 45%, transparent 75%),
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
              `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* 1:1 SQUARE PRESENTATION STAGE */}
      <div className="relative z-10 w-full max-w-[min(100vw,100vh)] aspect-square flex flex-col items-center justify-center px-6 sm:px-10 text-center">
        {/* Phase 1: Clean Floating Quote (NO CONTAINER BOX) & Launch Button */}
        <div
          ref={contentRef}
          className="w-full flex flex-col items-center justify-center text-center space-y-7"
        >
          {/* Release Pill Badge */}
          <Magnet padding={25} magnetStrength={3}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-1000 shadow-sm"
              style={{
                backgroundColor: isColorized ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.06)',
                border: isColorized ? '1px solid rgba(0, 240, 255, 0.4)' : '1px solid rgba(255, 255, 255, 0.18)',
                color: isColorized ? '#00F0FF' : '#FFFFFF',
              }}
            >
              <span
                className="w-2 h-2 rounded-full transition-colors duration-1000"
                style={{
                  backgroundColor: isColorized ? '#16A34A' : '#FFFFFF',
                  boxShadow: isColorized ? '0 0 8px #16A34A' : 'none',
                }}
              />
              <span>Bennett Hatchery Foundation // Cohort 2026</span>
            </div>
          </Magnet>

          {/* FLOATING QUOTE: Completely borderless, no container box, floating pure typography */}
          <div className="max-w-2xl mx-auto space-y-5 py-2">
            <span
              className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] font-extrabold block transition-colors duration-1000"
              style={{
                color: isColorized ? '#00F0FF' : 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Institutional Venture Protocol
            </span>

            <blockquote className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight italic tracking-tight">
              &ldquo;A catalyst for disruptive innovation — turning ambitious ideas into market leaders with world-class labs, capital velocity, and governance.&rdquo;
            </blockquote>

            <div className="space-y-1.5 pt-2">
              <p
                className="text-sm sm:text-base font-mono font-bold transition-colors duration-1000"
                style={{
                  color: isColorized ? '#5EEAD4' : 'rgba(255, 255, 255, 0.9)',
                }}
              >
                — Bennett Hatchery Foundation Advisory Board
              </p>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-widest font-semibold text-white/60">
                DPIIT &amp; SISFS Accredited
              </p>
            </div>
          </div>

          {/* Launch Button: Starts B&W, fills with radiant gradient colors when clicked */}
          <div className="pt-3">
            <Magnet padding={45} magnetStrength={3.5}>
              <StarBorder
                color={isColorized ? '#00F0FF' : '#FFFFFF'}
                speed="3s"
                thickness={2.5}
                className="!rounded-full transition-all duration-1000"
              >
                <button
                  onClick={handleLaunchClick}
                  className="px-12 sm:px-14 py-4 sm:py-5 rounded-full font-black text-lg sm:text-xl tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3.5 cursor-pointer"
                  style={{
                    background: isColorized
                      ? 'linear-gradient(90deg, #00F0FF 0%, #8B5CF6 50%, #FF2E93 100%)'
                      : 'linear-gradient(90deg, #FFFFFF 0%, #E2E8F0 100%)',
                    color: isColorized ? '#FFFFFF' : '#090D16',
                    boxShadow: isColorized
                      ? '0 0 50px rgba(0, 240, 255, 0.5), 0 0 25px rgba(255, 46, 147, 0.3)'
                      : '0 0 30px rgba(255, 255, 255, 0.35)',
                  }}
                >
                  <Icons8
                    name="rocket"
                    size={24}
                    color={isColorized ? 'FFFFFF' : '090D16'}
                  />
                  <span>Launch CatalytiX</span>
                </button>
              </StarBorder>
            </Magnet>
          </div>

          <div className="pt-2 text-xs sm:text-sm font-mono font-bold">
            <ShinyText
              text="CLICK TO INITIATE SYSTEM LAUNCH SEQUENCE"
              speed={2.5}
              color={isColorized ? '#94a3b8' : 'rgba(255, 255, 255, 0.6)'}
              shineColor={isColorized ? '#00F0FF' : '#FFFFFF'}
            />
          </div>
        </div>

        {/* Phase 2: RAW COUNTDOWN (NO SQUARE/CIRCLE CONTAINER BOX!) */}
        <div
          ref={countdownBoxRef}
          style={{ display: 'none' }}
          className="relative z-10 w-full flex flex-col items-center justify-center text-center space-y-4"
        >
          {/* Massive, pure floating countdown number without any container box or circle */}
          <div
            ref={numberRef}
            className="font-mono text-9xl sm:text-[11rem] md:text-[14rem] font-black breathing-gradient-text select-none leading-none tracking-tight"
            style={{ willChange: 'transform, opacity' }}
          >
            {count > 0 ? count : 'GO'}
          </div>

          <div className="space-y-2">
            <span className="font-mono text-sm sm:text-base uppercase tracking-[0.35em] text-cyan-300 font-black block">
              {count > 0 ? 'IGNITING CATALYTIX KINETIC PROTOCOL' : 'LAUNCH COMMENCED'}
            </span>
            <p className="text-xs sm:text-sm font-mono font-bold text-slate-300">
              Bennett Hatchery Foundation // DeepTech Venture Engine
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
