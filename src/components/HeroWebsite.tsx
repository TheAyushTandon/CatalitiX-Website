"use client";

import React, { useState } from 'react';
import Wordmark from './Wordmark';
import CatalytiXMark from './CatalytiXMark';
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Gauge, 
  Zap, 
  ChevronRight, 
  Terminal,
  Activity,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Rocket,
  Award,
  TrendingUp,
  FileText,
  ExternalLink,
  Target,
  Users,
  Compass,
  Building2,
  Briefcase
} from 'lucide-react';

interface HeroWebsiteProps {
  onReplayIntro?: () => void;
}

export default function HeroWebsite({ onReplayIntro }: HeroWebsiteProps) {
  const [activeModule, setActiveModule] = useState<number>(1);

  const curriculumModules = [
    {
      num: '01',
      title: 'Module 1: Venture Formation & Applied Prototyping',
      shortTitle: 'M1: Venture Formation',
      focus: 'MVP Design & Early Tech Validation',
      masterclasses: ['Product Architecture', 'MVP vs Prototype', 'IP 101'],
      activities: ['Figma UI', '3D Printing & IoT', 'Product Roadmap', 'Lean Canvas Sprint'],
      review: 'Weekly prototype reviews',
      tag: 'TRL 1 - 3',
      color: '#00F0FF',
    },
    {
      num: '02',
      title: 'Module 2: TRL & Innovation Verification',
      shortTitle: 'M2: TRL Verification',
      focus: 'Tech Validation',
      masterclasses: ['TRL Roadmap', 'Compliance & Standards', 'Pilot Studies'],
      activities: ['Simulation & Benchmarking', 'TRL Diagnostic', 'Test Cases', 'Technical Pitching'],
      review: 'Weekly MVP refinement reviews',
      tag: 'TRL 3 - 4',
      color: '#7cff67',
    },
    {
      num: '03',
      title: 'Module 3: Market Fit & Funding',
      shortTitle: 'M3: Market Fit & Funding',
      focus: 'Customer Validation & Finance',
      masterclasses: ['GTM Strategy', 'Startup Finance', 'Fundraising', 'Term Sheets'],
      activities: ['Business Model', 'Customer Discovery', 'Financial Model', 'Pitch Deck', 'Grant Mapping'],
      review: 'Weekly market & finance reviews',
      tag: 'TRL 4 - 5',
      color: '#FF2E93',
    },
    {
      num: '04',
      title: 'Module 4: Innovation-to-Market Launchpad',
      shortTitle: 'M4: Launchpad',
      focus: 'Launch & Investor Readiness',
      masterclasses: ['Product Launch', 'Growth Marketing', 'Legal Checks', 'Investor Readiness'],
      activities: ['Demo Day Simulation', 'GTM Sprint', 'Branding', 'Demo Video', 'Showcase'],
      review: 'Weekly launch readiness reviews',
      tag: 'TRL 5 - 6',
      color: '#FF8A00',
    },
    {
      num: '05',
      title: 'Module 5: Accelerator & Venture Scaling',
      shortTitle: 'M5: Venture Scaling',
      focus: 'Scale & Growth',
      masterclasses: [
        '1:1 mentor sessions',
        'Investor feedback',
        'Growth & fundraising reviews',
        'Market access support',
        'Post-programme handholding',
      ],
      activities: ['Investor Connects', 'Fundraising Sprint', 'Growth Experiments', 'Strategic Partnerships', 'Demo Day'],
      review: 'Direct partner & investor advisory',
      tag: 'TRL 6+',
      color: '#FFD600',
    },
  ];

  const lifecycleStages = [
    {
      step: '01',
      title: 'Application & Initial Screening',
      stageTag: '01 / 04',
      subtitle: 'Transparent, rolling evaluations focused on problem gravity and founder commitment.',
      milestones: [
        'Submit pitch deck, functional prototype/demo, and founder background.',
        'Comprehensive initial technical and market viability assessment.',
        'Evaluation of core team capability and IP defensibility.',
      ],
      badge: 'Pass Criteria →',
      badgeColor: '#00F0FF',
    },
    {
      step: '02',
      title: 'Pitch to Selection Committee',
      stageTag: '02 / 04',
      subtitle: 'Interactive presentation before seasoned founders, faculty, and industry veterans.',
      milestones: [
        'Shortlisted ventures pitch directly to the Bennett Hatchery Investment & Incubation Council.',
        'Rigorous Q&A on customer discovery, unit economics, and technology roadmap.',
        'Determination of cohort fit and seed grant eligibility.',
      ],
      badge: 'Pass Criteria →',
      badgeColor: '#7cff67',
    },
    {
      step: '03',
      title: 'Diagnostic & Incubation Agreement',
      stageTag: '03 / 04',
      subtitle: 'Tailoring the venture roadmap and establishing milestone-driven targets.',
      milestones: [
        'Execute mutual incubation agreement and founder commitments.',
        'Map custom milestone deliverables, mentor pairing, and KPI tracking.',
        'Unlock 24x7 physical co-working access, cloud credits, and prototyping labs.',
      ],
      badge: 'Pass Criteria →',
      badgeColor: '#FF2E93',
    },
    {
      step: '04',
      title: 'Milestone-Based Scaling & Demo Day',
      stageTag: '04 / 04',
      subtitle: 'Aggressive sprint toward customer acquisition, revenue traction, and institutional capital.',
      milestones: [
        'Fortnightly reporting and handholding reviews with CIE leadership.',
        'Achieve measurable customer validation and revenue benchmarks.',
        'Live stage pitching before angel syndicates and VC funds at Hatchery Demo Day.',
      ],
      badge: 'Seed Demo Day ★',
      badgeColor: '#FFD600',
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#08080d] text-white">
      {/* Subtle Technical Grid Background without any distracting gradient */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px, 48px 48px',
        }}
      />

      {/* Top Header Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Wordmark size="md" colorScheme="playful" />
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/70">
            <a href="#overview" className="hover:text-white transition-colors">Overview</a>
            <a href="#engine" className="hover:text-white transition-colors">Venture Engine</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#lifecycle" className="hover:text-white transition-colors">Lifecycle</a>
            <a href="#spacetech" className="hover:text-white transition-colors">SpaceTech Cohort</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 transition-all cursor-pointer"
              title="Re-play the X Scroll Sequence"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span className="hidden sm:inline">Replay Intro</span>
            </button>
          )}

          <a
            href="https://forms.gle/bennett-incubation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs sm:text-sm !py-2.5 !px-5"
          >
            <span>Apply for Incubation</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* 1. Hero Section: Incubation Track: CatalytiX */}
      <main id="overview" className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 flex flex-col items-center text-center">
        {/* Release Pill Badge */}
        <div className="badge-pill mb-6 cursor-pointer hover:border-cyan-400/50 transition-all">
          <span className="flex h-2 w-2 rounded-full bg-[#7cff67] animate-pulse" />
          <span className="text-white/80">Bennett Hatchery Foundation // DPIIT-Recognized</span>
          <span className="text-[#00F0FF] flex items-center gap-1">
            Cohort 2026 <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Big Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-[1.08] mb-6">
          Incubation Track:{' '}
          <span className="font-asimovian gradient-text-playful inline-block">
            CatalytiX
          </span>
        </h1>

        <p className="max-w-3xl text-base sm:text-xl text-white/70 font-normal mb-10 leading-relaxed">
          A comprehensive, institutional venture runway empowering early and growth-stage startups with seed capital, 
          state-of-the-art makerspaces, marquee mentorship, and direct access to top-tier venture funds.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="https://forms.gle/bennett-incubation"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Rocket className="w-4 h-4 fill-current" />
            <span>Apply for Incubation</span>
          </a>
          <a
            href="https://bennett-university-hatchery.vercel.app/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Briefcase className="w-4 h-4 text-[#00F0FF]" />
            <span>Explore 80+ Incubated Startups</span>
          </a>
        </div>

        {/* 4 Key Pillar Badges */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="glass-panel p-5 rounded-2xl">
            <span className="text-xs font-mono text-[#00F0FF] uppercase tracking-wider block mb-1">
              Framework
            </span>
            <h3 className="text-xl font-bold text-white mb-1">5 Modules</h3>
            <p className="text-xs text-white/50">Structured Roadmap</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl">
            <span className="text-xs font-mono text-[#7cff67] uppercase tracking-wider block mb-1">
              Duration
            </span>
            <h3 className="text-xl font-bold text-white mb-1">Upto 12 Months</h3>
            <p className="text-xs text-white/50">Acceleration Cycle</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl">
            <span className="text-xs font-mono text-[#FF2E93] uppercase tracking-wider block mb-1">
              Mentorship
            </span>
            <h3 className="text-xl font-bold text-white mb-1">Fortnightly</h3>
            <p className="text-xs text-white/50">Progress Audits</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl">
            <span className="text-xs font-mono text-[#FFD600] uppercase tracking-wider block mb-1">
              Tech Readiness
            </span>
            <h3 className="text-xl font-bold text-white mb-1">TRL 3 - 6</h3>
            <p className="text-xs text-white/50">IP & Tech Validation</p>
          </div>
        </div>
      </main>

      {/* 2. Institutional Venture Engine Section */}
      <section id="engine" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="badge-pill text-[#00F0FF]">
              <Building2 className="w-3.5 h-3.5" /> Institutional Venture Engine
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Building Scalable Enterprises with{' '}
              <span className="gradient-text-cool">Deep Support</span>.
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              The Bennett Hatchery Foundation (BHF) is a DPIIT-recognized, world-class incubator designed to take 
              high-potential concepts and early-stage ventures from TRL 1 validation all the way to commercial growth.
            </p>
            <p className="text-white/70 text-base leading-relaxed">
              Operating with government-backed funding mechanisms like the{' '}
              <strong className="text-white">Startup India Seed Fund Scheme (SISFS)</strong> and{' '}
              <strong className="text-white">UP StartinUP</strong>, we combine academic rigor, makerspace capabilities, 
              and investor networks to de-risk venture scaling.
            </p>
            
            <div className="pt-2 flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                ✓ DPIIT Recognized
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                ✓ SISFS Partner
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                ✓ UP StartinUP Ecosystem
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                ✓ Makerspace Labs
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 border-l-4 border-l-[#00F0FF]">
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#00F0FF] block mb-1">
                80+
              </span>
              <h4 className="text-base font-bold text-white mb-1">Startups Incubated</h4>
              <p className="text-xs text-white/50">Across Deeptech, SaaS, Hardware & Consumer Sectors</p>
            </div>

            <div className="glass-panel p-6 border-l-4 border-l-[#7cff67]">
              <span className="font-mono text-4xl sm:text-5xl font-extrabold text-[#7cff67] block mb-1">
                ₹2+ Crore
              </span>
              <h4 className="text-base font-bold text-white mb-1">Grants & Capital Disbursed</h4>
              <p className="text-xs text-white/50">Direct seed support & non-dilutive grant mechanisms</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-sm italic text-white/70 mb-3 leading-relaxed">
                &ldquo;A catalyst for disruptive innovation - turning ambitious ideas into market leaders with world-class labs and capital.&rdquo;
              </p>
              <span className="text-xs font-mono text-white/50 block font-semibold">
                — Bennett Hatchery Foundation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SpaceTech Cohort Spotlight Banner */}
      <section id="spacetech" className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-[#00F0FF]/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono text-[#00F0FF]">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                Cohort 2026 // Active — Bennett Hatchery
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                Bennett Hatchery SpaceTech Cohort
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                India&apos;s space sector is opening up. The next opportunity is to build. The SpaceTech Venture Cohort is 
                a dedicated venture-building platform for students, researchers, and early-stage innovators to explore problems, 
                validate technologies, and build scalable deeptech enterprises.
              </p>
            </div>

            <a
              href="https://bennett-university-hatchery.vercel.app/programs/spacetech"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap !py-3 !px-6"
            >
              <span>Explore the Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. The CatalytiX Venture Curriculum (5-Stage Progressive Curriculum) */}
      <section id="curriculum" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="text-center mb-16">
          <div className="badge-pill mb-4 text-[#7cff67]">
            <Layers className="w-3.5 h-3.5" /> TRL 1 - 9 PIPELINE // Structured Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            The <span className="gradient-text-playful">CatalytiX</span> Venture Curriculum
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A 5-stage progressive curriculum guiding founders from MVP prototyping and deeptech validation to traction and scale.
          </p>
        </div>

        {/* Module Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {curriculumModules.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveModule(idx + 1)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeModule === idx + 1
                  ? 'bg-white/20 text-white border border-white/30 shadow-lg'
                  : 'bg-white/5 text-white/60 hover:text-white border border-white/5'
              }`}
            >
              <span style={{ color: m.color }} className="mr-1.5">M{idx + 1}</span>
              <span>{m.shortTitle}</span>
            </button>
          ))}
        </div>

        {/* Active Module Details Card */}
        {(() => {
          const mod = curriculumModules[activeModule - 1];
          return (
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/15">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
                <div>
                  <span
                    className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 font-bold mr-3 inline-block"
                    style={{ color: mod.color }}
                  >
                    MODULE {mod.num}
                  </span>
                  <span className="font-mono text-xs text-white/50 uppercase tracking-wider">
                    {mod.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                    {mod.title}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-white/40 block">PRIMARY FOCUS AREA</span>
                  <span className="text-sm sm:text-base font-bold text-white/90">
                    {mod.focus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Masterclasses */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#00F0FF]" /> Masterclasses
                  </h4>
                  <ul className="space-y-2">
                    {mod.masterclasses.map((item, i) => (
                      <li key={i} className="text-sm text-white/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Workshops / Activities */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#7cff67]" /> Workshops &amp; Sprints
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mod.activities.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Review & Deliverable */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-white/60 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF2E93]" /> Milestone Review
                  </h4>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                    <p className="text-sm font-semibold text-white/90 mb-1">Evaluation Gate:</p>
                    <p className="text-xs text-white/60">{mod.review}</p>
                  </div>
                </div>
              </div>

              {/* Policy Footer Notes */}
              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-white/40">
                <span>• Program can be renewed subject to approval from BHF governance</span>
                <span>• Progress to next stage depends on current stage completion</span>
              </div>
            </div>
          );
        })()}
      </section>

      {/* 5. The 4-Stage Incubation Lifecycle */}
      <section id="lifecycle" className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="text-center mb-16">
          <div className="badge-pill mb-4 text-[#00F0FF]">
            <Compass className="w-3.5 h-3.5" /> Structured Timeline // Quarterly Rolling Admissions
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
            The 4-Stage <span className="gradient-text-cool">Incubation Lifecycle</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            A disciplined transition model guiding startups from initial screening and diagnostic validation to demo day syndication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lifecycleStages.map((stage, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/10"
                    style={{ color: stage.badgeColor }}
                  >
                    PHASE {stage.step} // {stage.stageTag}
                  </span>
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded border border-white/10"
                    style={{ color: stage.badgeColor }}
                  >
                    {stage.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{stage.title}</h3>
                <p className="text-xs text-white/60 mb-6 leading-relaxed">{stage.subtitle}</p>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <span className="font-mono text-[11px] text-white/40 uppercase tracking-wider block">
                    Key Milestones:
                  </span>
                  <ul className="space-y-2">
                    {stage.milestones.map((m, mIdx) => (
                      <li key={mIdx} className="text-xs text-white/70 flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF] mt-0.5 shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>GATEWAY: BHF SELECTION COUNCIL</span>
                <span className="text-[#7cff67]">ACTIVE ENROLLMENT</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Final Application CTA Banner */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="glass-panel p-10 sm:p-16 rounded-3xl relative overflow-hidden text-center border border-white/20">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="badge-pill text-[#7cff67]">
              Quarterly Rolling Admissions Active
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Build What&apos;s Next with{' '}
              <span className="font-asimovian gradient-text-playful">CatalytiX</span>
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
              Take your deeptech, software, or hardware venture from TRL validation to scalable institutional growth.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://forms.gle/bennett-incubation"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Rocket className="w-4 h-4 fill-current" />
                <span>Apply for Incubation</span>
              </a>
              <a
                href="https://bennett-university-hatchery.vercel.app/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Briefcase className="w-4 h-4 text-[#00F0FF]" />
                <span>Explore Portfolio Startups</span>
              </a>
            </div>

            <div className="pt-6 flex items-center justify-center gap-2 text-xs font-mono text-white/40">
              <span className="w-2 h-2 rounded-full bg-[#7cff67] animate-pulse" />
              <span>BENNETT HATCHERY FOUNDATION // DPIIT RECOGNIZED</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Comprehensive Modern Footer */}
      <footer className="relative z-10 w-full border-t border-white/10 py-16 text-xs text-white/50 font-mono">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1 space-y-4">
            <Wordmark size="md" colorScheme="playful" />
            <p className="text-white/40 leading-relaxed text-[11px]">
              Bennett Hatchery Foundation (BHF) — A DPIIT-recognized institutional incubator supporting deeptech, space, hardware, and scalable technology startups.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-4">Program</h5>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="#overview" className="hover:text-white transition-colors">Incubation Overview</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">5-Stage Curriculum</a></li>
              <li><a href="#lifecycle" className="hover:text-white transition-colors">4-Phase Lifecycle</a></li>
              <li><a href="#spacetech" className="hover:text-white transition-colors">SpaceTech Cohort</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-4">Ecosystem</h5>
            <ul className="space-y-2.5 text-[11px]">
              <li><a href="https://bennett-university-hatchery.vercel.app/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">80+ Portfolio Startups</a></li>
              <li><a href="https://forms.gle/bennett-incubation" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Application Portal</a></li>
              <li><a href="#engine" className="hover:text-white transition-colors">SISFS &amp; UP StartinUP</a></li>
              <li><a href="#engine" className="hover:text-white transition-colors">Makerspace Labs</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-4">Governance</h5>
            <ul className="space-y-2.5 text-[11px]">
              <li><span className="text-white/70">Bennett University, Greater Noida</span></li>
              <li><span className="text-white/70">DPIIT Recognized Incubator</span></li>
              <li><span className="text-white/70">CIE Leadership Advisory</span></li>
              <li><span className="text-[#00F0FF]">Cohort 2026 Admissions Open</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Bennett Hatchery Foundation (CatalytiX). All venture rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://forms.gle/bennett-incubation" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Apply Now</a>
            <a href="https://bennett-university-hatchery.vercel.app/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#" className="hover:text-white transition-colors">Privacy &amp; Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
