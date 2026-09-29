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
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const countdownBoxRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);

  const startCountdown = () => {
    if (isCounting) return;
    setIsCounting(true);

    // Fade out initial quote/button content
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        if (contentRef.current) contentRef.current.style.display = 'none';
        if (countdownBoxRef.current) {
          countdownBoxRef.current.style.display = 'flex';
          gsap.fromTo(
            countdownBoxRef.current,
            { scale: 0.7, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }
          );
        }
      },
    });
  };

  // Countdown timer effect
  useEffect(() => {
    if (!isCounting) return;

    if (count > 0) {
      // Pulse animation for the countdown number
      if (numberRef.current) {
        gsap.fromTo(
          numberRef.current,
          { scale: 1.6, opacity: 0, filter: 'blur(10px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }
        );
      }

      // Rotate and animate radial ring
      if (ringRef.current) {
        gsap.fromTo(
          ringRef.current,
          { strokeDashoffset: 283 },
          { strokeDashoffset: 0, duration: 0.95, ease: 'linear' }
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
          duration: 0.65,
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
      {/* 3D WebGL Particles Background */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <Particles
          particleCount={120}
          particleSpread={10}
          speed={0.15}
          particleColors={['#00F0FF', '#FF2E93', '#7cff67', '#ffffff']}
          moveParticlesOnHover={true}
          particleHoverFactor={0.8}
        />
      </div>

      {/* Atmospheric Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.18) 0%, rgba(255, 46, 147, 0.12) 45%, transparent 75%),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Phase 1: Ready to Launch Screen with CatalytiX Quote & Launch Button */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-3xl w-full px-6 flex flex-col items-center text-center"
      >
        {/* Release Pill Badge */}
        <div className="mb-6">
          <Magnet padding={25} magnetStrength={3}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>Bennett Hatchery Foundation // Cohort 2026</span>
            </div>
          </Magnet>
        </div>

        {/* CatalytiX Quote Card */}
        <div className="w-full p-8 sm:p-10 rounded-3xl bg-slate-900/50 border border-slate-700/60 backdrop-blur-xl shadow-2xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent opacity-60" />
          
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#00F0FF]/80 mb-4 block font-semibold">
            Institutional Venture Protocol
          </span>

          <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-100 leading-relaxed italic mb-6">
            &ldquo;A catalyst for disruptive innovation — turning ambitious ideas into market leaders with world-class labs, capital velocity, and governance.&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
            <span className="text-[#5EEAD4] font-semibold">
              — Bennett Hatchery Foundation Advisory Board
            </span>
            <span className="text-slate-500 uppercase tracking-wider">
              DPIIT &amp; SISFS Accredited
            </span>
          </div>
        </div>

        {/* Big Launch Button for Sir */}
        <Magnet padding={50} magnetStrength={3.5}>
          <StarBorder
            color="#00F0FF"
            speed="3s"
            thickness={2}
            className="!rounded-full shadow-[0_0_50px_rgba(0,240,255,0.35)]"
          >
            <button
              onClick={startCountdown}
              className="px-10 sm:px-14 py-4 sm:py-5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#8B5CF6] to-[#FF2E93] text-white font-extrabold text-lg sm:text-xl tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3.5 cursor-pointer"
            >
              <Icons8 name="rocket" size={24} color="FFFFFF" />
              <span>Launch CatalytiX</span>
            </button>
          </StarBorder>
        </Magnet>

        <div className="mt-8 text-xs font-mono text-slate-400">
          <ShinyText
            text="CLICK TO INITIATE SYSTEM LAUNCH SEQUENCE"
            speed={2.5}
            color="#64748b"
            shineColor="#00F0FF"
          />
        </div>
      </div>

      {/* Phase 2: Cinematic Countdown Display */}
      <div
        ref={countdownBoxRef}
        style={{ display: 'none' }}
        className="relative z-10 flex flex-col items-center justify-center text-center"
      >
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center mb-8">
          {/* Animated Radial Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3"
            />
            <circle
              ref={ringRef}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset="0"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.8))' }}
            />
          </svg>

          {/* Glowing Countdown Number */}
          <div
            ref={numberRef}
            className="font-mono text-7xl sm:text-9xl font-black breathing-gradient-text select-none"
            style={{ willChange: 'transform, opacity' }}
          >
            {count > 0 ? count : 'GO'}
          </div>
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-cyan-300 font-bold block">
            {count > 0 ? 'IGNITING CATALYTIX KINETIC PROTOCOL' : 'LAUNCH COMMENCED'}
          </span>
          <p className="text-xs font-mono text-slate-500">
            Bennett Hatchery Foundation // DeepTech Venture Engine
          </p>
        </div>
      </div>
    </div>
  );
}
