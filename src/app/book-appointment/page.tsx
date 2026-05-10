"use client";
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Calendar, UserPlus, LogIn, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';

export default function PublicBookingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Side: Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-primary-700 text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck className="w-3.5 h-3.5" /> Secure Patient Portal
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
              Start your <br />
              <span className="text-primary-600">Recovery Journey</span> <br />
              with us today.
            </h1>
            
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
              To provide you with the best clinical care and maintain your medical history, we require you to have a verified patient account.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instant</div>
                  <div className="text-sm font-black text-slate-900">Real-time Slots</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Flexible</div>
                  <div className="text-sm font-black text-slate-900">Easy Rescheduling</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Action Cards */}
          <div className="flex-1 w-full max-w-md space-y-6">
            <Link 
              href="/login?redirect=/patient/book-appointment"
              className="group block p-8 bg-white border-2 border-slate-100 rounded-[3rem] hover:border-primary-600 hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 relative overflow-hidden"
            >
              {/* <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div> */}
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[2rem] bg-primary-600 text-white flex items-center justify-center mb-6 shadow-xl shadow-primary-600/20 group-hover:rotate-12 transition-transform">
                  <LogIn className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Existing Patient</h2>
                <p className="text-slate-500 text-sm font-medium mb-6">Login to your account to quickly book with your preferred doctor.</p>
                <div className="flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest">
                  Sign In Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/register"
              className="group block p-8 bg-slate-900 border-2 border-slate-900 rounded-[3rem] hover:shadow-2xl hover:shadow-slate-900/20 transition-all duration-500 relative overflow-hidden"
            >
              {/* <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-700"></div> */}
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[2rem] bg-white text-slate-900 flex items-center justify-center mb-6 shadow-xl shadow-white/10 group-hover:-rotate-12 transition-transform">
                  <UserPlus className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">New Patient</h2>
                <p className="text-slate-400 text-sm font-medium mb-6">Create a secure medical profile and schedule your first consultation.</p>
                <div className="flex items-center gap-2 text-xs font-black text-primary-400 uppercase tracking-widest">
                  Register Account <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
