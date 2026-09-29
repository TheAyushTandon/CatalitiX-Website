"use client";

import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { liquidGlass, LiquidGlassOptions } from '@/lib/liquid-glass';

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  options?: LiquidGlassOptions;
  as?: React.ElementType;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  displacement?: boolean;
}

const LiquidGlass = forwardRef<HTMLElement, LiquidGlassProps>(function LiquidGlass(
  {
    children,
    className = '',
    options,
    as: Component = 'div',
    style,
    displacement,
    ...props
  },
  forwardedRef
) {
  const localRef = useRef<HTMLElement>(null);

  useImperativeHandle(forwardedRef, () => localRef.current as HTMLElement);

  useEffect(() => {
    if (!localRef.current) return;
    const mergedOptions: LiquidGlassOptions = {
      ...options,
      ...(displacement !== undefined ? { displacement } : {}),
    };
    const instance = liquidGlass(localRef.current, mergedOptions);
    return () => instance.destroy();
  }, [options, displacement]);

  return (
    <Component ref={localRef} className={className} style={style} {...props}>
      {children}
    </Component>
  );
});

LiquidGlass.displayName = 'LiquidGlass';

export default LiquidGlass;
