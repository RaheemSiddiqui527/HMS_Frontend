import { Plus_Jakarta_Sans } from 'next/font/google';
import "./global.css";
import React from 'react';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
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
    <html lang="en" className={fontSans.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50">
        {children}
      </body>
    </html>
  );
}
