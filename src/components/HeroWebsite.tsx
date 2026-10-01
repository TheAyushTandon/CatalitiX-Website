"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import GridTilesBackground from './GridTilesBackground';
import LiquidGlass from './LiquidGlass';
import ClickSpark from './reactbits/ClickSpark';
import SpotlightCard from './reactbits/SpotlightCard';
import Magnet from './reactbits/Magnet';
import ShinyText from './reactbits/ShinyText';
import CountUp from './reactbits/CountUp';
import StarBorder from './reactbits/StarBorder';
import Icons8 from './Icons8';
import ModuleOutcomesStaircase from './ModuleOutcomesStaircase';
import CatalytixPuzzle from './CatalytixPuzzle';
import Lifecycle3DPieChart from './Lifecycle3DPieChart';
import CatalytiXMark from './CatalytiXMark';

interface HeroWebsiteProps {
  isIncoming?: boolean;
}

export default function HeroWebsite({ isIncoming = true }: HeroWebsiteProps) {
  // Presentation steps:
  // 0: Slide 1 - Hero & Pillars (#overview)
  // 1: Slide 2 - Curriculum Module 1 (#curriculum)
  // 2: Slide 2 - Curriculum Module 2
  // 3: Slide 2 - Curriculum Module 3
  // 4: Slide 2 - Curriculum Module 4
  // 5: Slide 2 - Curriculum Module 5
  // 6: Slide 3 - Outcomes Staircase Module 0 (#outcomes)
  // 7: Slide 3 - Outcomes Staircase Module 1
  // 8: Slide 3 - Outcomes Staircase Module 2
  // 9: Slide 3 - Outcomes Staircase Module 3
  // 10: Slide 3 - Outcomes Staircase Module 4
  // 11: Slide 3 - Outcomes Staircase Module 4
  // 12: Slide 3 - Outcomes Staircase Module 5
  // 13: Slide 3 - Outcomes Staircase Summit (Scale & Growth)
  // 14: Slide 3 - Outcomes Staircase 3D Venture Path (All Stages)
  // 15: Slide 4 - 4-Stage Incubation Lifecycle (#lifecycle)
  // 16: Slide 5 - Build What's Next CTA & Big Bold CATALYTIX (#cta)
  const [presentationStep, setPresentationStep] = useState<number>(0);
  const [activeModule, setActiveModule] = useState<number>(1);
  const [activeOutcomeModule, setActiveOutcomeModule] = useState<number>(0);

  // Section Refs for smooth scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const curriculumRef = useRef<HTMLElement>(null);
  const outcomesRef = useRef<HTMLElement>(null);
  const lifecycleRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Incoming animation refs
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroPillarsRef = useRef<HTMLDivElement>(null);

  // Section entrance and visibility gating
  const [isOutcomesReached, setIsOutcomesReached] = useState<boolean>(false);
  const revealedSectionsRef = useRef<Set<string>>(new Set(['overview']));

  // Record the mount timestamp so we can ignore clicks that originated from
  // the intro X-transition (which mounts this component as a side-effect).
  const mountTimeRef = useRef<number>(performance.now());

  // Debounce guard: prevent double-firing advanceStep within 450ms
  const lastAdvanceTimeRef = useRef<number>(0);

  // Silky 60fps entrance transition when a section is reached
  const revealSection = useCallback((element: HTMLElement | null, sectionId: string) => {
    if (!element) return;
    if (revealedSectionsRef.current.has(sectionId)) return;
    revealedSectionsRef.current.add(sectionId);

    if (sectionId === 'outcomes') {
      setIsOutcomesReached(true);
    }

    // Master container entrance
    gsap.fromTo(
      element,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        force3D: true,
        clearProps: 'transform,willChange',
      }
    );

    // Stagger inner highlight cards and panels with 60fps fluidity
    const childCards = element.querySelectorAll<HTMLElement>(
      '.spotlight-card, .liquid-glass-card'
    );
    if (childCards.length > 0) {
      gsap.fromTo(
        childCards,
        { opacity: 0, y: 22, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'transform',
        }
      );
    }
  }, []);

  // Smooth scroll to a section within our overflow-y:scroll container
  const smoothScrollTo = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (_) { }
  }, []);


  useEffect(() => {
    if (presentationStep === 0) {
      smoothScrollTo(overviewRef.current);
    } else if (presentationStep >= 1 && presentationStep <= 6) {
      const mod = Math.min(5, presentationStep);
      setActiveModule(mod);
      revealSection(curriculumRef.current, 'curriculum');
      smoothScrollTo(curriculumRef.current);
    } else if (presentationStep >= 7 && presentationStep <= 14) {
      const outcomeMod = presentationStep - 7; // 0, 1, 2, 3, 4, 5, 6, 7
      setActiveOutcomeModule(outcomeMod);
      setIsOutcomesReached(true);
      revealSection(outcomesRef.current, 'outcomes');
      smoothScrollTo(outcomesRef.current);
    } else if (presentationStep === 15) {
      revealSection(lifecycleRef.current, 'lifecycle');
      smoothScrollTo(lifecycleRef.current);
    } else if (presentationStep === 16) {
      revealSection(ctaRef.current, 'cta');
      smoothScrollTo(ctaRef.current);
    }
  }, [presentationStep, revealSection, smoothScrollTo]);

  // Observe sections so when the user scrolls down naturally, each section transitions in when reached
  useEffect(() => {
    const container = scrollContainerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const id = target.id;
            if (id === 'overview') {
              setPresentationStep(0);
            } else if (id === 'curriculum') {
              revealSection(curriculumRef.current, 'curriculum');
            } else if (id === 'outcomes') {
              setIsOutcomesReached(true);
              revealSection(outcomesRef.current, 'outcomes');
            } else if (id === 'lifecycle') {
              revealSection(lifecycleRef.current, 'lifecycle');
            } else if (id === 'cta') {
              revealSection(ctaRef.current, 'cta');
            }
          }
        });
      },
      {
        root: container ?? null,  // observe within our scroll container
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const sections = [
      overviewRef.current,
      curriculumRef.current,
      outcomesRef.current,
      lifecycleRef.current,
      ctaRef.current,
    ];

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      observer.disconnect();
    };
  }, [revealSection]);

  // Advance to next presentation slide / module
  const advanceStep = useCallback(() => {
    const now = performance.now();
    if (now - lastAdvanceTimeRef.current < 400) return;
    lastAdvanceTimeRef.current = now;
    setPresentationStep((prev) => {
      if (prev >= 16) return 16;
      return prev + 1;
    });
  }, []);

  // Regress to previous presentation slide / module
  const regressStep = useCallback(() => {
    const now = performance.now();
    if (now - lastAdvanceTimeRef.current < 400) return;
    lastAdvanceTimeRef.current = now;
    setPresentationStep((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  }, []);

  // Global mouse click and keyboard navigation listener
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // If we are not active / incoming yet, don't hijack clicks from intro sequence
      if (!isIncoming) return;
      if (performance.now() - mountTimeRef.current < 600) return;

      // Advance on main left mouse button click only
      if (e.button !== 0) return;

      // Do not hijack interactive elements like links or buttons
      const target = e.target as HTMLElement | null;
      if (target && typeof target.closest === 'function' && target.closest('a, button, input, select, textarea, [data-interactive="true"]')) {
        return;
      }

      advanceStep();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isIncoming) return;
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
  }, [isIncoming, advanceStep, regressStep]);

  // Incoming elements transition on initial reveal
  useEffect(() => {
    if (!isIncoming) return;
    mountTimeRef.current = performance.now();
    lastAdvanceTimeRef.current = performance.now() + 600;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroBadgeRef.current,
        { scale: 0.85, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(1.5)' },
        0
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
      badge: 'Seed Demo Day â˜…',
      badgeColor: '#D97706',
    },
  ];

  const initialHiddenStyle = !isIncoming ? { opacity: 0 } : undefined;

  return (
    <div ref={scrollContainerRef} className="hero-presentation-root bg-white text-slate-900 font-sans">
      <ClickSpark
        sparkColor={['#00F0FF', '#FF2E93', '#7cff67', '#0284c7', '#d97706']}
        sparkCount={10}
        sparkRadius={24}
        className="relative w-full selection:bg-[#FF2E93] selection:text-white select-none"
      >
        {/* 2D Soft Tiles Grid Background on pure white */}
        <GridTilesBackground />



        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          SLIDE 1: Hero Section & 2x2 Value Pillars Bento
          Logos above badge, larger text, taking full 1:1 space!
          â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section
          id="overview"
          ref={overviewRef}
          className="relative z-10 w-full max-w-[min(100vw,100vh)] h-screen mx-auto px-4 sm:px-6 flex flex-col justify-between pt-14 sm:pt-16 pb-8 sm:pb-12 text-center overflow-hidden"
        >
          <div className="flex flex-col items-center my-auto w-full px-2 sm:px-4">
            {/* LOGOS ABOVE BADGE: Much bigger, prominent, wide & taking full presence */}
            <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 mb-2.5 sm:mb-3 w-full">
              <img
                src="/bennett-university-logo.png"
                alt="Bennett University"
                className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[42%] object-contain hover:scale-105 transition-transform drop-shadow-sm"
              />
              <div className="h-8 sm:h-10 md:h-12 w-[1.5px] bg-slate-300 shrink-0" />
              <img
                src="/logo.png"
                alt="Bennett Hatchery Foundation"
                className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[42%] object-contain hover:scale-105 transition-transform drop-shadow-sm"
              />
            </div>

            {/* Release Pill Badge: Wider, bolder, full visibility */}
            <div ref={heroBadgeRef} style={initialHiddenStyle} className="mb-2.5 sm:mb-3 w-full flex justify-center">
              <Magnet padding={25} magnetStrength={3}>
                <div className="badge-pill-light cursor-pointer hover:border-cyan-400/50 transition-all shadow-sm border border-slate-200/90 text-xs sm:text-xs md:text-sm font-black py-1.5 px-4 sm:px-6 flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#16A34A] animate-pulse shrink-0" />
                  <span className="text-slate-900 font-extrabold tracking-wide">BENNETT HATCHERY FOUNDATION // DPIIT</span>
                  <span className="text-[#0284C7] font-black flex items-center shrink-0">
                    <Icons8 name="chevronRight" size={15} color="0284C7" />
                  </span>
                </div>
              </Magnet>
            </div>

            {/* Big Bold CatalytiX Title with Small Incubation Program Label (Swapped Places) */}
            <h1
              ref={heroTitleRef}
              style={initialHiddenStyle}
              className="w-full text-center mb-2 sm:mb-2.5 select-none"
            >
              <span
                style={{ fontFamily: "var(--font-wordmark), 'Montserrat', 'Plus Jakarta Sans', sans-serif" }}
                className="font-black block text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.6rem] tracking-tight leading-[1.15] pb-2 mb-0.5 overflow-visible"
              >
                <span className="inline-flex items-center justify-center gap-1 sm:gap-2">
                  <span className="gradient-text-playful">CATALYTI</span>
                  <span className="inline-flex items-center justify-center shrink-0 w-[0.88em] h-[0.88em] -ml-0.5">
                    <CatalytiXMark
                      size="100%"
                      gradientId="hero-title-catalytix-mark-grad"
                      animated={true}
                      gradientStops={[
                        { offset: '0%', stopColor: '#FF2E93' },
                        { offset: '25%', stopColor: '#C026D3' },
                        { offset: '50%', stopColor: '#8B5CF6' },
                        { offset: '75%', stopColor: '#00F0FF' },
                        { offset: '100%', stopColor: '#7cff67' },
                      ]}
                      rotate={45}
                      flipVertical={true}
                    />
                  </span>
                </span>
              </span>
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                Incubation Program
              </span>
            </h1>

            {/* Subtitle: Full width, larger, bolder, filling 1:1 space */}
            <p
              ref={heroSubtitleRef}
              style={initialHiddenStyle}
              className="w-full max-w-3xl px-2 sm:px-4 text-xs sm:text-sm md:text-base lg:text-lg text-slate-700 font-bold mb-3 sm:mb-4 leading-relaxed sm:leading-snug"
            >
              A comprehensive institutional venture runway empowering early and growth-stage startups with seed capital,
              state-of-the-art makerspaces, marquee mentorship, and direct access to top-tier venture funds.
            </p>

            {/* Call to Actions: Larger buttons spreading wide across horizontal space */}
            <div
              ref={heroCtaRef}
              style={initialHiddenStyle}
              className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4"
            >
              <Magnet padding={35} magnetStrength={3}>
                <StarBorder color="#00F0FF" speed="3.5s" thickness={2} className="!rounded-full shadow-lg">
                  <LiquidGlass
                    as="a"
                    displacement={true}
                    href="https://forms.gle/bennett-incubation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-liquid-glass-tinted-cyan !py-2.5 sm:!py-3 !px-6 sm:!px-8 text-sm sm:text-base font-black shadow-md inline-flex items-center gap-2.5"
                  >
                    <Icons8 name="rocket" size={18} color="090D16" />
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
                  className="btn-liquid-glass-crystal !py-2.5 sm:!py-3 !px-6 sm:!px-8 text-sm sm:text-base font-black border border-slate-300 inline-flex items-center gap-2.5 shadow-sm"
                >
                  <Icons8 name="briefcase" size={17} color="0284C7" />
                  <span>Explore 80+ Startups</span>
                </LiquidGlass>
              </Magnet>
            </div>
          </div>

          {/* 2x2 Bento Grid: Core Value Pillars (Substantially Larger to Anchor 1:1 Canvas) */}
          <div
            ref={heroPillarsRef}
            style={initialHiddenStyle}
            className="w-full grid grid-cols-2 gap-2.5 sm:gap-3 text-left mb-1"
          >
            {/* Pillar 1 */}
            <SpotlightCard
              spotlightColor="rgba(0, 180, 216, 0.16)"
              borderGlowColor="rgba(0, 180, 216, 0.4)"
              className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
            >
              <LiquidGlass className="liquid-glass-card p-3 sm:p-4 rounded-3xl min-h-[96px] sm:min-h-[110px] flex flex-col justify-between h-full border border-slate-200/90">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-xs font-mono text-[#0284C7] font-black uppercase tracking-wider">
                    Framework
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-cyan-50 border border-cyan-200/60 flex items-center justify-center">
                    <Icons8 name="layers" size={15} color="0284C7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 flex items-baseline gap-1.5">
                    <CountUp to={5} duration={1.2} />
                    <span>Building Blocks</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">Roadmap // TRL 1 to 9</p>
                </div>
              </LiquidGlass>
            </SpotlightCard>

            {/* Pillar 2 */}
            <SpotlightCard
              spotlightColor="rgba(22, 163, 74, 0.16)"
              borderGlowColor="rgba(22, 163, 74, 0.4)"
              className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
            >
              <LiquidGlass className="liquid-glass-card p-3 sm:p-4 rounded-3xl min-h-[96px] sm:min-h-[110px] flex flex-col justify-between h-full border border-slate-200/90">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-xs font-mono text-[#16A34A] font-black uppercase tracking-wider">
                    Duration
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
                    <Icons8 name="zap" size={15} color="16A34A" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 flex items-baseline gap-1.5">
                    <span>Upto</span>
                    <CountUp to={18} duration={1.5} />
                    <span>Months</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">Acceleration Cycle // Makerspace Labs</p>
                </div>
              </LiquidGlass>
            </SpotlightCard>

            {/* Pillar 3 */}
            <SpotlightCard
              spotlightColor="rgba(219, 39, 119, 0.16)"
              borderGlowColor="rgba(219, 39, 119, 0.4)"
              className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
            >
              <LiquidGlass className="liquid-glass-card p-3 sm:p-4 rounded-3xl min-h-[96px] sm:min-h-[110px] flex flex-col justify-between h-full border border-slate-200/90">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-xs font-mono text-[#DB2777] font-black uppercase tracking-wider">
                    Mentorship
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-pink-50 border border-pink-200/60 flex items-center justify-center">
                    <Icons8 name="sparkles" size={15} color="DB2777" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 flex items-baseline gap-1.5">
                    <CountUp to={120} duration={1.8} suffix="+" />
                    <span>Mentors</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">Fortnightly Progress Audits</p>
                </div>
              </LiquidGlass>
            </SpotlightCard>

            {/* Pillar 4 */}
            <SpotlightCard
              spotlightColor="rgba(217, 119, 6, 0.16)"
              borderGlowColor="rgba(217, 119, 6, 0.4)"
              className="rounded-3xl h-full border border-slate-200/80 shadow-sm"
            >
              <LiquidGlass className="liquid-glass-card p-3 sm:p-4 rounded-3xl min-h-[96px] sm:min-h-[110px] flex flex-col justify-between h-full border border-slate-200/90">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-xs font-mono text-[#D97706] font-black uppercase tracking-wider">
                    Tech Readiness
                  </span>
                  <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                    <Icons8 name="target" size={15} color="D97706" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                    TRL 1 - 6
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">Start of Venture to Scale</p>
                </div>
              </LiquidGlass>
            </SpotlightCard>
          </div>
        </section>

        {/* SLIDE 2: The CATALYTIX Venture Curriculum (1:1 Presentation Canvas Inside) */}
        <section
          id="curriculum"
          ref={curriculumRef}
          style={{ opacity: 0, transform: 'translateY(36px)', willChange: 'opacity, transform' }}
          className="relative z-10 w-full min-h-screen border-t border-slate-200/90 overflow-hidden"
        >
          <div className="w-full max-w-[min(100vw,1180px)] h-screen mx-auto px-3 sm:px-6 flex flex-col justify-between pt-5 sm:pt-7 pb-4 sm:pb-6">
            <CatalytixPuzzle
              presentationStep={presentationStep}
              onStepChange={setPresentationStep}
              onNext={advanceStep}
              onPrev={regressStep}
            />
          </div>
        </section>

        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          SLIDE 4: Startup Journey & Modular Outcomes Staircase
          Bigger Vertically to Fill 1:1 Canvas
          â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section
          id="outcomes"
          ref={outcomesRef}
          style={{ opacity: 0, transform: 'translateY(36px)', willChange: 'opacity, transform' }}
          className="relative z-10 w-full min-h-screen border-t border-slate-200/90 overflow-hidden"
        >
          <div className="w-full max-w-[min(100vw,1180px)] h-screen mx-auto px-3 sm:px-6 flex flex-col justify-between pt-3 sm:pt-5 pb-3 sm:pb-4">
            <ModuleOutcomesStaircase
              activeIdx={activeOutcomeModule}
              isSectionReached={isOutcomesReached}
              onModuleSelect={(idx) => {
                setActiveOutcomeModule(idx);
                setPresentationStep(7 + idx);
              }}
              onNextStep={advanceStep}
              onPrevStep={regressStep}
            />
          </div>
        </section>

        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          SLIDE 5: The 4-Stage Incubation Lifecycle
          Bigger Vertically to Fill 1:1 Canvas
          â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section
          id="lifecycle"
          ref={lifecycleRef}
          style={{ opacity: 0, transform: 'translateY(36px)', willChange: 'opacity, transform' }}
          className="relative z-10 w-full max-w-[min(100vw,100vh)] h-screen mx-auto px-4 sm:px-6 flex flex-col justify-center py-10 sm:py-14 border-t border-slate-200/90 overflow-hidden"
        >
          <Lifecycle3DPieChart onAdvance={advanceStep} />
        </section>

        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          SLIDE 5: Final Comprehensive Section
          Build What's Next CTA + 4 Navigation Columns + Big Bold CATALYTIX in 1:1!
          â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section
          id="cta"
          ref={ctaRef}
          style={{ opacity: 0, transform: 'translateY(36px)', willChange: 'opacity, transform' }}
          className="relative z-10 w-full max-w-[min(100vw,100vh)] h-screen mx-auto px-4 sm:px-6 flex flex-col justify-center py-16 sm:py-20 border-t border-slate-200/90 overflow-hidden text-center"
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
                    <span
                      style={{ fontFamily: "var(--font-wordmark), 'Montserrat', 'Plus Jakarta Sans', sans-serif" }}
                      className="inline-flex items-center gap-1 align-baseline"
                    >
                      <span className="font-black gradient-text-playful inline-block pb-1 leading-[1.15]">
                        CATALYTI
                      </span>
                      <span className="inline-flex items-center justify-center shrink-0 w-[0.88em] h-[0.88em] -ml-0.5">
                        <CatalytiXMark
                          size="100%"
                          gradientId="cta-catalytix-mark-grad"
                          animated={true}
                          gradientStops={[
                            { offset: '0%', stopColor: '#FF2E93' },
                            { offset: '25%', stopColor: '#C026D3' },
                            { offset: '50%', stopColor: '#8B5CF6' },
                            { offset: '75%', stopColor: '#00F0FF' },
                            { offset: '100%', stopColor: '#7cff67' },
                          ]}
                          rotate={45}
                          flipVertical={true}
                        />
                      </span>
                    </span>
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


          </div>
        </section>
      </ClickSpark>
    </div>
  );
}


