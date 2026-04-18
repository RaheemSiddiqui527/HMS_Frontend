import React from 'react';
import { Activity } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#f1f5f9] p-2 sm:p-4 font-sans">

      {/* Left side Form Area */}
      <div className="flex-1 bg-white rounded-3xl lg:rounded-[2rem] shadow-sm flex flex-col relative overflow-y-auto w-full lg:max-w-[45%] z-10 border border-slate-100">

        <div className="absolute top-6 left-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center border border-primary-500/20">
               <img src="/logo2.png" alt="SDI Logo" className="w-5 h-5 object-contain brightness-0 invert" />
            </div>
            <span className="font-extrabold text-[15px] tracking-tight text-slate-800">SDI Health Care</span>
        </div>

        {/* Dynamic Inner App Children Form Space */}
        <div className="flex-1 flex items-center justify-center pt-24 pb-12 w-full px-4 sm:px-12 lg:px-20 mx-auto">
          {children}
        </div>

        {/* Footer legalities matching mockup */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center text-[11px] font-bold text-slate-400">
           Copyright © SDI Health Care, All Rights Reserved &nbsp;
           <a href="#" className="text-primary-700 hover:text-primary-800 ml-1">Terms</a> &nbsp;|&nbsp;
           <a href="#" className="text-primary-700 hover:text-primary-800">Privacy Policy</a>
        </div>
      </div>

      {/* Right Side UI Showcase Box - Pure CSS Mockup */}
      <div className="hidden lg:flex flex-1 rounded-[2rem] bg-[#0c4a3e] ml-4 relative overflow-hidden flex-col items-center justify-center border border-[#093d33] shadow-inner">

         {/* Faded Architecture Grid Map */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '70px 70px', backgroundPosition: 'center' }}></div>

         {/* Floating Elements cluster */}
         <div className="relative z-10 w-full max-w-xl mx-auto h-[450px] mt-10 [perspective:1200px]">

            {/* Top Stat Widget */}
            <div className="absolute right-12 top-0 w-64 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-white/20 transform hover:-translate-y-2 transition-transform duration-500 [transform:rotateX(5deg)_rotateY(-5deg)]">
               <div className="flex justify-between items-start mb-3">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hospital Plan</span>
                 <span className="text-[9px] font-bold text-slate-400">This Month ▼</span>
               </div>
               <div className="flex items-center gap-4 mb-4">
                 {/* Donut Abstract CSS */}
                 <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-r-primary-500 border-t-primary-500 border-l-yellow-400 shrink-0 shadow-inner"></div>
                 <div>
                   <div className="text-lg font-black text-slate-900 leading-tight">$2,005.45</div>
                   <div className="text-[9px] font-bold text-slate-400">Available Budget</div>
                 </div>
               </div>
               <div className="h-px w-full bg-slate-100 mb-2"></div>
               <div className="space-y-2 mt-3">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-400"></div><div className="h-1.5 w-16 bg-slate-200"></div></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary-500"></div><div className="h-1.5 w-24 bg-slate-200"></div></div>
               </div>
            </div>

            {/* Middle Main Tracking Layer */}
            <div className="absolute left-10 top-24 w-72 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-2xl border border-white/20 transform hover:-translate-y-2 transition-transform duration-500 [transform:translateZ(50px)]">
               <div className="flex justify-between items-start mb-1">
                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Capital Allocations</span>
               </div>
               <div className="mb-4">
                 <div className="text-2xl font-black text-slate-800">$17,366.00</div>
                 <div className="text-[10px] font-bold text-slate-400">Total Operational Value</div>
               </div>
               <div className="space-y-4">
                  {[1,2,3].map((v) => (
                    <div key={v} className="flex justify-between items-center border-b border-slate-50 pb-2">
                       <div className="flex flex-col gap-1">
                         <div className="h-2 w-20 bg-slate-800 rounded opacity-80"></div>
                         <div className="h-1.5 w-10 bg-slate-300 rounded"></div>
                       </div>
                       <div className="text-right">
                         <div className="text-[11px] font-bold text-slate-800">$1,100</div>
                         <div className="text-[9px] font-bold text-emerald-500">+3.8%</div>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-4 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg">Review Operations</button>
            </div>

            {/* Bottom Offset Card */}
            <div className="absolute right-4 bottom-16 w-60 bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-2xl border border-white/20 transform hover:-translate-y-2 transition-transform duration-500 [transform:translateZ(100px)_rotateY(-10deg)]">
               <div className="mb-3 border-b border-slate-100 pb-2">
                 <div className="text-[12px] font-extrabold text-slate-800">Critical Systems Plan</div>
                 <div className="text-[9px] font-bold text-slate-400">Due date - Apr 18, 2025</div>
               </div>
               <div className="mb-4">
                 <div className="flex items-end gap-1 mb-1.5">
                   <span className="text-lg font-black text-slate-800">$19,600</span>
                   <span className="text-[10px] font-bold text-slate-400 mb-1">/ $20,000</span>
                 </div>
                 {/* Progress Bar Container */}
                 <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-yellow-400 w-[95%]"></div>
                 </div>
               </div>
            </div>

         </div>

         <div className="relative z-10 text-center mt-4 px-12 mb-16">
            <div className="w-14 h-14 bg-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-white/10 backdrop-blur-sm">
               <img src="/logo2.png" alt="Institutional Logo" className="w-8 h-8 object-contain" />
            </div>
            <h2 className="text-[32px] font-black text-white mb-4 text-balance leading-tight tracking-tight">
               A Unified Hub for Smarter <br/>Healthcare Decision-Making
            </h2>
            <p className="text-primary-100/60 text-[15px] font-medium leading-[1.8] max-w-lg mx-auto text-balance">
               SDI Health Care empowers you with a unified operational command center—delivering deep insights and a complete 360° view of your entire economic and functional environment.
            </p>
         </div>

         {/* Track Pagination Interface */}
         <div className="absolute bottom-10 w-full flex justify-center gap-3">
            <div className="w-[70px] h-1 bg-white rounded-full transition-all cursor-pointer"></div>
            <div className="w-[70px] h-1 bg-white/20 rounded-full transition-all cursor-pointer hover:bg-white/40"></div>
            <div className="w-[70px] h-1 bg-white/20 rounded-full transition-all cursor-pointer hover:bg-white/40"></div>
            <div className="w-[70px] h-1 bg-white/20 rounded-full transition-all cursor-pointer hover:bg-white/40"></div>
         </div>
      </div>

    </div>
  )
}
