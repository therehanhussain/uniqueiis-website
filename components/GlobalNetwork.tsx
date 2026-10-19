"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Radio, Box, ImageIcon } from "lucide-react";
import { GLOBAL_NETWORK, WORLDWIDE_NETWORK_COUNTRIES, NetworkHub } from "@/lib/data";

const GlobalGlobe3D = dynamic(() => import("./three/GlobalGlobe3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-accent/30 border-t-emerald-accent animate-spin" />
        <span className="text-[10px] font-mono text-slate-500 dark:text-titanium-400 uppercase tracking-widest">
          Calibrating 3D Globe...
        </span>
      </div>
    </div>
  ),
});

export default function GlobalNetwork() {
  const [activeHub, setActiveHub] = useState<NetworkHub>(GLOBAL_NETWORK[0]);
  const [activeRegionTab, setActiveRegionTab] = useState<"all" | "middleEast" | "asiaPacific" | "europe" | "americasAfrica">("all");
  const [displayMode, setDisplayMode] = useState<"3d" | "infographic">("3d");
  const [selectedCountry, setSelectedCountry] = useState<string>("Saudi Arabia");

  const networkPillars = [
    { title: "Dependable Inspection Services", desc: "Consistent execution standards across all vendor locations worldwide." },
    { title: "Technical Competence", desc: "Qualified multidisciplinary inspectors matched to specialized international codes." },
    { title: "Responsive Coordination", desc: "Agile scheduling, rapid dispatch, and transparent electronic communication." },
    { title: "Consistent Reporting", desc: "Standardized electronic reports, photographic proof, and NCR closure tracking." },
    { title: "Client Focused Support", desc: "Dedicated alignment with client procurement milestones and master delivery dates." }
  ];

  return (
    <section
      id="global-network"
      className="relative py-16 sm:py-20 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-accent/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Radio className="w-3.5 h-3.5 text-emerald-accent animate-pulse" />
            <span>Our Worldwide Network</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            International Inspection, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
              Verification & Support.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
            We provide international vendor inspection, expediting and technical support through an established global network, ensuring dependable service, consistent quality and cross-border coordination.
          </p>

          <p className="mt-3 text-xs font-mono text-slate-500 dark:text-titanium-500">
            * Central Operations Hub in Al-Khobar, Saudi Arabia with qualified international inspection network deployment across manufacturing centers.
          </p>
        </div>

        {/* Global Network Map Graphic & Interactive Hub Details */}
        <div className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-lg dark:shadow-glass mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: 3D Global Network Globe / Infographic Visual with Switcher */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-titanium-400 tracking-wider">
                  Network Visualization
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setDisplayMode("3d")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      displayMode === "3d"
                        ? "bg-emerald-accent text-navy-950 font-bold shadow-sm"
                        : "text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>3D Globe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDisplayMode("infographic")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      displayMode === "infographic"
                        ? "bg-emerald-accent text-navy-950 font-bold shadow-sm"
                        : "text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Network Infographic</span>
                  </button>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900 flex items-center justify-center">
                {displayMode === "3d" ? (
                  <GlobalGlobe3D
                    selectedCountry={selectedCountry}
                    onSelectCountry={(countryName) => {
                      setSelectedCountry(countryName);
                      for (const [regionKey, countries] of Object.entries(WORLDWIDE_NETWORK_COUNTRIES)) {
                        if (countries.includes(countryName) && activeRegionTab !== "all" && activeRegionTab !== regionKey) {
                           setActiveRegionTab(regionKey as any);
                          break;
                        }
                      }
                    }}
                    activeRegion={activeRegionTab}
                  />
                ) : (
                  <div className="relative w-full h-full p-2 sm:p-3 flex items-center justify-center bg-slate-100 dark:bg-slate-950/80">
                    <Image
                      src="/images/uiis/network_infographic.svg"
                      alt="Uniqueiis Worldwide Network Infographic"
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Hub Radar & Active Coordination Node */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-1">
                  Global Deployment Hubs
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Cross-Border Technical Coordination
                </h3>

                <div className="space-y-3">
                  {GLOBAL_NETWORK.map((hub) => {
                    const isActive = activeHub.id === hub.id;
                    return (
                      <button
                        key={hub.id}
                        type="button"
                        onClick={() => {
                          setActiveHub(hub);
                          if (hub.id === "hub-ksa") {
                            setActiveRegionTab("middleEast");
                            setSelectedCountry("Saudi Arabia");
                          } else if (hub.id === "hub-asia") {
                            setActiveRegionTab("asiaPacific");
                            setSelectedCountry("Singapore");
                          } else if (hub.id === "hub-europe") {
                            setActiveRegionTab("europe");
                            setSelectedCountry("Germany");
                          } else if (hub.id === "hub-americas") {
                            setActiveRegionTab("americasAfrica");
                            setSelectedCountry("U.S.A.");
                          }
                        }}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-emerald-50 dark:bg-white/[0.06] border-emerald-accent shadow-sm dark:shadow-glass"
                            : "bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? "bg-emerald-accent shadow-[0_0_8px_#10B981]" : "bg-slate-400 dark:bg-titanium-500"
                              }`}
                            />
                            {hub.location}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-titanium-400">
                            {hub.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
                          {hub.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 5 Network Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {networkPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 shadow-sm dark:shadow-none transition-all"
            >
              <span className="text-[10px] font-mono text-emerald-deep dark:text-emerald-accent block mb-2 font-bold">
                0{idx + 1}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-titanium-400 leading-relaxed font-normal">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
