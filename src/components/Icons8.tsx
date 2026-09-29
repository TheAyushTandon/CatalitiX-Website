"use client";

import React from 'react';

export const ICONS8_MAP = {
  rocket: '86792',
  chevronRight: '85770',
  chevronDown: '87345',
  arrowRight: '86087',
  check: '82766',
  layers: '113299',
  zap: '86554',
  compass: '88004',
  target: '85453',
  externalLink: '82787',
  terminal: '120387',
  activity: '86553',
  shield: '85778',
  building: '86967',
  cpu: '103594',
  briefcase: '82466',
  trendingUp: '85933',
  sparkles: '7FRSm1RlZ1SV',
} as const;

export type Icons8Name = keyof typeof ICONS8_MAP;

interface Icons8Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: Icons8Name;
  size?: number;
  color?: string; // Hex color code e.g. "0284C7" or "#0284C7"
  className?: string;
}

export default function Icons8({
  name,
  size = 20,
  color,
  className = '',
  style,
  alt,
  ...props
}: Icons8Props) {
  const iconId = ICONS8_MAP[name];
  const cleanColor = color ? color.replace('#', '') : undefined;
  
  // Use 2x image density for ultra-sharp rendering on Retina/HiDPI screens
  const fetchSize = Math.max(32, size * 2);
  const colorQuery = cleanColor ? `&color=${cleanColor}` : '';
  const src = `https://img.icons8.com/?id=${iconId}&format=png&size=${fetchSize}${colorQuery}`;

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={alt || name}
      loading="lazy"
      decoding="async"
      className={`inline-block shrink-0 select-none align-middle pointer-events-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-block',
        ...style,
      }}
      {...props}
    />
  );
}
