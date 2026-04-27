"use client";
import React, { useState, useEffect } from 'react';
import { User, Shield, Mail, Phone, Camera, Save, Lock, LayoutGrid } from 'lucide-react';
import ActiveSessions from '../../../../components/ActiveSessions';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    <div className="h-full flex flex-col bg-slate-50/50 p-6 overflow-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">System Control Profile</h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Manage root administrative credentials</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {/* Profile Info Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-end px-8 pb-0 relative">
                <div className="absolute -bottom-10 left-8">
                   <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                         <User className="w-12 h-12" />
                      </div>
                      <button className="absolute inset-0 bg-slate-900/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-slate-900">
                         <Camera className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </div>
             
             <div className="pt-16 px-8 pb-8">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h2 className="text-2xl font-black text-slate-900">{profile?.firstName} {profile?.lastName}</h2>
                      <div className="flex items-center gap-2 mt-2">
                         <span className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded">
                            Root Admin
                         </span>
                         <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ml-2">
                            <Shield className="w-3 h-3" /> System ID: #0001
                         </span>
                      </div>
                   </div>
                   <button 
                     onClick={() => setIsEditing(!isEditing)}
                     className="px-5 py-2 border border-slate-900 rounded-xl text-[11px] font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                   >
                      {isEditing ? 'Discard' : 'Edit Credentials'}
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Email</label>
                      <div className="flex items-center gap-3 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100">
                         <Mail className="w-4 h-4 text-slate-400" />
                         <span className="text-[13px] font-bold text-slate-600">{profile?.email}</span>
                      </div>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Emergency Phone</label>
                      {isEditing ? (
                         <input className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-slate-900 font-bold text-slate-800 bg-slate-50" defaultValue={profile?.phoneNumber} />
                      ) : (
                        <div className="flex items-center gap-3 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100">
                           <Phone className="w-4 h-4 text-slate-400" />
                           <span className="text-[13px] font-bold text-slate-800">{profile?.phoneNumber}</span>
                        </div>
                      )}
                   </div>
                </div>

                {isEditing && (
                   <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
                      <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[12px] shadow-sm flex items-center gap-2 hover:bg-black transition-all">
                         <Save className="w-4 h-4" /> Save Security Keys
                      </button>
                   </div>
                )}
             </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10">
             <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-2"><Lock className="w-5 h-5 text-slate-400" /> Security Credentials</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <button className="p-5 border border-slate-100 rounded-2xl text-left hover:border-slate-900 hover:bg-white transition-all group shadow-sm bg-slate-50/30">
                   <h4 className="font-black text-slate-800 text-xs uppercase tracking-wide group-hover:text-slate-900">Master Password</h4>
                   <p className="text-[11px] font-bold text-slate-400 mt-1">Update administrative access key</p>
                </button>
                <button className="p-5 border border-slate-100 rounded-2xl text-left hover:border-slate-900 hover:bg-white transition-all group shadow-sm bg-slate-50/30">
                   <h4 className="font-black text-slate-800 text-xs uppercase tracking-wide group-hover:text-slate-900">Advanced 2FA</h4>
                   <p className="text-[11px] font-bold text-slate-400 mt-1">Secure portal with biometric auth</p>
                </button>
             </div>

             <div className="border-t border-slate-100 pt-10">
                <ActiveSessions />
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
              <LayoutGrid className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="font-black text-lg mb-2 relative z-10">System Status</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed relative z-10">Enterprise shield is active. All interactions are cryptographically signed.</p>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl py-3 text-[11px] font-black transition-all backdrop-blur-md border border-white/10 mt-6 uppercase tracking-widest">
                 Audit Security Logs
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
