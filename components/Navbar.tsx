"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronRight, ShieldCheck } from "lucide-react";
import { BRAND_INFO } from "@/lib/data";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Industries", href: "#industries" },
    { name: "Capabilities", href: "#capabilities" },
    { name: "NDT", href: "#ndt" },
    { name: "Global Network", href: "#global-network" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-[#060A14]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm dark:shadow-glass py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Left */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group focus:outline-none"
              aria-label="UNIQUE INSPECTION INTEGRATED SERVICES"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white dark:bg-navy-900/90 border border-slate-200 dark:border-white/15 p-1 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-emerald-accent/50 transition-all duration-300">
                <Image
                  src="/images/uiis-logo-transparent.png"
                  alt="UIIS Official Logo"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-tight text-slate-900 dark:text-white text-sm sm:text-base leading-tight uppercase">
                    Unique Inspection
                  </span>
                  <span className="hidden sm:inline-flex text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-accent/15 text-emerald-deep dark:text-emerald-glow border border-emerald-accent/30 font-bold">
                    UIIS
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-semibold text-slate-500 dark:text-titanium-400 group-hover:text-slate-800 dark:group-hover:text-titanium-200 transition-colors">
                  Integrated Services
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/80 dark:bg-[#060A14]/60 border border-slate-200 dark:border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs xl:text-sm font-medium text-slate-600 dark:text-titanium-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right: Theme Switcher & Primary CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs xl:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-emerald-deep to-emerald-accent rounded-full overflow-hidden shadow-glow-emerald hover:brightness-110 active:scale-[0.98] transition-all duration-300"
              >
                <span>Talk to Engineers</span>
                <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </Link>
            </div>

            {/* Mobile Hamburger Toggle with Theme Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-titanium-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-over Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-[#060A14] border-l border-slate-200 dark:border-white/10 p-6 flex flex-col justify-between shadow-2xl z-50 text-slate-900 dark:text-white"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src="/images/uiis-logo-transparent.png"
                      alt="UIIS Logo"
                      width={34}
                      height={34}
                      className="rounded-lg object-contain"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">Unique Inspection</span>
                      <span className="text-[10px] text-slate-500 dark:text-titanium-400">Integrated Services (UIIS)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-titanium-400 hover:text-slate-900 dark:hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-8 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 dark:text-titanium-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-sm font-medium"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 dark:text-titanium-500" />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between px-2 pb-1">
                  <span className="text-xs font-mono text-slate-500 dark:text-titanium-400">Theme</span>
                  <ThemeToggle />
                </div>
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-deep to-emerald-accent rounded-xl shadow-glow-emerald"
                >
                  <span>Talk to Engineers</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <div className="text-center text-[11px] text-slate-400 dark:text-titanium-500 pt-2 font-mono">
                  {BRAND_INFO.contact.email}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
