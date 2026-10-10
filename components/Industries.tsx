"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Flame,
  ShieldAlert,
  Cpu,
  Droplet,
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from "lucide-react";
import { INDUSTRIES } from "@/lib/data";

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getIndustryIcon = (id: string) => {
    switch (id) {
      case "oil-gas":
        return <Flame className="w-5 h-5 text-amber-400" />;
      case "petrochemical":
        return <ShieldAlert className="w-5 h-5 text-emerald-accent" />;
      case "power-utilities":
        return <Cpu className="w-5 h-5 text-industrial-sky" />;
      case "water-infrastructure":
        return <Droplet className="w-5 h-5 text-blue-400" />;
      case "industrial-construction":
        return <Building2 className="w-5 h-5 text-teal-300" />;
      default:
        return <Flame className="w-5 h-5 text-white" />;
    }
  };

  const handleScrollTo = (index: number) => {
    setActiveIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = 420; // approximate width + gap
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="industries"
      className="relative py-16 sm:py-20 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Horizontal Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
              <span>Operational Environments • PDF Page 2</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Industries We Serve. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
                Critical Energy & Infrastructure.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-titanium-400 max-w-xl">
              Delivering independent inspection, vendor surveillance, and quality assurance across the world&apos;s most demanding operating environments.
            </p>
          </div>

          {/* Desktop Navigation Controls */}
          <div className="hidden lg:flex items-center gap-4 mt-6 md:mt-0">
            <div className="text-xs font-mono text-slate-500 dark:text-titanium-400">
              <span className="text-slate-900 dark:text-white font-bold">0{activeIndex + 1}</span> / 0{INDUSTRIES.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScrollTo(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="p-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm dark:shadow-none transition-all cursor-pointer"
                aria-label="Previous industry"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollTo(Math.min(INDUSTRIES.length - 1, activeIndex + 1))}
                disabled={activeIndex === INDUSTRIES.length - 1}
                className="p-3 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm dark:shadow-none transition-all cursor-pointer"
                aria-label="Next industry"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Horizontal Storytelling Container (Framer-style horizontal scroll-track) */}
        <div
          ref={scrollContainerRef}
          className="hidden lg:flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-8 pt-2"
        >
          {INDUSTRIES.map((industry, index) => {
            const isSelected = activeIndex === index;
            return (
              <motion.div
                key={industry.id}
                onClick={() => setActiveIndex(index)}
                whileHover={{
                  y: -8,
                  scale: 1.015,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 30px rgba(16, 185, 129, 0.18)",
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative flex-shrink-0 w-[380px] xl:w-[420px] h-[520px] rounded-3xl overflow-hidden border cursor-pointer snap-start transition-all duration-500 flex flex-col justify-between p-8 ${
                  isSelected
                    ? "border-emerald-accent shadow-xl dark:shadow-glass"
                    : "border-slate-300/80 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20"
                }`}
              >
                {/* Background Photography with High Contrast Dark Gradient */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 1280px) 380px, 420px"
                    quality={95}
                    className="object-cover object-center transform scale-100 group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/60 via-45% to-transparent" />
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Top Badge (White-on-Dark glass stays consistent on photo overlay) */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-md">
                    {getIndustryIcon(industry.id)}
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-accent border border-white/10">
                    0{index + 1}
                  </span>
                </div>

                {/* Bottom Content Area (Preserves white text over dark photo gradient) */}
                <div className="relative z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-1">
                    {industry.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-emerald-accent transition-colors">
                    {industry.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {industry.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Criticality</span>
                    <span className="text-white font-semibold">{industry.criticality}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Vertical Sequence (No horizontal scroll breaking) */}
        <div className="flex flex-col gap-6 lg:hidden">
          {INDUSTRIES.map((industry, index) => (
            <div
              key={industry.id}
              className="group relative h-[420px] rounded-3xl overflow-hidden border border-slate-300/80 dark:border-white/10 flex flex-col justify-between p-6 sm:p-8"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  quality={95}
                  className="object-cover object-center transform scale-100 group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/60 via-45% to-transparent" />
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-md flex items-center justify-center">
                  {getIndustryIcon(industry.id)}
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-accent border border-white/10">
                  0{index + 1}
                </span>
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-1">
                  {industry.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {industry.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {industry.description}
                </p>
                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Criticality</span>
                  <span className="text-white font-semibold">{industry.criticality}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
