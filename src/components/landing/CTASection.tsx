import React from 'react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="bg-slate-900 border-t border-slate-800 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-tr from-primary-900 to-slate-900 opacity-90 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tight">
           Ready to Transform <br/>Your Hospital Operations?
        </h2>
        <p className="text-xl font-medium text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
           Start your 14-day free trial today. Join thousands of clinics utilizing cutting edge tech. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link href="/admin/login" className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold rounded-xl text-slate-900 bg-white hover:bg-primary-50 shadow-xl transition-all transform hover:-translate-y-1">
            Start Free Trial Now
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold rounded-xl text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
