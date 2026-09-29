"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

interface DecryptedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover' | 'both';
}

export default function DecryptedText({
  text,
  speed = 45,
  maxIterations = 8,
  sequential = true,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]{}',
  className = '',
  encryptedClassName = 'text-cyan-400 opacity-80',
  parentClassName = '',
  animateOn = 'both',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState<boolean>(false);

  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(() => characters.split(''), [characters]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    },
    [availableChars]
  );

  const triggerAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    let currentIteration = 0;
    const len = text.length;
    const revealed = new Set<number>();
    setRevealedIndices(new Set());

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      currentIteration++;

      if (sequential) {
        // Sequentially reveal characters
        const revealCount = Math.floor((currentIteration / (maxIterations * len)) * len * 2);
        for (let i = 0; i < Math.min(revealCount, len); i++) {
          const index = revealDirection === 'start' ? i : len - 1 - i;
          revealed.add(index);
        }
      } else {
        // Randomly reveal characters
        if (currentIteration % 2 === 0) {
          const unrevealed = Array.from({ length: len }, (_, i) => i).filter(i => !revealed.has(i));
          if (unrevealed.length > 0) {
            const randomIdx = unrevealed[Math.floor(Math.random() * unrevealed.length)];
            revealed.add(randomIdx);
          }
        }
      }

      setRevealedIndices(new Set(revealed));
      setDisplayText(shuffleText(text, revealed));

      if (revealed.size >= len || currentIteration >= maxIterations * len) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setRevealedIndices(new Set(Array.from({ length: len }, (_, i) => i)));
        setIsAnimating(false);
      }
    }, speed);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText]);

  useEffect(() => {
    setDisplayText(text);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  useEffect(() => {
    if ((animateOn === 'view' || animateOn === 'both') && !hasAnimatedOnce && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggerAnimation();
            setHasAnimatedOnce(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, hasAnimatedOnce, triggerAnimation]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' || animateOn === 'both') {
      triggerAnimation();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block ${parentClassName}`}
      {...props}
    >
      <span className={className}>
        {displayText.split('').map((char, index) => {
          const isRevealed = revealedIndices.has(index) || !isAnimating;
          return (
            <span
              key={index}
              className={!isRevealed && isAnimating ? encryptedClassName : undefined}
            >
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
