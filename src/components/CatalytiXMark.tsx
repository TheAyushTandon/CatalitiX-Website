import React from 'react';

interface CatalytiXMarkProps {
  className?: string;
  size?: number | string;
  fill?: string;
  gradientId?: string;
  style?: React.CSSProperties;
}

export default function CatalytiXMark({
  className = '',
  size = 100,
  fill = 'currentColor',
  gradientId,
  style = {},
}: CatalytiXMarkProps) {
  const actualFill = gradientId ? `url(#${gradientId})` : fill;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="8 8 84 84"
      width={size}
      height={size}
      className={className}
      style={{ ...style, shapeRendering: 'geometricPrecision' }}
      shapeRendering="geometricPrecision"
    >
      {gradientId && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2E93" />
            <stop offset="35%" stopColor="#FF8A00" />
            <stop offset="70%" stopColor="#7cff67" />
            <stop offset="100%" stopColor="#00F0FF" />
          </linearGradient>
          <linearGradient id={`${gradientId}-alt`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#7928CA" />
            <stop offset="100%" stopColor="#FF2E93" />
          </linearGradient>
        </defs>
      )}

      {/* Full-size diagonal line with sword-like triangular tips */}
      <path
        d="M 14 86 L 17 77 L 77 17 L 86 14 L 83 23 L 23 83 Z"
        fill={actualFill}
        shapeRendering="geometricPrecision"
      />

      {/* Half-size diagonal line (centered and vertically flipped) with sword-like triangular tips */}
      <path
        d="M 29 29 L 38 32 L 68 62 L 71 71 L 62 68 L 32 38 Z"
        fill={actualFill}
        shapeRendering="geometricPrecision"
      />
    </svg>
  );
}
