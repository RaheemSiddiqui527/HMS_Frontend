import { Plus_Jakarta_Sans, Dancing_Script } from 'next/font/google';
import "./global.css";
import React from 'react';
import { Toaster } from 'react-hot-toast';
import PushNotificationInitializer from '@/components/PushNotificationInitializer';
import { GoogleOAuthProvider } from '@react-oauth/google';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontSignature = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-signature',
});

export const metadata = {
  title: "Sunni Dawate Islami Health Care",
  description: "Comprehensive Health Management System for Administrators, Doctors, Staff, and Patients.",
};

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontSignature.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50">
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <Toaster position="top-right" />
          <PushNotificationInitializer />
          {children}
         
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
