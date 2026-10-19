"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Globe2, Building2, CheckCircle2 } from "lucide-react";
import { PARTNER_ORGANIZATIONS, PartnerOrg } from "@/lib/partners";

const CATEGORIES = [
  "All",
  "EPC & Contracting",
  "Energy & Petrochemical",
  "Infrastructure & Power",
  "Specialized Fabrication",
  "Industrial & Supply Chain",
] as const;

export default function PartnerNetwork() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPartners =
    selectedCategory === "All"
      ? PARTNER_ORGANIZATIONS
      : PARTNER_ORGANIZATIONS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="network"
      className="relative py-24 bg-navy-950 text-white overflow-hidden border-t border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-800/80 border border-white/10 text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Globe2 className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Trusted Connections</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Our Global <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-white to-titanium-200">
              Network & Connections.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-titanium-400 max-w-2xl mx-auto leading-relaxed">
            Connected with organizations across engineering, energy, construction, and industrial sectors.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((category) => {
              const count =
                category === "All"
                  ? PARTNER_ORGANIZATIONS.length
                  : PARTNER_ORGANIZATIONS.filter((p) => p.category === category).length;
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-emerald-accent text-navy-950 font-semibold shadow-glow-emerald"
                      : "bg-navy-900/80 text-titanium-300 border border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-navy-950/20 text-navy-950 font-bold"
                        : "bg-white/5 text-titanium-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Logos Grid: Responsive 5 cols (desktop), 4 cols (laptop), 3 cols (tablet), 2 cols (mobile) */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5"
        >
          <AnimatePresence>
            {filteredPartners.map((partner, idx) => (
              <motion.div
                key={partner.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                className="group relative rounded-2xl bg-white p-4 sm:p-5 flex flex-col items-center justify-between border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-accent/50 dark:border-white/10 dark:bg-white dark:hover:border-emerald-accent/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Logo Image Area */}
                <div className="w-full h-14 sm:h-16 flex items-center justify-center py-1">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={220}
                    height={80}
                    className={`max-h-10 sm:max-h-12 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 ${
                      partner.id === "saipem" ? "rounded-md" : ""
                    }`}
                  />
                </div>

                {/* Card Footer: Company Label & Sector */}
                <div className="mt-3 w-full text-center border-t border-slate-100 pt-2.5">
                  <div
                    className="text-[11px] sm:text-xs font-semibold text-slate-800 truncate group-hover:text-emerald-700 transition-colors"
                    title={partner.name}
                  >
                    {partner.shortName}
                  </div>
                  <div className="text-[9px] font-mono uppercase text-slate-400 tracking-wider truncate mt-0.5">
                    {partner.category}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Technical Governance & Compliance Footnote */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-navy-900/50 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-accent/10 border border-emerald-accent/20 text-emerald-accent flex-shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Multi-Sector Engineering Reach
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-titanium-400 max-w-2xl leading-relaxed">
                Uniqueiis provides specialized engineering verification, quality surveillance, and technical inspection services aligned with the exacting requirements of major EPC contractors, operators, and equipment fabricators worldwide.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="px-4 py-2 rounded-full text-xs font-mono font-semibold bg-white/5 border border-white/10 text-titanium-200">
              31 Organizations Connected
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
