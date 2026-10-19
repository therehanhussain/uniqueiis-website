"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  Check,
  Box,
  Camera,
  Info,
} from "lucide-react";
import { NDT_SERVICES_OFFERED, NDT_METHODS, NDT_BENEFITS } from "@/lib/data";
import type { NDTMethodType } from "./three/NDTVisualizer3D";

// Dynamically import 3D NDT Visualizer
const NDTVisualizer3D = dynamic(() => import("./three/NDTVisualizer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-accent/30 border-t-emerald-accent animate-spin" />
        <span className="text-[10px] font-mono text-slate-500 dark:text-titanium-400 uppercase tracking-widest">
          Loading 3D Simulation...
        </span>
      </div>
    </div>
  ),
});

export default function NDTSection() {
  const [activeMethodIndex, setActiveMethodIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"3d" | "photo">("3d");

  const activeMethod = NDT_METHODS[activeMethodIndex];
  const is3DSupported = ["UT", "RT", "MT", "PT", "VT"].includes(activeMethod.code);

  return (
    <section
      id="ndt"
      className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background blueprint grid & laser line */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-accent to-transparent opacity-60" />
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[500px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-emerald-accent animate-pulse" />
            <span>NDT Support Services (NSS)</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.0] uppercase">
            INSPECTION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
              WITHOUT
            </span> <br />
            DESTRUCTION.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
            Unique Inspection provides critical NDT solutions and full-scope NDT support services to contractors, fabricators and industrial clients. Modern NDT methods verify physical integrity, reduce rework risks, and maintain quality without destroying the serviceability of the asset.
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs font-mono text-emerald-deep dark:text-emerald-accent font-medium">
            <span>Level II & Level III Technical Governance</span>
            <span>•</span>
            <span>ASNT TC-1A • CP-189 • ASME V • ISO 9712</span>
          </div>
        </div>

        {/* NDT Technician Hero Spotlight */}
        <div className="mb-14 rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-8 sm:p-12 backdrop-blur-xl shadow-lg dark:shadow-glass">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-2">
                Field Scope & Advisory
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Full-Scope NDT Services Offered
              </h3>

              <div className="space-y-3.5">
                {NDT_SERVICES_OFFERED.map((srv, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-emerald-accent/20 flex items-center justify-center text-emerald-600 dark:text-emerald-accent flex-shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-titanium-200 leading-relaxed font-normal">
                      {srv}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-titanium-400">
                <span className="flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-accent" />
                  <span>Level III Consulting</span>
                </span>
                <span>•</span>
                <span>Procedure Review & Approval</span>
                <span>•</span>
                <span>Fabrication, Site & Turnaround</span>
              </div>
            </div>

            {/* NDT Technician Image */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 shadow-xl bg-slate-900 group">
              <Image
                src="/images/uiis/ndt/ndt_technician_3d.jpg"
                alt="Uniqueiis NDT Inspection Engineer on Industrial Pipeline"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-accent font-semibold block">
                  Field NDT Support
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  Technician executing ultrasonic thickness verification on process piping
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive NDT Methods Grid (UT, RT, MT, PT, VT, Holiday Testing) */}
        <div>
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-2">
              Core Testing Methods
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Six Common NDT Methods
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-titanium-400">
              Select any method below to inspect its testing principles with real-time 3D physics demonstration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
            {NDT_METHODS.map((method, idx) => {
              const isActive = activeMethodIndex === idx;
              return (
                <button
                  key={method.code}
                  type="button"
                  onClick={() => setActiveMethodIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 focus:outline-none flex flex-col justify-between h-32 cursor-pointer ${
                    isActive
                      ? "bg-emerald-50 dark:bg-white/[0.08] border-emerald-accent shadow-sm dark:shadow-glass"
                      : "bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/[0.04] shadow-sm dark:shadow-none"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-base font-black transition-colors ${
                        isActive ? "text-emerald-deep dark:text-emerald-accent" : "text-slate-900 dark:text-white"
                      }`}
                    >
                      {method.code}
                    </span>
                    <span className="text-[9px] font-mono uppercase text-slate-400 dark:text-titanium-500">
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-700 dark:text-white block leading-tight">
                      {method.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Method Showcase Card with 3D Physics Visualizer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethod.code}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-lg dark:shadow-none"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Method Information */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-black px-3 py-1 rounded bg-emerald-accent/20 text-emerald-deep dark:text-emerald-accent border border-emerald-accent/30">
                      {activeMethod.code}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-titanium-400 font-semibold">
                      Non-Destructive Testing Method
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {activeMethod.fullName}
                  </h4>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-titanium-300 leading-relaxed">
                    {activeMethod.desc}
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-4 text-xs font-mono text-slate-500 dark:text-titanium-400">
                    <span>Applicability: Welds • Castings • Forgings • In-Service Pipelines</span>
                    <span>•</span>
                    <span className="text-emerald-deep dark:text-emerald-accent font-semibold">Level II / Level III Qualified</span>
                  </div>

                  {/* Educational Disclaimer Badge */}
                  <div className="mt-6 p-3.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 flex items-start gap-2.5 text-xs text-slate-600 dark:text-titanium-400">
                    <Info className="w-4 h-4 text-emerald-accent flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed">
                      <strong className="text-slate-900 dark:text-white">Educational Visualization:</strong> Visual demonstration of {activeMethod.code} physical principles. For actual field inspection, Uniqueiis certified Level II/III specialists execute standardized procedures per ASME Sec V / ASNT / ISO.
                    </p>
                  </div>
                </div>

                {/* 3D Visualizer / High-Res Photograph Switcher */}
                <div className="lg:col-span-6 flex flex-col gap-3">
                  {/* View Mode Toggle Controls */}
                  {is3DSupported && (
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-titanium-400 tracking-wider">
                        Interactive View Mode
                      </span>
                      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setViewMode("3d")}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            viewMode === "3d"
                              ? "bg-emerald-accent text-navy-950 font-bold shadow-sm"
                              : "text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <Box className="w-3.5 h-3.5" />
                          <span>3D Physics</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode("photo")}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                            viewMode === "photo"
                              ? "bg-emerald-accent text-navy-950 font-bold shadow-sm"
                              : "text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Field Photo</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Media Container */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/15 bg-slate-900 min-h-[340px] sm:min-h-[380px] flex items-center justify-center">
                    {is3DSupported && viewMode === "3d" ? (
                      <div className="w-full h-full relative">
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/85 dark:bg-black/70 border border-slate-200 dark:border-white/10 text-[10px] font-mono text-emerald-deep dark:text-emerald-accent shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-pulse" />
                          <span>3D PRINCIPLE: {activeMethod.code}</span>
                        </div>
                        <NDTVisualizer3D method={activeMethod.code as NDTMethodType} />
                      </div>
                    ) : (
                      <div className="relative w-full h-full min-h-[340px] sm:min-h-[380px]">
                        <Image
                          src={activeMethod.image}
                          alt={activeMethod.fullName}
                          fill
                          sizes="500px"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060A14]/75 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="text-[11px] font-mono text-emerald-accent font-semibold">
                            {activeMethod.fullName}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Key Benefits of NDT Strip */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-titanium-400 font-semibold block mb-4 text-center">
              Key Benefits of NDT Support
            </span>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {NDT_BENEFITS.map((ben, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-accent mx-auto mb-1.5" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-white block leading-tight">
                    {ben}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
