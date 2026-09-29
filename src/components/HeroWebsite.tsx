"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import Wordmark from './Wordmark';
import GridTilesBackground from './GridTilesBackground';
import LiquidGlass from './LiquidGlass';
import ClickSpark from './reactbits/ClickSpark';
import SpotlightCard from './reactbits/SpotlightCard';
import Magnet from './reactbits/Magnet';
import ShinyText from './reactbits/ShinyText';
import CountUp from './reactbits/CountUp';
import StarBorder from './reactbits/StarBorder';
import Icons8 from './Icons8';

interface HeroWebsiteProps {
  isIncoming?: boolean;
}

export default function HeroWebsite({ isIncoming = true }: HeroWebsiteProps) {
  // Presentation steps:
  // 0: Slide 1 - Hero & Pillars (#overview)
  // 1: Slide 2 - Institutional Venture Engine & SpaceTech (#engine)
  // 2: Slide 3 - Curriculum Module 1 (#curriculum)
  // 3: Slide 3 - Curriculum Module 2
  // 4: Slide 3 - Curriculum Module 3
  // 5: Slide 3 - Curriculum Module 4
  // 6: Slide 3 - Curriculum Module 5
  // 7: Slide 4 - 4-Stage Incubation Lifecycle (#lifecycle)
  // 8: Slide 5 - Build What's Next CTA, Ecosystem & Big Bold CATALYTIX (#cta)
  const [presentationStep, setPresentationStep] = useState<number>(0);
  const [activeModule, setActiveModule] = useState<number>(1);

  // Section Refs for smooth scrolling
  const overviewRef = useRef<HTMLElement>(null);
  const engineRef = useRef<HTMLElement>(null);
  const curriculumRef = useRef<HTMLElement>(null);
  const lifecycleRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Incoming animation refs
  const headerRef = useRef<HTMLElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroPillarsRef = useRef<HTMLDivElement>(null);

  // Handle slide transitions and smooth scroll
  useEffect(() => {
    if (presentationStep === 0) {
      overviewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (presentationStep === 1) {
      engineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (presentationStep >= 2 && presentationStep <= 6) {
      const mod = presentationStep - 1; // 1, 2, 3, 4, 5
      setActiveModule(mod);
      curriculumRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (presentationStep === 7) {
      lifecycleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (presentationStep === 8) {
      ctaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [presentationStep]);

  // Advance to next presentation slide / module
  const advanceStep = useCallback(() => {
    setPresentationStep((prev) => {
      if (prev >= 8) return 8;
      return prev + 1;
    });
  }, []);

  // Regress to previous presentation slide / module
  const regressStep = useCallback(() => {
    setPresentationStep((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  }, []);

  // Global mouse click and keyboard navigation listener
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Advance on main left mouse button click
      if (e.button !== 0) return;

      // Do not hijack interactive elements like links or buttons
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, input, select, textarea, [data-interactive="true"]')) {
        return;
      }

      advanceStep();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        advanceStep();
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        regressStep();
      }
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [advanceStep, regressStep]);

  // Incoming elements transition on initial reveal
  useEffect(() => {
    if (!isIncoming) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headerRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75 },
        0
      );

      tl.fromTo(
        heroBadgeRef.current,
        { scale: 0.85, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.5)' },
        0.12
      );

      tl.fromTo(
        heroTitleRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.22
      );

      tl.fromTo(
        heroSubtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.35
      );

      tl.fromTo(
        heroCtaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.48
      );

      if (heroPillarsRef.current) {
        tl.fromTo(
          heroPillarsRef.current.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, stagger: 0.08 },
          0.58
        );
      }
    });

    return () => ctx.revert();
  }, [isIncoming]);

  const curriculumModules = [
    {
      num: '01',
      title: 'Module 1: Venture Formation & Applied Prototyping',
      shortTitle: 'M1: Venture Formation',
      focus: 'MVP Design & Early Tech Validation',
      masterclasses: ['Product Architecture', 'MVP vs Prototype', 'IP & Patent 101'],
      activities: ['Figma UI System', '3D Printing & IoT Sprint', 'Product Roadmap', 'Lean Canvas Matrix'],
      review: 'Weekly prototype reviews & diagnostic scorecards',
      tag: 'TRL 1 - 3',
      color: '#00B4D8',
    },
    {
      num: '02',
      title: 'Module 2: TRL & Innovation Verification',
      shortTitle: 'M2: TRL Verification',
      focus: 'Tech Feasibility & Risk De-biasing',
      masterclasses: ['TRL Benchmarking', 'DeepTech Lab Prototyping', 'System Architecture'],
      activities: ['Component Stress Testing', 'Makerspace Fabrication', 'Patent Search Matrix'],
      review: 'BHF Technical Advisory Committee Gate',
      tag: 'TRL 3 - 4',
      color: '#16A34A',
    },
    {
      num: '03',
      title: 'Module 3: Market Discovery & ICP Validation',
      shortTitle: 'M3: Market Discovery',
      focus: 'User Research & Pilot Positioning',
      masterclasses: ['Customer Discovery Sprints', 'B2B Pilot Structuring', 'Pricing Strategy'],
      activities: ['30 Founder Interviews', 'Pilot Agreement Draft', 'Competitor Teardown'],
      review: 'Go-To-Market Feasibility Audit',
      tag: 'TRL 4 - 5',
      color: '#DB2777',
    },
    {
      num: '04',
      title: 'Module 4: Business Model & Governance',
      shortTitle: 'M4: Unit Economics',
      focus: 'Unit Economics, Pricing & Legal Scaffolding',
      masterclasses: ['Financial Modeling', 'Cap Table Scaffolding', 'Compliance & DPIIT Grant Filing'],
      activities: ['Unit Economics Model', 'Data Room Prep', 'Term Sheet Scenarios'],
      review: 'Institutional Investment Committee Gate',
      tag: 'TRL 5 - 6',
      color: '#7C3AED',
    },
    {
      num: '05',
      title: 'Module 5: Investment Readiness & Growth',
      shortTitle: 'M5: Venture Syndication',
      focus: 'Venture Pitching, Seed Syndicates & Scaling',
      masterclasses: ['Venture Capital Pitch Deck', 'Due Diligence Navigation', 'Growth Loops'],
      activities: ['Pitch Deck Polish', 'Live Mock Pitch with EIRs', 'Seed Round Data Room'],
      review: 'CatalytiX Demo Day Final Gate',
      tag: 'TRL 6 - 9',
      color: '#D97706',
    },
  ];

  const lifecycleStages = [
    {
      step: '01',
      stageTag: 'TRL 1 - 2',
      title: 'Intake, Diagnostics & Baseline Assessment',
      subtitle: 'Comprehensive audit of founder team, technical hypothesis, intellectual property, and venture viability.',
      milestones: [
        'Submission through Bennett Hatchery Portal with baseline pitch deck.',
        'Initial technical and market feasibility screening by CIE Selection Board.',
        'Diagnostic scorecard mapping team readiness, TRL stage, and milestone targets.',
        'Official admission into the 12-month incubation track.',
      ],
      badge: 'Admission Gate',
      badgeColor: '#00B4D8',
    },
    {
      step: '02',
      stageTag: 'TRL 3 - 4',
      title: 'Engineering Build, Makerspace & IP Scaffolding',
      subtitle: 'Dedicated prototyping runway leveraging Bennett university laboratories, CAD/CAM suites, and patent filing.',
      milestones: [
        'Access to 12+ specialized engineering and computational labs.',
        'Fortnightly diagnostic sprints with marquee industry mentors.',
        'TRL advancement from bench prototype to functional proof-of-concept.',
        'Provisional patent filing and IP assignment scaffolding.',
      ],
      badge: 'Proof of Concept Gate',
      badgeColor: '#16A34A',
    },
    {
      step: '03',
      stageTag: 'TRL 5 - 6',
      title: 'Market Pilot, Customer Trials & Grant Unlocking',
      subtitle: 'Deploying commercial pilots with enterprise partners and unlocking government seed grant tranches.',
      milestones: [
        'Structured customer discovery: minimum 25 validated stakeholder interviews.',
        'Execution of letters of intent (LOI) or paid enterprise pilot contracts.',
        'Fast-track non-dilutive seed funding through SISFS and UP StartinUP.',
        'Mid-term milestone audit before the Bennett Hatchery Governance Board.',
      ],
      badge: 'Commercial Pilot Gate',
      badgeColor: '#DB2777',
    },
    {
      step: '04',
      stageTag: 'TRL 7 - 9',
      title: 'Growth Velocity, Demo Day & Venture Syndication',
      subtitle: 'Scaling market traction and syndicating institutional seed and pre-Series A rounds with leading funds.',
      milestones: [
        'Institutional data room preparation with verified unit economics.',
        'Investor readiness coaching with prominent EIRs and Angel Networks.',
        'Achieve measurable customer validation and revenue benchmarks.',
        'Live stage pitching before angel syndicates and VC funds at Hatchery Demo Day.',
      ],
      badge: 'Seed Demo Day ★',
      badgeColor: '#D97706',
    },
  ];

  const initialHiddenStyle = !isIncoming ? { opacity: 0 } : undefined;

  return (
    <ClickSpark
      sparkColor={['#00F0FF', '#FF2E93', '#7cff67', '#0284c7', '#d97706']}
      sparkCount={10}
      sparkRadius={24}
      className="relative w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-[#FF2E93] selection:text-white select-none"
    >
      {/* 2D Soft Tiles Grid Background on pure white */}
      <GridTilesBackground />

      {/* Floating Top Header Navigation */}
      <div className="fixed top-2.5 left-0 right-0 z-40 w-full px-3 pointer-events-none">
        <LiquidGlass
          as="header"
          ref={headerRef}
          style={initialHiddenStyle}
          className="liquid-glass-header w-full max-w-[min(100vw,100vh)] mx-auto rounded-2xl px-4 sm:px-6 py-2.5 transition-all shadow-sm pointer-events-auto"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <Magnet padding={30} magnetStrength={4}>
                <button
                  onClick={() => setPresentationStep(0)}
                  className="cursor-pointer text-left"
                >
                  <Wordmark size="sm" colorScheme="playful" markFill="#0f172a" />
                </button>
              </Magnet>
              <nav className="hidden sm:flex items-center gap-5 text-xs sm:text-sm font-bold text-slate-700">
                <button
                  onClick={() => setPresentationStep(0)}
                  className="hover:text-slate-950 transition-colors cursor-pointer"
                >
                  Overview
                </button>
                <button
                  onClick={() => setPresentationStep(1)}
                  className="hover:text-slate-950 transition-colors cursor-pointer"
                >
                  Venture Engine
                </button>
                <button
                  onClick={() => setPresentationStep(2)}
                  className="hover:text-slate-950 transition-colors cursor-pointer"
                >
                  Curriculum
                </button>
                <button
                  onClick={() => setPresentationStep(7)}
                  className="hover:text-slate-950 transition-colors cursor-pointer"
                >
                  Lifecycle
                </button>
                <button
                  onClick={() => setPresentationStep(8)}
                  className="hover:text-slate-950 transition-colors cursor-pointer"
                >
                  CatalytiX Scale
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Magnet padding={25} magnetStrength={3}>
                <StarBorder
                  color="#00B4D8"
                  speed="4.5s"
                  thickness={1.5}
                  className="!rounded-full border border-cyan-200/60 shadow-sm"
                >
                  <LiquidGlass
                    as="a"
                    href="https://forms.gle/bennett-incubation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-liquid-glass-tinted-cyan text-xs sm:text-sm font-bold !py-2 !px-4 inline-flex items-center gap-1.5"
                  >
                    <span>Apply</span>
                    <Icons8 name="externalLink" size={13} color="0284C7" />
                  </LiquidGlass>
                </StarBorder>
              </Magnet>
            </div>
          </div>
        </LiquidGlass>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 1: Hero Section & 2x2 Value Pillars Bento
          Logos above badge, larger text, taking full 1:1 space!
          ───────────────────────────────────────────────────────────── */}
      <section
        id="overview"
        ref={overviewRef}
        className="relative z-10 w-full max-w-[min(100vw,100vh)] min-h-screen max-h-screen mx-auto px-4 sm:px-6 flex flex-col justify-between pt-16 sm:pt-20 pb-4 text-center overflow-hidden"
      >
        <div className="flex flex-col items-center my-auto w-full px-2 sm:px-4">
          {/* LOGOS ABOVE BADGE: Much bigger, prominent, wide & taking full presence */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 md:gap-16 mb-4 w-full">
            <img
              src="/bennett-logo.png"
              alt="Bennett University"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto max-w-[42%] object-contain hover:scale-105 transition-transform drop-shadow-sm"
            />
            <div className="h-10 sm:h-14 md:h-18 w-[1.5px] bg-slate-300 shrink-0" />
            <img
              src="/logo.png"
              alt="Bennett Hatchery Foundation"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto max-w-[42%] object-contain hover:scale-105 transition-transform drop-shadow-sm"
            />
          </div>

          {/* Release Pill Badge: Wider, bolder, full visibility */}
          <div ref={heroBadgeRef} style={initialHiddenStyle} className="mb-4 w-full flex justify-center">
            <Magnet padding={25} magnetStrength={3}>
              <div className="badge-pill-light cursor-pointer hover:border-cyan-400/50 transition-all shadow-sm border border-slate-200/90 text-xs sm:text-sm md:text-base font-black py-2 px-5 sm:px-8">
                <span className="flex h-2.5 w-2.5 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
                <span className="text-slate-900 font-extrabold tracking-wide">BENNETT HATCHERY FOUNDATION // DPIIT</span>
                <span className="text-[#0284C7] font-black flex items-center gap-1.5 shrink-0">
                  <span>COHORT 2026</span>
                  <Icons8 name="chevronRight" size={15} color="0284C7" />
                </span>
              </div>
            </Magnet>
          </div>

          {/* Big Bold CatalytiX Title with Small Incubation Program Label (Swapped Places) */}
          <h1
            ref={heroTitleRef}
            style={initialHiddenStyle}
            className="w-full text-center mb-3.5 select-none"
          >
            <span className="font-asimovian gradient-text-playful block text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[7.8rem] font-black tracking-tight leading-[0.95] mb-2">
              CatalytiX
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Incubation Program
            </span>
          </h1>

          {/* Subtitle: Full width, larger, bolder, filling 1:1 space */}
          <p
            ref={heroSubtitleRef}
            style={initialHiddenStyle}
            className="w-full max-w-4xl px-2 sm:px-4 text-base sm:text-xl lg:text-2xl text-slate-700 font-bold mb-6 leading-relaxed sm:leading-snug"
          >
            A comprehensive institutional venture runway empowering early and growth-stage startups with seed capital,
            state-of-the-art makerspaces, marquee mentorship, and direct access to top-tier venture funds.
          </p>

          {/* Call to Actions: Larger buttons spreading wide across horizontal space */}
          <div
            ref={heroCtaRef}
            style={initialHiddenStyle}
            className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6"
          >
            <Magnet padding={35} magnetStrength={3}>
              <StarBorder color="#00F0FF" speed="3.5s" thickness={2} className="!rounded-full shadow-lg">
                <LiquidGlass
                  as="a"
                  displacement={true}
                  href="https://forms.gle/bennett-incubation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid-glass-tinted-cyan !py-4 sm:!py-4.5 !px-8 sm:!px-12 text-base sm:text-lg font-black shadow-md inline-flex items-center gap-3"
                >
                  <Icons8 name="rocket" size={20} color="090D16" />
                  <span>Apply for Incubation</span>
                </LiquidGlass>
              </StarBorder>
            </Magnet>

            <Magnet padding={30} magnetStrength={3}>
              <LiquidGlass
                as="a"
                href="https://bennett-university-hatchery.vercel.app/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-glass-crystal !py-4 sm:!py-4.5 !px-8 sm:!px-12 text-base sm:text-lg font-black border border-slate-300 inline-flex items-center gap-3 shadow-sm"
              >
                <Icons8 name="briefcase" size={19} color="0284C7" />
                <span>Explore 80+ Startups</span>
              </LiquidGlass>
            </Magnet>
          </div>
        </div>

        {/* 2x2 Bento Grid: Core Value Pillars (Substantially Larger to Anchor 1:1 Canvas) */}
        <div
          ref={heroPillarsRef}
          style={initialHiddenStyle}
          className="w-full grid grid-cols-2 gap-3 sm:gap-3.5 text-left mb-2"
        >
          {/* Pillar 1 */}
          <SpotlightCard
            spotlightColor="rgba(0, 180, 216, 0.16)"
            borderGlowColor="rgba(0, 180, 216, 0.4)"
            className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-4 sm:p-5 rounded-3xl min-h-[125px] sm:min-h-[140px] flex flex-col justify-between h-full border border-slate-200/90">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-mono text-[#0284C7] font-black uppercase tracking-wider">
                  Framework
                </span>
                <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200/60 flex items-center justify-center">
                  <Icons8 name="layers" size={17} color="0284C7" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 flex items-baseline gap-1.5">
                  <CountUp to={5} duration={1.2} />
                  <span>Modules</span>
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 truncate">Roadmap // TRL 1 to 9</p>
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* Pillar 2 */}
          <SpotlightCard
            spotlightColor="rgba(22, 163, 74, 0.16)"
            borderGlowColor="rgba(22, 163, 74, 0.4)"
            className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-4 sm:p-5 rounded-3xl min-h-[125px] sm:min-h-[140px] flex flex-col justify-between h-full border border-slate-200/90">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-mono text-[#16A34A] font-black uppercase tracking-wider">
                  Duration
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
                  <Icons8 name="zap" size={17} color="16A34A" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 flex items-baseline gap-1.5">
                  <span>Upto</span>
                  <CountUp to={12} duration={1.5} />
                  <span>Months</span>
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 truncate">Acceleration Cycle // Makerspace Labs</p>
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* Pillar 3 */}
          <SpotlightCard
            spotlightColor="rgba(219, 39, 119, 0.16)"
            borderGlowColor="rgba(219, 39, 119, 0.4)"
            className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-4 sm:p-5 rounded-3xl min-h-[125px] sm:min-h-[140px] flex flex-col justify-between h-full border border-slate-200/90">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-mono text-[#DB2777] font-black uppercase tracking-wider">
                  Mentorship
                </span>
                <div className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-200/60 flex items-center justify-center">
                  <Icons8 name="sparkles" size={17} color="DB2777" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 flex items-baseline gap-1.5">
                  <CountUp to={120} duration={1.8} suffix="+" />
                  <span>Mentors</span>
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 truncate">Fortnightly Progress Audits</p>
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* Pillar 4 */}
          <SpotlightCard
            spotlightColor="rgba(217, 119, 6, 0.16)"
            borderGlowColor="rgba(217, 119, 6, 0.4)"
            className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-4 sm:p-5 rounded-3xl min-h-[125px] sm:min-h-[140px] flex flex-col justify-between h-full border border-slate-200/90">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs sm:text-sm font-mono text-[#D97706] font-black uppercase tracking-wider">
                  Tech Readiness
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                  <Icons8 name="target" size={17} color="D97706" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  TRL 3 - 6
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 truncate">IP &amp; Tech Validation // SISFS Grants</p>
              </div>
            </LiquidGlass>
          </SpotlightCard>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 2: Institutional Venture Engine + SpaceTech Flagship
          All integrated into one 1:1 Square View
          ───────────────────────────────────────────────────────────── */}
      <section
        id="engine"
        ref={engineRef}
        className="relative z-10 w-full max-w-[min(100vw,100vh)] min-h-screen max-h-screen mx-auto px-4 sm:px-6 flex flex-col justify-center py-4 border-t border-slate-200/90 overflow-hidden"
      >
        <div className="space-y-3 sm:space-y-3.5">
          {/* Row 1: Engine Thesis & Impact Telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
            {/* Left Engine Thesis */}
            <SpotlightCard
              spotlightColor="rgba(2, 132, 199, 0.12)"
              borderGlowColor="rgba(2, 132, 199, 0.35)"
              className="rounded-3xl border border-slate-200/90 shadow-sm"
            >
              <LiquidGlass className="liquid-glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between h-full border border-slate-200/90 min-h-[260px] sm:min-h-[290px]">
                <div className="space-y-2">
                  <div className="badge-pill-light text-[#0284C7] font-bold inline-flex items-center gap-1.5 border border-slate-200/90 shadow-sm text-xs py-1 px-3">
                    <Icons8 name="building" size={14} color="0284C7" /> Institutional Venture Engine
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-slate-950">
                    Building Scalable Enterprises with{' '}
                    <span className="gradient-text-cool">Deep Support</span>.
                  </h2>
                  <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                    The Bennett Hatchery Foundation (BHF) is a DPIIT-recognized, world-class incubator designed to take
                    high-potential concepts and early-stage ventures from TRL 1 validation all the way to commercial growth.
                  </p>
                  <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
                    Operating with funding like <strong className="text-slate-950 font-bold">Startup India Seed Fund (SISFS)</strong> and{' '}
                    <strong className="text-slate-950 font-bold">UP StartinUP</strong>, we de-risk venture scaling.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {[
                    '✓ DPIIT Recognized',
                    '✓ SISFS Partner (Startup India)',
                    '✓ UP StartinUP Ecosystem',
                    '✓ 12+ Makerspace Labs',
                  ].map((chip, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-900 cursor-default"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </LiquidGlass>
            </SpotlightCard>

            {/* Right Impact Card */}
            <SpotlightCard
              spotlightColor="rgba(0, 240, 255, 0.16)"
              borderGlowColor="rgba(0, 240, 255, 0.4)"
              className="rounded-3xl"
            >
              <LiquidGlass className="liquid-glass-card p-5 sm:p-6 rounded-3xl flex flex-col justify-between h-full border border-cyan-200/60 bg-gradient-to-br from-white via-slate-50/70 to-cyan-50/30 min-h-[260px] sm:min-h-[290px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs sm:text-sm font-mono text-slate-700 font-extrabold uppercase tracking-wider">
                      Hatchery Impact Telemetry
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                      <CountUp
                        to={80}
                        duration={2}
                        suffix="+"
                        className="font-mono text-3xl sm:text-4xl font-black text-[#00B4D8] block mb-0.5"
                      />
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-950">Startups</h4>
                      <p className="text-xs text-slate-600 font-semibold">DeepTech &amp; Space</p>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                      <CountUp
                        to={2}
                        duration={1.8}
                        prefix="₹"
                        suffix="+ Cr"
                        className="font-mono text-3xl sm:text-4xl font-black text-[#16A34A] block mb-0.5"
                      />
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-950">Grants</h4>
                      <p className="text-xs text-slate-600 font-semibold">Non-dilutive seed</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200/90">
                    <p className="text-xs sm:text-sm italic font-semibold text-slate-900 leading-snug">
                      &ldquo;A catalyst for disruptive innovation — turning ambitious ideas into market leaders with world-class labs, capital velocity, and governance.&rdquo;
                    </p>
                    <span className="text-xs font-bold text-[#0284C7] block mt-1">
                      — Bennett Hatchery Foundation Advisory Board
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-700">
                  <ShinyText
                    text="STATUS: ADMISSIONS OPEN"
                    speed={3}
                    color="#334155"
                    shineColor="#00B4D8"
                    className="font-bold"
                  />
                  <span className="text-[#16A34A] font-black">2026 ACTIVE</span>
                </div>
              </LiquidGlass>
            </SpotlightCard>
          </div>

          {/* Row 2: Telemetry Strip (4 items) */}
          <LiquidGlass className="liquid-glass-card p-3 rounded-2xl w-full grid grid-cols-4 gap-2 border border-slate-200/90 shadow-sm">
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
              <Icons8 name="building" size={17} color="00B4D8" />
              <div className="truncate">
                <span className="text-[10px] font-mono text-slate-600 uppercase font-extrabold block truncate">Governance</span>
                <span className="text-xs sm:text-sm font-black text-slate-950 truncate block">Bennett &amp; CIE</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
              <Icons8 name="cpu" size={17} color="16A34A" />
              <div className="truncate">
                <span className="text-[10px] font-mono text-slate-600 uppercase font-extrabold block truncate">Makerspace Suite</span>
                <span className="text-xs sm:text-sm font-black text-slate-950 truncate block">12+ Engineering Labs</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
              <Icons8 name="trendingUp" size={17} color="DB2777" />
              <div className="truncate">
                <span className="text-[10px] font-mono text-slate-600 uppercase font-extrabold block truncate">Active Cohort</span>
                <span className="text-xs sm:text-sm font-black text-slate-950 truncate block">Rolling Quarterly Intake</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
              <Icons8 name="shield" size={17} color="D97706" />
              <div className="truncate">
                <span className="text-[10px] font-mono text-slate-600 uppercase font-extrabold block truncate">Recognition</span>
                <span className="text-xs sm:text-sm font-black text-slate-950 truncate block">DPIIT &amp; Startup India</span>
              </div>
            </div>
          </LiquidGlass>

          {/* Row 3: SpaceTech Cohort Spotlight */}
          <SpotlightCard
            spotlightColor="rgba(255, 46, 147, 0.16)"
            borderGlowColor="rgba(255, 46, 147, 0.4)"
            className="rounded-3xl border border-slate-200/90 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-4 sm:p-5 rounded-3xl relative overflow-hidden border border-cyan-300/60 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 max-w-md">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-100/90 border border-cyan-200 text-xs font-mono font-extrabold text-[#0284C7]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
                    <span>SpaceTech Flagship // Cohort 2026 Active</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-950 tracking-tight leading-snug">
                    Bennett Hatchery SpaceTech Cohort
                  </h3>
                  <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2">
                    India&apos;s space sector is opening up. The next opportunity is to build. The SpaceTech Venture Cohort is a dedicated venture-building platform for students, researchers, and early-stage innovators to explore problems, validate technologies, and build scalable deeptech enterprises.
                  </p>
                </div>

                <Magnet padding={25} magnetStrength={3}>
                  <StarBorder color="#FF2E93" speed="3.8s" thickness={2} className="!rounded-full shadow-sm shrink-0 border border-pink-200/60">
                    <LiquidGlass
                      as="a"
                      displacement={true}
                      href="https://bennett-university-hatchery.vercel.app/programs/spacetech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-liquid-glass-tinted-pink whitespace-nowrap !py-2.5 !px-5 text-xs sm:text-sm font-extrabold shadow-sm shrink-0 block"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <span>Explore Space Cohort</span>
                        <Icons8 name="arrowRight" size={13} color="FFFFFF" />
                      </span>
                    </LiquidGlass>
                  </StarBorder>
                </Magnet>
              </div>
            </LiquidGlass>
          </SpotlightCard>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 3: The CatalytiX Venture Curriculum
          Bigger Vertically to Fill 1:1 Canvas
          ───────────────────────────────────────────────────────────── */}
      <section
        id="curriculum"
        ref={curriculumRef}
        className="relative z-10 w-full max-w-[min(100vw,100vh)] min-h-screen max-h-screen mx-auto px-4 sm:px-6 flex flex-col justify-center py-4 border-t border-slate-200/90 overflow-hidden"
      >
        <div className="text-center mb-3 sm:mb-4">
          <div className="badge-pill-light mb-1.5 text-[#16A34A] font-bold inline-flex items-center gap-1.5 border border-slate-200/90 shadow-sm text-xs sm:text-sm font-bold py-1 px-3.5">
            <Icons8 name="layers" size={14} color="16A34A" /> TRL 1 - 9 PIPELINE // STRUCTURED ROADMAP
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1.5 text-slate-950">
            The <span className="gradient-text-playful">CatalytiX</span> Venture Curriculum
          </h2>
          <p className="text-slate-700 max-w-xl mx-auto text-xs sm:text-sm font-semibold leading-relaxed">
            A 5-stage progressive curriculum guiding founders from MVP prototyping to traction and scale.
          </p>
        </div>

        {/* 5 Module Selector Tabs */}
        <div className="grid grid-cols-5 gap-2 mb-3.5 w-full">
          {curriculumModules.map((m, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveModule(idx + 1);
                setPresentationStep(idx + 2);
              }}
              className={`p-3 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer text-left flex flex-col justify-between min-h-[72px] sm:min-h-[80px] border ${
                activeModule === idx + 1
                  ? 'bg-white text-slate-950 border-slate-400 shadow-md ring-2 ring-cyan-400/40'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-950 border-slate-200 hover:bg-slate-200/80'
              }`}
            >
              <span style={{ color: m.color }} className="font-extrabold text-xs uppercase tracking-wider block">
                MOD {m.num}
              </span>
              <span className="text-xs sm:text-sm truncate font-black text-slate-900">{m.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Active Module Details Card - Bigger Vertically */}
        {(() => {
          const mod = curriculumModules[activeModule - 1];
          return (
            <SpotlightCard
              spotlightColor={`${mod.color}1e`}
              borderGlowColor={`${mod.color}55`}
              className="rounded-3xl w-full border border-slate-200/90 shadow-md"
            >
              <LiquidGlass className="liquid-glass-card p-5 sm:p-7 rounded-3xl border border-slate-200/90 shadow-md w-full flex flex-col justify-between min-h-[380px] sm:min-h-[420px]">
                <div>
                  <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-200 mb-4">
                    <div>
                      <span
                        className="font-mono text-xs sm:text-sm uppercase tracking-wider px-3.5 py-1 rounded-full bg-slate-100 font-black mr-2 inline-block border border-slate-200"
                        style={{ color: mod.color }}
                      >
                        MODULE {mod.num}
                      </span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-slate-700 uppercase">
                        {mod.tag}
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 mt-1">
                        {mod.title}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase font-black block">PRIMARY FOCUS</span>
                      <span className="text-xs sm:text-sm font-black text-slate-950">
                        {mod.focus}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    {/* Masterclasses */}
                    <div className="space-y-2">
                      <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-slate-700 font-extrabold flex items-center gap-1.5">
                        <Icons8 name="terminal" size={15} color="00B4D8" /> MASTERCLASSES
                      </h4>
                      <ul className="space-y-1.5">
                        {mod.masterclasses.map((item, i) => (
                          <li key={i} className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Workshops / Activities */}
                    <div className="space-y-2">
                      <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-slate-700 font-extrabold flex items-center gap-1.5">
                        <Icons8 name="activity" size={15} color="16A34A" /> WORKSHOPS &amp; SPRINTS
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {mod.activities.map((item, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-slate-900"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Review & Deliverable */}
                    <div className="space-y-2">
                      <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-slate-700 font-extrabold flex items-center gap-1.5">
                        <Icons8 name="shield" size={15} color="D91B74" /> REVIEW GATE
                      </h4>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                        <p className="text-xs sm:text-sm font-black text-slate-950 mb-1">Evaluation Gate:</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">{mod.review}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Policy Footer Notes */}
                <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs font-mono font-bold text-slate-700">
                  <span>• Program can be renewed subject to approval from BHF governance</span>
                  <span>• Progress depends on stage completion &amp; diagnostic audit</span>
                </div>
              </LiquidGlass>
            </SpotlightCard>
          );
        })()}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 4: The 4-Stage Incubation Lifecycle
          Bigger Vertically to Fill 1:1 Canvas
          ───────────────────────────────────────────────────────────── */}
      <section
        id="lifecycle"
        ref={lifecycleRef}
        className="relative z-10 w-full max-w-[min(100vw,100vh)] min-h-screen max-h-screen mx-auto px-4 sm:px-6 flex flex-col justify-center py-4 border-t border-slate-200/90 overflow-hidden"
      >
        <div className="text-center mb-3 sm:mb-4">
          <div className="badge-pill-light mb-1.5 text-[#0284C7] font-bold inline-flex items-center gap-1.5 border border-slate-200/90 shadow-sm text-xs sm:text-sm font-bold py-1 px-3.5">
            <Icons8 name="compass" size={14} color="0284C7" /> STRUCTURED TIMELINE // ADMISSIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-1.5 text-slate-950">
            The 4-Stage <span className="gradient-text-cool">Incubation Lifecycle</span>
          </h2>
          <p className="text-slate-700 max-w-xl mx-auto text-xs sm:text-sm font-semibold leading-relaxed">
            A transition model guiding startups from initial screening to demo day syndication.
          </p>
        </div>

        {/* 2x2 Bento Grid: 4 Lifecycle Phases - Bigger Vertically */}
        <div className="grid grid-cols-2 gap-3 sm:gap-3.5 w-full">
          {lifecycleStages.map((stage, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor={`${stage.badgeColor}18`}
              borderGlowColor={`${stage.badgeColor}44`}
              className="rounded-3xl h-full border border-slate-200/90 shadow-sm"
            >
              <LiquidGlass
                className="liquid-glass-card p-4 sm:p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[190px] sm:min-h-[220px] h-full border border-slate-200/90 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="font-mono text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200"
                      style={{ color: stage.badgeColor }}
                    >
                      PHASE {stage.step}
                    </span>
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded border border-slate-200 bg-white"
                      style={{ color: stage.badgeColor }}
                    >
                      {stage.stageTag}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-950 mb-1 leading-snug">{stage.title}</h3>
                  <p className="text-xs text-slate-700 font-medium mb-2 leading-snug line-clamp-2">{stage.subtitle}</p>

                  <div className="space-y-1.5 pt-1.5 border-t border-slate-100">
                    <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider block font-black">
                      KEY MILESTONES:
                    </span>
                    <ul className="space-y-1">
                      {stage.milestones.slice(0, 2).map((m, mIdx) => (
                        <li key={mIdx} className="text-xs font-semibold text-slate-800 flex items-start gap-1.5 leading-snug">
                          <Icons8 name="check" size={13} color="00B4D8" className="mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold text-slate-700">
                  <span>BHF COUNCIL</span>
                  <span className="text-[#16A34A] font-black">{stage.badge}</span>
                </div>
              </LiquidGlass>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SLIDE 5: Final Comprehensive Section
          Build What's Next CTA + 4 Navigation Columns + Big Bold CATALYTIX in 1:1!
          ───────────────────────────────────────────────────────────── */}
      <section
        id="cta"
        ref={ctaRef}
        className="relative z-10 w-full max-w-[min(100vw,100vh)] min-h-screen max-h-screen mx-auto px-4 sm:px-6 flex flex-col justify-between py-4 sm:py-5 border-t border-slate-200/90 overflow-hidden text-center"
      >
        <div className="space-y-3 sm:space-y-3.5 my-auto w-full">
          {/* Top CTA Banner */}
          <SpotlightCard
            spotlightColor="rgba(0, 240, 255, 0.16)"
            borderGlowColor="rgba(0, 240, 255, 0.4)"
            className="rounded-3xl shadow-md border border-slate-200/90"
          >
            <LiquidGlass className="liquid-glass-card p-5 sm:p-7 rounded-3xl relative overflow-hidden text-center border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/60 to-white">
              <div className="relative z-10 max-w-lg mx-auto space-y-2">
                <span className="badge-pill-light text-[#16A34A] font-black border border-slate-200/90 shadow-sm text-xs sm:text-sm py-1 px-3.5">
                  QUARTERLY ADMISSIONS ACTIVE
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-slate-950 tracking-tight">
                  Build What&apos;s Next with{' '}
                  <span className="font-asimovian gradient-text-playful">CatalytiX</span>
                </h2>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                  Take your deeptech, software, or hardware venture from TRL validation to scalable institutional growth.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <Magnet padding={30} magnetStrength={3}>
                    <StarBorder color="#00F0FF" speed="3.5s" thickness={2} className="!rounded-full shadow-md border border-cyan-200/60">
                      <LiquidGlass
                        as="a"
                        displacement={true}
                        href="https://forms.gle/bennett-incubation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-liquid-glass-tinted-cyan !py-2.5 !px-7 text-xs sm:text-sm font-bold shadow-sm inline-flex items-center gap-2"
                      >
                        <Icons8 name="rocket" size={15} color="090D16" />
                        <span>Apply for Incubation</span>
                      </LiquidGlass>
                    </StarBorder>
                  </Magnet>

                  <Magnet padding={25} magnetStrength={3}>
                    <LiquidGlass
                      as="a"
                      href="https://bennett-university-hatchery.vercel.app/portfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-liquid-glass-crystal !py-2.5 !px-7 text-xs sm:text-sm font-bold border border-slate-300 inline-flex items-center gap-2 shadow-sm"
                    >
                      <Icons8 name="briefcase" size={14} color="0284C7" />
                      <span>Explore Portfolio</span>
                    </LiquidGlass>
                  </Magnet>
                </div>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  <ShinyText
                    text="BENNETT HATCHERY // DPIIT RECOGNIZED INCUBATOR"
                    speed={3}
                    color="#475569"
                    shineColor="#00F0FF"
                    className="font-extrabold"
                  />
                </div>
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* 4 Ecosystem & Program Navigation Columns in 1:1 Square */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 sm:p-4 rounded-3xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 font-mono text-left">
            <div className="space-y-1">
              <span className="font-black text-slate-950 uppercase tracking-wider text-xs block">
                BENNETT HATCHERY
              </span>
              <p className="text-slate-700 font-medium leading-snug text-[11px] line-clamp-3">
                DPIIT-recognized incubator supporting deeptech, space, hardware, and scalable technology startups.
              </p>
            </div>

            <div>
              <h5 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-1.5">PROGRAM</h5>
              <ul className="space-y-1 text-[11px] font-bold">
                <li><a href="#overview" className="hover:text-slate-950 transition-colors">Overview</a></li>
                <li><a href="#curriculum" className="hover:text-slate-950 transition-colors">Curriculum</a></li>
                <li><a href="#lifecycle" className="hover:text-slate-950 transition-colors">Lifecycle</a></li>
                <li><a href="#engine" className="hover:text-slate-950 transition-colors">SpaceTech</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-1.5">ECOSYSTEM</h5>
              <ul className="space-y-1 text-[11px] font-bold">
                <li><a href="https://bennett-university-hatchery.vercel.app/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">80+ Startups</a></li>
                <li><a href="https://forms.gle/bennett-incubation" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">Application Portal</a></li>
                <li><a href="#engine" className="hover:text-slate-950 transition-colors">SISFS Grants</a></li>
                <li><a href="#engine" className="hover:text-slate-950 transition-colors">Makerspace Labs</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-1.5">GOVERNANCE</h5>
              <ul className="space-y-1 text-[11px] font-bold">
                <li><span className="text-slate-800">Bennett University</span></li>
                <li><span className="text-slate-800">DPIIT Recognized</span></li>
                <li><span className="text-slate-800">CIE Leadership</span></li>
                <li><span className="text-[#0284C7] font-black">Cohort 2026 Open</span></li>
              </ul>
            </div>
          </div>

          {/* BIG BOLD CATALYTIX WORDMARK TAKING FULL 1:1 WIDTH */}
          <div className="w-full flex items-center justify-center select-none overflow-hidden py-2 sm:py-3 transition-transform duration-300 hover:scale-[1.01]">
            <Wordmark size="footer" colorScheme="playful" markFill="#090D16" className="w-full" />
          </div>

          <div className="w-full pt-2.5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-xs font-bold text-slate-700">
            <p>© 2026 Bennett Hatchery Foundation (CatalytiX). All venture rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://forms.gle/bennett-incubation" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">Apply Now</a>
              <a href="https://bennett-university-hatchery.vercel.app/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">Portfolio</a>
              <a href="#" className="hover:text-slate-950 transition-colors">Privacy &amp; Terms</a>
            </div>
          </div>
        </div>
      </section>
    </ClickSpark>
  );
}
