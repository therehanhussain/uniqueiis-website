"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, MapPin, Radio, Shield, CheckCircle, ArrowRight, Check } from "lucide-react";
import { GLOBAL_NETWORK, WORLDWIDE_NETWORK_COUNTRIES, NetworkHub } from "@/lib/data";

export default function GlobalNetwork() {
  const [activeHub, setActiveHub] = useState<NetworkHub>(GLOBAL_NETWORK[0]);
  const [activeRegionTab, setActiveRegionTab] = useState<"all" | "middleEast" | "asiaPacific" | "europe" | "americasAfrica">("all");

  const getAllCountries = () => {
    return [
      ...WORLDWIDE_NETWORK_COUNTRIES.middleEast,
      ...WORLDWIDE_NETWORK_COUNTRIES.asiaPacific,
      ...WORLDWIDE_NETWORK_COUNTRIES.europe,
      ...WORLDWIDE_NETWORK_COUNTRIES.americasAfrica,
    ];
  };

  const getDisplayedCountries = () => {
    switch (activeRegionTab) {
      case "middleEast":
        return WORLDWIDE_NETWORK_COUNTRIES.middleEast;
      case "asiaPacific":
        return WORLDWIDE_NETWORK_COUNTRIES.asiaPacific;
      case "europe":
        return WORLDWIDE_NETWORK_COUNTRIES.europe;
      case "americasAfrica":
        return WORLDWIDE_NETWORK_COUNTRIES.americasAfrica;
      default:
        return getAllCountries();
    }
  };

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
      className="relative py-28 sm:py-36 bg-[#060A14] text-white overflow-hidden border-t border-white/10"
    >
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-accent/[0.02] rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Radio className="w-3.5 h-3.5 text-emerald-accent animate-pulse" />
            <span>Our Worldwide Network • PDF Page 11</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            International Inspection, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-white to-titanium-200">
              Verification & Support.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-titanium-300 leading-relaxed font-normal">
            We provide international vendor inspection, expediting and technical support through an established global network, ensuring dependable service, consistent quality and cross-border coordination.
          </p>

          <p className="mt-3 text-xs font-mono text-titanium-500">
            * Central Operations Hub in Al-Khobar, Saudi Arabia with qualified international inspection network deployment across manufacturing centers.
          </p>
        </div>

        {/* Global Network Map Graphic & Interactive Hub Details */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-glass mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Actual Graphic from PDF Page 11 */}
            <div className="lg:col-span-7 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#03060C] flex items-center justify-center p-3">
              <Image
                src="/images/uiis/worldwide_globe.jpg"
                alt="UIIS Worldwide Network Visual"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain"
              />
            </div>

            {/* Right: Hub Radar & Active Coordination Node */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-1">
                  Global Deployment Hubs
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Cross-Border Technical Coordination
                </h3>

                <div className="space-y-3">
                  {GLOBAL_NETWORK.map((hub) => {
                    const isActive = activeHub.id === hub.id;
                    return (
                      <button
                        key={hub.id}
                        type="button"
                        onClick={() => setActiveHub(hub)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "bg-white/[0.06] border-emerald-accent shadow-glass"
                            : "bg-white/[0.02] border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-bold text-white flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? "bg-emerald-accent shadow-[0_0_8px_#10B981]" : "bg-titanium-500"
                              }`}
                            />
                            {hub.location}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-titanium-400">
                            {hub.status}
                          </span>
                        </div>
                        <p className="text-xs text-titanium-300 leading-relaxed font-normal">
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

        {/* Countries Represented in Worldwide Network (PDF Page 11) */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-10 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-1">
                Global Network Coverage
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Countries Represented in Worldwide Network
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-titanium-400 max-w-2xl">
                As stated in the official UIIS company profile, international inspection and technical coordination is supported across key manufacturing corridors:
              </p>
            </div>

            {/* Region Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveRegionTab("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeRegionTab === "all" ? "bg-emerald-accent text-navy-950 font-bold" : "bg-white/5 text-titanium-300 hover:text-white"
                }`}
              >
                All ({getAllCountries().length})
              </button>
              <button
                type="button"
                onClick={() => setActiveRegionTab("middleEast")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeRegionTab === "middleEast" ? "bg-emerald-accent text-navy-950 font-bold" : "bg-white/5 text-titanium-300 hover:text-white"
                }`}
              >
                Middle East & Gulf ({WORLDWIDE_NETWORK_COUNTRIES.middleEast.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveRegionTab("asiaPacific")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeRegionTab === "asiaPacific" ? "bg-emerald-accent text-navy-950 font-bold" : "bg-white/5 text-titanium-300 hover:text-white"
                }`}
              >
                Asia & Pacific ({WORLDWIDE_NETWORK_COUNTRIES.asiaPacific.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveRegionTab("europe")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeRegionTab === "europe" ? "bg-emerald-accent text-navy-950 font-bold" : "bg-white/5 text-titanium-300 hover:text-white"
                }`}
              >
                Europe ({WORLDWIDE_NETWORK_COUNTRIES.europe.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveRegionTab("americasAfrica")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeRegionTab === "americasAfrica" ? "bg-emerald-accent text-navy-950 font-bold" : "bg-white/5 text-titanium-300 hover:text-white"
                }`}
              >
                Americas & Africa ({WORLDWIDE_NETWORK_COUNTRIES.americasAfrica.length})
              </button>
            </div>
          </div>

          {/* Countries Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {getDisplayedCountries().map((country) => (
              <div
                key={country}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 hover:border-emerald-accent/40 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-accent shrink-0" />
                <span className="text-xs text-white truncate font-medium">{country}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Network Delivery Pillars (PDF Page 11) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {networkPillars.map((p, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-accent/40 transition-colors"
            >
              <span className="text-xs font-mono text-emerald-accent font-bold block mb-2">
                0{idx + 1}
              </span>
              <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                {p.title}
              </h4>
              <p className="text-xs text-titanium-400 leading-relaxed font-normal">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
