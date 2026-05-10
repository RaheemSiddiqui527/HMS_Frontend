import React from 'react';
import { Star, StarHalf } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-visible relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
      <div className="absolute top-0 left-0 w-full h-[700px] bg-linear-to-b from-primary-50/80 to-transparent -z-10 rounded-full blur-3xl opacity-80 pointer-events-none"></div>

      <div className="flex-1 space-y-8 animate-fade-in relative z-10 pt-10 lg:pt-0">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-primary-700 text-[10px] font-black uppercase tracking-widest">
           <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse"></div>
           Open 24 Hours • Verified Multi-Speciality
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05] text-balance">
          Healthcare <br />
          Excellence <br />
          at <span className="relative inline-block z-10">
            SDI Hospital
            <svg className="absolute w-[110%] h-5 -bottom-2 -left-2 text-primary-500 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
               <path d="M0 15 Q50 0 100 12" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
               <path d="M10 18 Q50 5 95 18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </span>
        </h1>

        <p className="max-w-xl text-lg sm:text-xl text-slate-600 font-medium leading-relaxed text-balance">
          SDI Healthcare Hospital & Diagnostic Centre provides advanced medical care with a human touch. From diagnostics to complex surgeries, your health is in expert hands.
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-8">
           <a href="/book-appointment" className="bg-primary-600 hover:bg-primary-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-primary-600/20 text-xs uppercase tracking-widest">
              Book Appointment
           </a>
           <a href="tel:07559285928" className="bg-white border border-slate-200 hover:border-slate-900 text-slate-900 font-black py-4 px-8 rounded-2xl transition-all text-xs uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              Emergency Call
           </a>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-8 pt-8 mt-2 border-t border-slate-200/60 max-w-md">
           <div>
             <div className="text-3xl sm:text-4xl font-black text-slate-900">24/7</div>
             <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Care & Pharmacy</div>
           </div>
           <div className="w-px h-14 bg-slate-200"></div>
           <div>
             <div className="text-3xl sm:text-4xl font-black text-slate-900">36+</div>
             <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Google Reviews</div>
           </div>
        </div>

        {/* Star Rating Row */}
        <div className="flex items-center gap-3 pt-6 border-t border-slate-200/60 max-w-md">
           <div className="flex text-primary-500">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
           </div>
           <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900">5.0</span>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Average Patient Rating</span>
           </div>
        </div>
      </div>

      {/* Right side isometric / skewed Dashboard Mockup */}
      <div className="flex-1 w-full max-w-2xl relative animate-fade-in [perspective:1200px]" style={{ animationDelay: '200ms' }}>
        <div className="absolute -inset-4 rounded-[2rem] bg-linear-to-tr from-primary-200 to-primary-400 opacity-20 blur-3xl z-0"></div>
        {/* Apply 3D rotation mimicking the staggered screens floating in the provided UI mockup */}
        <div className="relative z-10 transition-transform duration-700 [transform:rotateX(10deg)_rotateY(-15deg)_rotateZ(5deg)] scale-100 hover:scale-105">

           {/* Back abstract screen */}
           <div className="absolute top-10 -right-12 w-3/4 h-[400px] bg-white/40 border border-slate-200 rounded-3xl shadow-xl backdrop-blur-md glass-morphism [transform:translateZ(-100px)]"></div>

           {/* Main Device frame mimicking a sleek phone/tablet interface */}
           <div className="relative rounded-[2rem] border-[6px] border-white/80 bg-white/95 shadow-2xl overflow-hidden glass-morphism flex flex-col h-[550px] [transform:translateZ(0px)]">
             <div className="h-16 border-b border-slate-100 flex justify-between items-center px-6 bg-slate-50/50">
                <div className="h-4 w-24 bg-slate-200 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <div className="w-4 h-4 text-primary-600 font-bold text-xs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                  </div>
                  <span className="font-bold text-slate-700 text-sm">42</span>
                </div>
             </div>
             <div className="flex-1 p-6 flex flex-col gap-5 bg-white">
                {/* Chat Mock */}
                <div className="flex items-start gap-3">
                   <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
                   <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none w-2/3 h-16"></div>
                </div>
                <div className="flex items-start gap-3 flex-row-reverse">
                   <div className="w-8 h-8 rounded-full bg-primary-100 shrink-0"></div>
                   <div className="bg-primary-500/20 p-3 rounded-2xl rounded-tr-none w-1/2 h-12 flex items-center justify-end px-4">
                     <div className="h-2 w-12 bg-primary-500/50 rounded-full"></div>
                   </div>
                </div>

                {/* To-Do List Mock floating above */}
                <div className="mt-6 p-5 bg-white rounded-2xl border border-slate-200 shadow-lg relative -left-4 w-[110%] [transform:translateZ(50px)]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-slate-800">To-do list</span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg">
                       <div className="w-5 h-5 rounded bg-primary-400 flex items-center justify-center">
                         <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                       </div>
                       <div className="h-2 w-32 bg-slate-300 rounded-full"></div>
                     </div>
                     <div className="flex items-center gap-3 p-2">
                       <div className="w-5 h-5 rounded border-2 border-slate-300"></div>
                       <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
                     </div>
                  </div>
                </div>

                {/* Graph mock */}
                <div className="mt-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-md flex items-end gap-3 h-28">
                   {[40, 60, 30, 80, 50, 90].map((h, i) => (
                      <div key={i} className="flex-1 bg-slate-100 hover:bg-primary-100 rounded-t-lg transition-all relative overflow-hidden" style={{ height: `${h}%` }}>
                        {h > 70 && <div className="absolute inset-0 bg-primary-400"></div>}
                      </div>
                   ))}
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
