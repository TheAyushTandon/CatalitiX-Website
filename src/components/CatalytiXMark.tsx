import React from 'react';

export interface GradientStop {
  offset: string;
  stopColor: string;
  stopOpacity?: number | string;
}

interface CatalytiXMarkProps {
  className?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  gradientId?: string;
  gradientStops?: GradientStop[];
  animated?: boolean;
  rotate?: number;
  flipVertical?: boolean;
  scale?: number;
  style?: React.CSSProperties;
}

export default function CatalytiXMark({
  className = '',
  size = 100,
  width,
  height,
  fill = 'currentColor',
  gradientId,
  gradientStops,
  animated = false,
  rotate = 45,
  flipVertical = true,
  scale = 1,
  style = {},
}: CatalytiXMarkProps) {
  const actualFill = gradientId ? `url(#${gradientId})` : fill;

  const isPercent = typeof size === 'string' && size.includes('%');
  const computedWidth = width ?? size;
  const computedHeight = height ?? (isPercent ? size : size);

  // When rotated 45°, the bounding box is exactly -234.4 to +234.4. Tight viewBox removes empty padding so X is bigger and close to letters
  const viewBox = rotate === 45 ? "-238 -238 476 476" : "-350 -350 700 700";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={computedWidth}
      height={computedHeight}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ ...style, shapeRendering: 'geometricPrecision' }}
      shapeRendering="geometricPrecision"
    >
      {gradientId && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {animated && (
              <animateTransform
                attributeName="gradientTransform"
                type="rotate"
                from="0 0.5 0.5"
                to="360 0.5 0.5"
                dur="8s"
                repeatCount="indefinite"
              />
            )}
            {gradientStops && gradientStops.length > 0 ? (
              gradientStops.map((stop, idx) => (
                <stop
                  key={idx}
                  offset={stop.offset}
                  stopColor={stop.stopColor}
                  stopOpacity={stop.stopOpacity ?? 1}
                />
              ))
            ) : (
              <>
                <stop offset="0%" stopColor="#FF2E93" />
                <stop offset="35%" stopColor="#FF8A00" />
                <stop offset="70%" stopColor="#7cff67" />
                <stop offset="100%" stopColor="#00F0FF" />
              </>
            )}
          </linearGradient>
          <linearGradient id={`${gradientId}-alt`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#7928CA" />
            <stop offset="100%" stopColor="#FF2E93" />
          </linearGradient>
        </defs>
      )}

      {/* The 16-point cross polygon rotated 45° by default to form the iconic sword-point 'X' */}
      <g
        transform={[
          flipVertical ? 'scale(1, -1)' : '',
          rotate !== 0 ? `rotate(${rotate})` : '',
          scale !== 1 ? `scale(${scale})` : '',
        ]
          .filter(Boolean)
          .join(' ') || undefined}
      >
        <path
          d="M 0 -192.5 L 27.5 -140.5 L 27.5 -27.5 L 279.5 -27.5 L 331.5 0 L 279.5 27.5 L 27.5 27.5 L 27.5 140.5 L 0 192.5 L -27.5 140.5 L -27.5 27.5 L -279.5 27.5 L -331.5 0 L -279.5 -27.5 L -27.5 -27.5 L -27.5 -140.5 Z"
          fill={actualFill}
          shapeRendering="geometricPrecision"
        />
      </g>
    </svg>
  );
}
