"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle background opacity based on scroll position
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3"
          : "bg-white/70 backdrop-blur-md border-b border-white/20 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo Section */}
          <div className="flex items-center shrink-0 cursor-pointer">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0 overflow-hidden rounded-lg">
                <Image src="/logo.png" alt="SDI Health Care Logo" fill className="object-contain" sizes="40px" priority />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 hidden sm:block">SDI Health Care</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-[15px] font-semibold text-slate-600 hover:text-primary-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-[15px] font-semibold text-slate-600 hover:text-primary-600 transition-colors">How it Works</Link>
            <Link href="#pricing" className="text-[15px] font-semibold text-slate-600 hover:text-primary-600 transition-colors">Pricing</Link>
            <Link href="#faq" className="text-[15px] font-semibold text-slate-600 hover:text-primary-600 transition-colors">FAQ</Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/staff/login" className="text-[15px] font-bold text-primary-700 hover:text-primary-800 transition-colors">
              Sign In
            </Link>
            <Link href="/admin/login" className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-[15px] font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-primary-600 hover:bg-primary-50 focus:outline-none transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                 <X className="block h-7 w-7" aria-hidden="true" />
              ) : (
                 <Menu className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
         className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 origin-top overflow-hidden ${
           mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
         }`}
      >
        <div className="px-5 pt-4 pb-8 space-y-3">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
             Features
          </Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
             How it Works
          </Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
             Pricing
          </Link>
          <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-primary-700 hover:bg-primary-50 transition-colors">
             FAQ
          </Link>

          <div className="border-t border-slate-100 mt-6 pt-6 flex flex-col gap-3">
            <Link href="/staff/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-3.5 rounded-xl text-base font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors">
              Sign In
            </Link>
            <Link href="/admin/login" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-4 py-3.5 border border-transparent rounded-xl text-base font-bold text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
