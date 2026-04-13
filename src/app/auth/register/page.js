"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input, { Select } from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { FiUser, FiMail, FiLock, FiPhone, FiShield } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [role, setRole] = useState("patient");

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[480px] animate-fade-in py-8">
        <div className="flex flex-col items-center mb-8">
  
  {/* Logo */}
  <div className="w-20 h-20 relative mb-4">
    <div className="bg-[#0B5D4B] p-3 rounded-2xl shadow-xl shadow-green-200">
      <Image
        src="/logo.png"
        alt="SDI Healthcare Logo"
        width={60}
        height={60}
        className="object-contain"
      />
    </div>
  </div>

  {/* Title */}
  <h1 className="text-2xl md:text-3xl font-extrabold text-[#111827]">
    Create Account
  </h1>

  {/* Subtitle */}
  <p className="text-slate-500 font-medium mt-1 text-sm md:text-base text-center">
    Join SDI Healthcare Network
  </p>
</div>

        <Card className="px-8 py-10 shadow-2xl">
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" icon={FiUser} required />
              <Input label="Last Name" placeholder="Doe" required />
            </div>
            
            <Input label="Email Address" type="email" placeholder="john@example.com" icon={FiMail} required />
            
            <div className="grid grid-cols-2 gap-4">
              <Input label="Phone" type="tel" placeholder="+1 234..." icon={FiPhone} required />
              <Select 
                label="Role" 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                options={[
                  {value: "patient", label: "Patient"},
                  {value: "doctor", label: "Doctor"},
                  {value: "staff", label: "Staff"}
                ]} 
              />
            </div>

            <Input label="Password" type="password" placeholder="••••••••" icon={FiLock} required />

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 mt-2">
              <div className="mt-0.5"><FiShield className="text-[#16A34A]" /></div>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                By registering, you agree to our Terms of Service and Privacy Policy. Your health data is protected by industry-standard encryption.
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Create My Account
            </Button>
          </form>
        </Card>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#16A34A] font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
