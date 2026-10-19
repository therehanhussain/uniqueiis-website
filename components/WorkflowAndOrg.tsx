"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
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
  Check,
} from "lucide-react";
import {
  INSPECTION_WORKFLOW_STEPS,
  CLIENT_DELIVERABLES,
  WORKFLOW_CLIENT_BENEFITS,
  OUR_PEOPLE_AREAS,
  COMPANY_COMMITMENTS,
} from "@/lib/data";

const WorkflowTimeline3D = dynamic(() => import("./three/WorkflowTimeline3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[180px] sm:h-[220px] flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-emerald-accent/30 border-t-emerald-accent animate-spin" />
    </div>
  ),
});

export default function WorkflowAndOrg() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = INSPECTION_WORKFLOW_STEPS[activeStepIndex];

  return (
    <section
      id="workflow"
      className="relative py-16 sm:py-20 bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[500px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* 01. INSPECTION WORKFLOW — 11 STEPS SIGNATURE INTERACTION       */}
        {/* ============================================================== */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
            <Workflow className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Execution Lifecycle</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Inspection Execution <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
              11-Step Workflow.
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
            A structured, transparent lifecycle from initial Notice of Inspection (NOI) to final equipment clearance, ensuring rigorous compliance and zero surprise delays.
          </p>
        </div>

        {/* Interactive 11-Step Timeline Interface */}
        <div className="mb-14 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-lg dark:shadow-glass">
          
          {/* Top Progress Bar & Step Numbers */}
          <div className="mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-titanium-400">
                Milestone Progress ({activeStepIndex + 1} of {INSPECTION_WORKFLOW_STEPS.length})
              </span>
              <span className="text-xs font-mono text-emerald-deep dark:text-emerald-accent font-bold">
                {Math.round(((activeStepIndex + 1) / INSPECTION_WORKFLOW_STEPS.length) * 100)}% Complete
              </span>
            </div>

            {/* Glowing Progress Line */}
            <div className="h-1.5 w-full bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden relative">
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
                    className={`py-2 px-1 rounded-xl text-center font-mono text-xs transition-all duration-200 focus:outline-none cursor-pointer ${
                      isActive
                        ? "bg-emerald-accent text-navy-950 font-black shadow-glow-emerald"
                        : isPassed
                        ? "bg-emerald-50 dark:bg-white/10 text-emerald-600 dark:text-emerald-glow"
                        : "bg-slate-100 dark:bg-white/[0.03] text-slate-500 dark:text-titanium-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{step.step}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Technical Inspection Conduit Pipeline */}
          <div className="mb-8 p-3 rounded-2xl bg-slate-100/80 dark:bg-black/40 border border-slate-200 dark:border-white/5 overflow-hidden relative">
            <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-[10px] font-mono text-slate-500 dark:text-titanium-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-pulse" />
              <span>3D PIPELINE CONDUIT • ACTIVE MILESTONE [STEP {activeStep.step}]</span>
            </div>
            <WorkflowTimeline3D activeStepIndex={activeStepIndex} />
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
                  <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-emerald-accent/20 text-emerald-deep dark:text-emerald-accent border border-emerald-accent/40">
                    Step {activeStep.step}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-titanium-400">
                    Workflow Sequence
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {activeStep.title}
                </h3>

                <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-titanium-200 leading-relaxed font-normal">
                  {activeStep.desc}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 dark:text-titanium-400">
                  <span className="text-emerald-deep dark:text-emerald-accent font-semibold">Standard SLA Compliant</span>
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
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-mono font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    ← Previous Step
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStepIndex(Math.min(INSPECTION_WORKFLOW_STEPS.length - 1, activeStepIndex + 1))}
                    disabled={activeStepIndex === INSPECTION_WORKFLOW_STEPS.length - 1}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-mono font-semibold bg-gradient-to-r from-emerald-deep to-emerald-accent text-white shadow-glow-emerald disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    Next Step →
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Deliverables & Client Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 sm:mb-16">
          
          {/* Key Deliverables Column */}
          <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-sm dark:shadow-none">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 text-emerald-accent" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Client Deliverables
              </h3>
            </div>

            <div className="space-y-4">
              {CLIENT_DELIVERABLES.map((deliv, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5">
                  <span className="text-xs font-mono text-emerald-deep dark:text-emerald-accent font-bold mt-0.5">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {deliv.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-600 dark:text-titanium-400 leading-relaxed font-normal">
                      {deliv.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Value to Clients Column */}
          <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 sm:p-10 flex flex-col justify-between shadow-sm dark:shadow-none">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-emerald-accent" />
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Measurable Client Value
                </h3>
              </div>

              <div className="space-y-3">
                {WORKFLOW_CLIENT_BENEFITS.map((ben, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex items-center gap-3">
                    <span className="text-[10px] font-mono text-emerald-deep dark:text-emerald-accent uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-accent/15 border border-emerald-accent/30 font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-white">
                      {ben}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-titanium-400">
              <span>Electronic QA/QC Dossiers</span>
              <span className="text-emerald-deep dark:text-emerald-accent font-semibold">100% Traceability</span>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* 02. OUR PEOPLE — TECHNICAL DISCIPLINES & EXPERTISE             */}
        {/* ============================================================== */}
        <div className="mb-14 sm:mb-16">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-4 shadow-sm">
              <Users className="w-3.5 h-3.5 text-emerald-accent" />
              <span>Certified Technical Personnel</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Our People. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
                Experience, Competence & Commitment.
              </span>
            </h3>

            <p className="mt-4 text-base text-slate-600 dark:text-titanium-300 leading-relaxed">
              Our personnel are qualified, experienced, and hold international credentials with major approvals across demanding sectors. We deploy multidisciplinary teams rigorously vetted for technical competence and safety commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {OUR_PEOPLE_AREAS.map((area, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none transition-all group"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-slate-200 dark:border-white/10 bg-slate-900">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-transparent opacity-80" />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-1">
                    Area 0{idx + 1}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {area.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
                    {area.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-slate-200 dark:border-white/10 flex flex-col gap-1 font-mono">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-titanium-400 font-medium">
                    Deployment
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent shrink-0 animate-pulse" />
                    <span>Immediate Dispatch</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 03. ORGANIZATIONAL COMMITMENTS — HEALTH, SAFETY, ENVIRONMENT   */}
        {/* ============================================================== */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-2">
              Corporate Governance
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Company Commitments
            </h3>
            <p className="mt-3 text-sm text-slate-600 dark:text-titanium-400">
              Guiding principles across Health, Safety, Environment, Quality, People, and Sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COMPANY_COMMITMENTS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 shadow-sm dark:shadow-none transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-emerald-deep dark:text-emerald-accent block mb-2 font-bold">
                    0{idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-titanium-300 font-medium mb-3">
                    {item.statement}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-titanium-500 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
