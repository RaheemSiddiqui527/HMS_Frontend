"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    { label: "Admin", role: "admin", email: "admin@medicare.com" },
    { label: "Doctor", role: "doctor", email: "doctor@medicare.com" },
    { label: "Staff", role: "staff", email: "staff@medicare.com" },
    { label: "Patient", role: "patient", email: "patient@medicare.com" },
  ];

  const handleLogin = async (e, demoData = null) => {
    e?.preventDefault();
    setLoading(true);
    const data = demoData || { email, password, role: "admin" };
    await login(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] animate-fade-in">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">

          {/* Logo */}
          <div className="w-20 h-20 relative mb-4 transition-transform hover:scale-105">
            <div className="bg-[#0B5D4B] p-3 rounded-2xl shadow-xl shadow-green-200">
              <Image
                src="/logo2.png"
                alt="SDI Healthcare Logo"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
          </div>

          {/* Brand Name */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827] tracking-tight">
            SDI Healthcare
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 font-medium mt-1 text-sm md:text-base text-center">
            Professional Hospital Management
          </p>
        </div>

        <Card className="px-8 py-10 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#111827]">Sign In</h2>
            <p className="text-sm text-slate-500 mt-1">Access your dashboard and records</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email Address"
              autoFocus
              placeholder="e.g. john@example.com"
              icon={FiMail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={FiLock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right">
                <button type="button" className="text-xs font-bold text-[#16A34A] hover:underline">Forgot password?</button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={loading}>
              Sign In to System
            </Button>
          </form>

          {/* Demo Login Buttons */}
          <div className="mt-8">
            <div className="relative flex items-center mb-6">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Demo Accounts</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  onClick={(e) => handleLogin(e, account)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-100 text-left hover:bg-slate-50 hover:border-[#16A34A] transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-50 text-[#16A34A] flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                    {account.label[0]}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase leading-tight">{account.label}</p>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">Quick Login</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[#16A34A] font-bold hover:underline">
            Register now
          </Link>
        </p>
      </div>

      {/* Footer Info */}
      <div className="mt-12 flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest opacity-60">
        <span>© 2026 SDI Healthcare Inc. All rights reserved.</span>
        <span>Privacy Policy</span>
        <span>Terms of Service</span>
      </div>
    </div>
  );
}
