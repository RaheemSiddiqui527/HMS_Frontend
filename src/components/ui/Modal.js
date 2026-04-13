"use client";

import { FiX } from "react-icons/fi";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, subtitle, children, footer }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center sm:p-4 lg:p-8">
      {/* Immersive Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-[#064E3B]/80 backdrop-blur-[20px] transition-all animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Precision Modal Container */}
      <div className="relative w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-4xl bg-white sm:rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden animate-slide-up sm:animate-scale-in border-none">
        
        {/* Refined Header - Compact yet Premium */}
        <div className="px-8 sm:px-12 py-6 sm:py-8 flex items-center justify-between shrink-0 bg-white border-b border-slate-50 relative z-10">
          <div className="space-y-1">
            <p className="text-[#16A34A] text-[9px] font-black uppercase tracking-[0.3em] leading-none mb-1">System Administration Portal</p>
            <h3 className="text-xl sm:text-3xl font-black text-[#111827] tracking-tight leading-none">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-3 sm:p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            <FiX size={20} className="sm:scale-125" />
          </button>
        </div>

        {/* Scrollable Clinical Form Area */}
        <div className="px-8 sm:px-12 py-8 overflow-y-auto custom-scrollbar flex-1 bg-white min-h-[300px]">
          <div className="max-w-3xl mx-auto space-y-6">
            {children}
          </div>
        </div>

        {/* Action Footer */}
        {footer && (
          <div className="px-8 sm:px-12 py-6 sm:py-8 border-t border-slate-50 bg-slate-50/50 flex flex-col sm:flex-row justify-end gap-4 shrink-0 relative z-10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
