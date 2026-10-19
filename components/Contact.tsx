"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Clock,
  ArrowUpRight,
  Navigation,
  Compass
} from "lucide-react";
import { BRAND_INFO, SERVICES } from "@/lib/data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    serviceRequired: SERVICES[0]?.title || "Vendor Inspection Department (VID)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 bg-[#F8FAFC] dark:bg-[#040812] text-slate-900 dark:text-white overflow-hidden border-t border-slate-200 dark:border-white/10"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[450px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-industrial-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with exact prompt headline */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-titanium-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Talk to Engineers • Al-Khobar Headquarters</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.0] uppercase">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-slate-800 to-slate-600 dark:from-emerald-accent dark:via-white dark:to-titanium-200">
              A SAFER,
            </span> <br />
            STRONGER TOMORROW.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-titanium-300 leading-relaxed font-normal">
            Whether you require immediate shop surveillance, NDT procedure approval, supplier capacity audit, or qualified site engineers across the Kingdom and international projects, connect directly with our engineering desk.
          </p>
        </div>

        {/* 2-Column Minimal & Premium Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Official Contact Channels & Headquarters */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Communications Desk */}
            <div className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-lg dark:shadow-glass">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-2">
                Direct Communications
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Engineering Contact Desk
              </h3>

              <div className="space-y-4 text-sm">
                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-emerald-deep dark:text-emerald-accent shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-500 dark:text-titanium-500 block mb-1">
                      Direct Telephone
                    </span>
                    <a
                      href={`tel:${BRAND_INFO.contact.mobile.replace(/\s+/g, "")}`}
                      className="text-slate-900 dark:text-white font-mono font-bold hover:text-emerald-deep dark:hover:text-emerald-accent transition-colors text-base inline-flex items-center gap-1.5"
                    >
                      <span>{BRAND_INFO.contact.mobile}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-titanium-500" />
                    </a>
                  </div>
                </div>

                {/* Corporate Email */}
                <div className="flex items-start gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-emerald-deep dark:text-emerald-accent shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-500 dark:text-titanium-500 block mb-1">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${BRAND_INFO.contact.email}`}
                      className="text-slate-900 dark:text-white font-mono font-bold hover:text-emerald-deep dark:hover:text-emerald-accent transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{BRAND_INFO.contact.email}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-titanium-500" />
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-emerald-deep dark:text-emerald-accent shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-slate-500 dark:text-titanium-500 block mb-1">
                      Web Portal
                    </span>
                    <a
                      href={`https://${BRAND_INFO.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-900 dark:text-white font-mono font-bold hover:text-emerald-deep dark:hover:text-emerald-accent transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{BRAND_INFO.domain}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-titanium-500" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10 flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-titanium-400">
                <Clock className="w-4 h-4 text-emerald-accent shrink-0" />
                <span>Response SLA: &lt; 24 hours turnaround</span>
              </div>
            </div>

            {/* Our Headquarters Section */}
            <div id="our-headquarters" className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-lg dark:shadow-glass relative overflow-hidden">
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-1">
                    Central Operations Hub
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Our Headquarters
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-deep dark:text-emerald-accent">
                  <Compass className="w-5 h-5" />
                </div>
              </div>

              {/* Minimalist Location & Coordinate Graphics Banner */}
              <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-white/10 bg-slate-50 dark:bg-[#070D1A] my-4 select-none">
                <svg
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="hqCoordGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" strokeWidth="0.5" className="stroke-slate-300/60 dark:stroke-white/5" />
                    </pattern>
                    <radialGradient id="hqPulseGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  
                  {/* Grid background */}
                  <rect width="100%" height="100%" fill="url(#hqCoordGrid)" />

                  {/* Abstract Street / Route Grid Lines */}
                  <g className="stroke-slate-300/80 dark:stroke-white/10" strokeWidth="1.5">
                    <line x1="0" y1="30%" x2="100%" y2="30%" />
                    <line x1="0" y1="70%" x2="100%" y2="70%" />
                    <line x1="20%" y1="0" x2="20%" y2="100%" />
                    <line x1="80%" y1="0" x2="80%" y2="100%" />
                  </g>

                  {/* Main Axis: Street 26 & Madinat Al-Ummal */}
                  <g className="stroke-emerald-500/35 dark:stroke-emerald-400/30" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="0" y1="50%" x2="100%" y2="50%" />
                    <line x1="50%" y1="0" x2="50%" y2="100%" />
                  </g>

                  {/* Radar Pulse Range Rings */}
                  <circle cx="50%" cy="50%" r="48" fill="url(#hqPulseGlow)" />
                  <circle cx="50%" cy="50%" r="46" fill="none" strokeWidth="1" strokeDasharray="3 3" className="stroke-emerald-500/40 dark:stroke-emerald-400/35" />
                  <circle cx="50%" cy="50%" r="24" fill="none" strokeWidth="1" className="stroke-emerald-500/50 dark:stroke-emerald-400/45" />
                  
                  {/* Crosshair Target Marks */}
                  <line x1="50%" y1="36%" x2="50%" y2="64%" className="stroke-emerald-500/60 dark:stroke-emerald-400/60" strokeWidth="1" />
                  <line x1="42%" y1="50%" x2="58%" y2="50%" className="stroke-emerald-500/60 dark:stroke-emerald-400/60" strokeWidth="1" />
                </svg>

                {/* Top Overlay Badges */}
                <div className="absolute top-2 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/85 dark:bg-[#060A14]/85 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-700 dark:text-titanium-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-accent animate-pulse" />
                  <span>26°17&apos;08&quot;N 50°12&apos;11&quot;E</span>
                </div>

                <div className="absolute top-2 right-2.5 px-2 py-0.5 rounded-md bg-white/85 dark:bg-[#060A14]/85 backdrop-blur-md border border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-600 dark:text-titanium-400 font-medium">
                  STREET 26 • BLDG 7952
                </div>

                {/* Center Pin & Beacon */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-emerald-accent/25 animate-ping" />
                    <span className="absolute w-6 h-6 rounded-full bg-emerald-accent/30" />
                    <div className="relative w-8 h-8 rounded-full bg-emerald-deep dark:bg-emerald-accent text-white dark:text-slate-950 flex items-center justify-center shadow-md shadow-emerald-500/20">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-1 px-2 py-0.5 rounded bg-slate-900/90 dark:bg-black/90 text-[9px] font-mono font-semibold text-emerald-accent tracking-wider uppercase">
                    Al-Khobar Operations Hub
                  </div>
                </div>

                {/* Bottom Overlay Badges */}
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-slate-500 dark:text-titanium-400">
                  <span>MADINAT AL-UMMAL DIST.</span>
                  <span>POSTAL CODE 3441</span>
                </div>
              </div>

              {/* Verified Address Block */}
              <div className="mt-4 pt-1">
                <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-titanium-500 font-medium block mb-1">
                  Verified Headquarters Address
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight uppercase">
                  UNIQUE INSPECTION INTEGRATED SERVICES
                </p>
                <div className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-titanium-300 leading-relaxed font-normal space-y-0.5">
                  <p>Building Number 7952, Street 26,</p>
                  <p>Madinat Al-Ummal District,</p>
                  <p>Postal Code 3441, Al-Khobar,</p>
                  <p className="font-semibold text-emerald-deep dark:text-emerald-accent">
                    Kingdom of Saudi Arabia.
                  </p>
                </div>
              </div>

              {/* Get Directions Link */}
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Unique+Inspection+Integrated+Services,+Building+Number+7952,+Street+26,+Madinat+Al-Ummal+District,+Al-Khobar+3441,+Kingdom+of+Saudi+Arabia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-accent dark:hover:bg-emerald-400 dark:text-slate-950 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-[0.98] group"
                >
                  <Navigation className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  <span>Get Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>

                <span className="text-[11px] font-mono text-slate-500 dark:text-titanium-400 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-emerald-accent shrink-0" />
                  <span>Google Maps Navigation</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Talk to Engineers Clean Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 p-8 sm:p-10 backdrop-blur-xl shadow-lg dark:shadow-glass">
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-deep dark:text-emerald-accent font-semibold block mb-1">
                  Inquiry & Technical Scope
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Talk to Engineers
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-titanium-400">
                  Submit equipment scope, vendor manufacturing location, or inspection schedule for rapid mobilization.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-accent/20 border border-emerald-accent/40 flex items-center justify-center text-emerald-accent mb-6 shadow-glow-emerald">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="mt-3 text-sm text-slate-600 dark:text-titanium-300 max-w-md">
                    Thank you, <span className="text-slate-900 dark:text-white font-medium">{formData.name}</span>. Your technical inquiry regarding <span className="text-slate-900 dark:text-white font-medium">{formData.serviceRequired}</span> has been routed directly to our engineering coordination office at <span className="text-emerald-deep dark:text-emerald-accent font-semibold">{BRAND_INFO.contact.email}</span>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        company: "",
                        email: "",
                        phone: "",
                        country: "",
                        serviceRequired: SERVICES[0]?.title || "Vendor Inspection Department (VID)",
                        message: "",
                      });
                    }}
                    className="mt-8 px-6 py-2.5 rounded-full text-xs font-semibold text-slate-700 dark:text-titanium-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-titanium-400 mb-2 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eng. Khalid Al-Mansoor"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-titanium-500 text-sm focus:outline-none focus:border-emerald-accent focus:bg-white dark:focus:bg-white/[0.05] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-titanium-400 mb-2 font-medium">
                        Company / EPC Client *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. PetroTech Engineering"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-titanium-500 text-sm focus:outline-none focus:border-emerald-accent focus:bg-white dark:focus:bg-white/[0.05] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-titanium-400 mb-2 font-medium">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="khalid@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-titanium-500 text-sm focus:outline-none focus:border-emerald-accent focus:bg-white dark:focus:bg-white/[0.05] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-titanium-400 mb-2 font-medium">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 5X XXX XXXX"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-titanium-500 text-sm focus:outline-none focus:border-emerald-accent focus:bg-white dark:focus:bg-white/[0.05] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-titanium-400 mb-2 font-medium">
                        Country / Project Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Saudi Arabia, UAE, Italy..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-titanium-500 text-sm focus:outline-none focus:border-emerald-accent focus:bg-white dark:focus:bg-white/[0.05] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-titanium-400 mb-2 font-medium">
                        Service Department *
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#060A14] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-emerald-accent transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={`${s.title} (${s.departmentCode})`} className="bg-white dark:bg-[#060A14] text-slate-900 dark:text-white">
                            {s.number} - {s.title} ({s.departmentCode})
                          </option>
                        ))}
                        <option value="General Technical Consultation" className="bg-white dark:bg-[#060A14] text-slate-900 dark:text-white">
                          General Technical Consultation
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-titanium-400 mb-2 font-medium">
                      Equipment Scope & Technical Specifications *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify equipment commodities (pressure vessels, piping, valves, NDT, etc.), applicable codes (ASME / API / ISO / specs), vendor facility location, and required dates..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-titanium-500 text-sm focus:outline-none focus:border-emerald-accent focus:bg-white dark:focus:bg-white/[0.05] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-emerald-deep to-emerald-accent hover:brightness-110 shadow-glow-emerald active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Routing to Engineering Coordination Desk...</span>
                    ) : (
                      <>
                        <span>TALK TO ENGINEERS</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-titanium-500 font-mono pt-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-accent" />
                      <span>Data protected under strict NDA and professional confidentiality</span>
                    </span>
                    <span className="text-emerald-deep dark:text-emerald-accent font-semibold">{BRAND_INFO.contact.email}</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
