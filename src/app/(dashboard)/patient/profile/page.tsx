"use client";
import React, { useState, useEffect } from 'react';
import { User, Shield, Lock, LogOut, Mail, Phone, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ActiveSessions from '../../../../components/ActiveSessions';
import { authService } from '@/services/auth.service';

export default function PatientProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setProfile({
                firstName: payload.firstName || 'Patient',
                lastName: payload.lastName || 'User',
                email: payload.email || 'patient@hms.core',
                role: payload.role || 'patient',
                phoneNumber: '+1 (555) 123-4567',
                lastLogin: new Date().toLocaleDateString()
            });
        } catch (e) {
            console.error(e);
        }
    }
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    router.push('/login');
  };

  if (isLoading) return <div className="p-12 text-center font-bold text-slate-400">Loading Profile...</div>;

  return (
    <div className="h-full flex flex-col bg-slate-50/50 p-6 overflow-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">Personal Account</h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Manage your identity and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-end px-10 pb-0 relative">
                <div className="absolute -bottom-10 left-10">
                   <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                         <User className="w-12 h-12" />
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="pt-16 px-10 pb-10">
                <div className="mb-8">
                   <h2 className="text-2xl font-black text-slate-900">{profile?.firstName} {profile?.lastName}</h2>
                   <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-slate-200 mt-2 inline-block">
                      Verified Patient
                   </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="flex items-center gap-3 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100">
                         <Mail className="w-4 h-4 text-slate-400" />
                         <span className="text-[13px] font-bold text-slate-700">{profile?.email}</span>
                      </div>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="flex items-center gap-3 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100">
                         <Phone className="w-4 h-4 text-slate-400" />
                         <span className="text-[14px] font-bold text-slate-700">{profile?.phoneNumber}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Security & Sessions */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10">
             <h3 className="text-lg font-black text-slate-900 mb-10 flex items-center gap-3">
                <Lock className="w-6 h-6 text-slate-400" /> Account Protection
             </h3>
             
             <div className="border-t border-slate-100 pt-10">
                <ActiveSessions />
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-sm">
              <Shield className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="font-black text-lg mb-2 relative z-10">Privacy</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed relative z-10">Your clinical data is encrypted and HIPAA compliant. You control who has access to your medical history.</p>
           </div>

           <button 
             onClick={handleLogout}
             className="w-full bg-white border border-red-100 text-red-600 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm"
           >
              <LogOut className="w-4 h-4 inline mr-2" /> Secure Logout
           </button>
        </div>
      </div>
    </div>
  );
}
