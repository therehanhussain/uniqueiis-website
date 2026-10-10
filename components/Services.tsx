"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  X,
  CheckCircle2,
  Check,
  ShieldCheck,
  Layers,
  Sparkles
} from "lucide-react";
import { SERVICES, ServiceItem } from "@/lib/data";

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedService]);

  return (
    <section
      id="services"
      className="relative py-16 sm:py-20 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/4 left-10 w-[700px] h-[500px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[450px] bg-industrial-blue/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Inspection Departments & Technical Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Seven Specialized <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
              Engineering Departments.
            </span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
            Independent third-party shop and site inspection, expediting, supplier audits, and technical manpower across the entire lifecycle of industrial assets.
          </p>
        </div>

        {/* Large Immersive Service Cards (Framer-style engineering cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedService(service)}
              className="group relative rounded-3xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-emerald-accent/60 dark:hover:border-emerald-accent/50 overflow-hidden transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl dark:hover:shadow-glass hover:-translate-y-1.5"
            >
              {/* Large Relevant UIIS Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                <Image
                  src={service.visualImage}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/50 to-transparent" />

                {/* Service Number & Department Code Badges */}
                <div className="absolute top-5 left-5 flex items-center gap-2.5">
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-emerald-accent border border-white/10 shadow-sm">
                    {service.number}
                  </span>
                  <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/25">
                    {service.departmentCode}
                  </span>
                </div>

                <div className="absolute top-5 right-5">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-slate-200 border border-white/10">
                    UIIS Core Scope
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 sm:p-9 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-deep dark:text-emerald-accent font-semibold">
                      Department {service.departmentCode}
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-titanium-500">
                      Click to expand
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-deep dark:group-hover:text-emerald-accent transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-titanium-200">
                    {service.tagline}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-titanium-400 line-clamp-3 leading-relaxed font-normal">
                    {service.shortDesc}
                  </p>

                  {/* Capabilities Preview Pills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.technicalCapabilities.slice(0, 3).map((cap, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-titanium-300 border border-slate-200 dark:border-white/5"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore Interaction Row */}
                <div className="mt-8 pt-5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-deep dark:group-hover:text-emerald-accent transition-colors">
                    <span>Explore Department Details</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-titanium-500">
                    ITP & Codes Aligned
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* ============================================================== */}
      {/* SERVICE EXPANSION MODAL (AnimatePresence)                     */}
      {/* ============================================================== */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xl"
              onClick={() => setSelectedService(null)}
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0B1220] border border-slate-200 dark:border-white/15 p-6 sm:p-10 shadow-2xl z-10 text-slate-900 dark:text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-300 hover:text-slate-900 dark:hover:text-white transition-all focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-emerald-accent/20 text-emerald-deep dark:text-emerald-accent border border-emerald-accent/40">
                  {selectedService.number}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-titanium-400 font-semibold">
                  Department Code: {selectedService.departmentCode}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {selectedService.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base font-semibold text-emerald-deep dark:text-emerald-accent">
                {selectedService.tagline}
              </p>

              {/* Split Image & Full Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
                <div className="lg:col-span-7">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-titanium-400 font-semibold mb-2">
                    Scope of Work & Overview
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-titanium-300 leading-relaxed">
                    {selectedService.shortDesc}
                  </p>
                </div>
                <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900">
                  <Image
                    src={selectedService.visualImage}
                    alt={selectedService.title}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-mono text-emerald-accent">
                      Verified Field Capability
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Capabilities */}
              <div className="mb-8 pt-6 border-t border-slate-200 dark:border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-titanium-400 font-semibold mb-4">
                  Key Technical Capabilities & Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedService.technicalCapabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                      <Check className="w-4 h-4 text-emerald-deep dark:text-emerald-accent mt-0.5 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-titanium-200 leading-normal">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspection Stages if present */}
              {selectedService.stages && selectedService.stages.length > 0 && (
                <div className="mb-8 pt-6 border-t border-slate-200 dark:border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-titanium-400 font-semibold mb-4">
                    Typical Inspection Stages & Milestones
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {selectedService.stages.map((stg, sIdx) => (
                      <div key={sIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-center">
                        <span className="text-[10px] font-mono text-emerald-deep dark:text-emerald-accent block font-bold mb-1">
                          Stage 0{sIdx + 1}
                        </span>
                        <span className="text-xs text-slate-800 dark:text-white font-medium block leading-tight">
                          {stg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer with Actions */}
              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-500 dark:text-titanium-400">
                  Governed by ISO 9001:2015 & Client Specifications
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-medium text-slate-600 dark:text-titanium-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <Link
                    href="#contact"
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-emerald-deep to-emerald-accent shadow-glow-emerald flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
