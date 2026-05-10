"use client";
import React from 'react';
import { Stethoscope, Calendar, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';

// Using consistent Islamic-style placeholders
const DOCTORS = [
  {
    name: "Dr. Aiman M. Bardi",
    role: "Director & Physician",
    specialty: "Consulting Physician & Diabetologist",
    gender: "male",
    image: "/images/avatars/male_ai.png",
    bio: "Head of Medicine at SDI Healthcare, specializing in advanced diabetes care and internal medicine."
  },
  {
    name: "Dr. Nehal A. Ansari",
    role: "General Surgeon",
    specialty: "General & Laparoscopic Surgeon",
    gender: "male",
    image: "/images/avatars/male1.png",
    bio: "Expert in minimally invasive surgeries and comprehensive general surgical procedures."
  },
  {
    name: "Dr. Sheetal P. Shetty",
    role: "Psychiatrist",
    specialty: "Consulting Psychiatrist (MD)",
    gender: "female",
    image: "/images/avatars/female_ai.png",
    bio: "Dedicated mental health specialist focusing on holistic clinical psychiatry and patient wellness."
  },
  {
    name: "Dr. Farah S. Khan",
    role: "Pediatrician",
    specialty: "Senior Consultant Pediatrics",
    gender: "female",
    image: "/images/avatars/feamle 1.png",
    bio: "Compassionate child specialist with over 12 years of experience in newborn care and pediatric health."
  }
];

export function MeetOurDoctorsSection() {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6 bg-primary-50 px-4 py-2 rounded-2xl border border-primary-100">
              <div className="w-2 h-2 rounded-full bg-primary-600 animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-700">Verified Medical Faculty</span>
            </div>
            <h3 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
              Consult with our <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-600 to-primary-400">Elite Specialists</span>
            </h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
              Access world-class healthcare from the comfort of your home. Our specialists are globally recognized for clinical excellence.
            </p>
          </div>
          <Link 
            href="/book-appointment" 
            className="group flex items-center gap-4 bg-slate-900 px-10 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest text-white hover:bg-primary-600 transition-all shadow-2xl shadow-slate-900/20"
          >
            Explore All Providers <ArrowRight className="w-5 h-5 text-primary-400 group-hover:text-white transition-colors" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {DOCTORS.map((doc, i) => (
            <div key={i} className="group relative bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700">
              {/* Image Section */}
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={doc.image} 
                  alt={doc.name}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Specialist Badge (Alternating Dark/Light) */}
                <div className={`absolute top-6 right-6 p-3 rounded-2xl shadow-xl transition-all duration-500 group-hover:rotate-12 backdrop-blur-md border ${
                  i % 2 === 0 
                    ? 'bg-slate-900/60 border-white/10 text-white' 
                    : 'bg-white/80 border-slate-200 text-primary-600 shadow-slate-200/50'
                }`}>
                   <Stethoscope className="w-5 h-5" />
                </div>

                {/* Floating Info (Glassmorphism) */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                   <div className="inline-flex items-center gap-1.5 mb-2 bg-primary-500/20 px-3 py-1 rounded-full border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"></div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white">{doc.role}</span>
                   </div>
                   <h4 className="text-xl font-black text-white mb-1">{doc.name}</h4>
                   <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em]">{doc.specialty}</p>
                </div>
              </div>

              {/* Bottom Content */}
              <div className="p-8">
                <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-3 mb-8">
                  {doc.bio}
                </p>
                
                <Link 
                  href="/book-appointment" 
                  className="flex items-center justify-between w-full bg-slate-50 group-hover:bg-primary-600 border border-slate-100 group-hover:border-primary-500 p-4 rounded-2xl transition-all duration-500"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Calendar className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-white transition-colors">Book Consultation</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
