import React from 'react';
import CatalytiXMark from './CatalytiXMark';

interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
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
  const sizeMap = {
    sm: { font: '1.4rem', icon: 40, gap: '6px' },
    md: { font: '2rem', icon: 58, gap: '8px' },
    lg: { font: '3.2rem', icon: 96, gap: '10px' },
    hero: { font: 'clamp(3.5rem, 8vw, 7.5rem)', icon: 'clamp(116px, 18vw, 240px)', gap: '14px' },
  };

  const currentSize = sizeMap[size];

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-asimovian), sans-serif",
    fontSize: currentSize.font,
    lineHeight: 1,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
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
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
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
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
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
