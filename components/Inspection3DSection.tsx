"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  Cpu,
  Layers,
  Ruler,
  Sparkles,
  Search,
} from "lucide-react";
import {
  INSPECTION_POINTS,
  type InspectionPointId,
} from "./three/InspectionVessel3D";

// Dynamically import 3D canvas
const InspectionVessel3D = dynamic(
  () => import("./three/InspectionVessel3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-emerald-accent/30 border-t-emerald-accent animate-spin" />
          <span className="text-xs font-mono text-slate-500 dark:text-titanium-400 uppercase tracking-widest">
            Rendering 3D Spool Assembly...
          </span>
        </div>
      </div>
    ),
  }
);

export default function Inspection3DSection() {
  const [activePoint, setActivePoint] = useState<InspectionPointId>("WELD");

  const currentData =
    INSPECTION_POINTS.find((p) => p.id === activePoint) ||
    INSPECTION_POINTS[1];

  const getPointIcon = (id: InspectionPointId) => {
    switch (id) {
      case "MATERIAL":
        return <Layers className="w-4 h-4" />;
      case "WELD":
        return <Sparkles className="w-4 h-4" />;
      case "THICKNESS":
        return <Cpu className="w-4 h-4" />;
      case "SURFACE":
        return <Search className="w-4 h-4" />;
      case "DIMENSION":
        return <Ruler className="w-4 h-4" />;
      case "QUALITY":
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="inspection-3d"
      className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background glow & subtle engineering grid */}
      <div className="absolute top-1/2 left-1/3 w-[650px] h-[650px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
              <span>Interactive 3D Verification • ASME / ISO Criteria</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Precision in Every <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
                Dimension & Boundary.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-titanium-400 max-w-xl">
              Rotate, inspect, and evaluate the 6 core non-negotiable verification gates applied across critical pressure piping and process assets.
            </p>
          </div>

          {/* Quick instructions indicator */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-titanium-400 shadow-sm dark:shadow-none">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Click any verification point to orbit camera</span>
          </div>
        </div>

        {/* 6 Technical Labels Floating Navigation Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-6">
          {INSPECTION_POINTS.map((pt) => {
            const isSelected = activePoint === pt.id;
            return (
              <button
                key={pt.id}
                type="button"
                onClick={() => setActivePoint(pt.id)}
                className={`relative px-4 py-3 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? "bg-emerald-50 dark:bg-white/[0.08] border-emerald-accent text-slate-900 dark:text-white shadow-sm dark:shadow-glow-emerald"
                    : "bg-white dark:bg-white/[0.02] border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/[0.04] shadow-sm dark:shadow-none"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`transition-colors ${
                      isSelected ? "text-emerald-deep dark:text-emerald-accent" : "text-slate-500 dark:text-titanium-400 group-hover:text-slate-900 dark:group-hover:text-white"
                    }`}
                  >
                    {getPointIcon(pt.id)}
                  </span>
                  <span className="text-xs font-mono font-bold tracking-wider">
                    {pt.id}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main 3D Display Canvas + Live Telemetry HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/90 dark:bg-[#090E1A]/80 border border-slate-200 dark:border-white/10 rounded-3xl p-4 sm:p-8 backdrop-blur-xl shadow-xl dark:shadow-glass relative overflow-hidden">
          
          {/* Left/Center: 3D Canvas */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-slate-100/80 dark:bg-black/40 border border-slate-200 dark:border-white/5">
            {/* Top 3D Status Overlay */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/85 dark:bg-black/70 border border-slate-200 dark:border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-700 dark:text-titanium-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-accent animate-pulse" />
              <span>LIVE CAM: FOCUS [{activePoint}]</span>
            </div>

            <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/85 dark:bg-black/70 border border-slate-200 dark:border-white/10 backdrop-blur-md text-[10px] font-mono text-slate-500 dark:text-titanium-400 shadow-sm">
              <span>DRAG TO ROTATE 360°</span>
            </div>

            <InspectionVessel3D
              activePoint={activePoint}
              onSelectPoint={setActivePoint}
            />
          </div>

          {/* Right: Technical Verification Telemetry Card */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full p-2 sm:p-4">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                <span className="text-[11px] font-mono text-slate-500 dark:text-titanium-400 tracking-widest uppercase">
                  VERIFICATION GATE
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-accent/15 border border-emerald-accent/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                  {currentData.status}
                </span>
              </div>

              <div className="mt-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold">
                  POINT {activePoint}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {currentData.label}
                </h3>
              </div>

              <div className="mt-6 space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-titanium-400">
                    Component Specification
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                    {currentData.code}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-titanium-400">
                    Nominal Criteria & Acceptance Limit
                  </div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-titanium-200 mt-0.5">
                    {currentData.nominal}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-titanium-400">
                    Execution Method
                  </div>
                  <div className="text-xs font-mono text-slate-600 dark:text-titanium-300 mt-0.5">
                    {currentData.method}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10">
                  <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-titanium-400">
                    Governing Standard
                  </div>
                  <div className="text-xs font-mono text-emerald-deep dark:text-emerald-accent font-semibold mt-0.5">
                    {currentData.standard}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-titanium-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-accent" />
                <span>Zero Non-Conformance</span>
              </span>
              <span>Uniqueiis Level III Verified</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
