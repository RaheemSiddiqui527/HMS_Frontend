import React from 'react';

export function TrustedBySection() {
  return (
    <section className="py-16 border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Trusted by top healthcare providers</p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-3"><span className="font-extrabold text-2xl tracking-tight">EverHealth.</span></div>
          <div className="flex items-center gap-3"><span className="font-extrabold text-2xl tracking-tight">CareMax</span></div>
          <div className="flex items-center gap-3"><span className="font-extrabold text-2xl tracking-tight text-slate-800">SecureMed</span></div>
          <div className="hidden md:flex items-center gap-3"><span className="font-extrabold text-2xl tracking-tight">OptimaClinic</span></div>
        </div>
      </div>
    </section>
  );
}
