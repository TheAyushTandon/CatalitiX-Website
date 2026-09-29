"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'cyan' | 'pink' | 'lime' | 'default';
  gap?: number;
  speed?: number;
  colors?: string;
  className?: string;
  children: React.ReactNode;
}

const VARIANTS = {
  default: {
    colors: '#00F0FF,#FF2E93,#7cff67,#ffffff',
    gap: 6,
    speed: 30,
  },
  cyan: {
    colors: '#00F0FF,#38bdf8,#0284c7,#ffffff',
    gap: 6,
    speed: 30,
  },
  pink: {
    colors: '#FF2E93,#f472b6,#db2777,#ffffff',
    gap: 6,
    speed: 30,
  },
  lime: {
    colors: '#7cff67,#4ade80,#16a34a,#ffffff',
    gap: 6,
    speed: 30,
  },
};

export default function PixelCard({
  variant = 'cyan',
  gap,
  speed,
  colors,
  className = '',
  children,
  style,
  ...props
}: PixelCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animRef = useRef<number | null>(null);

  const cfg = VARIANTS[variant] || VARIANTS.default;
  const finalGap = gap ?? cfg.gap;
  const colorList = (colors ?? cfg.colors).split(',');

  const drawPixels = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    if (!isHovered) return;

    const cols = Math.floor(width / finalGap);
    const rows = Math.floor(height / finalGap);

    const time = performance.now() * 0.003;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const noise = Math.sin(c * 0.4 + time) * Math.cos(r * 0.4 + time);
        if (noise > 0.45 && Math.random() > 0.5) {
          const col = colorList[Math.floor(Math.random() * colorList.length)];
          ctx.fillStyle = col;
          ctx.globalAlpha = Math.random() * 0.4 + 0.15;
          ctx.fillRect(c * finalGap, r * finalGap, finalGap - 1.5, finalGap - 1.5);
        }
      }
    }

    animRef.current = requestAnimationFrame(drawPixels);
  }, [finalGap, isHovered, colorList]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered) {
      animRef.current = requestAnimationFrame(drawPixels);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHovered, drawPixels]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 opacity-80 transition-opacity duration-300"
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
