"use client";
import React, { useState, useEffect } from 'react';
import { User, Shield, Mail, Phone, Camera, Save, Lock, LayoutGrid } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd fetch the current admin's profile
    // Here we'll simulate it from the token/session
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setProfile({
                firstName: payload.firstName || 'System',
                lastName: payload.lastName || 'Administrator',
                email: payload.email || 'admin@hms.core',
                role: payload.role || 'admin',
                phoneNumber: '+1 (555) 000-1234',
                lastLogin: new Date().toLocaleDateString()
            });
        } catch (e) {
            console.error(e);
        }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <div className="p-12 text-center font-bold text-slate-400">Synchronizing secure profile...</div>;

  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800">Security & Profile</h1>
        <p className="text-slate-500 font-medium text-sm">Manage your administrative credentials and account settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="h-32 bg-slate-900 flex items-end px-8 pb-4 relative">
                <div className="absolute -bottom-10 left-8">
                   <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                         <User className="w-12 h-12" />
                      </div>
                      <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                         <Camera className="w-6 h-6" />
                      </button>
                   </div>
                </div>
             </div>
             
             <div className="pt-16 px-8 pb-8">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h2 className="text-2xl font-black text-slate-900">{profile?.firstName} {profile?.lastName}</h2>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                            Super Admin
                         </span>
                         <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                            <Shield className="w-3 h-3" /> System ID: #0001
                         </span>
                      </div>
                   </div>
                   <button 
                     onClick={() => setIsEditing(!isEditing)}
                     className="px-4 py-2 border border-slate-200 rounded-xl text-[13px] font-extrabold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                   >
                      {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 italic">
                         <Mail className="w-4 h-4 text-slate-400" />
                         <span className="text-[13px] font-bold text-slate-600">{profile?.email}</span>
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Phone Support</label>
                      {isEditing ? (
                         <input className="w-full text-sm border border-slate-200 rounded-lg px-3 py-3 outline-none focus:border-slate-900 font-bold text-slate-800" defaultValue={profile?.phoneNumber} />
                      ) : (
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <Phone className="w-4 h-4 text-slate-400" />
                           <span className="text-[13px] font-bold text-slate-800">{profile?.phoneNumber}</span>
                        </div>
                      )}
                   </div>
                </div>

                {isEditing && (
                   <div className="mt-8 flex justify-end">
                      <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[13px] shadow-lg flex items-center gap-2 hover:bg-black transition-colors">
                         <Save className="w-4 h-4" /> Save Security Updates
                      </button>
                   </div>
                )}
             </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
             <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2"><Lock className="w-5 h-5 text-indigo-600" /> Security Credentials</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button className="p-4 border border-slate-200 rounded-2xl text-left hover:border-slate-900 hover:bg-slate-50 transition-all group">
                   <h4 className="font-extrabold text-slate-800 text-[14px] group-hover:text-black">Change Management Password</h4>
                   <p className="text-xs font-semibold text-slate-500 mt-1">Update your administrative access key.</p>
                </button>
                <button className="p-4 border border-slate-200 rounded-2xl text-left hover:border-slate-900 hover:bg-slate-50 transition-all group">
                   <h4 className="font-extrabold text-slate-800 text-[14px] group-hover:text-black">Two-Factor Authentication</h4>
                   <p className="text-xs font-semibold text-slate-500 mt-1">Secure your portal with biometric or SMS codes.</p>
                </button>
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-sm font-black text-slate-900 mb-4 tracking-tight uppercase">Recent Session Logs</h3>
              <div className="space-y-4">
                 <SessionItem device="MacOSX Chrome 124.0" status="Active Now" time="Current" color="bg-emerald-500" />
                 <SessionItem device="iPhone 15 Pro - Safari" status="Session Closed" time="2 hours ago" color="bg-slate-300" />
                 <SessionItem device="Windows 11 Edge" status="Terminated" time="Yesterday" color="bg-red-400" />
              </div>
           </div>

           <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <LayoutGrid className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
              <h3 className="font-black text-lg mb-2 relative z-10">System Integrity</h3>
              <p className="text-indigo-100 text-xs font-medium mb-4 leading-relaxed relative z-10">Your administrator account is protected by Enterprise Shield. All system interactions are encrypted and logged.</p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl py-2.5 text-[12px] font-black transition-colors backdrop-blur-md border border-white/20">
                 View Security Audit
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function SessionItem({ device, status, time, color }: { device: string, status: string, time: string, color: string }) {
   return (
      <div className="flex items-center gap-3">
         <div className={`w-2 h-2 rounded-full ${color}`}></div>
         <div className="min-w-0">
            <div className="text-[13px] font-bold text-slate-800 truncate">{device}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{status} • {time}</div>
         </div>
      </div>
   );
}
