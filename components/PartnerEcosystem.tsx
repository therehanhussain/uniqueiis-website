"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Handshake, ShieldCheck } from "lucide-react";
import { PARTNER_ECOSYSTEM_LOGOS } from "@/lib/data";

export default function PartnerEcosystem() {
  return (
    <section
      id="ecosystem"
      className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 bg-[#F8FAFC] dark:bg-[#040812] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-accent/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Handshake className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Industrial Collaboration</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] uppercase">
            UNIQUEIIS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
              PARTNER ECOSYSTEM
            </span>
          </h2>

          <p className="mt-4 text-base text-slate-600 dark:text-titanium-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Leading engineering, procurement, construction, and industrial organizations represented in the Unique Inspection partner ecosystem.
          </p>
        </div>

        {/* Subtle Infinite Marquee (Row 1) */}
        <div className="relative overflow-hidden w-full group group-hover-pause py-4 mb-6">
          <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#F8FAFC] dark:from-[#040812] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#F8FAFC] dark:from-[#040812] to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 w-max animate-marquee">
            {[...PARTNER_ECOSYSTEM_LOGOS, ...PARTNER_ECOSYSTEM_LOGOS].map((partner, idx) => (
              <div
                key={`marquee-${partner.id}-${idx}`}
                className="flex flex-col items-center justify-center w-52 h-28 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-emerald-accent/60 dark:hover:border-emerald-accent/50 p-4 transition-all duration-300 shadow-sm shrink-0"
              >
                <div className="relative w-full h-12 flex items-center justify-center">
                  <Image
                    src={partner.image}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="180px"
                    className="object-contain filter contrast-105"
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-titanium-400 mt-2 truncate max-w-full text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Static Grid Presentation for Complete Inspection (12 Logos) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5 mt-2 sm:mt-3">
          {PARTNER_ECOSYSTEM_LOGOS.map((partner, idx) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="group relative p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-emerald-accent/60 dark:hover:border-emerald-accent/50 transition-all duration-300 flex flex-col items-center justify-center aspect-[16/10] hover:-translate-y-1 shadow-sm dark:shadow-none"
            >
              <div className="relative w-full h-12 flex items-center justify-center p-1">
                <Image
                  src={partner.image}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="160px"
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-titanium-400 mt-2 text-center truncate max-w-full">
                {partner.category}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Verification & Impartiality Statement */}
        <div className="mt-10 p-8 sm:p-10 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm dark:shadow-none">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-emerald-accent/15 border border-emerald-accent/30 text-emerald-deep dark:text-emerald-accent shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Technical Governance & Independent Neutrality
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-titanium-300 max-w-2xl leading-relaxed">
                As an independent Third-Party Inspection (TPI) services provider, Uniqueiis maintains strict objectivity. All surveillance records, material verifications, and NDT interpretations reflect verified physical facts without commercial conflicts.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="px-4 py-2 rounded-full text-xs font-mono font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-emerald-deep dark:text-emerald-accent">
              ISO 9001:2015 Compliant
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
