"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Wrench,
  Layers,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Paintbrush,
  Activity,
  Box,
} from "lucide-react";
import {
  TECHNICAL_DISCIPLINES,
  TECHNICAL_STANDARDS,
  INSPECTOR_QUALIFICATIONS,
  INSPECTION_TOOLS,
  INSPECTION_COVERAGE,
} from "@/lib/data";

const CapabilitiesMachinery3D = dynamic(
  () => import("./three/CapabilitiesMachinery3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[460px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-accent/30 border-t-emerald-accent animate-spin" />
          <span className="text-[10px] font-mono text-slate-500 dark:text-titanium-400 uppercase tracking-widest">
            Loading 3D Machinery...
          </span>
        </div>
      </div>
    ),
  }
);

export default function Capabilities() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("Rotating Equipment");
  const [activeCoverageTab, setActiveCoverageTab] = useState<"mechanical" | "coatings" | "electrical">("mechanical");

  const currentDisc =
    TECHNICAL_DISCIPLINES.find((d) => d.title.toLowerCase().includes(selectedDiscipline.toLowerCase())) ||
    TECHNICAL_DISCIPLINES[0];

  return (
    <section
      id="capabilities"
      className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Wrench className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Technical Capabilities & Disciplines</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Technical Competence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
              You Can Rely On.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
            Covering a wide range of capital equipment, materials, and processes across upstream, downstream, utilities, and infrastructure facilities.
          </p>
        </div>

        {/* 3D Machinery Assembly Interactive Spotlight */}
        <div className="mb-12 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-lg dark:shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* 3D Model Display */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-slate-100/80 dark:bg-black/40 border border-slate-200 dark:border-white/5 relative">
              <CapabilitiesMachinery3D activeDiscipline={selectedDiscipline} />
            </div>

            {/* Discipline Selector and Live Spec Readout */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-1">
                  Discipline Cross-Inspection
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  {currentDisc.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-titanium-300 leading-relaxed">
                  {currentDisc.description}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-titanium-300">
                  <span className="text-slate-500 dark:text-titanium-500 block text-[10px] uppercase">Scope Coverage:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{currentDisc.scope}</span>
                </div>
              </div>

              {/* Fast Discipline Switch Buttons */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-titanium-400 block mb-2">
                  Select discipline to highlight component:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {TECHNICAL_DISCIPLINES.slice(0, 8).map((d) => {
                    const isSelected = selectedDiscipline === d.title;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDiscipline(d.title)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-accent text-navy-950 font-bold shadow-sm"
                            : "bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
                        }`}
                      >
                        {d.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 01. The 10 Technical Disciplines Grid */}
        <div className="mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {TECHNICAL_DISCIPLINES.map((disc, idx) => (
              <motion.div
                key={disc.id}
                onClick={() => setSelectedDiscipline(disc.title)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer ${
                  selectedDiscipline === disc.title
                    ? "bg-emerald-50 dark:bg-white/[0.06] border-emerald-accent shadow-sm dark:shadow-glass"
                    : "bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 shadow-sm dark:shadow-none"
                }`}
              >
                {/* Discipline Image with subtle zoom */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={disc.image}
                    alt={disc.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/40 to-transparent" />
                  
                  {/* Discipline Number */}
                  <span className="absolute top-2.5 left-2.5 font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-emerald-accent border border-white/10">
                    {disc.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-deep dark:group-hover:text-emerald-accent transition-colors duration-200">
                      {disc.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-titanium-400 line-clamp-2 leading-relaxed">
                      {disc.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-titanium-500">
                    <span className="truncate max-w-[140px] text-slate-600 dark:text-titanium-400">
                      {disc.scope}
                    </span>
                    <span className="text-emerald-deep dark:text-emerald-accent group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 02. Technical Standards Minimal Section with Marquee */}
        <div className="mb-14 p-8 sm:p-10 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-1">
                International Standards Familiarity
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Technical Codes & Standards
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-titanium-400 max-w-md">
              Our teams work strictly per international codes, client specifications, and statutory regulatory requirements.
            </p>
          </div>

          {/* Standards Infinite Marquee */}
          <div className="relative overflow-hidden w-full group group-hover-pause py-2">
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#F8FAFC] dark:from-[#060A14] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#F8FAFC] dark:from-[#060A14] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 w-max animate-marquee">
              {[...TECHNICAL_STANDARDS, ...TECHNICAL_STANDARDS].map((std, i) => (
                <div
                  key={`${std.code}-${i}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-emerald-accent/50 dark:hover:border-emerald-accent/40 transition-colors whitespace-nowrap"
                >
                  <span className="font-mono text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    {std.code}
                  </span>
                  <span className="text-xs text-slate-600 dark:text-titanium-400 border-l border-slate-200 dark:border-white/10 pl-3">
                    {std.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 03. Inspector Qualifications & Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Qualifications Column */}
          <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-emerald-accent" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Inspector Credentials
              </h3>
            </div>

            <div className="space-y-4">
              {INSPECTOR_QUALIFICATIONS.map((qual, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {qual.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-accent/20 text-emerald-deep dark:text-emerald-accent font-semibold">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-titanium-400 leading-relaxed font-normal">
                    {qual.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Calibrated Tools Column */}
          <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-5 h-5 text-emerald-accent" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Calibrated Inspection Tools
              </h3>
            </div>

            <div className="space-y-4">
              {INSPECTION_TOOLS.map((tool, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 flex-shrink-0 bg-slate-900">
                    <Image
                      src={tool.image}
                      alt={tool.name}
                      fill
                      sizes="48px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {tool.name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 dark:text-titanium-400 leading-relaxed font-normal">
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
