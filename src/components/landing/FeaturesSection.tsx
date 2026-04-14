import React from 'react';
import { Calendar, FileText, User, LineChart, CheckCircle2 } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section id="features" className="py-28 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching the reference styling */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-white text-[13px] font-bold text-slate-600 mb-8 shadow-sm">
            Features
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 text-balance">
            Powerful Features for Smarter <br className="hidden md:block"/>Healthcare Management.
          </h3>
          <p className="text-xl font-medium text-slate-500 leading-relaxed max-w-2xl mx-auto text-balance">
            SDI Health Care provides comprehensive modules tailored to give you absolute control over patient care.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* Card 1: Schedules */}
          <BentoCard
            title="Schedules"
            desc="Comprehensive scheduling tools to seamlessly manage bookings and minimize wait times."
            visual={
              <div className="bg-white p-5 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center gap-4 relative z-10 w-48">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center shadow-inner">
                  <Calendar className="w-7 h-7 text-primary-600" />
                </div>
                <div className="text-center w-full">
                  <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Appointment</div>
                  <div className="text-sm font-black text-slate-800 bg-slate-50 py-2 rounded-xl">10:00 AM Today</div>
                </div>
              </div>
            }
          />

          {/* Card 2: Digital Records */}
          <BentoCard
            title="Digital Records"
            desc="Keep all patient histories, past diagnoses, and lab results securely in one place."
            visual={
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Connecting lines */}
                <div className="absolute w-[80%] h-[2px] bg-slate-200"></div>
                <div className="absolute h-[80%] w-[2px] bg-slate-200"></div>

                {/* Documents nodes */}
                <div className="absolute left-[15%] top-[15%] bg-white p-3 rounded-2xl shadow-md border border-slate-100 text-slate-400 hover:text-primary-500 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="absolute right-[15%] bottom-[15%] bg-white p-3 rounded-2xl shadow-md border border-slate-100 text-slate-400 hover:text-primary-500 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>

                {/* Center Node */}
                <div className="bg-white p-3 rounded-full shadow-2xl border flex items-center justify-center relative z-10 scale-125">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white ring-4 ring-primary-100">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                </div>
              </div>
            }
          />

          {/* Card 3: Doctor Profiles */}
          <BentoCard
            title="Doctor Profiles"
            desc="Manage your staff, their availability, specialties, and coordinate schedules effectively."
            visual={
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative z-10 w-full px-6">
                 {/* Root node */}
                 <div className="bg-white px-5 py-3 rounded-2xl shadow-md border border-slate-100 text-[13px] font-bold text-slate-700 flex items-center gap-2 shrink-0">
                   🏥 Cardiology
                 </div>

                 {/* Connection line (hidden on small responsive, visible on larger inner container) */}
                 <div className="hidden sm:block w-8 h-[2px] bg-slate-200 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                 </div>

                 {/* Leaf nodes */}
                 <div className="flex sm:flex-col gap-3">
                   <div className="bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 text-[13px] font-bold text-slate-700 flex items-center gap-3">
                     <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><User className="w-4 h-4" /></div>
                     Dr. Sarah
                   </div>
                   <div className="bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 text-[13px] font-bold text-slate-700 flex items-center gap-3">
                     <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary-600"><User className="w-4 h-4" /></div>
                     Dr. Michael
                   </div>
                 </div>
               </div>
            }
          />

          {/* Card 4: Patient Stats */}
          <BentoCard
            title="Patient Stats"
            desc="Advanced analytics and reporting for hospital performance and patient influx metrics."
            visual={
               <div className="flex items-end justify-center gap-4 bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 h-40 w-64 relative z-10">
                 <div className="w-10 bg-slate-100 rounded-t-xl h-[40%] transition-all hover:bg-slate-200 mt-auto"></div>
                 <div className="w-10 bg-slate-100 rounded-t-xl h-[65%] transition-all hover:bg-slate-200 mt-auto"></div>
                 <div className="w-10 bg-primary-500 rounded-t-xl h-[95%] relative mt-auto shadow-md">
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-sm">
                     +24%
                   </div>
                   <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                 </div>
                 <div className="w-10 bg-slate-100 rounded-t-xl h-[50%] transition-all hover:bg-slate-200 mt-auto"></div>
               </div>
            }
          />

        </div>
      </div>
    </section>
  );
}

function BentoCard({ title, desc, visual }: { title: string, desc: string, visual: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Top graphic area mimicking the reference bento UI */}
      <div className="h-72 w-full relative flex items-center justify-center bg-white overflow-hidden">
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
          style={{
            backgroundImage: 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* The Custom Visual for each feature */}
        <div className="relative z-10 transition-transform duration-500 transform group-hover:scale-105 w-full h-full flex items-center justify-center">
           {visual}
        </div>

        {/* Bottom fade out gradient so it nicely blends into the text area */}
        <div className="absolute bottom-0 left-0 w-full h-12 bg-linear-to-t from-white to-transparent z-10"></div>
      </div>

      {/* Bottom text area */}
      <div className="p-8 md:p-10 bg-white relative z-20 flex-1">
        <h4 className="text-[22px] font-black text-slate-900 mb-4 tracking-tight">{title}</h4>
        <p className="text-slate-500 font-medium leading-[1.7] text-[15px]">{desc}</p>
      </div>
    </div>
  );
}
