"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiMapPin, FiPhone, FiMail, FiArrowRight,
  FiSend, FiCheckCircle, FiMessageSquare
} from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

 const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission here
  setSubmitted(true);
};

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center text-white shadow-lg shadow-green-200">
              <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-[#111827] tracking-tight">SDI Healthcare</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <Link href="/features" className="hover:text-[#16A34A] transition-colors">Features</Link>
            <Link href="/about" className="hover:text-[#16A34A] transition-colors">About</Link>
            <Link href="/contact" className="text-[#16A34A]">Contact</Link>
          </div>
          <Link href="/auth/login">
            <Button size="sm" className="px-6">Portal Login</Button>
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <section className="pt-40 pb-16 px-6 bg-gradient-to-b from-green-50/60 to-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
            <FiMessageSquare className="text-[#16A34A]" />
            <span className="text-[11px] font-black text-[#16A34A] uppercase tracking-widest">Get In Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#111827] leading-tight tracking-tight">
            Contact <span className="text-[#16A34A] italic">Us</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
            Have questions? Our team is here 24/7. Reach out and we'll respond within one business hour.
          </p>
        </div>
      </section>

      {/* Main Content: Two columns */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: Info + Map */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#111827]">We're here to help.</h2>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                Whether you need a product demo, have a billing inquiry, or want to onboard your hospital — just reach out.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {[
                {
                  icon: FiMapPin,
                  color: "bg-green-50 border-green-100 text-[#16A34A]",
                  label: "Our Address",
                  value: "SDI Tower, 14th Floor, Bandra Kurla Complex, Mumbai — 400051, India",
                },
                {
                  icon: FiPhone,
                  color: "bg-blue-50 border-blue-100 text-blue-500",
                  label: "Phone",
                  value: "+91 98765 43210  ·  Mon–Sat, 9 AM–6 PM IST",
                },
                {
                  icon: FiMail,
                  color: "bg-violet-50 border-violet-100 text-violet-500",
                  label: "Email",
                  value: "support@sdihealthcare.com",
                },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 rounded-xl border ${c.color} flex items-center justify-center flex-shrink-0`}>
                    <c.icon size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{c.label}</p>
                    <p className="text-sm font-bold text-[#111827] leading-snug">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-slate-50 border border-slate-100 rounded-[2rem] overflow-hidden relative">
              {/* Decorative map stand-in */}
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 text-slate-300">
                <FiMapPin size={40} />
                <p className="text-xs font-bold uppercase tracking-widest">Bandra Kurla Complex, Mumbai</p>
                <a
                  href="https://maps.google.com/?q=Bandra+Kurla+Complex,+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-black text-[#16A34A] uppercase tracking-widest flex items-center gap-1 hover:underline"
                >
                  Open in Google Maps <FiArrowRight size={11} />
                </a>
              </div>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_39px,#f1f5f9_39px,#f1f5f9_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,#f1f5f9_39px,#f1f5f9_40px)]" />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white border border-slate-100 shadow-xl shadow-slate-100/80 rounded-[2.5rem] p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
                <div className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-[#16A34A]">
                  <FiCheckCircle size={36} />
                </div>
                <h3 className="text-2xl font-black text-[#111827]">Message Sent!</h3>
                <p className="text-slate-500 font-medium text-sm max-w-xs leading-relaxed">
                  Thanks for reaching out. Our team will get back to you within one business hour.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                  className="text-[#16A34A] text-sm font-black uppercase tracking-widest hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-[#111827] mb-1">Send a Message</h3>
                  <p className="text-slate-400 text-sm font-medium">We'll reply within one business hour.</p>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Dr. Ayesha Sharma"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 text-sm font-medium text-[#111827] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ayesha@hospital.com"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 text-sm font-medium text-[#111827] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A] transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help your hospital..."
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 text-sm font-medium text-[#111827] placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-[#16A34A] hover:bg-green-700 text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-200"
                >
                  <FiSend size={15} />
                  Send Message
                </button>

                <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                  Or email us directly at{" "}
                  <a href="mailto:support@sdihealthcare.com" className="text-[#16A34A] hover:underline">
                    support@sdihealthcare.com
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#16A34A] flex items-center justify-center text-white shadow-md">
              <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-black text-[#111827]">SDI Healthcare</span>
          </div>
          <div className="flex justify-center gap-8 text-slate-400 text-sm font-bold uppercase tracking-widest mb-6">
            <a href="#" className="hover:text-[#16A34A]">Privacy</a>
            <a href="#" className="hover:text-[#16A34A]">Terms</a>
            <a href="#" className="hover:text-[#16A34A]">Contact</a>
          </div>
          <p className="text-xs text-slate-300 font-medium">© 2026 SDI Healthcare Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}