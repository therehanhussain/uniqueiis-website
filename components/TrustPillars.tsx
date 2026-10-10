"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Check, ShieldCheck, FileCheck2, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { TRUST_PILLARS } from "@/lib/data";

export default function TrustPillars() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Sync scroll progress with active step
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.25) {
        setActiveIndex(0);
      } else if (latest < 0.5) {
        setActiveIndex(1);
      } else if (latest < 0.75) {
        setActiveIndex(2);
      } else {
        setActiveIndex(3);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const activePillar = TRUST_PILLARS[activeIndex];

  const icons = [
    <ShieldCheck key="inspect" className="w-8 h-8 text-emerald-accent" />,
    <FileCheck2 key="assure" className="w-8 h-8 text-industrial-sky" />,
    <Zap key="deliver" className="w-8 h-8 text-gold-accent" />,
    <TrendingUp key="value" className="w-8 h-8 text-emerald-glow" />,
  ];

  return (
    <section
      id="trust"
      ref={containerRef}
      className="relative min-h-[220vh] bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10"
    >
      {/* Sticky Storytelling Stage */}
      <div className="sticky top-0 min-h-screen flex flex-col justify-center py-20 overflow-hidden">
        {/* Subtle ambient lighting */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-accent/[0.04] rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Eyebrow Label */}
          <div className="mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest shadow-sm">
              <span>Scroll Storytelling • Core Philosophy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: The 4 Words in massive typography */}
            <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-8">
              {TRUST_PILLARS.map((pillar, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={pillar.label}
                    onClick={() => setActiveIndex(idx)}
                    className="text-left group flex items-center gap-4 sm:gap-6 focus:outline-none transition-all duration-300"
                  >
                    {/* Active Indicator Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-10 sm:h-12 w-[3px] rounded-full transition-all duration-500 ${
                          isActive
                            ? "bg-emerald-accent shadow-[0_0_12px_rgba(16,185,129,0.8)] scale-y-100"
                            : "bg-slate-300 dark:bg-white/10 group-hover:bg-slate-400 dark:group-hover:bg-white/20 scale-y-50"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`font-mono text-xs transition-colors duration-300 ${
                            isActive ? "text-emerald-deep dark:text-emerald-accent font-bold" : "text-slate-400 dark:text-titanium-500"
                          }`}
                        >
                          {pillar.number}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                            isActive ? "text-slate-700 dark:text-titanium-300 font-semibold" : "text-slate-400 dark:text-titanium-600"
                          }`}
                        >
                          {pillar.badge}
                        </span>
                      </div>

                      <h3
                        className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase transition-all duration-500 ${
                          isActive
                            ? "text-slate-900 dark:text-white translate-x-1"
                            : "text-slate-400 dark:text-titanium-600 group-hover:text-slate-600 dark:group-hover:text-titanium-400"
                        }`}
                      >
                        {pillar.label}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Storytelling Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.label}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-8 sm:p-12 backdrop-blur-xl shadow-lg dark:shadow-glass relative overflow-hidden"
                >
                  {/* Decorative background badge */}
                  <div className="absolute top-6 right-6 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                    {icons[activeIndex]}
                  </div>

                  {/* Number & Sublabel */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-accent/15 text-emerald-deep dark:text-emerald-accent border border-emerald-accent/30 font-bold">
                      {activePillar.number}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-titanium-400 font-semibold">
                      {activePillar.sublabel}
                    </span>
                  </div>

                  {/* Active Pillar Headline (Prompt specification) */}
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    {activePillar.headline}
                  </h4>

                  {/* Detailed Description */}
                  <p className="mt-5 text-sm sm:text-base text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
                    {activePillar.description}
                  </p>

                  {/* Checkpoints */}
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
                    {activePillar.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="mt-1 w-4 h-4 rounded-full bg-emerald-accent/20 flex items-center justify-center text-emerald-600 dark:text-emerald-accent flex-shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 dark:text-titanium-200 leading-relaxed font-normal">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-500 dark:text-titanium-500 uppercase">Core Deliverable Focus</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-emerald-deep dark:text-emerald-accent font-bold">
                      {activePillar.metric}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
