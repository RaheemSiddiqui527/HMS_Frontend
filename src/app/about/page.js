"use client";

import Link from "next/link";
import {
  FiAward, FiTrendingUp, FiShield, FiHeart,
  FiUsers, FiArrowRight, FiCheckCircle
} from "react-icons/fi";
import Button from "@/components/ui/Button";

const highlights = [
  {
    icon: FiUsers,
    color: "bg-[#16A34A]",
    title: "Experienced Doctors",
    desc: "Our network spans 2,400+ verified physicians across 40+ specialties, each credentialed and peer-reviewed.",
  },
  {
    icon: FiTrendingUp,
    color: "bg-blue-500",
    title: "Modern Equipment",
    desc: "Integrated with the latest diagnostic hardware and cloud-based PACS for real-time imaging and lab results.",
  },
  {
    icon: FiShield,
    color: "bg-violet-500",
    title: "Trusted Services",
    desc: "HIPAA-compliant, ISO-certified, and trusted by 250+ hospitals worldwide since our founding in 2024.",
  },
];

const values = [
  "Patient-first philosophy in every product decision",
  "Zero-downtime infrastructure with 99.9% SLA",
  "End-to-end AES-256 encryption on all records",
  "Continuous 24/7 support for clinical operations",
];

export default function AboutPage() {
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
            <Link href="/about" className="text-[#16A34A]">About</Link>
            <Link href="/contact" className="hover:text-[#16A34A] transition-colors">Contact</Link>
          </div>
          <Link href="/auth/login">
            <Button size="sm" className="px-6">Portal Login</Button>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-40 pb-20 px-6 bg-gradient-to-b from-green-50/60 to-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
            <FiAward className="text-[#16A34A]" />
            <span className="text-[11px] font-black text-[#16A34A] uppercase tracking-widest">Our Story</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#111827] leading-tight tracking-tight">
            About <span className="text-[#16A34A] italic">SDI Healthcare</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Reimagining hospital operations through technology — so clinicians can focus entirely on what matters: their patients.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text */}
          <div className="space-y-8">
            <div className="space-y-5">
              <h2 className="text-3xl font-black text-[#111827] leading-snug">
                A platform built by clinicians, <br />
                <span className="text-[#16A34A]">for clinicians.</span>
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                SDI Healthcare was founded in 2024 with a singular mission: eliminate the administrative chaos that drains clinicians of their time and energy. We provide a fully integrated hospital management suite that handles everything from patient registration and appointment scheduling to digital prescriptions and pharmacy operations.
              </p>
              <p className="text-slate-500 font-medium leading-relaxed">
                Our platform is deployed across 250+ hospitals globally, processing over 15,000 clinical transactions daily. Whether you are a single-physician clinic or a multi-department tertiary care center, SDI scales to meet your operational complexity.
              </p>
            </div>
            <div className="space-y-3 pt-2">
              {values.map((v, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-[#16A34A] flex-shrink-0">
                    <FiCheckCircle size={13} />
                  </div>
                  <span className="text-slate-600 font-bold text-sm tracking-wide">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="space-y-6">
            <div className="p-8 bg-[#111827] rounded-[2rem] text-white space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center">
                <FiHeart size={18} />
              </div>
              <h3 className="text-xl font-black">Our Mission</h3>
              <p className="text-slate-400 font-medium text-sm leading-relaxed">
                To make world-class hospital management accessible to every healthcare institution — removing friction, reducing errors, and restoring clinical focus through thoughtful technology.
              </p>
            </div>
            <div className="p-8 bg-green-50 border border-green-100 rounded-[2rem] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center text-white">
                <FiTrendingUp size={18} />
              </div>
              <h3 className="text-xl font-black text-[#111827]">Our Vision</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">
                A world where no doctor wastes time on paperwork, no patient loses their medical history, and no hospital operates on disconnected systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-4xl font-black text-[#111827]">Why Hospitals Choose Us</h2>
            <p className="text-slate-500 font-medium">Three pillars that define the SDI difference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <div key={i} className="group p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-100 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl ${h.color} flex items-center justify-center text-white text-2xl mb-8 shadow-lg transition-transform group-hover:rotate-6`}>
                  <h.icon />
                </div>
                <h4 className="text-xl font-black text-[#111827] mb-3">{h.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-[#111827] text-white">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: "2024", label: "Founded" },
            { val: "250+", label: "Hospitals" },
            { val: "2,400+", label: "Doctors" },
            { val: "500k+", label: "Patients Served" },
          ].map((s, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-4xl font-black text-[#16A34A]">{s.val}</h3>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#16A34A] rounded-[3rem] p-16 text-center text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Ready to Transform<br />Your Hospital?
              </h2>
              <p className="text-white/80 font-medium max-w-md mx-auto">
                Book a guided walkthrough with our team and see SDI Healthcare in action.
              </p>
              <Link href="/contact">
                <Button className="bg-black text-[#16A34A] px-12 h-16 rounded-2xl shadow-2xl shadow-green-900/30 text-base mt-4">
                  Book Appointment <FiArrowRight className="ml-2 inline" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-slate-300 font-medium">© 2026 SDI Healthcare Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}