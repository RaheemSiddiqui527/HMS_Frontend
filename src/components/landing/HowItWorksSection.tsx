import React from 'react';
import { Clock, CreditCard, Shield } from 'lucide-react';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 bg-white relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-slate-200 bg-white text-[13px] font-bold text-slate-600 mb-6 shadow-sm">
            Simple Steps
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 text-balance">
            Transform the Way Hospitals Work
          </h3>
          <p className="text-xl font-medium text-slate-500 leading-relaxed max-w-2xl mx-auto text-balance">
            Streamlining administrative processes. We provide modern solutions tailored to improve efficiency, patient care, and overarching profitability.
          </p>
        </div>

        {/* Content Section Split */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Side: Mockup Graphics */}
          <div className="flex-1 w-full relative">
            {/* Soft background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-50/50 rounded-full blur-3xl -z-10"></div>

            {/* Main Visual Frame (mimicking the image of a person but with a clean medical tech look) */}
            <div className="relative bg-slate-100 rounded-3xl h-[450px] w-full max-w-md shadow-inner border border-slate-200 overflow-hidden mx-auto lg:mr-auto lg:ml-0">

               {/* Abstract background inside the frame */}
               <div className="absolute inset-0 bg-linear-to-br from-slate-200 to-slate-100"></div>

               {/* Dashboard wireframe inside the image frame */}
               <div className="absolute inset-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80 shadow-sm p-6 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                     <div className="h-5 w-40 bg-slate-300/60 rounded-md"></div>
                     <div className="w-10 h-10 rounded-full bg-slate-300/60 border-2 border-white"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="h-24 bg-primary-200/50 rounded-xl relative overflow-hidden">
                       <div className="absolute bottom-0 w-full h-8 bg-primary-300/40"></div>
                     </div>
                     <div className="h-24 bg-slate-300/40 rounded-xl relative overflow-hidden">
                       <div className="absolute bottom-0 w-full h-8 bg-slate-400/20"></div>
                     </div>
                  </div>
                  <div className="flex-1 bg-white/50 rounded-xl border border-white/60 flex flex-col p-4 gap-3">
                     <div className="h-3 w-1/3 bg-slate-200 rounded"></div>
                     <div className="h-3 w-full bg-slate-200 rounded"></div>
                     <div className="h-3 w-4/5 bg-slate-200 rounded"></div>
                     <div className="h-3 w-full bg-slate-200 rounded"></div>
                  </div>
               </div>

               {/* Decorative subtle medical element inside the frame */}
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-slate-300 rounded-t-full opacity-20 shadow-inner blur-xl"></div>
            </div>

            {/* Floating Connected Card (mimicking the "Test Kits" overlay layout) */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 z-20">

               {/* Tiny active pill indicating an interaction connecting to card */}
               <div className="absolute -top-12 right-12 flex flex-col items-end">
                 <div className="bg-primary-300 text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-sm mb-1 whitespace-nowrap tracking-wide uppercase">
                   Authorize Access
                 </div>
                 {/* Curved arrow SVG */}
                 <div className="relative w-8 h-8 -mr-3">
                   <svg viewBox="0 0 40 40" className="w-full h-full text-slate-800" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                     <path d="M5,5 Q35,5 35,35 M25,35 L35,35 L35,25" />
                   </svg>
                 </div>
               </div>

               {/* The main floating UI block */}
               <div className="bg-white/95 backdrop-blur-xl p-5 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100 w-72 sm:w-80">
                 <h4 className="text-[15px] font-extrabold text-slate-900 mb-4 border-b border-slate-100 pb-3">Patient Profiles</h4>
                 <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex flex-col gap-2 relative transition-all hover:border-primary-200 hover:bg-primary-50 hover:shadow-sm group cursor-pointer">
                         {/* Fake notification dot */}
                         {i === 1 && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-white shadow-sm"></div>}
                         <div className="w-6 h-6 rounded-md bg-slate-200 group-hover:bg-primary-200 transition-colors"></div>
                         <div className="space-y-1.5 mt-1">
                            <div className="h-1.5 w-full bg-slate-300 rounded-sm"></div>
                            <div className="h-1.5 w-2/3 bg-slate-200 rounded-sm"></div>
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="mt-5 border-t border-slate-50 flex justify-center">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Side: Timeline Steps matching the layout */}
          <div className="flex-1 w-full relative pt-16 lg:pt-0 pl-2 lg:pl-8">

             {/* General Timeline Track Line */}
             <div className="absolute left-[34px] sm:left-[42px] top-6 bottom-16 w-0.5 bg-slate-100 hidden sm:block"></div>

             <div className="space-y-12">

               {/* Step 1 */}
               <div className="relative flex flex-col sm:flex-row items-start gap-5 sm:gap-7 group">
                  {/* Active track segment representing completion path like the image */}
                  <div className="absolute left-[26px] top-12 bottom-[-3rem] w-0.5 bg-slate-800 hidden sm:block z-0"></div>

                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary-200 flex items-center justify-center relative z-10 shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Clock className="w-7 h-7 text-slate-900" />
                  </div>
                  <div className="pt-2">
                    <h4 className="text-[21px] font-bold text-slate-900 mb-2.5">Save Time & Focus</h4>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">Reduce administrative burdens and let your staff focus entirely on delivering the best healthcare to your patients.</p>
                  </div>
               </div>

               {/* Step 2 */}
               <div className="relative flex flex-col sm:flex-row items-start gap-5 sm:gap-7 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center relative z-10 shrink-0 shadow-sm transition-all duration-300 group-hover:border-slate-300 group-hover:scale-105">
                    <CreditCard className="w-7 h-7 text-slate-700" />
                  </div>
                  <div className="pt-2">
                    <h4 className="text-[21px] font-bold text-slate-900 mb-2.5">Seamless Billing</h4>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">Integrated invoicing and payment tracking solutions making sure revenue cycles run smoothly and accurately.</p>
                  </div>
               </div>

               {/* Step 3 */}
               <div className="relative flex flex-col sm:flex-row items-start gap-5 sm:gap-7 group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center relative z-10 shrink-0 shadow-sm transition-all duration-300 group-hover:border-slate-300 group-hover:scale-105">
                    <Shield className="w-7 h-7 text-slate-700" />
                  </div>
                  <div className="pt-2">
                    <h4 className="text-[21px] font-bold text-slate-900 mb-2.5">Real-time Security</h4>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">Your data is encrypted end-to-end, providing you and your patients ultimate peace of mind and HIPAA compliance.</p>
                  </div>
               </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
