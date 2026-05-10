"use client";
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Rumaan Ansari",
    role: "Family of Surgery Patient",
    text: "My 85 year old grandfather recently underwent inguinal hernia surgery at SDI Hospital Bhiwandi and we are extremely satisfied. The doctors here are highly skilled, caring and very patient in explaining every detail.",
    rating: 5,
    date: "5 months ago"
  },
  {
    name: "Shabnam Ansari",
    role: "General Patient",
    text: "Doctor and staff are very cooperative. I am very satisfied and relieved. The staff is very caring and gentle towards patients. Highly recommended for best treatment.",
    rating: 5,
    date: "8 months ago"
  },
  {
    name: "Sahil Farooqui",
    role: "Regular Patient",
    text: "Nice Hospital with premium affordable price. The atmosphere is very professional and the treatment quality is top-notch. Everyone should go for best treatment here.",
    rating: 5,
    date: "5 months ago"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/30 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-600 mb-4">Patient Stories</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Trust built through <br /> clinical excellence
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="group bg-slate-50 border border-slate-100 p-10 rounded-[3rem] hover:bg-white hover:border-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative">
              <Quote className="w-12 h-12 text-primary-600/10 absolute top-8 right-8 group-hover:text-primary-600/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary-500 text-primary-500" />
                ))}
              </div>

              <p className="text-slate-600 font-medium leading-relaxed mb-8 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-400 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-black text-slate-900">{t.name}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a 
            href="https://maps.app.goo.gl/fWH63UHZDRoEDeNe9" 
            target="_blank"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest hover:text-primary-600 transition-colors group"
          >
            Read more on Google Maps 
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
