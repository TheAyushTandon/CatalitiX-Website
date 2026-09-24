import React from 'react';
import CatalytiXMark from './CatalytiXMark';

interface WordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  colorScheme?: 'playful' | 'subtle' | 'white';
}

export default function Wordmark({
  className = '',
  size = 'md',
  showSubtitle = false,
  colorScheme = 'playful',
}: WordmarkProps) {
  const sizeMap = {
    sm: { font: '1.4rem', icon: 34, gap: '4px' },
    md: { font: '2rem', icon: 50, gap: '6px' },
    lg: { font: '3.2rem', icon: 84, gap: '8px' },
    hero: { font: 'clamp(3.5rem, 8vw, 7.5rem)', icon: 'clamp(96px, 16vw, 210px)', gap: '10px' },
  };

  const currentSize = sizeMap[size];

  const textStyle: React.CSSProperties = {
    fontFamily: "var(--font-asimovian), sans-serif",
    fontSize: currentSize.font,
    lineHeight: 1,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  };

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
              : 'text-white'
          }
        >
          CATALYTI
        </span>
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <CatalytiXMark
            size={currentSize.icon}
            fill="#FFFFFF"
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
