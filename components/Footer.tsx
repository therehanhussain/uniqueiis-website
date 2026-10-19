"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin, Globe } from "lucide-react";
import { BRAND_INFO, SERVICES, INDUSTRIES } from "@/lib/data";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-[#03060C] text-slate-600 dark:text-titanium-400 border-t border-slate-200 dark:border-white/10 pt-12 pb-10 overflow-hidden transition-colors duration-250">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Brand & Philosophy Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-200 dark:border-white/10">
          
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm flex flex-col items-center text-center">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3.5 group mb-6">
                <div className="relative w-11 h-11 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/15 p-1 flex items-center justify-center overflow-hidden shadow-sm dark:shadow-none">
                  <Image
                    src="/images/uiis-logo-transparent.png"
                    alt="Uniqueiis Official Logo"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight uppercase leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Unique Inspection
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-emerald-600 dark:text-emerald-accent">
                    Integrated Services (Uniqueiis)
                  </span>
                </div>
              </Link>

              <p className="text-sm text-slate-600 dark:text-titanium-400 leading-relaxed mb-6 font-normal text-center">
                Independent Third-Party Inspection, verification, technical support and quality assurance for critical industrial and infrastructure projects.
              </p>

              {/* Core Message */}
              <div className="text-xs font-mono tracking-wider text-slate-800 dark:text-white flex flex-wrap items-center justify-center gap-2 mb-6">
                <span className="text-emerald-600 dark:text-emerald-accent font-semibold">INSPECT</span>
                <span className="text-slate-400 dark:text-titanium-500">•</span>
                <span className="text-emerald-600 dark:text-emerald-accent font-semibold">ASSURE</span>
                <span className="text-slate-400 dark:text-titanium-500">•</span>
                <span className="text-emerald-600 dark:text-emerald-accent font-semibold">DELIVER</span>
                <span className="text-slate-400 dark:text-titanium-500">•</span>
                <span className="text-emerald-600 dark:text-emerald-accent font-semibold">ADD VALUE</span>
              </div>

              {/* Saudi Vision 2030 & ISO 9001 */}
              <div className="w-full flex items-center justify-center gap-4 pt-4 border-t border-slate-200 dark:border-white/5">
                <div className="relative h-[60px] w-[90px] opacity-90 hover:opacity-100 transition-opacity">
                  <Image
                    src="/images/uiis/vision_2030.png"
                    alt="Saudi Vision 2030"
                    fill
                    sizes="120px"
                    unoptimized
                    priority
                    className="object-contain object-center dark:hidden"
                  />
                  <Image
                    src="/images/uiis/vision_2030_dark.png"
                    alt="Saudi Vision 2030"
                    fill
                    sizes="120px"
                    unoptimized
                    priority
                    className="object-contain object-center hidden dark:block"
                  />
                </div>
                <div className="h-7 w-px bg-slate-300 dark:bg-white/10" />
                <div className="relative h-[60px] w-[60px] opacity-90 hover:opacity-100 transition-opacity">
                  <Image
                    src="/images/uiis/iso_9001.png"
                    alt="ISO 9001:2015 Certified"
                    fill
                    sizes="100px"
                    unoptimized
                    priority
                    className="object-contain object-center"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-white font-semibold mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-titanium-400">
                <li>
                  <Link href="#services" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#industries" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Industries
                  </Link>
                </li>
                <li>
                  <Link href="#capabilities" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Capabilities
                  </Link>
                </li>
                <li>
                  <Link href="#ndt" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    NDT Services
                  </Link>
                </li>
                <li>
                  <Link href="#global-network" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    Global Network
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    About Uniqueiis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-white font-semibold mb-4">
                Departments
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-titanium-400">
                {SERVICES.slice(0, 5).map((s) => (
                  <li key={s.id}>
                    <Link href="#services" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5">
                      <span className="font-mono text-emerald-600 dark:text-emerald-accent">{s.number}</span>
                      <span className="truncate">{s.departmentCode}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Summary */}
          <div className="lg:col-span-3 space-y-3 text-xs font-mono">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-900 dark:text-white font-semibold mb-4">
              Headquarters
            </h4>
            <div className="flex items-start gap-2.5 text-slate-700 dark:text-titanium-300">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-accent shrink-0 mt-0.5" />
              <span className="leading-snug">
                Bldg {BRAND_INFO.contact.buildingNumber}, St. {BRAND_INFO.contact.street}, {BRAND_INFO.contact.city}, Saudi Arabia
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-titanium-300 pt-1">
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-accent shrink-0" />
              <a href={`tel:${BRAND_INFO.contact.mobile.replace(/\s+/g, "")}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {BRAND_INFO.contact.mobile}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-titanium-300 pt-1">
              <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-accent shrink-0" />
              <a href={`mailto:${BRAND_INFO.contact.email}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {BRAND_INFO.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-titanium-300 pt-1">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-accent shrink-0" />
              <a href={`https://${BRAND_INFO.domain}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                {BRAND_INFO.domain}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-titanium-500">
          <div>
            © 2026 {BRAND_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-600 dark:text-titanium-400">
              A Safer, Stronger Tomorrow
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 shadow-sm dark:shadow-none transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
