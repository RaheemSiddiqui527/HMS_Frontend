"use client";

import Link from "next/link";
import {
  FiCalendar, FiUsers, FiActivity, FiFileText,
  FiBell, FiClock, FiArrowRight, FiCheckCircle, FiZap
} from "react-icons/fi";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: FiCalendar,
    color: "bg-[#16A34A]",
    shadow: "shadow-green-100",
    title: "Appointment Booking",
    desc: "30-minute smart slots with zero double-bookings. Patients book online; staff get instant calendar sync.",
    tags: ["Auto-assign", "Reminders", "Reschedule"],
  },
  {
    icon: FiUsers,
    color: "bg-blue-500",
    shadow: "shadow-blue-100",
    title: "Patient Management",
    desc: "Full patient profiles with demographics, visit logs, allergies, and insurance — all in one place.",
    tags: ["Profiles", "Search", "Filters"],
  },
  {
    icon: FiActivity,
    color: "bg-violet-500",
    shadow: "shadow-violet-100",
    title: "Doctor Dashboard",
    desc: "A dedicated workspace for every physician — daily roster, pending tasks, and real-time patient queue.",
    tags: ["Roster", "Queue", "Notes"],
  },
  {
    icon: FiFileText,
    color: "bg-orange-500",
    shadow: "shadow-orange-100",
    title: "Digital Prescription",
    desc: "Generate signed PDF prescriptions in seconds and deliver them via email or WhatsApp instantly.",
    tags: ["PDF Export", "Email", "Templates"],
  },
  {
    icon: FiBell,
    color: "bg-pink-500",
    shadow: "shadow-pink-100",
    title: "Notifications System",
    desc: "Multi-channel alerts for appointments, lab results, billing reminders, and critical patient updates.",
    tags: ["SMS", "Email", "Push"],
  },
  {
    icon: FiClock,
    color: "bg-cyan-500",
    shadow: "shadow-cyan-100",
    title: "Medical History Tracking",
    desc: "Chronological, searchable medical timelines covering diagnoses, procedures, and prescriptions.",
    tags: ["Timeline", "Export", "Secure"],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center text-white shadow-lg shadow-green-200">
              <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-[#111827] tracking-tight">SDI Healthcare</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <Link href="/features" className="text-[#16A34A]">Features</Link>
            <Link href="/about" className="hover:text-[#16A34A] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#16A34A] transition-colors">Contact</Link>
          </div>
          <Link href="/auth/login">
            <Button size="sm" className="px-6">Portal Login</Button>
          </Link>
        </div>
      </nav>

      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 bg-gradient-to-b from-green-50/60 to-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
            <FiZap className="text-[#16A34A]" />
            <span className="text-[11px] font-black text-[#16A34A] uppercase tracking-widest">Platform Capabilities</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#111827] leading-tight tracking-tight">
            Our <span className="text-[#16A34A] italic">Features</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            Smart healthcare solutions for better management — built for clinicians, loved by administrators.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group relative p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:${f.shadow} hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
              >
                {/* Subtle bg dot */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-slate-50 -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                <div className={`relative w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center text-white text-2xl mb-6 shadow-lg transition-transform group-hover:rotate-6 group-hover:scale-110 duration-300`}>
                  <f.icon />
                </div>

                <h3 className="relative text-xl font-black text-[#111827] mb-3">{f.title}</h3>
                <p className="relative text-slate-500 text-sm font-medium leading-relaxed mb-6">{f.desc}</p>

                <div className="relative flex flex-wrap gap-2">
                  {f.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-slate-50 border border-slate-100 text-slate-400 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mini Stats Strip */}
      <section className="py-16 bg-[#111827]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { val: "6+", label: "Core Modules" },
            { val: "99.9%", label: "Uptime SLA" },
            { val: "<2s", label: "Avg Response" },
            { val: "HIPAA", label: "Compliant" },
          ].map((s, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl font-black text-[#16A34A]">{s.val}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#16A34A] rounded-[3rem] p-16 text-center text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
                <FiCheckCircle className="text-white" size={14} />
                <span className="text-[11px] font-black uppercase tracking-widest">No credit card required</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Start Managing Your<br />Clinic Today
              </h2>
              <p className="text-white/80 font-medium max-w-md mx-auto">
                Join 250+ hospitals already running on SDI Healthcare. Setup takes less than 10 minutes.
              </p>
              <Link href="/auth/login">
                <Button className="bg-black text-[#16A34A] px-12 h-16 rounded-2xl shadow-2xl shadow-green-900/30 text-base mt-4">
                  Get Started <FiArrowRight className="ml-2 inline" />
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