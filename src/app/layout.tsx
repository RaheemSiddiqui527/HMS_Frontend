import { Plus_Jakarta_Sans, Dancing_Script } from 'next/font/google';
import "./global.css";
import React from 'react';
import { Toaster } from 'react-hot-toast';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontSignature = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-signature',
});

export const metadata = {
  title: "SDI Health Care",
  description: "Comprehensive Health Management System for Administrators, Doctors, Staff, and Patients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSignature.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50">
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
