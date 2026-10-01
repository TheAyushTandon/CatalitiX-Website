"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Icons8 from "./Icons8";

export interface LifecyclePhase {
  step: string;
  stageTag: string;
  shortTitle: string;
  fullTitle: string;
  focus: string;
  milestone: string;
  gate: string;
  color: string;
  lightBg: string;
  gradientTop: string;
  sideColor: string;
  frontColor: string;
  positionClass: string;
  puffBorderColor: string;
  trailClass: string;
}

export const LIFECYCLE_PHASES: LifecyclePhase[] = [
  {
    step: "01",
    stageTag: "TRL 1 – 2",
    shortTitle: "Intake & Diagnostics",
    fullTitle: "Intake & Diagnostics",
    focus: "Feasibility screening & baseline scorecard audit.",
    milestone: "CIE Selection Board feasibility screening & baseline readiness scorecard.",
    gate: "Admission Gate",
    color: "#0284C7", // Cyan / Ocean Blue
    lightBg: "rgba(2, 132, 199, 0.08)",
    gradientTop: "url(#grad-phase-1)",
    sideColor: "#0369A1",
    frontColor: "#0284C7",
    positionClass: "top-2 sm:top-5 right-1 sm:right-5 md:right-8",
    puffBorderColor: "rgba(2, 132, 199, 0.35)",
    trailClass: "-bottom-2 -left-2 flex-row-reverse",
  },
  {
    step: "02",
    stageTag: "TRL 3 – 4",
    shortTitle: "Build & Prototyping",
    fullTitle: "Build & Prototyping",
    focus: "12+ engineering labs & provisional patent filing.",
    milestone: "Access to 12+ specialized engineering labs & provisional patent filing.",
    gate: "Proof of Concept Gate",
    color: "#16A34A", // Emerald Green
    lightBg: "rgba(22, 163, 74, 0.08)",
    gradientTop: "url(#grad-phase-2)",
    sideColor: "#15803D",
    frontColor: "#16A34A",
    positionClass: "bottom-2 sm:bottom-5 right-1 sm:right-5 md:right-8",
    puffBorderColor: "rgba(22, 163, 74, 0.35)",
    trailClass: "-top-2 -left-2 flex-row-reverse",
  },
  {
    step: "03",
    stageTag: "TRL 5 – 6",
    shortTitle: "Market Pilot & Trials",
    fullTitle: "Market Pilot & Trials",
    focus: "25+ validated customer trials & SISFS grant tranches.",
    milestone: "25+ validated customer trials and fast-track SISFS grant unlocking.",
    gate: "Commercial Pilot Gate",
    color: "#DB2777", // Hot Pink
    lightBg: "rgba(219, 39, 119, 0.08)",
    gradientTop: "url(#grad-phase-3)",
    sideColor: "#BE185D",
    frontColor: "#DB2777",
    positionClass: "bottom-2 sm:bottom-5 left-1 sm:left-5 md:left-8",
    puffBorderColor: "rgba(219, 39, 119, 0.35)",
    trailClass: "-top-2 -right-2",
  },
  {
    step: "04",
    stageTag: "TRL 7 – 9",
    shortTitle: "Growth & Syndication",
    fullTitle: "Growth & Syndication",
    focus: "Institutional data room & Hatchery Demo Day syndication.",
    milestone: "Institutional data room preparation & live Hatchery Demo Day pitching.",
    gate: "Seed Demo Day ★",
    color: "#D97706", // Amber Gold
    lightBg: "rgba(217, 119, 6, 0.08)",
    gradientTop: "url(#grad-phase-4)",
    sideColor: "#B45309",
    frontColor: "#D97706",
    positionClass: "top-2 sm:top-5 left-1 sm:left-5 md:left-8",
    puffBorderColor: "rgba(217, 119, 6, 0.35)",
    trailClass: "-bottom-2 -right-2",
  },
];

interface Lifecycle3DPieChartProps {
  onAdvance?: () => void;
}

export default function Lifecycle3DPieChart({ onAdvance }: Lifecycle3DPieChartProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // 3D Isometric Ellipse Geometry
  const cx = 250;
  const cy = 160;
  const rx = 180;
  const ry = 95;
  const depth = 32;
  const innerRx = 68;
  const innerRy = 36;

  // Shift vectors for active slice explosion:
  const explosionOffsets = [
    { x: 14, y: -12 }, // Phase 1: Top-Right
    { x: 14, y: 14 },  // Phase 2: Bottom-Right
    { x: -14, y: 14 }, // Phase 3: Bottom-Left
    { x: -14, y: -12 },// Phase 4: Top-Left
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between select-none py-1 sm:py-2">
      {/* SECTION HEADER */}
      <div className="text-center pt-1">
        <div className="badge-pill-light mb-1 text-[#0284C7] font-bold inline-flex items-center gap-1.5 border border-slate-200/90 shadow-2xs text-[11px] sm:text-xs py-1 px-3.5">
          <Icons8 name="compass" size={13} color="0284C7" />
          <span>STRUCTURED TIMELINE // ADMISSIONS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight leading-tight">
          The 4-Stage <span className="gradient-text-cool">Incubation Lifecycle</span>
        </h2>
        <p className="text-slate-600 max-w-lg mx-auto text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">
          A 360° transition model guiding ventures from intake to institutional syndication.
        </p>
      </div>

      {/* CENTERED PRESENTATION STAGE: 3D PIE IN CENTER, 4 CLOUDS RADIATING OUTWARD */}
      <div className="relative w-full max-w-[960px] h-[520px] sm:h-[560px] md:h-[600px] mx-auto flex items-center justify-center my-auto">
        
        {/* SVG CONNECTOR TRAILS FROM QUADRANTS TO CLOUDS */}
        <svg
          viewBox="0 0 960 600"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          {/* Quadrant 1 (Top-Right): from (550, 275) to (730, 160) */}
          <path
            d="M 550 275 C 615 265, 675 215, 730 160"
            fill="none"
            stroke="#0284C7"
            strokeWidth={activeIdx === 0 ? "2.5" : "1.75"}
            strokeDasharray="4 4"
            opacity={activeIdx === 0 ? 0.95 : 0.4}
            className="transition-all duration-300"
          />
          <circle cx="550" cy="275" r={activeIdx === 0 ? "5" : "3.5"} fill="#0284C7" className="transition-all" />
          <circle cx="630" cy="235" r="3" fill="#38BDF8" opacity={activeIdx === 0 ? 0.9 : 0.45} />
          <circle cx="680" cy="195" r="4" fill="#38BDF8" opacity={activeIdx === 0 ? 1 : 0.55} />

          {/* Quadrant 2 (Bottom-Right): from (550, 355) to (730, 465) */}
          <path
            d="M 550 355 C 615 365, 675 415, 730 465"
            fill="none"
            stroke="#16A34A"
            strokeWidth={activeIdx === 1 ? "2.5" : "1.75"}
            strokeDasharray="4 4"
            opacity={activeIdx === 1 ? 0.95 : 0.4}
            className="transition-all duration-300"
          />
          <circle cx="550" cy="355" r={activeIdx === 1 ? "5" : "3.5"} fill="#16A34A" className="transition-all" />
          <circle cx="630" cy="390" r="3" fill="#4ADE80" opacity={activeIdx === 1 ? 0.9 : 0.45} />
          <circle cx="680" cy="430" r="4" fill="#4ADE80" opacity={activeIdx === 1 ? 1 : 0.55} />

          {/* Quadrant 3 (Bottom-Left): from (410, 355) to (230, 465) */}
          <path
            d="M 410 355 C 345 365, 285 415, 230 465"
            fill="none"
            stroke="#DB2777"
            strokeWidth={activeIdx === 2 ? "2.5" : "1.75"}
            strokeDasharray="4 4"
            opacity={activeIdx === 2 ? 0.95 : 0.4}
            className="transition-all duration-300"
          />
          <circle cx="410" cy="355" r={activeIdx === 2 ? "5" : "3.5"} fill="#DB2777" className="transition-all" />
          <circle cx="330" cy="390" r="3" fill="#F472B6" opacity={activeIdx === 2 ? 0.9 : 0.45} />
          <circle cx="280" cy="430" r="4" fill="#F472B6" opacity={activeIdx === 2 ? 1 : 0.55} />

          {/* Quadrant 4 (Top-Left): from (410, 275) to (230, 160) */}
          <path
            d="M 410 275 C 345 265, 285 215, 230 160"
            fill="none"
            stroke="#D97706"
            strokeWidth={activeIdx === 3 ? "2.5" : "1.75"}
            strokeDasharray="4 4"
            opacity={activeIdx === 3 ? 0.95 : 0.4}
            className="transition-all duration-300"
          />
          <circle cx="410" cy="275" r={activeIdx === 3 ? "5" : "3.5"} fill="#D97706" className="transition-all" />
          <circle cx="330" cy="235" r="3" fill="#FBBF24" opacity={activeIdx === 3 ? 0.9 : 0.45} />
          <circle cx="280" cy="195" r="4" fill="#FBBF24" opacity={activeIdx === 3 ? 1 : 0.55} />
        </svg>

        {/* 3D PIE CHART - DEAD CENTER */}
        <div className="relative z-10 w-[380px] sm:w-[440px] md:w-[480px] aspect-[500/360] flex items-center justify-center">
          <svg
            viewBox="0 0 500 360"
            className="w-full h-full overflow-visible filter drop-shadow-[0_22px_32px_rgba(15,23,42,0.14)]"
          >
            <defs>
              {/* Vibrant 3D Gradients */}
              <linearGradient id="grad-phase-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id="grad-phase-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
              <linearGradient id="grad-phase-3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#DB2777" />
              </linearGradient>
              <linearGradient id="grad-phase-4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Ambient Floor Shadow */}
              <radialGradient id="pie-floor-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(15, 23, 42, 0.22)" />
                <stop offset="65%" stopColor="rgba(15, 23, 42, 0.08)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
              </radialGradient>
            </defs>

            {/* 1. Realistic 3D Ambient Floor Drop-Shadow */}
            <ellipse
              cx={cx}
              cy={cy + depth + 22}
              rx={rx + 15}
              ry={ry + 10}
              fill="url(#pie-floor-shadow)"
            />

            {/* 2. 3D EXTRUDED SIDE WALLS */}

            {/* Phase 3 Extruded Front/Side Wall (Bottom-Left) */}
            <g
              transform={`translate(${
                activeIdx === 2 ? explosionOffsets[2].x : 0
              }, ${activeIdx === 2 ? explosionOffsets[2].y : 0})`}
              className="transition-transform duration-500 ease-out cursor-pointer"
              onClick={() => setActiveIdx(2)}
            >
              <path
                d={`
                  M ${cx - rx} ${cy}
                  A ${rx} ${ry} 0 0 0 ${cx} ${cy + ry}
                  v ${depth}
                  A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy + depth}
                  Z
                `}
                fill="#9D174D"
                opacity={activeIdx === 2 ? 1 : 0.88}
              />
              <path
                d={`
                  M ${cx} ${cy + innerRy}
                  A ${innerRx} ${innerRy} 0 0 1 ${cx - innerRx} ${cy}
                  v ${depth}
                  A ${innerRx} ${innerRy} 0 0 0 ${cx} ${cy + innerRy + depth}
                  Z
                `}
                fill="#831843"
                opacity={0.9}
              />
              <path
                d={`
                  M ${cx} ${cy + innerRy}
                  L ${cx} ${cy + ry}
                  v ${depth}
                  L ${cx} ${cy + innerRy + depth}
                  Z
                `}
                fill="#701A75"
                opacity={activeIdx === 2 ? 0.95 : 0.75}
              />
            </g>

            {/* Phase 2 Extruded Front/Side Wall (Bottom-Right) */}
            <g
              transform={`translate(${
                activeIdx === 1 ? explosionOffsets[1].x : 0
              }, ${activeIdx === 1 ? explosionOffsets[1].y : 0})`}
              className="transition-transform duration-500 ease-out cursor-pointer"
              onClick={() => setActiveIdx(1)}
            >
              <path
                d={`
                  M ${cx} ${cy + ry}
                  A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy}
                  v ${depth}
                  A ${rx} ${ry} 0 0 1 ${cx} ${cy + ry + depth}
                  Z
                `}
                fill="#15803D"
                opacity={activeIdx === 1 ? 1 : 0.88}
              />
              <path
                d={`
                  M ${cx + innerRx} ${cy}
                  A ${innerRx} ${innerRy} 0 0 1 ${cx} ${cy + innerRy}
                  v ${depth}
                  A ${innerRx} ${innerRy} 0 0 0 ${cx + innerRx} ${cy + depth}
                  Z
                `}
                fill="#14532D"
                opacity={0.9}
              />
              <path
                d={`
                  M ${cx} ${cy + innerRy}
                  L ${cx} ${cy + ry}
                  v ${depth}
                  L ${cx} ${cy + innerRy + depth}
                  Z
                `}
                fill="#166534"
                opacity={activeIdx === 1 ? 0.95 : 0.75}
              />
            </g>

            {/* Phase 1 Extruded Cut Wall (Horizontal cut face facing viewer) */}
            <g
              transform={`translate(${
                activeIdx === 0 ? explosionOffsets[0].x : 0
              }, ${activeIdx === 0 ? explosionOffsets[0].y : 0})`}
              className="transition-transform duration-500 ease-out cursor-pointer"
              onClick={() => setActiveIdx(0)}
            >
              <path
                d={`
                  M ${cx + innerRx} ${cy}
                  L ${cx + rx} ${cy}
                  v ${depth}
                  L ${cx + innerRx} ${cy + depth}
                  Z
                `}
                fill="#026AA2"
                opacity={activeIdx === 0 ? 0.95 : 0.8}
              />
            </g>

            {/* Phase 4 Extruded Cut Wall (Horizontal cut face facing viewer) */}
            <g
              transform={`translate(${
                activeIdx === 3 ? explosionOffsets[3].x : 0
              }, ${activeIdx === 3 ? explosionOffsets[3].y : 0})`}
              className="transition-transform duration-500 ease-out cursor-pointer"
              onClick={() => setActiveIdx(3)}
            >
              <path
                d={`
                  M ${cx - rx} ${cy}
                  L ${cx - innerRx} ${cy}
                  v ${depth}
                  L ${cx - rx} ${cy + depth}
                  Z
                `}
                fill="#B45309"
                opacity={activeIdx === 3 ? 0.95 : 0.8}
              />
            </g>

            {/* 3. 3D PIE TOP SLICES */}

            {/* SLICE 4: Phase 04 (Top-Left) */}
            <g
              transform={`translate(${
                activeIdx === 3 ? explosionOffsets[3].x : 0
              }, ${activeIdx === 3 ? explosionOffsets[3].y : 0})`}
              className="transition-transform duration-500 ease-out cursor-pointer group"
              onClick={() => setActiveIdx(3)}
            >
              <path
                d={`
                  M ${cx - innerRx} ${cy}
                  A ${innerRx} ${innerRy} 0 0 1 ${cx} ${cy - innerRy}
                  L ${cx} ${cy - ry}
                  A ${rx} ${ry} 0 0 0 ${cx - rx} ${cy}
                  Z
                `}
                fill="url(#grad-phase-4)"
                stroke="#FFFFFF"
                strokeWidth={activeIdx === 3 ? "3" : "2"}
                className="filter group-hover:brightness-105 transition-all"
              />
              <text
                x={cx - rx * 0.58}
                y={cy - ry * 0.48 - 4}
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-sm font-black select-none pointer-events-none drop-shadow-xs"
              >
                04
              </text>
              <text
                x={cx - rx * 0.58}
                y={cy - ry * 0.48 + 10}
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-[9px] font-extrabold tracking-wider select-none pointer-events-none opacity-95 drop-shadow-xs"
              >
                GROWTH
              </text>
            </g>

            {/* SLICE 1: Phase 01 (Top-Right) */}
            <g
              transform={`translate(${
                activeIdx === 0 ? explosionOffsets[0].x : 0
              }, ${activeIdx === 0 ? explosionOffsets[0].y : 0})`}
              className="transition-transform duration-500 ease-out cursor-pointer group"
              onClick={() => setActiveIdx(0)}
            >
              <path
                d={`
                  M ${cx} ${cy - innerRy}
                  A ${innerRx} ${innerRy} 0 0 1 ${cx + innerRx} ${cy}
                  L ${cx + rx} ${cy}
                  A ${rx} ${ry} 0 0 0 ${cx} ${cy - ry}
                  Z
                `}
                fill="url(#grad-phase-1)"
                stroke="#FFFFFF"
                strokeWidth={activeIdx === 0 ? "3" : "2"}
                className="filter group-hover:brightness-105 transition-all"
              />
              <text
                x={cx + rx * 0.58}
                y={cy - ry * 0.48 - 4}
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-sm font-black select-none pointer-events-none drop-shadow-xs"
              >
                01
              </text>
              <text
                x={cx + rx * 0.58}
                y={cy - ry * 0.48 + 10}
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-[9px] font-extrabold tracking-wider select-none pointer-events-none opacity-95 drop-shadow-xs"
              >
                INTAKE
              </text>
            </g>

            {/* SLICE 3: Phase 03 (Bottom-Left) */}
            <g
              transform={`translate(${
                activeIdx === 2 ? explosionOffsets[2].x : 0
              }, ${activeIdx === 2 ? explosionOffsets[2].y : 0})`}
              className="transition-transform duration-500 ease-out cursor-pointer group"
              onClick={() => setActiveIdx(2)}
            >
              <path
                d={`
                  M ${cx - innerRx} ${cy}
                  A ${innerRx} ${innerRy} 0 0 0 ${cx} ${cy + innerRy}
                  L ${cx} ${cy + ry}
                  A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}
                  Z
                `}
                fill="url(#grad-phase-3)"
                stroke="#FFFFFF"
                strokeWidth={activeIdx === 2 ? "3" : "2"}
                className="filter group-hover:brightness-105 transition-all"
              />
              <text
                x={cx - rx * 0.58}
                y={cy + ry * 0.48 - 4}
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-sm font-black select-none pointer-events-none drop-shadow-xs"
              >
                03
              </text>
              <text
                x={cx - rx * 0.58}
                y={cy + ry * 0.48 + 10}
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-[9px] font-extrabold tracking-wider select-none pointer-events-none opacity-95 drop-shadow-xs"
              >
                PILOT
              </text>
            </g>

            {/* SLICE 2: Phase 02 (Bottom-Right) */}
            <g
              transform={`translate(${
                activeIdx === 1 ? explosionOffsets[1].x : 0
              }, ${activeIdx === 1 ? explosionOffsets[1].y : 0})`}
              className="transition-transform duration-500 ease-out cursor-pointer group"
              onClick={() => setActiveIdx(1)}
            >
              <path
                d={`
                  M ${cx} ${cy + innerRy}
                  A ${innerRx} ${innerRy} 0 0 0 ${cx + innerRx} ${cy}
                  L ${cx + rx} ${cy}
                  A ${rx} ${ry} 0 0 1 ${cx} ${cy + ry}
                  Z
                `}
                fill="url(#grad-phase-2)"
                stroke="#FFFFFF"
                strokeWidth={activeIdx === 1 ? "3" : "2"}
                className="filter group-hover:brightness-105 transition-all"
              />
              <text
                x={cx + rx * 0.58}
                y={cy + ry * 0.48 - 4}
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-sm font-black select-none pointer-events-none drop-shadow-xs"
              >
                02
              </text>
              <text
                x={cx + rx * 0.58}
                y={cy + ry * 0.48 + 10}
                textAnchor="middle"
                fill="#FFFFFF"
                className="font-mono text-[9px] font-extrabold tracking-wider select-none pointer-events-none opacity-95 drop-shadow-xs"
              >
                BUILD
              </text>
            </g>

            {/* 4. 3D CENTER CORE HUB */}
            <g className="cursor-pointer group" onClick={() => setActiveIdx((prev) => (prev + 1) % 4)}>
              <ellipse
                cx={cx}
                cy={cy + depth * 0.38}
                rx={innerRx - 6}
                ry={innerRy - 3}
                fill="#CBD5E1"
              />
              <ellipse
                cx={cx}
                cy={cy}
                rx={innerRx - 6}
                ry={innerRy - 3}
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="2.5"
                className="filter group-hover:brightness-95 transition-all drop-shadow-xs"
              />
              <text
                x={cx}
                y={cy - 2}
                textAnchor="middle"
                fill="#0F172A"
                className="font-mono text-[11px] font-black uppercase tracking-wider select-none pointer-events-none"
              >
                BHF
              </text>
              <text
                x={cx}
                y={cy + 10}
                textAnchor="middle"
                fill="#64748B"
                className="font-mono text-[9px] font-bold select-none pointer-events-none"
              >
                CYCLE 360°
              </text>
            </g>
          </svg>
        </div>

        {/* 4 CLOUDS POSITIONED AROUND THE 4 QUADRANTS */}
        {LIFECYCLE_PHASES.map((phase, idx) => {
          const isSelected = activeIdx === idx;

          return (
            <motion.div
              key={phase.step}
              onClick={() => setActiveIdx(idx)}
              animate={{
                scale: isSelected ? 1.05 : 1,
                opacity: isSelected ? 1 : 0.88,
                y: isSelected ? -4 : 0,
              }}
              whileHover={{ scale: 1.06, opacity: 1, y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute ${phase.positionClass} w-[220px] sm:w-[245px] z-20 cursor-pointer`}
            >
              <div
                className="relative bg-white/95 backdrop-blur-md rounded-[26px] pt-3.5 pb-3 px-3.5 sm:px-4 border-2 transition-all"
                style={{
                  borderColor: isSelected ? phase.color : `${phase.color}40`,
                  boxShadow: isSelected
                    ? `0 16px 36px -6px ${phase.color}35, 0 4px 12px rgba(15, 23, 42, 0.04)`
                    : `0 10px 24px -8px ${phase.color}20`,
                }}
              >
                {/* Fluffy Cloud Domes on Top (Half-circle domes that sit strictly above the card) */}
                <div
                  className="absolute -top-3 left-6 w-8 h-4 rounded-t-full bg-white border-t-2 border-l border-r transition-colors -z-10"
                  style={{ borderColor: isSelected ? phase.color : phase.puffBorderColor }}
                />
                <div
                  className="absolute -top-4.5 left-13 w-11 h-5.5 rounded-t-full bg-white border-t-2 border-l border-r transition-colors -z-10"
                  style={{ borderColor: isSelected ? phase.color : phase.puffBorderColor }}
                />
                <div
                  className="absolute -top-3 right-8 w-8 h-4 rounded-t-full bg-white border-t-2 border-l border-r transition-colors -z-10"
                  style={{ borderColor: isSelected ? phase.color : phase.puffBorderColor }}
                />

                {/* Little Cloud Puff on Bottom Edge */}
                <div
                  className="absolute -bottom-2 right-10 w-6 h-3 rounded-b-full bg-white border-b-2 border-l border-r transition-colors -z-10"
                  style={{ borderColor: isSelected ? phase.color : phase.puffBorderColor }}
                />

                {/* Cloud Thought Bubble Trail pointing to Quadrant */}
                <div className={`absolute ${phase.trailClass} flex items-center gap-1 pointer-events-none z-10`}>
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-white border shadow-xs"
                    style={{ borderColor: isSelected ? phase.color : `${phase.color}60` }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full shadow-xs"
                    style={{ backgroundColor: phase.color }}
                  />
                </div>

                {/* Cloud Header: Phase Pill + Stage Number */}
                <div className="flex items-center justify-between mb-1">
                  <span
                    className="font-mono text-[10px] font-black px-2 py-0.5 rounded-full border shadow-2xs"
                    style={{
                      color: phase.color,
                      borderColor: `${phase.color}40`,
                      backgroundColor: phase.lightBg,
                    }}
                  >
                    PHASE {phase.step} // {phase.stageTag}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    P{phase.step}
                  </span>
                </div>

                {/* Cloud Title: Minimal & Punchy */}
                <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                  {phase.fullTitle}
                </h4>

                {/* Cloud Description: Single Concise Sentence */}
                <p className="text-[11px] font-medium text-slate-600 leading-tight mt-1">
                  {phase.focus}
                </p>

                {/* Cloud Footer: Governance Gate Badge */}
                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-bold">
                  <span className="text-slate-400 font-semibold">GATE</span>
                  <span
                    className="font-black px-2 py-0.5 rounded-full border"
                    style={{
                      color: phase.color,
                      borderColor: `${phase.color}35`,
                      backgroundColor: phase.lightBg,
                    }}
                  >
                    {phase.gate}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}

      </div>

      {/* BOTTOM FOOTER & ADVANCE PROMPT */}
      <div className="w-full flex items-center justify-between text-xs font-mono font-bold text-slate-500 px-2 pt-1 border-t border-slate-100">
        <span className="text-slate-500">
          CLICK ANY 3D QUADRANT OR CLOUD TO EXPAND // 4-STAGE INCUBATION ENGINE
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onAdvance) onAdvance();
          }}
          className="hover:text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer font-black text-slate-950 px-3 py-1 rounded-full hover:bg-slate-100"
        >
          <span>NEXT: FINAL CTA →</span>
        </button>
      </div>
    </div>
  );
}
