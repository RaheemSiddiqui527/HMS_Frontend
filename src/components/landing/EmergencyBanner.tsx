"use client";
import React, { useState } from 'react';
import { Phone, X, Clock, MapPin } from 'lucide-react';

export function EmergencyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900 text-white py-3 relative z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Emergency Hotline:</span>
            <a href="tel:07559285928" className="text-sm font-black hover:text-primary-400 transition-colors">075592 85928</a>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Open 24/7</span>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Vanjar Patti Naka, Bhiwandi</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a href="/book-appointment" className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400 hover:text-primary-300 transition-colors">
            Book Priority Checkup →
          </a>
          <button onClick={() => setIsVisible(false)} className="p-1 hover:bg-white/10 rounded transition-colors">
            <X className="w-3.5 h-3.5 text-slate-500" />
          </button>
        </div>
      </div>
      
      {/* Decorative Light effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-600/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
