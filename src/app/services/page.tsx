"use client";
import React from 'react';
import { Stethoscope, Heart, Brain, Activity, Pill, Microscope, Baby, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ServicesPage() {
  const departments = [
    { icon: <Heart className="w-8 h-8" />, name: "Cardiology", desc: "Advanced heart care including non-invasive diagnostics and interventional procedures." },
    { icon: <Brain className="w-8 h-8" />, name: "Neurology", desc: "Specialized treatment for complex neurological disorders and neurosurgical interventions." },
    { icon: <Stethoscope className="w-8 h-8" />, name: "General Practice", desc: "Comprehensive primary care for all ages with a focus on preventive medicine." },
    { icon: <Microscope className="w-8 h-8" />, name: "Pathology", desc: "Precision diagnostics using the latest molecular and genetic testing technologies." },
    { icon: <Baby className="w-8 h-8" />, name: "Pediatrics", desc: "Compassionate child healthcare from neonatal care to adolescent wellness." },
    { icon: <Zap className="w-8 h-8" />, name: "Emergency Care", desc: "24/7 rapid response unit equipped for life-saving critical interventions." }
  ];

  const packages = [
    { name: "Executive Checkup", price: "$299", features: ["Full Blood Profile", "Cardiac Stress Test", "Abdominal Ultrasound", "Specialist Consultation"] },
    { name: "Women's Wellness", price: "$199", features: ["Hormonal Profile", "Bone Density Test", "Cancer Screening", "Gynecology Consult"] },
    { name: "Senior Health", price: "$249", features: ["Geriatric Assessment", "Vision & Hearing", "Diabetes Screening", "Joint Evaluation"] }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-slate-50 text-center">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
               World-Class <span className="text-primary-600">Medical Services</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
               Comprehensive clinical excellence across every medical specialty. Powered by advanced technology and human compassion.
            </p>
         </div>
      </section>

      {/* Departments Grid */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="mb-20">
               <h2 className="text-4xl font-black text-slate-900 mb-4">Specialized Departments</h2>
               <div className="w-20 h-2 bg-primary-500 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {departments.map((dept, idx) => (
                  <div key={idx} className="p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-600/5 transition-all group">
                     <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-primary-600 mb-8 group-hover:scale-110 transition-transform">
                        {dept.icon}
                     </div>
                     <h3 className="text-2xl font-black text-slate-900 mb-4">{dept.name}</h3>
                     <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">{dept.desc}</p>
                     <Link href="/contact" className="flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest hover:translate-x-2 transition-transform">
                        Learn More <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Health Packages (Pricing) */}
      <section className="py-32 px-6 bg-slate-900 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600 blur-[100px] rounded-full"></div>
         </div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Preventive Health Packages</h2>
               <p className="text-slate-400 font-medium">Invest in your health before you need to. Specialized screenings for every life stage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {packages.map((pkg, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-[3.5rem] p-12 hover:bg-white/10 transition-all group">
                     <h3 className="text-2xl font-black text-white mb-2">{pkg.name}</h3>
                     <div className="text-4xl font-black text-primary-500 mb-10">{pkg.price}</div>
                     
                     <ul className="space-y-4 mb-12">
                        {pkg.features.map((feat, fidx) => (
                           <li key={fidx} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                              <CheckCircle2 className="w-5 h-5 text-primary-500" /> {feat}
                           </li>
                        ))}
                     </ul>
                     
                     <Link href="/login?mode=signup" className="block w-full bg-white text-slate-900 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest text-center hover:bg-primary-500 hover:text-white transition-all shadow-xl shadow-black/20">
                        Book Now
                     </Link>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Facilities Highlight */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
               <h2 className="text-4xl font-black text-slate-900 leading-tight">Advanced Medical <span className="text-primary-600">Infrastructure</span></h2>
               <p className="text-slate-500 font-medium leading-relaxed">
                  Our hospital is equipped with the latest diagnostic and surgical technology, including 3T MRI, 128-slice CT, and the Da Vinci Robotic Surgery system.
               </p>
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <div className="text-3xl font-black text-slate-900">24/7</div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Emergency Services</div>
                  </div>
                  <div className="space-y-2">
                     <div className="text-3xl font-black text-slate-900">12+</div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Operation Theaters</div>
                  </div>
               </div>
            </div>
            <div className="flex-1 w-full">
               <div className="aspect-video bg-slate-100 rounded-[3rem] overflow-hidden relative group">
                  <img src="/medical-lab.png" alt="Advanced Medical Lab" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-primary-600/10 mix-blend-overlay"></div>
               </div>
            </div>
         </div>
      </section>
      <Footer />
    </div>
  );
}
