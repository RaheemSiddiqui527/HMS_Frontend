"use client";

import React from "react";

const Input = ({ label, icon: Icon, type = "text", error, className = "", ...props }) => {
  return (
    <div className={`w-full space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#16A34A] transition-colors pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          className={`w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-5 transition-all outline-none 
            font-bold text-sm text-[#111827] placeholder:text-slate-300 focus:bg-white focus:border-[#16A34A] focus:ring-4 focus:ring-green-100/30
            ${Icon ? "pl-12" : "pl-5"}
            ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest pl-1">{error}</p>}
    </div>
  );
};

export const Select = ({ label, options, icon: Icon, className = "", ...props }) => {
  return (
    <div className={`w-full space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#16A34A] transition-colors pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <select
          className={`w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-5 transition-all outline-none appearance-none
            font-bold text-sm text-[#111827] focus:bg-white focus:border-[#16A34A] focus:ring-4 focus:ring-green-100/30
            ${Icon ? "pl-12" : "pl-5"}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>
  );
};

export const Textarea = ({ label, ...props }) => (
  <div className="w-full space-y-2">
    {label && (
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">
        {label}
      </label>
    )}
    <textarea 
      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm text-[#111827] font-bold leading-relaxed focus:bg-white focus:ring-4 focus:ring-green-100/30 focus:border-[#16A34A] focus:outline-none transition-all resize-none shadow-inner min-h-[120px]"
      {...props}
    />
  </div>
);

export default Input;
