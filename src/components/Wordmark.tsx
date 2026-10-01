import React from 'react';
import CatalytiXMark from './CatalytiXMark';

interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'footer' | 'full';
  showSubtitle?: boolean;
  colorScheme?: 'playful' | 'subtle' | 'white' | 'dark';
  markFill?: string;
}

export default function Wordmark({
  className = '',
  size = 'md',
  showSubtitle = false,
  colorScheme = 'playful',
  markFill,
}: WordmarkProps) {
  const isFull = size === 'footer' || size === 'full';

  const sizeMap = {
    sm: { font: '1.4rem', icon: 40, gap: '6px' },
    md: { font: '2rem', icon: 58, gap: '8px' },
    lg: { font: '3.2rem', icon: 96, gap: '10px' },
    hero: { font: 'clamp(3.5rem, 8vw, 7.5rem)', icon: 'clamp(116px, 18vw, 240px)', gap: '14px' },
    footer: {
      font: 'clamp(2.4rem, 10.5vmin, 9.5rem)',
      icon: 'clamp(42px, 10.5vmin, 105px)',
      gap: 'clamp(2px, 0.5vmin, 8px)',
    },
    full: {
      font: 'clamp(2.4rem, 10.5vmin, 9.5rem)',
      icon: 'clamp(42px, 10.5vmin, 105px)',
      gap: 'clamp(2px, 0.5vmin, 8px)',
    },
  };

  const currentSize = sizeMap[size];

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-wordmark), 'Montserrat', 'Plus Jakarta Sans', sans-serif",
    fontSize: currentSize.font,
    lineHeight: 1.15,
    letterSpacing: isFull ? '0.025em' : '0.03em',
    fontWeight: 900,
    textTransform: 'uppercase',
    display: 'inline-block',
    paddingBottom: '0.08em',
    overflow: 'visible',
  };

  const resolvedMarkFill = markFill ?? (
    colorScheme === 'dark'
      ? '#090d16'
      : colorScheme === 'white'
      ? '#FFFFFF'
      : colorScheme === 'playful'
      ? '#090d16'
      : '#FFFFFF'
  );

  return (
    <div className={`flex flex-col items-center ${isFull ? 'w-full' : 'inline-flex'} ${className}`}>
      <div
        className={`${isFull ? 'w-full flex items-center justify-center' : 'inline-flex items-center'} select-none whitespace-nowrap`}
        style={{
          gap: currentSize.gap,
          userSelect: 'none',
        }}
      >
        <span
          style={textStyle}
          className={
            colorScheme === 'playful'
              ? 'gradient-text-playful'
              : colorScheme === 'subtle'
              ? 'text-white/40'
              : colorScheme === 'dark'
              ? 'text-slate-900'
              : 'text-white'
          }
        >
          CATALYTI
        </span>
        <div className="shrink-0 inline-flex items-center">
          <CatalytiXMark
            size={currentSize.icon}
            fill={resolvedMarkFill}
          />
        </div>
      </div>
      {showSubtitle && (
        <span
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginTop: '8px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Kinetic Autonomous Intelligence
        </span>
      )}
    </div>
  );
}
