"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Workflow,
  CheckCircle2,
  FileText,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Building2,
  Check
} from "lucide-react";
import {
  INSPECTION_WORKFLOW_STEPS,
  CLIENT_DELIVERABLES,
  WORKFLOW_CLIENT_BENEFITS,
  OUR_PEOPLE_AREAS,
  COMPANY_COMMITMENTS
} from "@/lib/data";

export default function WorkflowAndOrg() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = INSPECTION_WORKFLOW_STEPS[activeStepIndex];

  return (
    <section
      id="workflow"
      className="relative py-28 sm:py-36 bg-[#060A14] text-white overflow-hidden border-t border-white/10"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[500px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* 01. INSPECTION WORKFLOW — 11 STEPS SIGNATURE INTERACTION       */}
        {/* ============================================================== */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Workflow className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Execution Lifecycle • PDF Page 8</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Inspection Execution <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-white to-titanium-200">
              11-Step Workflow.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-titanium-300 leading-relaxed font-normal">
            A structured, transparent lifecycle from initial Notice of Inspection (NOI) to final equipment clearance, ensuring rigorous compliance and zero surprise delays.
          </p>
        </div>

        {/* Interactive 11-Step Timeline Interface */}
        <div className="mb-28 rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-glass">
          
          {/* Top Progress Bar & Step Numbers */}
          <div className="mb-10 pb-8 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-titanium-400">
                Milestone Progress ({activeStepIndex + 1} of {INSPECTION_WORKFLOW_STEPS.length})
              </span>
              <span className="text-xs font-mono text-emerald-accent font-bold">
                {Math.round(((activeStepIndex + 1) / INSPECTION_WORKFLOW_STEPS.length) * 100)}% Complete
              </span>
            </div>

            {/* Glowing Progress Line */}
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-deep to-emerald-accent"
                initial={false}
                animate={{
                  width: `${((activeStepIndex + 1) / INSPECTION_WORKFLOW_STEPS.length) * 100}%`,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Step selector pills / numbers */}
            <div className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2 mt-4">
              {INSPECTION_WORKFLOW_STEPS.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const isPassed = idx < activeStepIndex;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={`py-2 px-1 rounded-xl text-center font-mono text-xs transition-all duration-200 focus:outline-none ${
                      isActive
                        ? "bg-emerald-accent text-navy-950 font-black shadow-glow-emerald"
                        : isPassed
                        ? "bg-white/10 text-emerald-glow"
                        : "bg-white/[0.03] text-titanium-500 hover:text-white"
                    }`}
                  >
                    <span>{step.step}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Showcase Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-emerald-accent/20 text-emerald-accent border border-emerald-accent/40">
                    Step {activeStep.step}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-titanium-400">
                    Workflow Sequence
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {activeStep.title}
                </h3>

                <p className="mt-4 text-base sm:text-lg text-titanium-200 leading-relaxed font-normal">
                  {activeStep.desc}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-mono text-titanium-400">
                  <span className="text-emerald-accent font-semibold">Standard SLA Compliant</span>
                  <span>•</span>
                  <span>Documented in Electronic Dossier</span>
                  <span>•</span>
                  <span>Real-time Technical Communication</span>
                </div>
              </div>

              {/* Step Navigation Actions */}
              <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                    disabled={activeStepIndex === 0}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-mono font-semibold bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    ← Previous Step
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(Math.min(INSPECTION_WORKFLOW_STEPS.length - 1, activeStepIndex + 1))}
                    disabled={activeStepIndex === INSPECTION_WORKFLOW_STEPS.length - 1}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-emerald-deep to-emerald-accent text-white shadow-glow-emerald disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Client Deliverables Strip from PDF Page 8 */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-4 text-center sm:text-left">
              What the Client Receives (Deliverables)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {CLIENT_DELIVERABLES.slice(0, 5).map((del, dIdx) => (
                <div key={dIdx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-bold text-white block mb-1">{del.title}</span>
                  <p className="text-[11px] text-titanium-400 leading-tight">{del.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 02. TEAM / PEOPLE — CINEMATIC PHOTO SECTION                    */}
        {/* ============================================================== */}
        <div>
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4">
              <Users className="w-3.5 h-3.5 text-emerald-accent" />
              <span>Our People — Our Strength • PDF Page 10</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase">
              PEOPLE. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-white to-titanium-200">
                PROCESS.
              </span> <br />
              PARTNERSHIP.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-titanium-300 leading-relaxed font-normal">
              Competent, certified, and multidisciplinary engineers bringing decades of combined field experience to critical energy and infrastructure assets.
            </p>
          </div>

          {/* 5 Cinematic Photographs with Smooth Reveal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {OUR_PEOPLE_AREAS.map((person, idx) => (
              <motion.div
                key={person.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-3xl bg-white/[0.02] border border-white/10 hover:border-emerald-accent/40 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-sm hover:shadow-glass"
              >
                <div className="relative h-60 w-full overflow-hidden bg-navy-950">
                  <Image
                    src={person.image}
                    alt={person.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/40 to-transparent" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-emerald-accent border border-white/10">
                    0{idx + 1}
                  </span>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-accent transition-colors">
                      {person.title}
                    </h4>
                    <p className="mt-2 text-xs text-titanium-400 leading-relaxed font-normal">
                      {person.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-titanium-500">
                    Field-Proven Expertise
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 5 Commitments from PDF Page 10 */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-4 text-center">
              Our Five Commitments
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {COMPANY_COMMITMENTS.map((com, cIdx) => (
                <div key={cIdx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-accent block mb-1">
                    {com.title}
                  </span>
                  <h5 className="text-xs font-bold text-white mb-1.5 leading-snug">
                    {com.statement}
                  </h5>
                  <p className="text-[11px] text-titanium-400 leading-tight">
                    {com.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
