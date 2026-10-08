"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Activity
} from "lucide-react";
import {
  TECHNICAL_DISCIPLINES,
  TECHNICAL_STANDARDS,
  INSPECTOR_QUALIFICATIONS,
  INSPECTION_TOOLS,
  INSPECTION_COVERAGE
} from "@/lib/data";

export default function Capabilities() {
  const [activeCoverageTab, setActiveCoverageTab] = useState<"mechanical" | "coatings" | "electrical">("mechanical");

  return (
    <section
      id="capabilities"
      className="relative py-28 sm:py-36 bg-[#060A14] text-white overflow-hidden border-t border-white/10"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Wrench className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Technical Capabilities & Disciplines • PDF Page 9</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Technical Competence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-white to-titanium-200">
              You Can Rely On.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-titanium-300 leading-relaxed font-normal">
            Covering a wide range of capital equipment, materials, and processes across upstream, downstream, utilities, and infrastructure facilities.
          </p>
        </div>

        {/* 01. The 10 Technical Disciplines Grid */}
        <div className="mb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {TECHNICAL_DISCIPLINES.map((disc, idx) => (
              <motion.div
                key={disc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-accent/50 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-glass"
              >
                {/* Discipline Image with subtle zoom */}
                <div className="relative h-40 w-full overflow-hidden bg-navy-950">
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
                    <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-accent transition-colors duration-200">
                      {disc.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-titanium-400 line-clamp-2 leading-relaxed">
                      {disc.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-titanium-500">
                    <span className="truncate max-w-[140px] text-titanium-400">
                      {disc.scope}
                    </span>
                    <span className="text-emerald-accent group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 02. Technical Standards Minimal Section with Marquee */}
        <div className="mb-28 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-1">
                International Standards Familiarity • PDF Page 9
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Technical Codes & Standards
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-titanium-400 max-w-md">
              Our teams work strictly per international codes, client specifications, and statutory regulatory requirements.
            </p>
          </div>

          {/* Standards Infinite Marquee */}
          <div className="relative overflow-hidden w-full group group-hover-pause py-2">
            {/* Fade edges */}
            <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#060A14] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#060A14] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-4 w-max animate-marquee">
              {[...TECHNICAL_STANDARDS, ...TECHNICAL_STANDARDS].map((std, i) => (
                <div
                  key={`${std.code}-${i}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-accent/40 transition-colors whitespace-nowrap"
                >
                  <span className="font-mono text-sm sm:text-base font-black text-white">
                    {std.code}
                  </span>
                  <div className="h-4 w-px bg-white/10" />
                  <span className="text-xs text-titanium-300 font-medium">
                    {std.name}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-accent bg-emerald-accent/10 px-2 py-0.5 rounded">
                    {std.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 03. Inspector Qualifications (CSWIP, ASNT, API, AMPP, Client Approved) */}
        <div className="mb-28">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-2">
              Credentialing & Qualifications
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Inspector Credentials & Approvals
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-titanium-400">
              Technical credentials represented across our inspection network:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INSPECTOR_QUALIFICATIONS.map((q) => (
              <div
                key={q.code}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-accent/40 transition-colors flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-accent/15 border border-emerald-accent/30 flex items-center justify-center text-emerald-accent font-mono font-bold text-xs shrink-0">
                  {q.code.slice(0, 4)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{q.title}</h4>
                  <p className="mt-1 text-xs text-titanium-400 leading-relaxed">{q.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 04. Calibrated Inspection Tools & Equipment (PDF Page 9 with real photos) */}
        <div>
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-2">
              Instrumentation & Readiness
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Calibrated Inspection Tools & Equipment
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-titanium-400">
              Professional calibrated tools and testing instruments maintained with valid calibration certificates for reliable shop and field verification.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
            {INSPECTION_TOOLS.map((tool) => (
              <div
                key={tool.id}
                className="group rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden hover:border-emerald-accent/40 transition-all flex flex-col justify-between"
              >
                <div className="relative h-24 w-full bg-navy-950">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    fill
                    sizes="120px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#060A14]/25" />
                </div>
                <div className="p-3 text-center">
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-accent transition-colors">
                    {tool.name}
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-accent block mt-1">
                    Calibrated
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
