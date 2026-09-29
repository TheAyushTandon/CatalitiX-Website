"use client";

import React from 'react';

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
  thickness?: number;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}

export default function StarBorder({
  as: Component = 'div',
  className = '',
  color = '#00F0FF',
  speed = '4s',
  thickness = 1,
  backgroundColor = 'transparent',
  borderColor = 'rgba(255, 255, 255, 0.15)',
  children,
  style,
  ...props
}: StarBorderProps) {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-full ${className}`}
      style={{
        padding: `${thickness}px`,
        ...style,
      }}
      {...props}
    >
      {/* Bottom Beam */}
      <div
        className="absolute w-[300%] h-[60%] opacity-85 bottom-[-15px] right-[-200%] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 60%)`,
          animation: `starMovementBottom ${speed} linear infinite alternate`,
        }}
      />
      {/* Top Beam */}
      <div
        className="absolute w-[300%] h-[60%] opacity-85 top-[-15px] left-[-200%] rounded-full pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 60%)`,
          animation: `starMovementTop ${speed} linear infinite alternate`,
        }}
      />
      {/* Content Container */}
      <div
        className="relative z-10 w-full h-full rounded-full transition-all"
        style={{ background: backgroundColor, borderColor }}
      >
        {children}
      </div>
    </Component>
  );
}
