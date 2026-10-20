"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Flame,
  ShieldAlert,
  Cpu,
  Droplet,
  Building2
} from "lucide-react";
import { INDUSTRIES } from "@/lib/data";

export default function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);

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

  const displayedIndustries = INDUSTRIES.slice(0, 3);

  return (
    <section
      id="industries"
      className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <span>Operational Environments</span>
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

        {/* Responsive Three-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayedIndustries.map((industry, index) => {
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
                className={`group relative w-full h-[500px] lg:h-[520px] rounded-3xl overflow-hidden border cursor-pointer transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 ${
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
                    unoptimized
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 33vw"
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

                  <div className="mt-6 pt-4 border-t border-white/15 flex items-start justify-between gap-2 text-xs font-mono">
                    <span className="text-slate-400 shrink-0">Criticality</span>
                    <span className="text-white font-semibold text-right">{industry.criticality}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
