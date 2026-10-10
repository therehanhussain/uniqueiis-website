"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronRight, ShieldCheck } from "lucide-react";

// Dynamic import for 3D Hero Scene (client-side only, high performance)
const HeroVessel3D = dynamic(() => import("./three/HeroVessel3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] lg:min-h-[640px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-accent/30 border-t-emerald-accent animate-spin" />
        <span className="text-xs font-mono text-slate-500 dark:text-titanium-400 uppercase tracking-widest">
          Calibrating 3D Model...
        </span>
      </div>
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, 40]);

  return (
    <section
      ref={containerRef}
      className="relative flex items-center overflow-hidden bg-[#F8FAFC] dark:bg-[#060A14] text-slate-900 dark:text-white pt-28 pb-12 lg:pt-32 lg:pb-16"
    >
      {/* Background Industrial Ambience Layer */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0 origin-center pointer-events-none"
      >
        <Image
          src="/images/uiis/hero_engineers.jpg"
          alt="UIIS Industrial Inspection Engineer and Refinery Facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-10 dark:opacity-20"
        />
        {/* Layered cinematic gradients for industrial depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/85 to-[#F8FAFC]/95 dark:from-[#060A14] dark:via-[#060A14]/85 dark:to-[#060A14]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_45%,rgba(16,185,129,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      </motion.div>

      {/* Main Grid: Left Content + Right 3D Engineering Object */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 lg:py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Brand Credentials */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-20">
            {/* Small Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8 shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-accent" />
              </span>
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-slate-700 dark:text-titanium-300 font-medium">
                UNIQUE INSPECTION INTEGRATED SERVICES
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.04]"
            >
              ENGINEERING <br />
              <span className="text-slate-900 dark:text-white">CONFIDENCE.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-300 font-extrabold">
                BUILT ON INSPECTION.
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 text-base sm:text-lg text-slate-600 dark:text-titanium-300 max-w-xl font-normal leading-relaxed"
            >
              Independent inspection, verification, technical support and quality assurance for critical industrial and infrastructure projects.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-emerald-deep to-emerald-accent shadow-glow-emerald hover:brightness-110 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Talk to Engineers</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="#capabilities"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-slate-800 dark:text-white bg-slate-100 dark:bg-white/[0.05] border border-slate-300 dark:border-white/15 hover:bg-slate-200 dark:hover:bg-white/[0.1] hover:border-slate-400 dark:hover:border-white/30 backdrop-blur-md active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Explore Capabilities</span>
                <ChevronRight className="w-4 h-4 text-slate-500 dark:text-titanium-400 group-hover:translate-x-0.5 group-hover:text-slate-900 dark:group-hover:text-white transition-all" />
              </Link>
            </motion.div>

            {/* Trust Credentials: Saudi Vision 2030 & ISO 9001 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8 pt-6 border-t border-slate-200 dark:border-white/10 w-full"
            >
              <div className="relative h-8 w-24 sm:h-9 sm:w-28 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/uiis/vision_2030.png"
                  alt="Saudi Vision 2030"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="h-5 w-px bg-slate-300 dark:bg-white/15" />
              <div className="relative h-8 w-20 sm:h-9 sm:w-24 opacity-80 hover:opacity-100 transition-opacity">
                <Image
                  src="/images/uiis/iso_9001.png"
                  alt="ISO 9001:2015 Certified"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="h-5 w-px bg-slate-300 dark:bg-white/15 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-titanium-400">
                <ShieldCheck className="w-4 h-4 text-emerald-accent" />
                <span>Independent TPI Assurance</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Industrial Inspection Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full h-[440px] sm:h-[500px] lg:h-[580px] flex items-center justify-center"
          >
            {/* Glow backing */}
            <div className="absolute inset-0 bg-radial-at-c from-emerald-accent/[0.08] via-transparent to-transparent blur-3xl pointer-events-none" />
            <HeroVessel3D />
          </motion.div>

        </div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-2 hidden lg:flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            const el = document.getElementById("trust");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 dark:text-titanium-500 group-hover:text-slate-700 dark:group-hover:text-titanium-300 transition-colors">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-slate-400 dark:border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-emerald-accent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
