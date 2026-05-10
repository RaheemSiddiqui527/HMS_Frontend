import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0 overflow-hidden rounded-lg">
                <Image src="/logo.png" alt="SDI Health Care Logo" fill className="object-contain" sizes="40px" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">SDI Health Care</span>
            </Link>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed font-medium">
               Providing better healthcare delivery, seamless operations, and improved patient care under the guidance of Sunni Dawate Islami.
            </p>
            <div className="flex space-x-5">
              {/* YouTube */}
              <a href="https://www.youtube.com/user/sdichannel" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#FF0000] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/SDIchannel/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1877F2] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/sdichannel/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#E4405F] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* X (Twitter) */}
              <a href="https://x.com/sdichannel" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* WhatsApp */}
              <a href="https://api.whatsapp.com/send/?phone=%2B919699072072&text&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#25D366] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.98zm11.387-5.464c-.301-.15-1.779-.878-2.055-.978-.275-.1-.475-.15-.675.15-.2.3-.775.978-.95 1.178-.175.2-.35.225-.651.075-.3-.15-1.265-.467-2.41-1.487-.893-.797-1.495-1.782-1.67-2.083-.175-.301-.019-.464.131-.613.135-.134.301-.351.451-.526.15-.175.2-.301.3-.501.1-.2.05-.375-.025-.526-.075-.15-.675-1.628-.925-2.228-.243-.584-.489-.505-.675-.514-.175-.008-.375-.01-.575-.01s-.525.075-.8.376c-.275.301-1.051 1.028-1.051 2.506s1.076 2.906 1.226 3.106c.15.2 2.117 3.232 5.128 4.531.716.31 1.275.495 1.71.634.72.229 1.374.197 1.891.12.576-.086 1.779-.727 2.03-1.428.25-.701.25-1.302.175-1.428-.075-.126-.275-.226-.576-.376z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-slate-500 hover:text-primary-600 transition-colors">Features</Link></li>
              <li><Link href="/services" className="text-slate-500 hover:text-primary-600 transition-colors">Pricing</Link></li>
              <li><Link href="/blog" className="text-slate-500 hover:text-primary-600 transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="text-slate-500 hover:text-primary-600 transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-500 hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="text-slate-500 hover:text-primary-600 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-primary-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} SDI Health Care. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
