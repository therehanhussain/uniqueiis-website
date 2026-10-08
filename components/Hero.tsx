"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, ChevronRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { BRAND_INFO } from "@/lib/data";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#060A14] pt-28 pb-20"
    >
      {/* Cinematic Industrial Imagery with subtle parallax & scale */}
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
          className="object-cover object-center opacity-35 dark:opacity-35"
        />
        {/* Layered cinematic gradients for Apple-level depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-[#060A14]/75 to-[#060A14]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(148,163,184,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      </motion.div>

      {/* Hero Foreground Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        {/* Small Eyebrow & Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-accent" />
          </span>
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-titanium-300 font-medium">
            UNIQUE INSPECTION INTEGRATED SERVICES
          </span>
        </motion.div>

        {/* Large Cinematic Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white leading-[1.02] max-w-4xl"
        >
          ENGINEERING <br />
          <span className="text-white">CONFIDENCE.</span> <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-white to-titanium-300 font-extrabold">
            BUILT ON INSPECTION.
          </span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-titanium-300 max-w-2xl font-normal leading-relaxed"
        >
          Independent inspection, verification, technical support and quality assurance for critical industrial and infrastructure projects.
        </motion.p>

        {/* Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
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
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-white/[0.05] border border-white/15 hover:bg-white/[0.1] hover:border-white/30 backdrop-blur-md active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Explore Capabilities</span>
            <ChevronRight className="w-4 h-4 text-titanium-400 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
          </Link>
        </motion.div>

        {/* Trust Credentials: Saudi Vision 2030 & ISO 9001 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-14 flex items-center justify-center gap-6 sm:gap-10 pt-8 border-t border-white/10"
        >
          <div className="relative h-8 w-24 sm:h-9 sm:w-28 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/images/uiis/vision_2030.png"
              alt="Saudi Vision 2030"
              fill
              className="object-contain"
            />
          </div>
          <div className="h-5 w-px bg-white/15" />
          <div className="relative h-8 w-20 sm:h-9 sm:w-24 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/images/uiis/iso_9001.png"
              alt="ISO 9001:2015 Certified"
              fill
              className="object-contain"
            />
          </div>
          <div className="h-5 w-px bg-white/15 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-titanium-400">
            <ShieldCheck className="w-4 h-4 text-emerald-accent" />
            <span>Independent TPI Assurance</span>
          </div>
        </motion.div>

        {/* Minimal Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-12 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            const el = document.getElementById("trust");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-titanium-500 group-hover:text-titanium-300 transition-colors">
            Scroll to explore
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
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
