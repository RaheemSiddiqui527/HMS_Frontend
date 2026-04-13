"use client";

import Link from "next/link";
import { FiActivity, FiShield, FiClock, FiStar, FiArrowRight, FiCheckCircle, FiHeart, FiLayers } from "react-icons/fi";
import Button from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center text-white shadow-lg shadow-green-200">
               <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-[#111827] tracking-tight">SDI Healthcare</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="/features" className="hover:text-[#16A34A] transition-colors">Features</a>
            <a href="/about" className="hover:text-[#16A34A] transition-colors">About</a>
            <a href="/contact" className="hover:text-[#16A34A] transition-colors">Contact</a>
          </div>
          <Link href="/auth/login">
            <Button size="sm" className="px-6">Portal Login</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
               <FiActivity className="text-[#16A34A]" />
               <span className="text-[11px] font-black text-[#16A34A] uppercase tracking-widest leading-none">Next-Gen Patient Care</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#111827] leading-[1.1] tracking-tight">
              Simplify Your <br />
              <span className="text-[#16A34A] italic">Healthcare</span><br />
              Management.
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
              Experience the world's most advanced all-in-one hospital ecosystem. Manage patients, doctors, and pharmacy with real-time precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <Link href="/auth/login">
                  <Button size="lg" className="px-10 h-16 text-lg shadow-2xl shadow-green-200">Launch Dashboard <FiArrowRight className="ml-2" /></Button>
               </Link>
               <Button variant="secondary" size="lg" className="px-10 h-16 text-lg border-2 border-slate-100">Live Demo</Button>
            </div>
            <div className="flex items-center gap-6 pt-6 opacity-60">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center font-bold text-xs">U{i}</div>
                  ))}
               </div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trusted by 250+ Global Hospitals</p>
            </div>
          </div>
          
          <div className="relative group perspective-1000 hidden lg:block animate-scale-in">
             <div className="absolute inset-0 bg-green-500 rounded-[3rem] blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
             <div className="relative bg-white p-4 rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden rotate-y-6">
                <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-100">
                   <div className="flex justify-between mb-8">
                      <div className="w-32 h-8 bg-white rounded-lg shadow-sm border border-slate-100"></div>
                      <div className="flex gap-2">
                         <div className="w-8 h-8 rounded-lg bg-green-50"></div>
                         <div className="w-8 h-8 rounded-lg bg-slate-100"></div>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="h-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                         <div className="w-8 h-8 rounded-lg bg-green-500 mb-2"></div>
                         <div className="w-16 h-2 bg-slate-100 rounded"></div>
                      </div>
                      <div className="h-24 bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                         <div className="w-8 h-8 rounded-lg bg-blue-500 mb-2"></div>
                         <div className="w-16 h-2 bg-slate-100 rounded"></div>
                      </div>
                   </div>
                   <div className="h-48 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
                      <div className="w-full h-8 bg-slate-50 rounded-lg"></div>
                      <div className="w-[80%] h-4 bg-slate-50 rounded-lg"></div>
                      <div className="w-[60%] h-4 bg-slate-50 rounded-lg"></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Patients Served", val: "500k+" },
            { label: "Expert Doctors", val: "2,400+" },
            { label: "Daily Transactions", val: "15k+" },
            { label: "System Uptime", val: "99.9%" },
          ].map((s, i) => (
            <div key={i} className="space-y-2">
               <h3 className="text-4xl font-black text-[#16A34A]">{s.val}</h3>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
             <h2 className="text-4xl font-black text-[#111827]">Engineered for Modern Care.</h2>
             <p className="text-slate-500 font-medium">Built by medical experts and award-winning designers to provide the ultimate healthcare experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Smart Scheduling", desc: "Automated slot management with zero overlaps.", icon: FiClock, color: "bg-blue-500" },
              { title: "Digital Pharmacy", desc: "Real-time inventory and encrypted prescriptions.", icon: FiLayers, color: "bg-[#16A34A]" },
              { title: "Secure Data", desc: "HIPAA compliant AES-256 encrypted records.", icon: FiShield, color: "bg-purple-500" },
            ].map((f, i) => (
              <div key={i} className="group p-10 bg-white rounded-[2.5rem] border border-slate-200 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-100">
                <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center text-white text-2xl mb-8 shadow-lg shadow-slate-200 transition-transform group-hover:rotate-12`}>
                   <f.icon />
                </div>
                <h4 className="text-xl font-black text-[#111827] mb-4">{f.title}</h4>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-6">
                <h2 className="text-4xl font-black text-[#111827] leading-tight">Human-Centric Design <br /> Meets AI Efficiency.</h2>
                <div className="space-y-4 pt-4">
                   {[
                     "Instant Patient Check-in System",
                     "Centralized Medical History Access",
                     "Automated Doctor Duty Roster",
                     "Real-time Hospital Resource Tracking"
                   ].map((t, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-[#16A34A]">
                           <FiCheckCircle size={14} />
                        </div>
                        <span className="text-slate-600 font-bold text-sm tracking-wide">{t}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="p-12 bg-green-500 rounded-[3rem] relative overflow-hidden group">
                <div className="relative z-10 text-white space-y-8 text-center py-10">
                   <FiHeart size={64} className="mx-auto text-white group-hover:scale-125 transition-transform" />
                   <h3 className="text-3xl font-black">Ready to modernize your hospital?</h3>
                   <Link href="/auth/login" className="inline-block">
                      <Button className="bg-black text-[#16A34A] px-12 h-16 rounded-2xl shadow-xl shadow-green-900/20">Join the Platform</Button>
                   </Link>
                </div>
                {/* Decorative Pattern */}
                {/* <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div> */}
                {/* <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div> */}
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center text-white shadow-lg">
                 <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-[#111827]">SDI Healthcare</span>
           </div>
           
           <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-10">Transforming Clinical Workflows Since 2024</p>
           <div className="flex justify-center gap-8 text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">
              <a href="#" className="hover:text-[#16A34A]">Privacy</a>
              <a href="#" className="hover:text-[#16A34A]">Terms</a>
              <a href="/contact" className="hover:text-[#16A34A]">Contact</a>
           </div>
           <div className="flex justify-center gap-6 mb-10">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#16A34A] hover:text-white transition cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/></svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#16A34A] hover:text-white transition cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.104c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.294-11.74c0-.213-.005-.426-.015-.637A9.936 9.936 0 0024 4.555z"/></svg>
            </div>
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#16A34A] hover:text-white transition cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
          </div>
           <p className="text-xs text-slate-300 font-medium">© 2026 SDI Healthcare Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
