"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CatalytiXMark from './CatalytiXMark';

// Brand color themes reflecting CatalytiX's vibrant 2D visual identity
export interface TilePalette {
  name: string;
  background: string;
  glow: string;
  border: string;
}

export const THEME_PALETTES: TilePalette[] = [
  {
    name: 'pink',
    background: 'linear-gradient(135deg, rgba(255, 60, 140, 0.88) 0%, rgba(255, 30, 130, 0.95) 100%)',
    glow: 'rgba(255, 46, 147, 0.45)',
    border: 'rgba(255, 120, 180, 0.75)',
  },
  {
    name: 'cyan',
    background: 'linear-gradient(135deg, rgba(56, 225, 255, 0.88) 0%, rgba(0, 190, 240, 0.95) 100%)',
    glow: 'rgba(0, 240, 255, 0.45)',
    border: 'rgba(120, 245, 255, 0.8)',
  },
  {
    name: 'orange',
    background: 'linear-gradient(135deg, rgba(255, 145, 60, 0.88) 0%, rgba(255, 95, 0, 0.95) 100%)',
    glow: 'rgba(255, 107, 0, 0.45)',
    border: 'rgba(255, 175, 110, 0.75)',
  },
  {
    name: 'lime',
    background: 'linear-gradient(135deg, rgba(140, 245, 110, 0.88) 0%, rgba(52, 211, 115, 0.95) 100%)',
    glow: 'rgba(74, 222, 128, 0.45)',
    border: 'rgba(165, 250, 150, 0.8)',
  },
  {
    name: 'purple',
    background: 'linear-gradient(135deg, rgba(195, 125, 255, 0.88) 0%, rgba(121, 40, 202, 0.95) 100%)',
    glow: 'rgba(121, 40, 202, 0.45)',
    border: 'rgba(210, 160, 255, 0.75)',
  },
  {
    name: 'amber',
    background: 'linear-gradient(135deg, rgba(255, 215, 65, 0.88) 0%, rgba(245, 158, 11, 0.95) 100%)',
    glow: 'rgba(245, 158, 11, 0.45)',
    border: 'rgba(255, 225, 100, 0.8)',
  },
  {
    name: 'blue',
    background: 'linear-gradient(135deg, rgba(96, 200, 255, 0.88) 0%, rgba(2, 132, 199, 0.95) 100%)',
    glow: 'rgba(2, 132, 199, 0.45)',
    border: 'rgba(145, 215, 255, 0.8)',
  },
  {
    name: 'rose',
    background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.88) 0%, rgba(225, 29, 72, 0.95) 100%)',
    glow: 'rgba(225, 29, 72, 0.45)',
    border: 'rgba(253, 164, 175, 0.8)',
  },
];

interface TileData {
  id: string;
  col: number;
  row: number;
  paletteIndex: number;
  durationMs: number;
  hasMark: boolean;
}

const CELL_SIZE = 48; // Grid cell size in px
const TILE_SIZE = 44; // 2D tile size inside cell
const TILE_OFFSET = 2; // Offset from grid line

export default function GridTilesBackground() {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const activeKeysRef = useRef<Set<string>>(new Set());

  // Helper to remove finished tile
  const handleTileEnd = useCallback((id: string, key: string) => {
    activeKeysRef.current.delete(key);
    setTiles((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mounted = true;
    let timerId: NodeJS.Timeout | null = null;

    const getGridBounds = () => {
      const cols = Math.ceil(window.innerWidth / CELL_SIZE);
      const rows = Math.ceil(window.innerHeight / CELL_SIZE);
      return { cols, rows };
    };

    // Rich concurrent tile population across the screen
    const getTargetCount = () => {
      const w = window.innerWidth;
      if (w > 1440) return 26; // Widescreen / 4K
      if (w > 1024) return 20; // Desktop / Laptops
      if (w > 768) return 14;  // Tablets
      return 8;                // Mobile
    };

    // Spawn a 2D tile at a vacant cell, with optional companion twin
    const spawnTile = (forceCol?: number, forceRow?: number) => {
      if (!mounted || (typeof document !== 'undefined' && document.hidden)) return;

      const { cols, rows } = getGridBounds();
      if (cols <= 0 || rows <= 0) return;

      let targetCol = forceCol;
      let targetRow = forceRow;

      if (targetCol === undefined || targetRow === undefined) {
        let attempts = 0;
        let found = false;

        while (!found && attempts < 16) {
          attempts++;
          const col = Math.floor(Math.random() * cols);
          const row = Math.floor(Math.random() * rows);
          const key = `${col},${row}`;

          if (activeKeysRef.current.has(key)) continue;

          targetCol = col;
          targetRow = row;
          found = true;
        }
      }

      if (targetCol === undefined || targetRow === undefined) return;

      const key = `${targetCol},${targetRow}`;
      if (activeKeysRef.current.has(key)) return;

      activeKeysRef.current.add(key);

      const id = `${key}-${Date.now()}-${Math.random()}`;
      const paletteIndex = Math.floor(Math.random() * THEME_PALETTES.length);
      const durationMs = Math.floor(Math.random() * 1400) + 3400; // 3.4s to 4.8s smooth breathing pace
      const hasMark = Math.random() < 0.28;

      const newTile: TileData = {
        id,
        col: targetCol,
        row: targetRow,
        paletteIndex,
        durationMs,
        hasMark,
      };

      setTiles((prev) => [...prev, newTile]);

      // 25% chance to spawn an adjacent twin tile for an elegant modern dual-cluster accent
      if (!forceCol && Math.random() < 0.25) {
        const offsetDirection = Math.random() < 0.5 ? [1, 0] : [0, 1];
        const twinCol = targetCol + offsetDirection[0];
        const twinRow = targetRow + offsetDirection[1];
        if (twinCol < cols && twinRow < rows && !activeKeysRef.current.has(`${twinCol},${twinRow}`)) {
          setTimeout(() => {
            if (mounted) spawnTile(twinCol, twinRow);
          }, 120);
        }
      }
    };

    // Immediate initial population so the hero is vibrant right from the start
    const initialTarget = Math.round(getTargetCount() * 0.75);
    for (let i = 0; i < initialTarget; i++) {
      setTimeout(() => {
        if (mounted) spawnTile();
      }, i * 50);
    }

    // Dynamic tick loop: checks and replenishes tiles quickly
    const loop = () => {
      if (!mounted) return;

      const targetCount = getTargetCount();
      const currentCount = activeKeysRef.current.size;

      if (currentCount < targetCount) {
        const toSpawn = Math.min(3, targetCount - currentCount);
        for (let s = 0; s < toSpawn; s++) {
          spawnTile();
        }
      }

      const nextDelay = Math.floor(Math.random() * 250) + 280; // 280ms - 530ms quick refresh
      timerId = setTimeout(loop, nextDelay);
    };

    timerId = setTimeout(loop, 400);

    return () => {
      mounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [handleTileEnd]);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Underlying Technical Grid Lines (pure 48px square pattern with crisp visibility) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)
          `,
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px, ${CELL_SIZE}px ${CELL_SIZE}px`,
        }}
      />

      {/* 2. 2D Scattered Soft Tiles Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {tiles.map((tile) => {
          const palette = THEME_PALETTES[tile.paletteIndex];
          const key = `${tile.col},${tile.row}`;

          return (
            <div
              key={tile.id}
              className="soft-2d-tile"
              onAnimationEnd={() => handleTileEnd(tile.id, key)}
              style={{
                left: `${tile.col * CELL_SIZE + TILE_OFFSET}px`,
                top: `${tile.row * CELL_SIZE + TILE_OFFSET}px`,
                width: `${TILE_SIZE}px`,
                height: `${TILE_SIZE}px`,
                background: palette.background,
                borderColor: palette.border,
                ['--tile-glow' as string]: palette.glow,
                animationDuration: `${tile.durationMs}ms`,
              }}
            >
              {/* Optional CatalytiX Brand Glyph subtle accent */}
              {tile.hasMark && (
                <div className="absolute inset-0 flex items-center justify-center opacity-45 pointer-events-none">
                  <CatalytiXMark
                    size={15}
                    fill="#FFFFFF"
                    rotate={45}
                    flipVertical={true}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
