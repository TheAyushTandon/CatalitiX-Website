"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, Sparkles, ArrowRight } from "lucide-react";

export interface JourneyStage {
  id: number;
  modNumber: number;
  label: string;
  pillLabel: string;
  title: string;
  shortTitle: string;
  focusTitle: string;
  trl: string;
  fromState: string;
  toState: string;
  transition: string;
  color: string;
  darkColor: string;
  glowColor: string;
  // Sub-pixel verified coordinates on public/stickman-journey-v2.png (1360 x 701)
  dotPxX: number;
  dotPxY: number;
  xPct: number;
  yPct: number;
  barHeightPct: number;
  stickmanDescription: string;
  focus: string;
  tagline: string;
  outcomes: string[];
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 0,
    modNumber: 0,
    label: "MODULE 00",
    pillLabel: "MOD 00",
    title: "Venture Formation & Legal Foundation",
    shortTitle: "Formation",
    focusTitle: "Legal Scaffolding",
    trl: "TRL 1–2",
    fromState: "RAW CONCEPT",
    toState: "LEGALLY FORMED VENTURE",
    transition: "RAW CONCEPT → FORMED VENTURE",
    color: "#00B4D8",
    darkColor: "#0284C7",
    glowColor: "rgba(0, 180, 216, 0.5)",
    dotPxX: 84.0,
    dotPxY: 670.0,
    xPct: 6.17,
    yPct: 95.58,
    barHeightPct: 42,
    stickmanDescription: "Graduate Exploring Startup Ideas",
    focus: "Concept Validation & Legal Scaffolding",
    tagline: "De-risk core thesis and construct robust founder equity, governance, and DPIIT compliance.",
    outcomes: [
      "Refined problem-solution hypothesis & venture thesis",
      "Founder equity pact & governance framework",
      "Company incorporation initiated / completed",
      "DPIIT & SISFS eligibility & compliance roadmap",
    ],
  },
  {
    id: 1,
    modNumber: 1,
    label: "MODULE 01",
    pillLabel: "MOD 01",
    title: "Idea Validation & Venture Direction",
    shortTitle: "Direction",
    focusTitle: "Signpost Gate",
    trl: "TRL 2–3",
    fromState: "RAW HYPOTHESIS",
    toState: "VALIDATED BLUEPRINT",
    transition: "HYPOTHESIS → VALIDATED BLUEPRINT",
    color: "#10B981",
    darkColor: "#059669",
    glowColor: "rgba(16, 185, 129, 0.5)",
    dotPxX: 254.7,
    dotPxY: 678.5,
    xPct: 18.72,
    yPct: 96.79,
    barHeightPct: 52,
    stickmanDescription: "Signpost: Deciding Direction (IDEA? STARTUP? NEXT?)",
    focus: "Hypothesis De-biasing & Venture Roadmapping",
    tagline: "Evaluate pathways at the critical crossroads—framing lean canvases, IP landscapes, and product roadmaps.",
    outcomes: [
      "Decision matrix: Market opportunity vs technical viability",
      "Lean Canvas & venture hypothesis de-biasing",
      "Initial IP landscape & patent classification check",
      "Roadmap sign-off for prototype fabrication",
    ],
  },
  {
    id: 2,
    modNumber: 2,
    label: "MODULE 02",
    pillLabel: "MOD 02",
    title: "Applied Prototyping & Lab Sprint",
    shortTitle: "Prototyping",
    focusTitle: "Alpha MVP",
    trl: "TRL 3–4",
    fromState: "BLUEPRINT",
    toState: "WORKING ALPHA MVP",
    transition: "BLUEPRINT → WORKING ALPHA MVP",
    color: "#EC4899",
    darkColor: "#DB2777",
    glowColor: "rgba(236, 72, 153, 0.5)",
    dotPxX: 517.7,
    dotPxY: 625.5,
    xPct: 38.07,
    yPct: 89.23,
    barHeightPct: 62,
    stickmanDescription: "Founder at Laptop with Glowing Lightbulb",
    focus: "Hardware / Software Alpha Fabrication",
    tagline: "Turn ideas into code & hardware—fabricating functional alpha prototypes in Bennett Hatchery Labs.",
    outcomes: [
      "Physical alpha prototype / functional software MVP built",
      "Product architecture & technical system schematics",
      "Rapid maker-lab prototyping sprint completed",
      "First functional test run & engineering demo",
    ],
  },
  {
    id: 3,
    modNumber: 3,
    label: "MODULE 03",
    pillLabel: "MOD 03",
    title: "TRL & Innovation Verification",
    shortTitle: "Verification",
    focusTitle: "TRL Verified",
    trl: "TRL 4–5",
    fromState: "ALPHA PROTOTYPE",
    toState: "BENCHMARKED TECH",
    transition: "PROTOTYPE → BENCHMARKED TECH",
    color: "#8B5CF6",
    darkColor: "#7C3AED",
    glowColor: "rgba(139, 92, 246, 0.5)",
    dotPxX: 716.9,
    dotPxY: 536.5,
    xPct: 52.72,
    yPct: 76.53,
    barHeightPct: 72,
    stickmanDescription: "Founder Inspecting Traction with Magnifier",
    focus: "Lab Stress-Testing & Risk De-biasing",
    tagline: "Rigorous inspection under the glass—benchmarking technology feasibility and de-biasing assumptions.",
    outcomes: [
      "TRL level assessed & verified by advisory committee",
      "Stress-testing & reliability benchmarks completed",
      "Regulatory compliance & safety standards mapped",
      "Pilot simulation evidence & validation dossier",
    ],
  },
  {
    id: 4,
    modNumber: 4,
    label: "MODULE 04",
    pillLabel: "MOD 04",
    title: "Market Fit & Commercial Launchpad",
    shortTitle: "Launchpad",
    focusTitle: "Pilot Deals",
    trl: "TRL 5–6",
    fromState: "BENCHMARKED TECH",
    toState: "REVENUE TRACTION",
    transition: "TECH → REVENUE TRACTION",
    color: "#F97316",
    darkColor: "#EA580C",
    glowColor: "rgba(249, 115, 22, 0.5)",
    dotPxX: 894.9,
    dotPxY: 558.5,
    xPct: 65.80,
    yPct: 79.67,
    barHeightPct: 82,
    stickmanDescription: "Founder Scaling with Growth Bar Chart",
    focus: "Customer Discovery & Unit Economics",
    tagline: "Rise up the revenue curve—converting validated technology into paid pilot deals and proven unit economics.",
    outcomes: [
      "Enterprise pilot deals / paid early adopters secured",
      "Unit economics & scalable pricing model finalized",
      "Commercial demo video & media assets produced",
      "SISFS & external seed grant applications submitted",
    ],
  },
  {
    id: 5,
    modNumber: 5,
    label: "MODULE 05",
    pillLabel: "MOD 05",
    title: "Accelerator & Velocity Sprint",
    shortTitle: "Velocity",
    focusTitle: "Demo Day Pitch",
    trl: "TRL 6–9",
    fromState: "EARLY TRACTION",
    toState: "SCALE-READY VENTURE",
    transition: "TRACTION → SCALE-READY",
    color: "#EAB308",
    darkColor: "#CA8A04",
    glowColor: "rgba(234, 179, 8, 0.5)",
    dotPxX: 1088.6,
    dotPxY: 473.5,
    xPct: 80.04,
    yPct: 67.55,
    barHeightPct: 91,
    stickmanDescription: "Founder Sprinting up Mountain Slope",
    focus: "Traction Velocity & Demo Day Pitch",
    tagline: "Accelerate up the steep climb—high-velocity growth experiments and pitch rehearsals for Hatchery Demo Day.",
    outcomes: [
      "MoM revenue acceleration & key KPI growth",
      "Institutional data room & verified financial model",
      "1-on-1 marquee mentor & EIR pitch audits",
      "Live stage pitch at Bennett Hatchery Demo Day",
    ],
  },
  {
    id: 6,
    modNumber: 6,
    label: "SUMMIT ★",
    pillLabel: "SUMMIT ★",
    title: "Scale & Institutional Syndication",
    shortTitle: "Summit Scale",
    focusTitle: "Series A Ready",
    trl: "TRL 7–9+",
    fromState: "SCALE-READY",
    toState: "INSTITUTIONAL VENTURE",
    transition: "SCALE-READY → INSTITUTIONAL",
    color: "#06B6D4",
    darkColor: "#0891B2",
    glowColor: "rgba(6, 182, 212, 0.6)",
    dotPxX: 1268.8,
    dotPxY: 244.5,
    xPct: 93.29,
    yPct: 34.88,
    barHeightPct: 100,
    stickmanDescription: "Summit Victory: Raising Trophy & Flag",
    focus: "Series A Pipeline & Global Market Scale",
    tagline: "Institutional venture syndication, Series A readiness, and global market expansion.",
    outcomes: [
      "Direct VC syndicate rounds & seed capital syndicated",
      "Multi-market enterprise scaling & customer contracts",
      "Independent governance board & cap table finalized",
      "Lifetime Bennett Hatchery Foundation alumni runway",
    ],
  },
];

interface ModuleOutcomesStaircaseProps {
  activeIdx?: number;
  onModuleSelect?: (idx: number) => void;
  onNextStep?: () => void;
  onPrevStep?: () => void;
  isSectionReached?: boolean;
}

export default function ModuleOutcomesStaircase({
  activeIdx: controlledIdx,
  onModuleSelect,
  onNextStep,
  onPrevStep,
  isSectionReached = true,
}: ModuleOutcomesStaircaseProps) {
  // 0 to 6 = individual stage with speech bubble in space underneath the image
  // 7 = All Stages 3D Connected Bar View
  const [internalIdx, setInternalIdx] = useState<number>(0);
  const targetIdx = controlledIdx !== undefined ? controlledIdx : internalIdx;

  const setStage = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(7, idx));
      setInternalIdx(clamped);
      onModuleSelect?.(clamped);
    },
    [onModuleSelect]
  );

  const handleNext = useCallback(() => {
    if (targetIdx < 7) {
      setStage(targetIdx + 1);
    } else {
      onNextStep?.();
    }
  }, [targetIdx, setStage, onNextStep]);

  const handlePrev = useCallback(() => {
    if (targetIdx > 0) {
      setStage(targetIdx - 1);
    } else {
      onPrevStep?.();
    }
  }, [targetIdx, setStage, onPrevStep]);

  const isAllStagesView = targetIdx === 7;
  const currentStage = JOURNEY_STAGES[Math.min(6, targetIdx)] || JOURNEY_STAGES[0];

  // Clamp the pointer beak position so it stays gracefully on the speech bubble card
  const pointerX = Math.max(8, Math.min(92, currentStage.xPct));
  const pointerPxX = Math.max(100, Math.min(1270, currentStage.dotPxX));

  return (
    <div
      className="w-full h-full flex flex-col justify-between select-none relative max-w-[1080px] mx-auto pt-1 sm:pt-2 pb-1"
      onClick={(e) => {
        // Allow background clicks to advance, but don't intercept button or card clicks
        const target = e.target as HTMLElement | null;
        if (
          target &&
          typeof target.closest === "function" &&
          target.closest(
            "button, [data-interactive='true'], .speech-bubble-card, .interactive-3d-bar"
          )
        ) {
          return;
        }
        handleNext();
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP FLOATING CONTROLS: 3D VENTURE PATH TOGGLE
             (Preserved & accessible at top right)
          ───────────────────────────────────────────────────────────── */}
      <div className="w-full flex items-center justify-between px-2 sm:px-4 z-30 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100/90 border border-slate-200/90 text-slate-800 text-[10px] sm:text-[11px] font-mono font-black shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>VENTURE PROGRESSION ROADMAP // FROM IDEA TO SUMMIT</span>
        </div>

        <button
          type="button"
          data-interactive="true"
          onClick={(e) => {
            e.stopPropagation();
            setStage(isAllStagesView ? currentStage.id : 7);
          }}
          className={`px-3 py-1 rounded-full font-mono text-[11px] sm:text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 shadow-sm ${isAllStagesView
            ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
            : "bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 text-white border-transparent hover:brightness-105 hover:scale-105"
            }`}
        >
          <Sparkles size={12} className={isAllStagesView ? "" : "animate-spin"} />
          <span>{isAllStagesView ? "← STAGE CALLOUTS" : "✦ 3D VENTURE PATH"}</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. STICKMAN ILLUSTRATION CANVAS
             - Contains the widened stickman illustration (FULL OPACITY 100%, never faded)
             - Title shifted into the open blank sky space above "IDEA? STARTUP? NEXT?" signpost!
             - Accurate 7 milestone dots directly on the white drawn trail circles
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[1040px] aspect-[1360/701] mx-auto shrink-0 select-none mt-1 sm:mt-2">
        {/* Full-Opacity Transparent Stickman Illustration (NOT FADED!) */}
        <img
          src="/stickman-journey-v2.png"
          alt="CatalytiX Venture Progression Journey"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-xs select-none opacity-100"
          draggable={false}
        />

        {/* ─────────────────────────────────────────────────────────────
            TITLE SHIFTED INTO BLANK SKY SPACE ABOVE SIGNPOST
            "Your Idea Deserves a Bigger Journey"
            ───────────────────────────────────────────────────────────── */}
        <div className="absolute left-[13.5%] top-[2.5%] sm:top-[3.5%] max-w-[340px] sm:max-w-[420px] text-left z-20 pointer-events-auto select-none">
          <h2 className="text-xl sm:text-2xl md:text-[1.9rem] font-black tracking-tight text-slate-950 leading-[1.12]">
            Your Idea Deserves a <span className="gradient-text-playful block sm:inline">Bigger Journey</span>
          </h2>
          <p className="text-slate-600 text-[11px] sm:text-[12px] font-semibold leading-relaxed mt-1 sm:mt-1.5 max-w-[320px]">
            Track founder evolution and tangible institutional milestones across each cleared stage.
          </p>
        </div>

        {/* Dynamic Glowing Guideline Leading Down to Speech Bubble Underneath */}
        {!isAllStagesView && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-visible"
            viewBox="0 0 1360 701"
          >
            <defs>
              <filter id="glow-beam-v4" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Downward connecting guideline from active dot to bottom edge */}
            <path
              d={`M ${currentStage.dotPxX} ${currentStage.dotPxY} Q ${(currentStage.dotPxX + pointerPxX) / 2
                } ${currentStage.dotPxY + 45}, ${pointerPxX} 701`}
              fill="none"
              stroke={currentStage.color}
              strokeWidth="2.5"
              strokeDasharray="5 4"
              filter="url(#glow-beam-v4)"
              opacity="0.9"
            />
          </svg>
        )}

        {/* ─────────────────────────────────────────────────────────────
            ACCURATE 7 MILESTONE DOTS ALONG TRAIL CIRCLES
            ───────────────────────────────────────────────────────────── */}
        {JOURNEY_STAGES.map((stg) => {
          const isDotActive = !isAllStagesView && targetIdx === stg.id;
          return (
            <div
              key={stg.id}
              data-interactive="true"
              onClick={(e) => {
                e.stopPropagation();
                setStage(stg.id);
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
              style={{
                left: `${stg.xPct}%`,
                top: `${stg.yPct}%`,
                width: "36px",
                height: "36px",
              }}
              title={`${stg.label}: ${stg.title}`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* For Dot 0 (start of trail), render matching drawn milestone circle frame */}
                {stg.id === 0 && (
                  <div className="absolute w-[20px] h-[20px] rounded-full border-[2.5px] border-slate-900 bg-white shadow-2xs pointer-events-none" />
                )}

                {isDotActive && (
                  <>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0.9 }}
                      animate={{ scale: [1, 2.2, 1], opacity: [0.9, 0, 0.9] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full border-2 pointer-events-none"
                      style={{ borderColor: stg.color }}
                    />
                    <div
                      className="absolute w-5 h-5 rounded-full blur-xs opacity-80 pointer-events-none"
                      style={{ backgroundColor: stg.color }}
                    />
                  </>
                )}

                {/* Dot ring indicator matching trail circle */}
                <div
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full transition-all duration-200 border-2 border-white shadow-md flex items-center justify-center ${isDotActive
                    ? "scale-125 ring-2 ring-slate-900/30"
                    : "opacity-90 hover:opacity-100 hover:scale-120"
                    }`}
                  style={{ backgroundColor: stg.color }}
                >
                  {isDotActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SPACE UNDERNEATH THE IMAGE:
             Hosts the Speech Bubble OR the Combined 3D Curved Stepped Ramp
             ZERO OVERLAP onto the stickman illustration!
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[960px] mx-auto flex-1 flex items-center justify-center min-h-[220px] max-h-[290px] my-auto px-1 sm:px-2">
        <AnimatePresence mode="wait">
          {!isAllStagesView ? (
            /* ───────────────────────────────────────────────────────
               A. STAGE SPEECH BUBBLE (Underneath the image!)
               ─────────────────────────────────────────────────────── */
            <motion.div
              key={`bubble-${currentStage.id}`}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="speech-bubble-card relative w-full max-w-[920px] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Upward pointing Speech Bubble Pointer Beak */}
              <div
                className="absolute -top-2.5 w-5 h-5 bg-white transform rotate-45 border-t-2 border-l-2 shadow-2xs z-10 transition-all duration-300"
                style={{
                  left: `calc(${pointerX}% - 10px)`,
                  borderColor: `${currentStage.color}90`,
                }}
              />

              {/* Main Card Body */}
              <div
                className="relative bg-white/95 backdrop-blur-md rounded-2xl border-2 p-3 sm:p-4 shadow-xl transition-all"
                style={{
                  borderColor: `${currentStage.color}80`,
                  boxShadow: `0 14px 34px ${currentStage.color}20, 0 4px 12px rgba(15, 23, 42, 0.06)`,
                }}
              >
                {/* Top Row: Module Badge, TRL, Persona Role, and Transition Formula */}
                <div className="flex flex-wrap items-center justify-between gap-1.5 pb-1.5 mb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-black uppercase tracking-wider text-white shadow-xs"
                      style={{ backgroundColor: currentStage.color }}
                    >
                      {currentStage.label}
                    </span>
                    <span className="text-[10.5px] font-mono font-extrabold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {currentStage.trl}
                    </span>
                    <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-[10px] font-mono font-extrabold text-slate-800">
                      <span className="text-slate-500 font-bold">{currentStage.fromState}</span>
                      <ArrowRight size={10} className="text-slate-400 shrink-0" />
                      <span style={{ color: currentStage.color }} className="font-black">
                        {currentStage.toState}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10.5px] font-mono font-bold text-slate-500 uppercase tracking-tight">
                    {currentStage.stickmanDescription}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="text-left mb-2">
                  <h3 className="text-sm sm:text-base font-black text-slate-950 tracking-tight leading-snug">
                    {currentStage.title}
                  </h3>
                  <p className="text-[11.5px] sm:text-xs text-slate-600 font-semibold leading-relaxed mt-0.5">
                    {currentStage.tagline}
                  </p>
                </div>

                {/* 2-Column Tangible Outcomes Checklist */}
                <div className="text-left mb-2.5">
                  <span className="text-[9.5px] font-mono uppercase font-black text-slate-400 tracking-wider block mb-1">
                    TANGIBLE STAGE OUTCOMES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {currentStage.outcomes.map((item, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 flex items-start gap-1.5 leading-tight"
                      >
                        <CheckCircle2
                          size={13}
                          className="shrink-0 mt-0.5"
                          style={{ color: currentStage.color }}
                        />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Controls of Speech Bubble */}
                <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-500">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="hover:text-slate-950 flex items-center gap-0.5 cursor-pointer disabled:opacity-30 transition-colors"
                    disabled={targetIdx === 0}
                  >
                    <ChevronLeft size={13} /> PREV
                  </button>

                  {/* Dot Progression Mini Indicator */}
                  <div className="flex items-center gap-1.5">
                    {JOURNEY_STAGES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStage(s.id)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${targetIdx === s.id ? "scale-135" : "opacity-40 hover:opacity-80"
                          }`}
                        style={{ backgroundColor: s.color }}
                        title={s.pillLabel}
                      />
                    ))}
                    <span className="text-[10px] text-slate-400 font-bold ml-1">
                      {currentStage.id + 1}/7
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="font-black hover:text-slate-950 flex items-center gap-0.5 cursor-pointer transition-colors"
                    style={{ color: currentStage.color }}
                  >
                    {currentStage.id === 6 ? "VIEW 3D PATH ✦" : "NEXT →"}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ───────────────────────────────────────────────────────
               B. COMBINED 3D CURVED GROWING SHAPE
               - "growing bigger each step in curve but not overlap image"
               - "completely connected together with smooth edges not corners in each"
               - "it will only have four corners rest is sticked together according to the dots"
               ─────────────────────────────────────────────────────── */
            /* ───────────────────────────────────────────────────────
               B. FREESTANDING 3D GROWING STEPPED COLUMNS (UNCONTAINERIZED)
               - "dont containerize": NO outer container box, NO surrounding border, NO card!
               - Columns rise directly from the floor, growing bigger each step along the curve
               - Stuck together side-by-side with flush translucent glass dividers
               - 3D top specular bevel rim on each rising step
               ─────────────────────────────────────────────────────── */
            <motion.div
              key="all-stages-3d-growing-steps"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="interactive-3d-bar relative w-full max-w-[960px] pointer-events-auto select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* UNCONTAINERIZED: Freestanding 3D Growing Columns Stuck Together (NO OUTER BOX!) */}
              <div className="w-full flex items-end justify-center h-[235px]">
                {JOURNEY_STAGES.map((stg, i) => {
                  const curveHeights = [38, 48, 58, 68, 79, 89, 100];
                  const heightPct = curveHeights[i];
                  const isFirst = i === 0;
                  const isLast = i === JOURNEY_STAGES.length - 1;

                  return (
                    <div
                      key={stg.id}
                      data-interactive="true"
                      onClick={() => setStage(stg.id)}
                      style={{
                        height: `${heightPct}%`,
                        background: `linear-gradient(180deg, ${stg.color} 0%, ${stg.darkColor} 100%)`,
                        filter: `drop-shadow(0 14px 22px ${stg.color}35)`,
                      }}
                      className={`
                        flex-1 flex flex-col justify-between p-1.5 sm:p-2 pb-2.5 cursor-pointer relative group transition-all duration-200 
                        border-r border-white/20 last:border-r-0 select-none overflow-hidden
                        ${isFirst ? "rounded-t-xl rounded-bl-2xl" : "rounded-t-xl"}
                        ${isLast ? "rounded-t-xl rounded-br-2xl" : ""}
                        hover:-translate-y-1 hover:brightness-105
                      `}
                    >
                      {/* 3D Top Bevel / Specular Rim on top of each step */}
                      <div
                        className="absolute top-0 left-0 right-0 h-2.5 sm:h-3 pointer-events-none overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.15) 100%)",
                          boxShadow: "0 1px 3px rgba(255,255,255,0.7)",
                        }}
                      />

                      {/* Hover Spotlight Sheen */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition-colors pointer-events-none" />

                      {/* Top: Module Badge & TRL */}
                      <div className="relative z-10 flex items-center justify-between gap-1 w-full pt-1">
                        <span className="font-mono text-[8.5px] sm:text-[9.5px] font-black uppercase text-white bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs shadow-2xs shrink-0">
                          {stg.pillLabel}
                        </span>
                        <span className="font-mono text-[7px] sm:text-[8px] font-bold text-white/90 truncate">
                          {stg.trl}
                        </span>
                      </div>

                      {/* Middle: Short Title & Milestone Focus */}
                      <div className="relative z-10 py-0.5 my-auto text-left">
                        <h4 className="font-black text-[10.5px] sm:text-[12px] text-white leading-tight drop-shadow-xs group-hover:scale-102 transition-transform truncate">
                          {stg.shortTitle}
                        </h4>
                        <span className="text-[7.5px] sm:text-[8.5px] font-mono font-bold text-white/80 block truncate mt-0.5">
                          {stg.focusTitle}
                        </span>
                      </div>

                      {/* Bottom: Milestone Progression Indicator */}
                      <div className="relative z-10 w-full pt-1 border-t border-white/25 flex items-center justify-between text-white">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span className="text-[7.5px] sm:text-[8.5px] font-mono font-black text-white/95">
                            {stg.barHeightPct}%
                          </span>
                        </div>
                        <span className="text-[9px] text-white/85 group-hover:translate-x-0.5 transition-transform font-bold">
                          {isLast ? "★" : "↗"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3D Multi-Color Ambient Floor Glow */}
              <div
                className="w-[94%] h-3.5 mx-auto rounded-full blur-md -mt-1 opacity-70"
                style={{
                  background:
                    "linear-gradient(90deg, #00B4D8 0%, #10B981 16%, #EC4899 33%, #8B5CF6 50%, #F97316 66%, #EAB308 83%, #06B6D4 100%)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. FOOTER CONTROLS & BREADCRUMB INSTRUCTIONS
          ───────────────────────────────────────────────────────────── */}
      <div className="text-center pt-0.5 pb-0.5 shrink-0 flex flex-col items-center">
        {isAllStagesView ? (
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] sm:text-xs font-black text-[#0284C7] tracking-wider uppercase">
                CATALYTIX 7-STAGE PROGRESSION
              </span>
              <span className="text-xs text-slate-300 font-bold">•</span>
              <span className="text-xs sm:text-[13px] font-extrabold text-slate-900">
                All milestones verified. Ready for institutional venture scaling.
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-500 font-semibold">

            </p>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full max-w-[920px] px-2 text-xs font-mono font-bold text-slate-500">
            <button
              type="button"
              onClick={handlePrev}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-30"
              disabled={targetIdx === 0}
            >
              <span>←</span> PREV
            </button>

            <span className="text-slate-400 text-[11px]">
              STAGE {currentStage.id + 1} OF 7
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer font-black text-slate-900"
            >
              {currentStage.id === 6 ? "VIEW 3D PATH ✦" : "NEXT →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
