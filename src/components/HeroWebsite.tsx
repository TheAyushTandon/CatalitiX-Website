"use client";

import React, { useState, useEffect, useRef } from 'react';
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
  const [activeModule, setActiveModule] = useState<number>(1);

  const headerRef = useRef<HTMLElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroPillarsRef = useRef<HTMLDivElement>(null);

  // Incoming elements transition when scrolled fully
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
      className="relative w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-[#FF2E93] selection:text-white"
    >
      {/* 2D Soft Tiles Grid Background on pure white */}
      <GridTilesBackground />

      {/* Floating Top Header Navigation (Locked to ~96% viewport width) */}
      <div className="sticky top-3 z-40 w-full px-3 sm:px-6">
        <LiquidGlass
          as="header"
          ref={headerRef}
          style={initialHiddenStyle}
          className="liquid-glass-header w-full max-w-[1780px] mx-auto rounded-2xl px-5 sm:px-8 py-3.5 transition-all shadow-sm"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-8 lg:gap-12">
              <Magnet padding={40} magnetStrength={4}>
                <Wordmark size="md" colorScheme="playful" markFill="#0f172a" />
              </Magnet>
              <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
                <a href="#overview" className="hover:text-slate-950 transition-colors">Overview</a>
                <a href="#engine" className="hover:text-slate-950 transition-colors">Venture Engine</a>
                <a href="#curriculum" className="hover:text-slate-950 transition-colors">Curriculum</a>
                <a href="#lifecycle" className="hover:text-slate-950 transition-colors">Lifecycle</a>
                <a href="#spacetech" className="hover:text-slate-950 transition-colors">SpaceTech Cohort</a>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Magnet padding={35} magnetStrength={3}>
                <StarBorder color="#00B4D8" speed="4.5s" thickness={1.5} className="!rounded-full border border-cyan-200/60 shadow-sm">
                  <LiquidGlass
                    as="a"
                    href="https://forms.gle/bennett-incubation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-liquid-glass-tinted-cyan text-xs sm:text-sm !py-2.5 !px-5 inline-flex items-center gap-2"
                  >
                    <span>Apply for Incubation</span>
                    <Icons8 name="externalLink" size={14} color="0284C7" />
                  </LiquidGlass>
                </StarBorder>
              </Magnet>
            </div>
          </div>
        </LiquidGlass>
      </div>

      {/* 1. Hero Section & Locked Value Pillars Bento (Expansive Full Width ~96vw) */}
      <main id="overview" className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 xl:px-12 pt-10 sm:pt-14 pb-20 flex flex-col items-center text-center">
        {/* Release Pill Badge with ReactBits Magnet */}
        <div ref={heroBadgeRef} style={initialHiddenStyle} className="mb-6">
          <Magnet padding={30} magnetStrength={3.5}>
            <div className="badge-pill-light cursor-pointer hover:border-cyan-400/50 transition-all shadow-sm border border-slate-200/90">
              <span className="flex h-2 w-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span className="text-slate-700">Bennett Hatchery Foundation // DPIIT-Recognized</span>
              <span className="text-[#0284C7] font-bold flex items-center gap-1.5">
                <span>Cohort 2026</span>
                <Icons8 name="chevronRight" size={13} color="0284C7" />
              </span>
            </div>
          </Magnet>
        </div>

        {/* Big Widescreen Headline */}
        <h1
          ref={heroTitleRef}
          style={initialHiddenStyle}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-6xl leading-[1.05] mb-6 text-slate-950"
        >
          Incubation Program{' '}
          <span className="font-asimovian gradient-text-playful inline-block">
            CatalytiX
          </span>
        </h1>

        <p
          ref={heroSubtitleRef}
          style={initialHiddenStyle}
          className="max-w-4xl text-base sm:text-xl text-slate-600 font-normal mb-10 leading-relaxed"
        >
          A comprehensive institutional venture runway empowering early and growth-stage startups with seed capital,
          state-of-the-art makerspaces, marquee mentorship, and direct access to top-tier venture funds.
        </p>

        {/* Call to Actions with ReactBits Magnet and StarBorder */}
        <div
          ref={heroCtaRef}
          style={initialHiddenStyle}
          className="flex flex-wrap items-center justify-center gap-5 mb-16"
        >
          <Magnet padding={45} magnetStrength={3}>
            <StarBorder color="#00F0FF" speed="3.5s" thickness={2} className="!rounded-full shadow-lg">
              <LiquidGlass
                as="a"
                displacement={true}
                href="https://forms.gle/bennett-incubation"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-glass-tinted-cyan !py-3.5 !px-9 text-base shadow-md inline-flex items-center gap-2.5"
              >
                <Icons8 name="rocket" size={16} color="090D16" />
                <span>Apply for Incubation</span>
              </LiquidGlass>
            </StarBorder>
          </Magnet>

          <Magnet padding={40} magnetStrength={3}>
            <LiquidGlass
              as="a"
              href="https://bennett-university-hatchery.vercel.app/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid-glass-crystal !py-3.5 !px-9 text-base border border-slate-200/90 inline-flex items-center gap-2.5 shadow-sm"
            >
              <Icons8 name="briefcase" size={15} color="0284C7" />
              <span>Explore 80+ Incubated Startups</span>
            </LiquidGlass>
          </Magnet>
        </div>

        {/* Locked 4-Column Bento Grid: Core Value Pillars with ReactBits SpotlightCard & CountUp */}
        <div
          ref={heroPillarsRef}
          style={initialHiddenStyle}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 text-left"
        >
          {/* Pillar 1 */}
          <SpotlightCard
            spotlightColor="rgba(0, 180, 216, 0.16)"
            borderGlowColor="rgba(0, 180, 216, 0.4)"
            className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-6 xl:p-8 rounded-3xl min-h-[185px] flex flex-col justify-between h-full border border-slate-200/90">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#0284C7] font-bold uppercase tracking-wider">
                  Framework
                </span>
                <div className="w-8 h-8 rounded-xl bg-cyan-50 border border-cyan-200/60 flex items-center justify-center">
                  <Icons8 name="layers" size={16} color="0284C7" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-1 flex items-baseline gap-1.5">
                  <CountUp to={5} duration={1.2} />
                  <span>Modules</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">Structured Roadmap // TRL 1 to 9</p>
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* Pillar 2 */}
          <SpotlightCard
            spotlightColor="rgba(22, 163, 74, 0.16)"
            borderGlowColor="rgba(22, 163, 74, 0.4)"
            className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-6 xl:p-8 rounded-3xl min-h-[185px] flex flex-col justify-between h-full border border-slate-200/90">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#16A34A] font-bold uppercase tracking-wider">
                  Duration
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
                  <Icons8 name="zap" size={16} color="16A34A" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-1 flex items-baseline gap-1.5">
                  <span>Upto</span>
                  <CountUp to={12} duration={1.5} />
                  <span>Months</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">Acceleration Cycle // Makerspace Labs</p>
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* Pillar 3 */}
          <SpotlightCard
            spotlightColor="rgba(219, 39, 119, 0.16)"
            borderGlowColor="rgba(219, 39, 119, 0.4)"
            className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-6 xl:p-8 rounded-3xl min-h-[185px] flex flex-col justify-between h-full border border-slate-200/90">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#DB2777] font-bold uppercase tracking-wider">
                  Mentorship
                </span>
                <div className="w-8 h-8 rounded-xl bg-pink-50 border border-pink-200/60 flex items-center justify-center">
                  <Icons8 name="sparkles" size={16} color="DB2777" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-1 flex items-baseline gap-1.5">
                  <CountUp to={120} duration={1.8} suffix="+" />
                  <span>Mentors</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">Fortnightly Progress Audits</p>
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* Pillar 4 */}
          <SpotlightCard
            spotlightColor="rgba(217, 119, 6, 0.16)"
            borderGlowColor="rgba(217, 119, 6, 0.4)"
            className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-6 xl:p-8 rounded-3xl min-h-[185px] flex flex-col justify-between h-full border border-slate-200/90">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#D97706] font-bold uppercase tracking-wider">
                  Tech Readiness
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                  <Icons8 name="target" size={16} color="D97706" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
                  TRL 3 - 6
                </h3>
                <p className="text-xs text-slate-500 font-medium">IP &amp; Tech Validation // SISFS Grants</p>
              </div>
            </LiquidGlass>
          </SpotlightCard>
        </div>
      </main>

      {/* 2. Institutional Venture Engine: Asymmetric Locked Bento Grid with ReactBits SpotlightCard & CountUp */}
      <section id="engine" className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 xl:px-12 py-20 border-t border-slate-200/90">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Bento Tile 1: 7-Column Left Engine Thesis */}
          <SpotlightCard
            spotlightColor="rgba(2, 132, 199, 0.12)"
            borderGlowColor="rgba(2, 132, 199, 0.35)"
            className="lg:col-span-7 rounded-3xl border border-slate-200/90 shadow-sm"
          >
            <LiquidGlass className="liquid-glass-card p-8 sm:p-12 rounded-3xl flex flex-col justify-between min-h-[440px] h-full border border-slate-200/90">
              <div className="space-y-6">
                <div className="badge-pill-light text-[#0284C7] font-bold inline-flex items-center gap-2 border border-slate-200/90 shadow-sm">
                  <Icons8 name="building" size={14} color="0284C7" /> Institutional Venture Engine
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-950">
                  Building Scalable Enterprises with{' '}
                  <span className="gradient-text-cool">Deep Support</span>.
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  The Bennett Hatchery Foundation (BHF) is a DPIIT-recognized, world-class incubator designed to take
                  high-potential concepts and early-stage ventures from TRL 1 validation all the way to commercial growth.
                </p>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Operating with government-backed funding mechanisms like the{' '}
                  <strong className="text-slate-900">Startup India Seed Fund Scheme (SISFS)</strong> and{' '}
                  <strong className="text-slate-900">UP StartinUP</strong>, we combine academic rigor, makerspace capabilities,
                  and investor networks to de-risk venture scaling.
                </p>
              </div>

              <div className="pt-6 flex flex-wrap gap-2.5">
                {[
                  '✓ DPIIT Recognized',
                  '✓ SISFS Partner (Startup India)',
                  '✓ UP StartinUP Ecosystem',
                  '✓ 12+ Makerspace Labs',
                ].map((chip, i) => (
                  <Magnet key={i} padding={15} magnetStrength={4.5}>
                    <span className="px-3.5 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 text-xs font-mono font-semibold text-slate-800 transition-colors inline-block cursor-default">
                      {chip}
                    </span>
                  </Magnet>
                ))}
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* Bento Tile 2: 5-Column Right Impact Card with ReactBits CountUp & ShinyText */}
          <SpotlightCard
            spotlightColor="rgba(0, 240, 255, 0.16)"
            borderGlowColor="rgba(0, 240, 255, 0.4)"
            className="lg:col-span-5 rounded-3xl"
          >
            <LiquidGlass className="liquid-glass-card p-8 sm:p-10 rounded-3xl flex flex-col justify-between min-h-[440px] h-full border border-cyan-200/60 bg-gradient-to-br from-white via-slate-50/70 to-cyan-50/30">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                    Hatchery Impact Telemetry
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm">
                    <CountUp
                      to={80}
                      duration={2}
                      suffix="+"
                      className="font-mono text-4xl sm:text-5xl font-extrabold text-[#00B4D8] block mb-1"
                    />
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">Startups Incubated</h4>
                    <p className="text-[11px] text-slate-500">DeepTech, SaaS &amp; Space</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm">
                    <CountUp
                      to={2}
                      duration={1.8}
                      prefix="₹"
                      suffix="+ Cr"
                      className="font-mono text-3xl sm:text-4xl font-extrabold text-[#16A34A] block mb-1"
                    />
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">Grants Disbursed</h4>
                    <p className="text-[11px] text-slate-500">Non-dilutive seed funds</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/70 border border-slate-200/80">
                  <p className="text-sm italic text-slate-700 mb-2 leading-relaxed">
                    &ldquo;A catalyst for disruptive innovation — turning ambitious ideas into market leaders with world-class labs, capital velocity, and governance.&rdquo;
                  </p>
                  <span className="text-xs font-mono text-[#0284C7] font-semibold block">
                    — Bennett Hatchery Foundation Advisory Board
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                <ShinyText
                  text="STATUS: ADMISSIONS OPEN"
                  speed={3}
                  color="#64748b"
                  shineColor="#00B4D8"
                  className="font-semibold"
                />
                <span className="text-[#16A34A] font-bold">2026 ACTIVE</span>
              </div>
            </LiquidGlass>
          </SpotlightCard>

          {/* Bento Tile 3: 12-Column Full-Width Telemetry Strip with ReactBits SpotlightCard */}
          <div className="lg:col-span-12">
            <LiquidGlass className="liquid-glass-card p-5 sm:p-6 rounded-2xl w-full grid grid-cols-2 sm:grid-cols-4 gap-4 border border-slate-200/90 shadow-sm">
              <SpotlightCard
                spotlightColor="rgba(0, 180, 216, 0.12)"
                borderGlowColor="rgba(0, 180, 216, 0.3)"
                className="p-3 rounded-xl border border-slate-200/70"
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <Icons8 name="building" size={20} color="00B4D8" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Governance</span>
                    <span className="text-xs font-bold text-slate-900">Bennett University &amp; CIE</span>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(22, 163, 74, 0.12)"
                borderGlowColor="rgba(22, 163, 74, 0.3)"
                className="p-3 rounded-xl border border-slate-200/70"
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <Icons8 name="cpu" size={20} color="16A34A" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Makerspace Suite</span>
                    <span className="text-xs font-bold text-slate-900">12+ Engineering Labs</span>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(219, 39, 119, 0.12)"
                borderGlowColor="rgba(219, 39, 119, 0.3)"
                className="p-3 rounded-xl border border-slate-200/70"
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <Icons8 name="trendingUp" size={20} color="DB2777" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Active Cohort</span>
                    <span className="text-xs font-bold text-slate-900">Rolling Quarterly Intake</span>
                  </div>
                </div>
              </SpotlightCard>

              <SpotlightCard
                spotlightColor="rgba(217, 119, 6, 0.12)"
                borderGlowColor="rgba(217, 119, 6, 0.3)"
                className="p-3 rounded-xl border border-slate-200/70"
              >
                <div className="flex items-center gap-3.5">
                  <Icons8 name="shield" size={20} color="D97706" />
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Recognition</span>
                    <span className="text-xs font-bold text-slate-900">DPIIT &amp; Startup India</span>
                  </div>
                </div>
              </SpotlightCard>
            </LiquidGlass>
          </div>
        </div>
      </section>

      {/* 3. SpaceTech Cohort Spotlight: Panoramic Locked Bento with ReactBits SpotlightCard & Magnet */}
      <section id="spacetech" className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 xl:px-12 py-10">
        <SpotlightCard
          spotlightColor="rgba(255, 46, 147, 0.16)"
          borderGlowColor="rgba(255, 46, 147, 0.4)"
          className="rounded-3xl border border-slate-200/90 shadow-md"
        >
          <LiquidGlass className="liquid-glass-card p-8 sm:p-12 xl:p-14 rounded-3xl relative overflow-hidden border border-cyan-300/60 shadow-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-4 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/80 border border-cyan-200 text-xs font-mono font-bold text-[#0284C7]">
                  <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
                  <span>SpaceTech Flagship // Cohort 2026 Active</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
                  Bennett Hatchery SpaceTech Cohort
                </h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  India&apos;s space sector is opening up. The next opportunity is to build. The SpaceTech Venture Cohort is
                  a dedicated venture-building platform for students, researchers, and early-stage innovators to explore problems,
                  validate technologies, and build scalable deeptech enterprises.
                </p>
              </div>

              <Magnet padding={45} magnetStrength={3}>
                <StarBorder color="#FF2E93" speed="3.8s" thickness={2} className="!rounded-full shadow-md shrink-0 border border-pink-200/60">
                  <LiquidGlass
                    as="a"
                    displacement={true}
                    href="https://bennett-university-hatchery.vercel.app/programs/spacetech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-liquid-glass-tinted-pink whitespace-nowrap !py-4 !px-8 text-base shadow-md shrink-0 block"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span>Explore the Space Cohort</span>
                      <Icons8 name="arrowRight" size={15} color="FFFFFF" />
                    </span>
                  </LiquidGlass>
                </StarBorder>
              </Magnet>
            </div>
          </LiquidGlass>
        </SpotlightCard>
      </section>

      {/* 4. The CatalytiX Venture Curriculum: Locked Full-Width Bento Pipeline */}
      <section id="curriculum" className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 xl:px-12 py-20 border-t border-slate-200/90">
        <div className="text-center mb-16">
          <div className="badge-pill-light mb-4 text-[#16A34A] font-bold inline-flex items-center gap-2 border border-slate-200/90 shadow-sm">
            <Icons8 name="layers" size={14} color="16A34A" /> TRL 1 - 9 PIPELINE // Structured Roadmap
          </div>
          <h2 className="text-3xl sm:text-6xl font-extrabold mb-4 text-slate-950">
            The <span className="gradient-text-playful">CatalytiX</span> Venture Curriculum
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            A 5-stage progressive curriculum guiding founders from MVP prototyping and deeptech validation to traction and scale.
          </p>
        </div>

        {/* Locked Module Selector Tabs (Widescreen Stretch) with ReactBits Magnet */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10 w-full">
          {curriculumModules.map((m, idx) => (
            <Magnet key={idx} padding={18} magnetStrength={5} wrapperClassName="w-full">
              <button
                onClick={() => setActiveModule(idx + 1)}
                className={`w-full p-3.5 rounded-2xl font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left flex flex-col justify-between min-h-[82px] border ${
                  activeModule === idx + 1
                    ? 'bg-white text-slate-950 border-slate-300 shadow-md ring-2 ring-cyan-400/40'
                    : 'bg-slate-100/90 text-slate-600 hover:text-slate-900 border-slate-200/90 hover:bg-slate-200/60'
                }`}
              >
                <span style={{ color: m.color }} className="font-bold text-xs uppercase tracking-wider block">
                  MODULE {m.num}
                </span>
                <span className="text-xs truncate font-medium text-slate-800">{m.shortTitle}</span>
              </button>
            </Magnet>
          ))}
        </div>

        {/* Active Module Details Card with ReactBits SpotlightCard */}
        {(() => {
          const mod = curriculumModules[activeModule - 1];
          return (
            <SpotlightCard
              spotlightColor={`${mod.color}1e`}
              borderGlowColor={`${mod.color}55`}
              className="rounded-3xl w-full border border-slate-200/90 shadow-md"
            >
              <LiquidGlass className="liquid-glass-card p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-lg w-full min-h-[380px] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
                    <div>
                      <span
                        className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-slate-100 font-bold mr-3 inline-block border border-slate-200/70"
                        style={{ color: mod.color }}
                      >
                        MODULE {mod.num}
                      </span>
                      <span className="font-mono text-xs text-slate-500 uppercase tracking-wider font-semibold">
                        {mod.tag}
                      </span>
                      <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-950 mt-2">
                        {mod.title}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-400 block font-semibold">PRIMARY FOCUS AREA</span>
                      <span className="text-sm sm:text-base font-bold text-slate-800">
                        {mod.focus}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Masterclasses */}
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                        <Icons8 name="terminal" size={15} color="00B4D8" /> Masterclasses
                      </h4>
                      <ul className="space-y-2.5">
                        {mod.masterclasses.map((item, i) => (
                          <li key={i} className="text-sm text-slate-700 flex items-center gap-2 hover:translate-x-1 transition-transform">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Workshops / Activities */}
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                        <Icons8 name="activity" size={15} color="16A34A" /> Workshops &amp; Sprints
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {mod.activities.map((item, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-mono font-medium text-slate-700 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Review & Deliverable */}
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                        <Icons8 name="shield" size={15} color="D91B74" /> Milestone Review Gate
                      </h4>
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 shadow-sm">
                        <p className="text-xs font-semibold text-slate-800 mb-1">Evaluation Gate:</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{mod.review}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Policy Footer Notes */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-500">
                  <span>• Program can be renewed subject to approval from BHF governance</span>
                  <span>• Progress to next stage depends on current stage completion &amp; diagnostic audit</span>
                </div>
              </LiquidGlass>
            </SpotlightCard>
          );
        })()}
      </section>

      {/* 5. The 4-Stage Incubation Lifecycle: Locked 4-Column Bento Grid with ReactBits SpotlightCard */}
      <section id="lifecycle" className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 xl:px-12 py-20 border-t border-slate-200/90">
        <div className="text-center mb-16">
          <div className="badge-pill-light mb-4 text-[#0284C7] font-bold inline-flex items-center gap-2 border border-slate-200/90 shadow-sm">
            <Icons8 name="compass" size={14} color="0284C7" /> Structured Timeline // Quarterly Rolling Admissions
          </div>
          <h2 className="text-3xl sm:text-6xl font-extrabold mb-4 text-slate-950">
            The 4-Stage <span className="gradient-text-cool">Incubation Lifecycle</span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            A disciplined transition model guiding startups from initial screening and diagnostic validation to demo day syndication.
          </p>
        </div>

        {/* 4 Locked Bento Columns spanning full width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 w-full">
          {lifecycleStages.map((stage, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor={`${stage.badgeColor}18`}
              borderGlowColor={`${stage.badgeColor}44`}
              className="rounded-3xl h-full border border-slate-200/90 shadow-sm"
            >
              <LiquidGlass
                className="liquid-glass-card p-6 xl:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[420px] h-full border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200/70"
                      style={{ color: stage.badgeColor }}
                    >
                      PHASE {stage.step}
                    </span>
                    <span
                      className="text-xs font-mono font-semibold px-2 py-0.5 rounded border border-slate-200 bg-white"
                      style={{ color: stage.badgeColor }}
                    >
                      {stage.stageTag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2 leading-snug">{stage.title}</h3>
                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">{stage.subtitle}</p>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                      Key Milestones:
                    </span>
                    <ul className="space-y-2">
                      {stage.milestones.map((m, mIdx) => (
                        <li key={mIdx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed hover:translate-x-0.5 transition-transform">
                          <Icons8 name="check" size={14} color="00B4D8" className="mt-0.5 shrink-0" />
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>GATEWAY: BHF COUNCIL</span>
                  <span className="text-[#16A34A] font-bold">{stage.badge}</span>
                </div>
              </LiquidGlass>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 6. Final Application CTA Banner with ReactBits SpotlightCard, StarBorder & Magnet */}
      <section className="relative z-10 w-full max-w-[1780px] mx-auto px-4 sm:px-8 xl:px-12 py-20">
        <SpotlightCard
          spotlightColor="rgba(0, 240, 255, 0.16)"
          borderGlowColor="rgba(0, 240, 255, 0.4)"
          className="rounded-3xl shadow-xl border border-slate-200/90"
        >
          <LiquidGlass className="liquid-glass-card p-10 sm:p-16 xl:p-20 rounded-3xl relative overflow-hidden text-center border border-slate-200/90 bg-gradient-to-b from-white via-slate-50/60 to-white">
            <div className="relative z-10 max-w-4xl mx-auto space-y-6">
              <span className="badge-pill-light text-[#16A34A] font-bold border border-slate-200/90 shadow-sm">
                Quarterly Rolling Admissions Active
              </span>
              <h2 className="text-3xl sm:text-6xl font-extrabold leading-tight text-slate-950 tracking-tight">
                Build What&apos;s Next with{' '}
                <span className="font-asimovian gradient-text-playful">CatalytiX</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
                Take your deeptech, software, or hardware venture from TRL validation to scalable institutional growth.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
                <Magnet padding={50} magnetStrength={3}>
                  <StarBorder color="#00F0FF" speed="3.5s" thickness={2} className="!rounded-full shadow-lg border border-cyan-200/60">
                    <LiquidGlass
                      as="a"
                      displacement={true}
                      href="https://forms.gle/bennett-incubation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-liquid-glass-tinted-cyan !py-4 !px-10 text-base shadow-lg inline-flex items-center gap-2.5"
                    >
                      <Icons8 name="rocket" size={16} color="090D16" />
                      <span>Apply for Incubation</span>
                    </LiquidGlass>
                  </StarBorder>
                </Magnet>

                <Magnet padding={40} magnetStrength={3}>
                  <LiquidGlass
                    as="a"
                    href="https://bennett-university-hatchery.vercel.app/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-liquid-glass-crystal !py-4 !px-10 text-base border border-slate-200/90 inline-flex items-center gap-2.5 shadow-sm"
                  >
                    <Icons8 name="briefcase" size={15} color="0284C7" />
                    <span>Explore Portfolio Startups</span>
                  </LiquidGlass>
                </Magnet>
              </div>

              <div className="pt-8 flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <ShinyText
                  text="BENNETT HATCHERY FOUNDATION // DPIIT RECOGNIZED INCUBATOR"
                  speed={3}
                  color="#64748b"
                  shineColor="#00F0FF"
                  className="font-semibold"
                />
              </div>
            </div>
          </LiquidGlass>
        </SpotlightCard>
      </section>

      {/* 7. Comprehensive Modern Footer: Full-Width Locked Layout */}
      <footer className="relative z-10 w-full border-t border-slate-200 py-16 text-xs text-slate-500 font-mono bg-slate-50/80">
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 xl:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1 space-y-4">
            <Magnet padding={35} magnetStrength={4}>
              <Wordmark size="md" colorScheme="playful" markFill="#0f172a" />
            </Magnet>
            <p className="text-slate-500 leading-relaxed text-[11px] max-w-sm">
              Bennett Hatchery Foundation (BHF) — A DPIIT-recognized institutional incubator supporting deeptech, space, hardware, and scalable technology startups.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Program</h5>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="#overview" className="hover:text-slate-950 transition-colors">Incubation Overview</a></li>
              <li><a href="#curriculum" className="hover:text-slate-950 transition-colors">5-Stage Curriculum</a></li>
              <li><a href="#lifecycle" className="hover:text-slate-950 transition-colors">4-Phase Lifecycle</a></li>
              <li><a href="#spacetech" className="hover:text-slate-950 transition-colors">SpaceTech Cohort</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Ecosystem</h5>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="https://bennett-university-hatchery.vercel.app/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">80+ Portfolio Startups</a></li>
              <li><a href="https://forms.gle/bennett-incubation" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">Application Portal</a></li>
              <li><a href="#engine" className="hover:text-slate-950 transition-colors">SISFS &amp; UP StartinUP</a></li>
              <li><a href="#engine" className="hover:text-slate-950 transition-colors">Makerspace Labs</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-4">Governance</h5>
            <ul className="space-y-2.5 text-[11px]">
              <li><span className="text-slate-700">Bennett University, Greater Noida</span></li>
              <li><span className="text-slate-700">DPIIT Recognized Incubator</span></li>
              <li><span className="text-slate-700">CIE Leadership Advisory</span></li>
              <li><span className="text-[#0284C7] font-semibold">Cohort 2026 Admissions Open</span></li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 xl:px-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Bennett Hatchery Foundation (CatalytiX). All venture rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://forms.gle/bennett-incubation" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">Apply Now</a>
            <a href="https://bennett-university-hatchery.vercel.app/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">Portfolio</a>
            <a href="#" className="hover:text-slate-950 transition-colors">Privacy &amp; Terms</a>
          </div>
        </div>
      </footer>
    </ClickSpark>
  );
}
