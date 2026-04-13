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
               <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold text-[#111827] tracking-tight">SDI Healthcare</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#features" className="hover:text-[#16A34A] transition-colors">Features</a>
            <a href="#about" className="hover:text-[#16A34A] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#16A34A] transition-colors">Contact</a>
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
                      <Button className="bg-white text-[#16A34A] hover:bg-slate-50 px-12 h-16 rounded-2xl shadow-xl shadow-green-900/20">Join the Platform</Button>
                   </Link>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center text-white shadow-lg">
                 <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-[#111827]">SDI Healthcare</span>
           </div>
           <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-10">Transforming Clinical Workflows Since 2024</p>
           <div className="flex justify-center gap-8 text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">
              <a href="#" className="hover:text-[#16A34A]">Privacy</a>
              <a href="#" className="hover:text-[#16A34A]">Terms</a>
              <a href="#" className="hover:text-[#16A34A]">Contact</a>
           </div>
           <p className="text-xs text-slate-300 font-medium">© 2024 SDI Healthcare Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
