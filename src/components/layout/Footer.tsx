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
              SDI Health Care providing better healthcare delivery, seamless operations, and improved patient care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                 <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-primary-500 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-slate-500 hover:text-primary-600 transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-slate-500 hover:text-primary-600 transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-slate-500 hover:text-primary-600 transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-slate-500 hover:text-primary-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} SDI Health Care. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-primary-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
