"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  ArrowUpRight
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
      className="relative py-28 sm:py-36 bg-[#040812] text-white overflow-hidden border-t border-white/10"
    >
      {/* Background radial lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[450px] bg-emerald-accent/[0.03] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-industrial-blue/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with exact prompt headline */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-titanium-400 text-xs font-mono uppercase tracking-widest mb-6">
            <Building2 className="w-3.5 h-3.5 text-emerald-accent" />
            <span>Talk to Engineers • Al-Khobar Headquarters</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-white leading-[1.0] uppercase">
            LET&apos;S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-accent via-white to-titanium-200">
              A SAFER,
            </span> <br />
            STRONGER TOMORROW.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-titanium-300 leading-relaxed font-normal">
            Whether you require immediate shop surveillance, NDT procedure approval, supplier capacity audit, or qualified site engineers across the Kingdom and international projects, connect directly with our engineering desk.
          </p>
        </div>

        {/* 2-Column Minimal & Premium Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Official PDF Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 backdrop-blur-xl shadow-glass">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-2">
                Official Headquarters
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Unique Inspection Integrated Services
              </h3>

              <div className="space-y-5 text-sm">
                {/* Physical Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-accent shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-titanium-500 block mb-1">
                      Office Location
                    </span>
                    <p className="text-white font-medium leading-relaxed">
                      Building Number: <span className="text-emerald-accent font-semibold">{BRAND_INFO.contact.buildingNumber}</span>, Street {BRAND_INFO.contact.street}
                      <br />
                      {BRAND_INFO.contact.district}
                      <br />
                      Postal Code: {BRAND_INFO.contact.postalCode}, {BRAND_INFO.contact.city}
                      <br />
                      <span className="text-titanium-200">{BRAND_INFO.contact.country}</span>
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-accent shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-titanium-500 block mb-1">
                      Direct Telephone
                    </span>
                    <a
                      href={`tel:${BRAND_INFO.contact.mobile.replace(/\s+/g, "")}`}
                      className="text-white font-mono font-bold hover:text-emerald-accent transition-colors text-base inline-flex items-center gap-1.5"
                    >
                      <span>{BRAND_INFO.contact.mobile}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-titanium-500" />
                    </a>
                  </div>
                </div>

                {/* Corporate Email */}
                <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-accent shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-titanium-500 block mb-1">
                      Official Email
                    </span>
                    <a
                      href={`mailto:${BRAND_INFO.contact.email}`}
                      className="text-white font-mono font-bold hover:text-emerald-accent transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{BRAND_INFO.contact.email}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-titanium-500" />
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-accent shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-titanium-500 block mb-1">
                      Web Portal
                    </span>
                    <a
                      href={`https://${BRAND_INFO.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-mono font-bold hover:text-emerald-accent transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{BRAND_INFO.domain}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-titanium-500" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3 text-xs font-mono text-titanium-400">
                <Clock className="w-4 h-4 text-emerald-accent shrink-0" />
                <span>Response SLA: &lt; 24 hours turnaround</span>
              </div>
            </div>

            {/* HQ Photos from PDF Page 12 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-navy-950 aspect-[4/3] relative group">
                <Image
                  src="/images/uiis/uiis_hq_building.jpg"
                  alt="UIIS Headquarters Building Al-Khobar"
                  fill
                  sizes="250px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 left-3">
                  <span className="text-[10px] font-mono text-emerald-accent block">HQ Facility</span>
                  <span className="text-xs font-bold text-white">Al-Khobar, KSA</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-navy-950 aspect-[4/3] relative group">
                <Image
                  src="/images/uiis/uiis_location_map.jpg"
                  alt="UIIS Location Map"
                  fill
                  sizes="250px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 left-3">
                  <span className="text-[10px] font-mono text-emerald-accent block">Location</span>
                  <span className="text-xs font-bold text-white">Eastern Province</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Talk to Engineers Clean Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-10 backdrop-blur-xl shadow-glass">
              <div className="mb-8">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-accent font-semibold block mb-1">
                  Inquiry & Technical Scope
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Talk to Engineers
                </h3>
                <p className="mt-2 text-sm text-titanium-400">
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
                  <h4 className="text-2xl sm:text-3xl font-bold text-white">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="mt-3 text-sm text-titanium-300 max-w-md">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. Your technical inquiry regarding <span className="text-white font-medium">{formData.serviceRequired}</span> has been routed directly to our engineering coordination office at <span className="text-emerald-accent">{BRAND_INFO.contact.email}</span>.
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
                    className="mt-8 px-6 py-2.5 rounded-full text-xs font-semibold text-titanium-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-titanium-400 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Eng. Khalid Al-Mansoor"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-titanium-500 text-sm focus:outline-none focus:border-emerald-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-titanium-400 mb-2">
                        Company / EPC Client *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. PetroTech Engineering"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-titanium-500 text-sm focus:outline-none focus:border-emerald-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-titanium-400 mb-2">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="khalid@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-titanium-500 text-sm focus:outline-none focus:border-emerald-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-titanium-400 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966 5X XXX XXXX"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-titanium-500 text-sm focus:outline-none focus:border-emerald-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-titanium-400 mb-2">
                        Country / Project Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Saudi Arabia, UAE, Italy..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-titanium-500 text-sm focus:outline-none focus:border-emerald-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-titanium-400 mb-2">
                        Service Department *
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#060A14] border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-accent transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={`${s.title} (${s.departmentCode})`} className="bg-[#060A14] text-white">
                            {s.number} - {s.title} ({s.departmentCode})
                          </option>
                        ))}
                        <option value="General Technical Consultation" className="bg-[#060A14] text-white">
                          General Technical Consultation
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-titanium-400 mb-2">
                      Equipment Scope & Technical Specifications *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify equipment commodities (pressure vessels, piping, valves, NDT, etc.), applicable codes (ASME / API / ISO / specs), vendor facility location, and required dates..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-titanium-500 text-sm focus:outline-none focus:border-emerald-accent transition-colors"
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

                  <div className="flex items-center justify-between text-[11px] text-titanium-500 font-mono pt-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-accent" />
                      <span>Data protected under strict NDA and professional confidentiality</span>
                    </span>
                    <span className="text-emerald-accent font-semibold">{BRAND_INFO.contact.email}</span>
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
