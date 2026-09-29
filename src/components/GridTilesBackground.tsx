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
    background: 'linear-gradient(135deg, rgba(255, 96, 151, 0.85) 0%, rgba(255, 46, 147, 0.92) 100%)',
    glow: 'rgba(255, 46, 147, 0.3)',
    border: 'rgba(255, 138, 185, 0.6)',
  },
  {
    name: 'cyan',
    background: 'linear-gradient(135deg, rgba(103, 245, 255, 0.85) 0%, rgba(0, 200, 240, 0.92) 100%)',
    glow: 'rgba(0, 240, 255, 0.3)',
    border: 'rgba(140, 248, 255, 0.65)',
  },
  {
    name: 'orange',
    background: 'linear-gradient(135deg, rgba(255, 163, 102, 0.85) 0%, rgba(255, 107, 0, 0.92) 100%)',
    glow: 'rgba(255, 107, 0, 0.3)',
    border: 'rgba(255, 180, 130, 0.6)',
  },
  {
    name: 'lime',
    background: 'linear-gradient(135deg, rgba(184, 255, 171, 0.85) 0%, rgba(74, 222, 128, 0.92) 100%)',
    glow: 'rgba(74, 222, 128, 0.3)',
    border: 'rgba(180, 250, 170, 0.65)',
  },
  {
    name: 'purple',
    background: 'linear-gradient(135deg, rgba(206, 150, 255, 0.85) 0%, rgba(121, 40, 202, 0.92) 100%)',
    glow: 'rgba(121, 40, 202, 0.3)',
    border: 'rgba(215, 175, 255, 0.6)',
  },
  {
    name: 'amber',
    background: 'linear-gradient(135deg, rgba(255, 232, 115, 0.85) 0%, rgba(245, 158, 11, 0.92) 100%)',
    glow: 'rgba(245, 158, 11, 0.3)',
    border: 'rgba(255, 230, 120, 0.65)',
  },
  {
    name: 'blue',
    background: 'linear-gradient(135deg, rgba(125, 214, 253, 0.85) 0%, rgba(2, 132, 199, 0.92) 100%)',
    glow: 'rgba(2, 132, 199, 0.3)',
    border: 'rgba(155, 220, 255, 0.65)',
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

    // Normalized concurrent tiles to prevent compositor load and CPU spikes
    const getTargetCount = () => {
      const w = window.innerWidth;
      if (w > 1200) return 5;
      if (w > 768) return 4;
      return 2;
    };

    // Spawn a single scattered 2D tile (autonomous only, no cursor triggering)
    const spawnTile = () => {
      if (!mounted || (typeof document !== 'undefined' && document.hidden)) return;

      const { cols, rows } = getGridBounds();
      if (cols <= 0 || rows <= 0) return;

      let targetCol: number | undefined;
      let targetRow: number | undefined;

      // Find a vacant cell that is well scattered
      let found = false;
      let attempts = 0;

      while (!found && attempts < 8) {
        attempts++;
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        const key = `${col},${row}`;

        if (activeKeysRef.current.has(key)) continue;

        // Check if immediate neighbors are already active (to keep tiles scattered)
        let hasNearNeighbor = false;
        for (let dc = -2; dc <= 2; dc++) {
          for (let dr = -2; dr <= 2; dr++) {
            if (dc === 0 && dr === 0) continue;
            if (activeKeysRef.current.has(`${col + dc},${row + dr}`)) {
              hasNearNeighbor = true;
              break;
            }
          }
          if (hasNearNeighbor) break;
        }

        if (!hasNearNeighbor || attempts > 5) {
          targetCol = col;
          targetRow = row;
          found = true;
        }
      }

      if (targetCol === undefined || targetRow === undefined) return;

      const key = `${targetCol},${targetRow}`;
      if (activeKeysRef.current.has(key)) return;

      activeKeysRef.current.add(key);

      const id = `${key}-${Date.now()}`;
      const paletteIndex = Math.floor(Math.random() * THEME_PALETTES.length);
      const durationMs = Math.floor(Math.random() * 1000) + 3200; // 3.2s to 4.2s gentle pacing
      const hasMark = Math.random() < 0.25;

      const newTile: TileData = {
        id,
        col: targetCol,
        row: targetRow,
        paletteIndex,
        durationMs,
        hasMark,
      };

      setTiles((prev) => [...prev, newTile]);
    };

    // Staggered gentle initial spawn
    const initialTarget = Math.min(3, getTargetCount());
    for (let i = 0; i < initialTarget; i++) {
      setTimeout(() => {
        if (mounted) spawnTile();
      }, (i + 1) * 400);
    }

    // Normalized tick loop: spawns every 1.1s to 1.8s
    const loop = () => {
      if (!mounted) return;

      const targetCount = getTargetCount();
      if (activeKeysRef.current.size < targetCount) {
        spawnTile();
      }

      const nextDelay = Math.floor(Math.random() * 700) + 1100; // 1.1s - 1.8s
      timerId = setTimeout(loop, nextDelay);
    };

    timerId = setTimeout(loop, 800);

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
      {/* 1. Underlying Technical Grid Lines (pure 48px square pattern) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)
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
                <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                  <CatalytiXMark
                    size={14}
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
