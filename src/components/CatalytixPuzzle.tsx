"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Module = {
  id: number;
  color: string;
  label: string;
  title: string;
  trl: string;
  focus: string;
  masterclasses: string[];
  workshops: string[];
  gate: string;
};

export const curriculumModulesData: Module[] = [
  {
    id: 1,
    color: "#06B6D4",
    label: "MODULE 01",
    title: "Venture Formation & Applied Prototyping",
    trl: "TRL 1 – 3",
    focus: "MVP Design & Early Tech Validation",
    masterclasses: [
      "Product Architecture",
      "MVP vs Prototype",
      "IP & Patent 101",
    ],
    workshops: [
      "Figma UI System",
      "3D Printing & IoT Sprint",
      "Product Roadmap",
      "Lean Canvas Matrix",
    ],
    gate: "Weekly prototype reviews & diagnostic scorecards",
  },
  {
    id: 2,
    color: "#16A34A",
    label: "MODULE 02",
    title: "TRL & Innovation Verification",
    trl: "TRL 3 – 4",
    focus: "Tech Feasibility & Risk De-biasing",
    masterclasses: [
      "TRL Benchmarking",
      "DeepTech Lab Prototyping",
      "System Architecture",
    ],
    workshops: [
      "Component Stress Testing",
      "Makerspace Fabrication",
      "Patent Search Matrix",
    ],
    gate: "BHF Technical Advisory Committee Gate",
  },
  {
    id: 3,
    color: "#EC4899",
    label: "MODULE 03",
    title: "Market Discovery & ICP Validation",
    trl: "TRL 4 – 5",
    focus: "User Research & Pilot Positioning",
    masterclasses: [
      "Customer Discovery Sprints",
      "B2B Pilot Structuring",
      "Pricing Strategy",
    ],
    workshops: [
      "30 Founder Interviews",
      "Pilot Agreement Draft",
      "Competitor Teardown",
    ],
    gate: "Go-To-Market Feasibility Audit",
  },
  {
    id: 4,
    color: "#8B5CF6",
    label: "MODULE 04",
    title: "Business Model & Governance",
    trl: "TRL 5 – 6",
    focus: "Unit Economics, Pricing & Legal Scaffolding",
    masterclasses: [
      "Financial Modeling",
      "Cap Table Scaffolding",
      "Compliance & DPIIT Grant Filing",
    ],
    workshops: [
      "Unit Economics Model",
      "Data Room Prep",
      "Term Sheet Scenarios",
    ],
    gate: "Institutional Investment Committee Gate",
  },
  {
    id: 5,
    color: "#F59E0B",
    label: "MODULE 05",
    title: "Investment Readiness & Growth",
    trl: "TRL 6 – 9",
    focus: "Venture Pitching, Seed Syndicates & Scaling",
    masterclasses: [
      "Venture Capital Pitch Deck",
      "Due Diligence Navigation",
      "Growth Loops",
    ],
    workshops: [
      "Pitch Deck Polish",
      "Live Mock Pitch with EIRs",
      "Seed Round Data Room",
    ],
    gate: "CATALYTIX Demo Day Final Gate",
  },
];

// -------------------------------------------------------------
// MATHEMATICAL JIGSAW PATH GENERATOR
// Produces true authentic puzzle pieces with smooth rounded necks
// and bulbous heads that lock together flush with zero floating gaps.
// -------------------------------------------------------------
function getJigsawPath({
  w = 270,
  h = 148,
  r = 16,
  top = "none",
  right = "none",
  bottom = "none",
  left = "none",
  topOffset = 0.5,
  rightOffset = 0.5,
  bottomOffset = 0.5,
  leftOffset = 0.5,
  d = 14,
}: {
  w: number;
  h: number;
  r?: number;
  top?: "none" | "tab" | "slot" | ("none" | "tab" | "slot")[];
  right?: "none" | "tab" | "slot" | ("none" | "tab" | "slot")[];
  bottom?: "none" | "tab" | "slot" | ("none" | "tab" | "slot")[];
  left?: "none" | "tab" | "slot" | ("none" | "tab" | "slot")[];
  topOffset?: number | number[];
  rightOffset?: number | number[];
  bottomOffset?: number | number[];
  leftOffset?: number | number[];
  d?: number;
}) {
  const hw = 18;

  function makeTabSegment(
    cx: number,
    cy: number,
    ax: number,
    ay: number,
    nx: number,
    ny: number,
    sign: number
  ) {
    const sx = sign * nx;
    const sy = sign * ny;

    const p0x = cx - hw * ax;
    const p0y = cy - hw * ay;

    const c1x = cx - (hw - 3) * ax + 2 * sx;
    const c1y = cy - (hw - 3) * ay + 2 * sy;
    const c2x = cx - 11 * ax + d * 0.2 * sx;
    const c2y = cy - 11 * ay + d * 0.2 * sy;
    const p1x = cx - 10 * ax + d * 0.35 * sx;
    const p1y = cy - 10 * ay + d * 0.35 * sy;

    const c3x = cx - 14.5 * ax + d * 0.6 * sx;
    const c3y = cy - 14.5 * ay + d * 0.6 * sy;
    const c4x = cx - 7.5 * ax + d * sx;
    const c4y = cy - 7.5 * ay + d * sy;
    const p2x = cx + d * sx;
    const p2y = cy + d * sy;

    const c5x = cx + 7.5 * ax + d * sx;
    const c5y = cy + 7.5 * ay + d * sy;
    const c6x = cx + 14.5 * ax + d * 0.6 * sx;
    const c6y = cy + 14.5 * ay + d * 0.6 * sy;
    const p3x = cx + 10 * ax + d * 0.35 * sx;
    const p3y = cy + 10 * ay + d * 0.35 * sy;

    const c7x = cx + 11 * ax + d * 0.2 * sx;
    const c7y = cy + 11 * ay + d * 0.2 * sy;
    const c8x = cx + (hw - 3) * ax + 2 * sx;
    const c8y = cy + (hw - 3) * ay + 2 * sy;
    const p4x = cx + hw * ax;
    const p4y = cy + hw * ay;

    return (
      `L ${p0x.toFixed(2)} ${p0y.toFixed(2)} ` +
      `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p1x.toFixed(2)} ${p1y.toFixed(2)} ` +
      `C ${c3x.toFixed(2)} ${c3y.toFixed(2)}, ${c4x.toFixed(2)} ${c4y.toFixed(2)}, ${p2x.toFixed(2)} ${p2y.toFixed(2)} ` +
      `C ${c5x.toFixed(2)} ${c5y.toFixed(2)}, ${c6x.toFixed(2)} ${c6y.toFixed(2)}, ${p3x.toFixed(2)} ${p3y.toFixed(2)} ` +
      `C ${c7x.toFixed(2)} ${c7y.toFixed(2)}, ${c8x.toFixed(2)} ${c8y.toFixed(2)}, ${p4x.toFixed(2)} ${p4y.toFixed(2)} `
    );
  }

  // 1. TOP EDGE: Left-to-Right
  let path = `M ${r} 0 `;
  if (top !== "none") {
    const offsets = Array.isArray(topOffset) ? topOffset : [topOffset];
    const types = Array.isArray(top) ? top : [top];
    offsets.forEach((off, i) => {
      const type = types[i] || types[0];
      if (type === "none") return;
      const sign = type === "tab" ? 1 : -1;
      path += makeTabSegment(w * off, 0, 1, 0, 0, -1, sign);
    });
  }
  path += `L ${w - r} 0 `;
  path += `A ${r} ${r} 0 0 1 ${w} ${r} `;

  // 2. RIGHT EDGE: Top-to-Bottom
  if (right !== "none") {
    const offsets = Array.isArray(rightOffset) ? rightOffset : [rightOffset];
    const types = Array.isArray(right) ? right : [right];
    offsets.forEach((off, i) => {
      const type = types[i] || types[0];
      if (type === "none") return;
      const sign = type === "tab" ? 1 : -1;
      path += makeTabSegment(w, h * off, 0, 1, 1, 0, sign);
    });
  }
  path += `L ${w} ${h - r} `;
  path += `A ${r} ${r} 0 0 1 ${w - r} ${h} `;

  // 3. BOTTOM EDGE: Right-to-Left
  if (bottom !== "none") {
    const offsets = Array.isArray(bottomOffset) ? bottomOffset : [bottomOffset];
    const types = Array.isArray(bottom) ? bottom : [bottom];
    offsets.forEach((off, i) => {
      const type = types[i] || types[0];
      if (type === "none") return;
      const sign = type === "tab" ? 1 : -1;
      path += makeTabSegment(w * off, h, -1, 0, 0, 1, sign);
    });
  }
  path += `L ${r} ${h} `;
  path += `A ${r} ${r} 0 0 1 0 ${h - r} `;

  // 4. LEFT EDGE: Bottom-to-Top
  if (left !== "none") {
    const offsets = Array.isArray(leftOffset) ? leftOffset : [leftOffset];
    const types = Array.isArray(left) ? left : [left];
    offsets.forEach((off, i) => {
      const type = types[i] || types[0];
      if (type === "none") return;
      const sign = type === "tab" ? 1 : -1;
      path += makeTabSegment(0, h * off, 0, -1, -1, 0, sign);
    });
  }
  path += `L 0 ${r} `;
  path += `A ${r} ${r} 0 0 1 ${r} 0 Z`;

  return path;
}

// Pre-compute aligned SVG paths for each of the 5 curriculum modules
export function getModuleJigsawPath(moduleId: number): string {
  if (moduleId === 1) {
    // Module 01: Top-Left (270 x 148)
    // Bottom: male tab locking into Module 03
    // Right: female slot receiving Module 05 top-left tab
    return getJigsawPath({
      w: 270,
      h: 148,
      bottom: "tab",
      bottomOffset: 0.5,
      right: "slot",
      rightOffset: 0.7162,
    });
  }
  if (moduleId === 2) {
    // Module 02: Top-Right (270 x 148)
    // Left: female slot receiving Module 05 top-right tab
    // Bottom: male tab locking into Module 04
    return getJigsawPath({
      w: 270,
      h: 148,
      left: "slot",
      leftOffset: 0.7162,
      bottom: "tab",
      bottomOffset: 0.5,
    });
  }
  if (moduleId === 3) {
    // Module 03: Bottom-Left (270 x 148)
    // Top: female slot receiving Module 01 bottom tab
    // Right: female slot receiving Module 05 bottom-left tab
    return getJigsawPath({
      w: 270,
      h: 148,
      top: "slot",
      topOffset: 0.5,
      right: "slot",
      rightOffset: 0.2838,
    });
  }
  if (moduleId === 4) {
    // Module 04: Bottom-Right (270 x 148)
    // Left: female slot receiving Module 05 bottom-right tab
    // Top: female slot receiving Module 02 bottom tab
    return getJigsawPath({
      w: 270,
      h: 148,
      left: "slot",
      leftOffset: 0.2838,
      top: "slot",
      topOffset: 0.5,
    });
  }
  // Module 05: Center Hub Summit (280 x 168)
  // Left: two male tabs locking into Modules 01 & 03
  // Right: two male tabs locking into Modules 02 & 04
  return getJigsawPath({
    w: 280,
    h: 168,
    left: ["tab", "tab"],
    leftOffset: [0.75, 0.25], // Bottom-to-top traversal: 0.75 then 0.25
    right: ["tab", "tab"],
    rightOffset: [0.25, 0.75], // Top-to-bottom traversal: 0.25 then 0.75
  });
}

interface CatalytixPuzzleProps {
  presentationStep: number;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function CatalytixPuzzle({
  presentationStep,
  onStepChange,
  onNext,
  onPrev,
}: CatalytixPuzzleProps) {
  // Step 1 to 5: Focus on Module 1 to 5 (full info piece)
  // Step 6: Zoom out & Assemble all 5 pieces beside each other interlocking with Module 5
  const isZoomedOut = presentationStep === 6;
  const activeModuleIndex = Math.min(4, Math.max(0, presentationStep - 1));
  const activeModule = curriculumModulesData[activeModuleIndex];

  // Mathematically calculated center coordinates for the assembled 5-piece puzzle
  // Relative to container center (0, 0):
  // Module 05 width=280, height=168 (center at 0, 0, left=-140, right=+140)
  // Modules 1, 2, 3, 4 width=270, height=148:
  // - Columns meet Module 05 at x = +/- 140 (center x = +/- 275)
  // - Rows meet each other at y = 0 (center y = +/- 74)
  const assembledConfig = [
    { x: -275, y: -74, w: 270, h: 148, defaultZ: 2 }, // Module 01: Top-Left
    { x: 275, y: -74, w: 270, h: 148, defaultZ: 2 },  // Module 02: Top-Right
    { x: -275, y: 74, w: 270, h: 148, defaultZ: 1 },   // Module 03: Bottom-Left
    { x: 275, y: 74, w: 270, h: 148, defaultZ: 1 },    // Module 04: Bottom-Right
    { x: 0, y: 0, w: 280, h: 168, defaultZ: 10 },      // Module 05: Center Summit
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* 1. SECTION HEADER */}
      <div className="text-center pt-1 sm:pt-2">
        <div className="badge-pill-light mb-1 text-[#16A34A] font-bold inline-flex items-center gap-1.5 border border-slate-200/90 shadow-xs text-[11px] sm:text-xs py-1 px-3.5">
          <span>✦</span> TRL 1 – 9 PIPELINE // STRUCTURED ROADMAP
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          The <span className="gradient-word">CATALYTIX</span> Venture Curriculum
        </h2>

        <p className="text-slate-600 max-w-xl mx-auto text-xs sm:text-sm font-semibold leading-relaxed mt-0.5">
          A 5-stage progressive curriculum guiding founders from MVP prototyping to traction and scale.
        </p>

        {/* 6-Step Navigation Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2.5">
          {curriculumModulesData.map((m, idx) => {
            const stepNum = idx + 1;
            const isActive = presentationStep === stepNum;
            return (
              <button
                key={m.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onStepChange(stepNum);
                }}
                className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold transition-all border cursor-pointer ${
                  isActive && !isZoomedOut
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                    : "bg-white text-slate-700 hover:text-slate-950 border-slate-200 hover:bg-slate-100"
                }`}
                style={isActive && !isZoomedOut ? { borderColor: m.color, color: "#ffffff" } : {}}
              >
                MOD 0{m.id}
              </button>
            );
          })}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStepChange(6);
            }}
            className={`px-3 sm:px-4 py-1 rounded-full text-[11px] sm:text-xs font-mono font-black transition-all border cursor-pointer flex items-center gap-1.5 ${
              isZoomedOut
                ? "bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white border-transparent shadow-md"
                : "bg-white text-slate-800 hover:text-slate-950 border-slate-300 hover:bg-slate-100"
            }`}
          >
            <span>✦</span>
            <span>ASSEMBLED (5/5)</span>
          </button>
        </div>
      </div>

      {/* 2. THE 1:1 INTERACTIVE PUZZLE STAGE */}
      <div className="relative w-full flex-1 flex items-center justify-center my-auto overflow-hidden">
        {/* CAMERA VIEWPORT: Smooth zoom effect */}
        <motion.div
          className="puzzle-camera relative w-full flex-1 flex items-center justify-center"
          animate={{
            scale: isZoomedOut ? 0.90 : 1,
            y: isZoomedOut ? -8 : 0,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {isZoomedOut ? (
            /* ZOOMED-OUT ASSEMBLED STATE: True interlocking 5-piece jigsaw assembly with title-only view */
            <div className="relative w-[860px] h-[360px] max-w-full flex items-center justify-center">
              {curriculumModulesData.map((module, idx) => {
                const config = assembledConfig[idx];
                return (
                  <motion.div
                    key={module.id}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                      marginLeft: -config.w / 2,
                      marginTop: -config.h / 2,
                      width: config.w,
                      height: config.h,
                      zIndex: config.defaultZ,
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0.88,
                      opacity: 0,
                    }}
                    animate={{
                      x: config.x,
                      y: config.y,
                      scale: 1,
                      opacity: 1,
                    }}
                    whileHover={{
                      scale: 1.035,
                      zIndex: 35,
                    }}
                    transition={{
                      delay: idx * 0.07,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Clicking any piece in assembled view zooms into that piece's details!
                      onStepChange(module.id);
                    }}
                    title={`Click to inspect ${module.label}: ${module.title}`}
                  >
                    <TitleOnlyPuzzlePiece module={module} />
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* FOCUS MODE: Shows active piece with full detailed curriculum breakdown */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.id}
                className="relative"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.04, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                <FullPuzzlePiece
                  module={activeModule}
                  isFocused={true}
                  isAssembled={false}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      {/* 3. SECTION FOOTER CONTROLS */}
      <div className="text-center pb-2 sm:pb-3 flex flex-col items-center gap-1.5">
        {isZoomedOut ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.45 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-[#EC4899] tracking-widest uppercase">CATALYTIX</span>
              <span className="text-xs text-slate-400 font-bold">•</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">One curriculum. Five stages. One venture.</span>
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-slate-500 font-semibold mt-0.5">
              Click any piece to inspect details • Click anywhere to advance to Outcomes Staircase →
            </p>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between w-full max-w-[720px] px-2 text-xs font-mono font-bold text-slate-500">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>←</span> PREV
            </button>

            <span className="text-slate-400">
              MODULE {activeModule.id} OF 5 // CLICK ANYWHERE TO ADVANCE
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer font-extrabold text-slate-900"
            >
              {activeModule.id === 5 ? "ZOOM OUT & ASSEMBLE ✦" : "NEXT →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// TITLE-ONLY PUZZLE PIECE (USED IN THE ASSEMBLED 5-PIECE VIEW)
// Displays clean module number, bold title & true interlocking jigsaw border
// -------------------------------------------------------------
function TitleOnlyPuzzlePiece({
  module,
}: {
  module: Module;
}) {
  const isCenterPiece = module.id === 5;
  const w = isCenterPiece ? 280 : 270;
  const h = isCenterPiece ? 168 : 148;
  const path = getModuleJigsawPath(module.id);

  return (
    <div
      className="relative w-full h-full select-none cursor-pointer group"
      style={{
        filter: isCenterPiece
          ? "drop-shadow(0 8px 24px rgba(245, 158, 11, 0.28))"
          : `drop-shadow(0 4px 12px ${module.color}22)`,
      }}
    >
      {/* SVG Jigsaw Shape Background */}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <path
          d={path}
          fill="#FFFFFF"
          stroke={module.color}
          strokeWidth={isCenterPiece ? 3 : 2.5}
          className="transition-colors duration-200 group-hover:fill-slate-50/80"
        />
      </svg>

      {/* Card Content Overlay */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between pointer-events-none">
        {/* Top: Module Badge */}
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[11px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border shadow-2xs"
            style={{
              color: module.color,
              borderColor: `${module.color}40`,
              backgroundColor: `${module.color}15`,
            }}
          >
            {isCenterPiece ? "MODULE 05 // SUMMIT" : module.label}
          </span>
          <span className="font-mono text-[10px] font-bold text-slate-400">
            {module.trl}
          </span>
        </div>

        {/* Middle: Stage Title */}
        <div className="my-auto py-1">
          <h3
            className={`font-black text-slate-950 tracking-tight leading-snug ${
              isCenterPiece ? "text-base sm:text-lg" : "text-sm sm:text-base"
            }`}
          >
            {module.title}
          </h3>
        </div>

        {/* Bottom: Clean Click Hint on Hover */}
        <div className="flex items-center justify-end text-[10.5px] font-mono font-extrabold h-4">
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5"
            style={{ color: module.color }}
          >
            INSPECT DETAILS ↗
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// FULL-INFORMATION PUZZLE PIECE CARD (FOCUS MODE)
// Clean, ultra-premium presentation card with masterclasses, workshops & gate
// -------------------------------------------------------------
function FullPuzzlePiece({
  module,
  isFocused,
  isAssembled,
}: {
  module: Module;
  isFocused: boolean;
  isAssembled: boolean;
}) {
  return (
    <div
      className={`full-puzzle-piece relative bg-white rounded-2xl border-2 shadow-xl p-5 sm:p-6 transition-all duration-300 w-[720px] max-w-full ${
        isFocused ? "is-active-piece ring-4 ring-slate-950/5" : ""
      }`}
      style={{
        borderColor: `${module.color}60`,
        boxShadow: `0 12px 36px ${module.color}18, 0 4px 12px rgba(15, 23, 42, 0.06)`,
      }}
    >
      <div className="full-puzzle-piece-inner flex flex-col justify-between h-full">
        {/* TOP ROW: Badge, Title, Primary Focus */}
        <div>
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/90 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-mono text-xs font-black uppercase tracking-wider px-3 py-0.5 rounded-full border shadow-xs"
                  style={{
                    color: module.color,
                    borderColor: `${module.color}40`,
                    backgroundColor: `${module.color}15`,
                  }}
                >
                  {module.label}
                </span>
                <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                  {module.trl}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {module.title}
              </h3>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-black block">PRIMARY FOCUS</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 max-w-[210px] block leading-tight">
                {module.focus}
              </span>
            </div>
          </div>

          {/* 3 COLUMNS: Masterclasses, Workshops, Review Gate */}
          <div className="grid grid-cols-3 gap-3.5 mb-3 text-left">
            {/* Col 1: Masterclasses */}
            <div className="space-y-1.5">
              <div
                className="flex items-center gap-1.5 font-mono text-[11px] font-extrabold uppercase tracking-wider"
                style={{ color: module.color }}
              >
                <span>✦</span> MASTERCLASSES
              </div>
              <ul className="space-y-1">
                {module.masterclasses.map((item, i) => (
                  <li key={i} className="text-xs font-bold text-slate-800 flex items-start gap-1.5 leading-snug">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                      style={{ backgroundColor: module.color }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Workshops & Sprints */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#16A34A]">
                <span>✦</span> WORKSHOPS &amp; SPRINTS
              </div>
              <div className="flex flex-wrap gap-1">
                {module.workshops.map((item, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-slate-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 3: Review Gate */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#EC4899]">
                <span>✦</span> REVIEW GATE
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <p className="text-[11px] font-black text-slate-900 mb-0.5">Evaluation Gate:</p>
                <p className="text-xs font-semibold text-slate-700 leading-snug">{module.gate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Policy Note & Click Indicator */}
        <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10.5px] font-mono font-bold text-slate-600">
          <span>↳ Program can be renewed subject to approval from BHF governance</span>
          <span className="font-extrabold flex items-center gap-1" style={{ color: module.color }}>
            {isAssembled ? (
              <span>ZOOM IN ↗</span>
            ) : module.id === 5 ? (
              <span>CLICK TO ZOOM OUT &amp; ASSEMBLE ✦</span>
            ) : (
              <span>CLICK TO ADVANCE →</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
