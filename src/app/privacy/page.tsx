import React from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaShieldAlt, FaLock, FaUserSecret, FaFileContract } from 'react-icons/fa';

export default function PrivacyPage() {
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
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <FaShieldAlt size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900">Privacy Policy</h1>
              <p className="text-slate-500 font-medium">Last Updated: May 10, 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FaLock className="text-blue-500" /> Information We Collect
              </h2>
              <p className="mt-2 leading-relaxed">
                To provide you with the best healthcare management experience, we collect:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Personal identification (Name, Email, Phone number).</li>
                <li>Medical history and records (provided by you or your doctor).</li>
                <li>Appointment details and prescription history.</li>
                <li>Device information and IP addresses for security purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FaUserSecret className="text-blue-500" /> How We Use Your Data
              </h2>
              <p className="mt-2 leading-relaxed">
                Your data is used exclusively for:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Facilitating medical consultations and appointments.</li>
                <li>Maintaining accurate health records.</li>
                <li>Sending important health alerts and notifications.</li>
                <li>Improving our platform's functionality and user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FaFileContract className="text-blue-500" /> Data Protection
              </h2>
              <div className="mt-4 p-6 bg-blue-50 border-l-4 border-blue-400 rounded-r-xl">
                <p className="font-bold text-blue-900 mb-2">Encryption & Security</p>
                <p className="text-blue-800">
                  We use AES-256 encryption for all sensitive medical data and SSL/TLS protocols for all data transmission. Your information is stored on secure, HIPAA-compliant servers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Your Rights
              </h2>
              <p className="mt-2 leading-relaxed">
                You have the right to access, correct, or delete your personal data at any time. You can manage most of these settings directly through your profile, or contact us for assistance with your medical records.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                Third-Party Sharing
              </h2>
              <p className="mt-2 leading-relaxed">
                We never sell your data. We only share information with healthcare providers you are actively consulting with, or as required by law.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 mb-4">Have concerns about your data?</p>
            <a href="mailto:privacy@sdihealthcare.com" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-black transition-all">
              Privacy Office
            </a>
          </div>
        </div>
      </main>

    </div>
  );
}
