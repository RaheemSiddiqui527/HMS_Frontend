import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaShieldAlt, FaRegHandshake, FaUserShield, FaClipboardList } from 'react-icons/fa';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors">
            <FaArrowLeft />
            <span className="font-bold">Back to Home</span>
          </Link>
          <div className="text-xl font-black text-slate-900 tracking-tight">
            SDI <span className="text-teal-600">Health Care</span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto max-w-4xl px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
              <FaRegHandshake size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Terms & Conditions</h1>
              <p className="text-slate-500 font-medium">Last Updated: May 10, 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">1</span>
                Agreement to Terms
              </h2>
              <p className="mt-4 leading-relaxed">
                By accessing and using the SDI Health Care platform, you agree to be bound by these Terms and Conditions. Our platform is designed to facilitate healthcare management between patients, doctors, and medical staff. Please read these terms carefully before using our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">2</span>
                Medical Disclaimer
              </h2>
              <div className="mt-4 p-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl">
                <p className="font-bold text-amber-900 mb-2">Not for Emergencies</p>
                <p className="text-amber-800 italic">
                  SDI Health Care is a management tool. In case of a medical emergency, please contact your local emergency services immediately or visit the nearest hospital.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">3</span>
                User Responsibilities
              </h2>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>You must provide accurate and complete information during registration.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>Patients must provide honest medical histories to ensure proper care.</li>
                <li>Doctors must adhere to professional medical ethics and standards.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">4</span>
                Privacy & Data Security
              </h2>
              <p className="mt-4 leading-relaxed">
                Your privacy is paramount to us. All medical records and personal data are encrypted and handled in accordance with our <Link href="/privacy" className="text-teal-600 underline">Privacy Policy</Link>. We implement industry-standard security measures to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm">5</span>
                Termination of Service
              </h2>
              <p className="mt-4 leading-relaxed">
                We reserve the right to suspend or terminate access to our platform for any user who violates these terms or engages in fraudulent or harmful activities.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 mb-4">Questions about our Terms?</p>
            <a href="mailto:support@sdihealthcare.com" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all">
              Contact Support
            </a>
          </div>
        </div>
      </main>

      
    </div>
  );
}
