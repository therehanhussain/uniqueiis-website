"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Clock,
  Globe2,
  HeartHandshake,
  CheckCircle2,
  Eye,
  Target,
  FileCheck,
  Scale
} from "lucide-react";
import { BRAND_INFO, WHY_CHOOSE_UIIS, CORE_VALUES } from "@/lib/data";

export default function About() {
  const [activeTab, setActiveTab] = useState<"vision" | "mission" | "quality">("vision");

  return (
    <section id="about" className="relative py-16 sm:py-20 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-emerald-accent/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 01. Large Split-Screen Statement & Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          
          {/* Left Column: Massive Statement */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-6 w-fit shadow-sm">
              <span>About Unique Inspection (Uniqueiis)</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.0] uppercase">
              INSPECTION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
                WITHOUT
              </span> <br />
              COMPROMISE.
            </h2>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
              <p className="text-base sm:text-lg text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
                {BRAND_INFO.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-titanium-400">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-emerald-deep dark:text-emerald-accent font-semibold">
                &ldquo;Inspect Today for a Safer Tomorrow&rdquo;
              </span>
              <span>•</span>
              <span>Al-Khobar, Kingdom of Saudi Arabia</span>
            </div>
          </motion.div>

          {/* Right Column: Premium 3D Industrial Inspection Render */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-900 shadow-xl group">
              <Image
                src="/images/uiis/about_3d_inspection.jpg"
                alt="Uniqueiis 3D Industrial Flange and Pressure Vessel Laser Verification"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-transparent opacity-80" />
              
              {/* Overlay Meta */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-1">
                    3D Digital Verification
                  </span>
                  <p className="text-sm font-semibold text-white">
                    Third-party surveillance and code verification on pressure vessels and piping
                  </p>
                </div>
                <div className="hidden sm:block text-right font-mono text-[10px] text-titanium-400">
                  ASME & ISO Criteria
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 02. Interactive Tabs: Vision / Mission / Quality Policy */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-xl shadow-sm dark:shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  type="button"
                  onClick={() => setActiveTab("vision")}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono transition-all ${
                    activeTab === "vision"
                      ? "bg-emerald-accent text-navy-950 font-bold shadow-glow-emerald"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
                  }`}
                >
                  Corporate Vision
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("mission")}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono transition-all ${
                    activeTab === "mission"
                      ? "bg-emerald-accent text-navy-950 font-bold shadow-glow-emerald"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
                  }`}
                >
                  Our Mission
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("quality")}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono transition-all ${
                    activeTab === "quality"
                      ? "bg-emerald-accent text-navy-950 font-bold shadow-glow-emerald"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10"
                  }`}
                >
                  Quality Policy
                </button>
              </div>

              {activeTab === "vision" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4 text-emerald-deep dark:text-emerald-accent">
                    <Eye className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold">Strategic Vision</span>
                  </div>
                  <blockquote className="text-lg sm:text-xl md:text-2xl font-light italic text-slate-800 dark:text-titanium-100 leading-relaxed border-l-2 border-emerald-accent pl-6">
                    &ldquo;To be Globally the most trusted and leading partner cum performer in inspection, verification and audit industry with the passion of customer centric tailored services.&rdquo;
                  </blockquote>
                  <p className="mt-6 text-sm text-slate-600 dark:text-titanium-400 leading-relaxed">
                    We aspire to set the global benchmark for technical integrity, ensuring that industrial operators and EPC contractors receive uncompromising verification at every project stage.
                  </p>
                </motion.div>
              )}

              {activeTab === "mission" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4 text-industrial-sky">
                    <Target className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold">Our Mission</span>
                  </div>
                  <p className="text-base text-slate-900 dark:text-white font-semibold mb-5">
                    As a Customer Centric Company, we maximize added value and meet stakeholder expectations by:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Being reliable and executing best practices in Inspection, Verification and Audit Industry.",
                      "Conforming to the highest safety, health, environment and quality standards.",
                      "Conducting business with competence in an ethical, responsible and accountable manner.",
                      "Synergizing with our customers to build productive, collaborative and trusting relationships."
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-accent mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "quality" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4 text-gold-deep dark:text-gold-accent">
                    <FileCheck className="w-5 h-5" />
                    <span className="text-xs font-mono uppercase tracking-widest font-semibold">Quality Policy</span>
                  </div>
                  <p className="text-base text-slate-900 dark:text-white font-semibold mb-5">
                    Our Quality Policy is strongly driven by management principles and systematic behaviors:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Build mutually profitable relationships with customers, ensuring their long-term success.",
                      "Achieve our commitments for quality, cost and schedule without compromise.",
                      "Enhance systematic research and preventive practices at all levels for reliable risk management.",
                      "Drive continual improvement and innovation based upon efficient processes and customer surveys."
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold-deep dark:text-gold-accent mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Uniqueiis Emblem & Statement Box */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-center">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src="/images/uiis-logo-transparent.png"
                  alt="Uniqueiis Official Logo"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base tracking-tight uppercase">
                {BRAND_INFO.name}
              </h3>
              <span className="text-xs font-mono text-emerald-deep dark:text-emerald-accent tracking-widest mt-1">
                {BRAND_INFO.slogan}
              </span>
              <p className="mt-3 text-xs text-slate-500 dark:text-titanium-400">
                Operating strictly under international codes and client specifications.
              </p>
            </div>

          </div>
        </div>

        {/* 03. Core Values Grid */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-2">
              Operational Standards
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Our Core Values
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-titanium-400">
              Six core principles that guide our inspectors and technical specialists across all assignments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <motion.div
                key={val.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-emerald-accent/50 dark:hover:border-emerald-accent/40 hover:bg-slate-50 dark:hover:bg-white/[0.05] shadow-sm dark:shadow-none transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-emerald-deep dark:text-emerald-accent">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-titanium-400">
                    {val.subtitle}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-deep dark:group-hover:text-emerald-accent transition-colors">
                  {val.name}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-titanium-400 leading-relaxed font-normal">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
