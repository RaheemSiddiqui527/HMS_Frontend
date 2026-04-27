"use client";
import React, { useState, useEffect } from 'react';
import { User, Shield, Stethoscope, Mail, Phone, Camera, Save, Lock, Activity, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ActiveSessions from '../../../../components/ActiveSessions';
import { authService } from '@/services/auth.service';

export default function DoctorProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setProfile({
                firstName: payload.firstName || 'Medical',
                lastName: payload.lastName || 'Professional',
                email: payload.email || 'doctor@hms.core',
                role: payload.role || 'doctor',
                specialization: 'Cardiology',
                licenseNo: 'MED-99482-SYS',
                phoneNumber: '+1 (555) 778-2234',
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
        <h1 className="text-2xl font-black text-slate-900">Account Settings</h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Manage your clinical profile and security</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
             <div className="h-32 bg-slate-50 border-b border-slate-100 flex items-end px-10 pb-0 relative">
                <div className="absolute -bottom-10 left-10">
                   <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden relative">
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                         <User className="w-12 h-12" />
                      </div>
                      <button className="absolute inset-0 bg-slate-900/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-slate-900">
                         <Camera className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </div>
             
             <div className="pt-16 px-10 pb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                   <div>
                      <h2 className="text-2xl font-black text-slate-900">{profile?.firstName} {profile?.lastName}</h2>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                         <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-slate-200">
                            Verified Doctor
                         </span>
                         <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ml-2">
                            <Stethoscope className="w-3 h-3" /> {profile?.specialization}
                         </span>
                      </div>
                   </div>
                   <button 
                     onClick={() => setIsEditing(!isEditing)}
                     className="px-6 py-2.5 border border-slate-900 rounded-xl text-[12px] font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                   >
                      {isEditing ? 'Discard Changes' : 'Edit Profile'}
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                   <ProfileField label="Professional Email" value={profile?.email} icon={<Mail className="w-4 h-4" />} isEditing={false} />
                   <ProfileField label="License Number" value={profile?.licenseNo} icon={<Shield className="w-4 h-4" />} isEditing={isEditing} />
                   <ProfileField label="Phone Number" value={profile?.phoneNumber} icon={<Phone className="w-4 h-4" />} isEditing={isEditing} />
                   <ProfileField label="Specialization" value={profile?.specialization} icon={<Stethoscope className="w-4 h-4" />} isEditing={isEditing} />
                </div>

                {isEditing && (
                   <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
                      <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-[13px] shadow-sm hover:bg-black transition-all flex items-center gap-2">
                         <Save className="w-4 h-4" /> Save Professional Info
                      </button>
                   </div>
                )}
             </div>
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-10">
             <div className="mb-10">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                   <Lock className="w-5 h-5 text-slate-400" /> Security Framework
                </h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <SecurityCard title="Update Password" desc="Change your portal access key" />
                <SecurityCard title="Two-Factor Auth" desc="Enable biometric verification" />
             </div>
             
             <div className="border-t border-slate-100 pt-10">
                <ActiveSessions />
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 mb-6 tracking-[0.2em] uppercase">Account Overview</h3>
              <div className="space-y-5">
                 <StatItem label="Active Records" value="156" />
                 <StatItem label="Prescriptions" value="482" />
                 <StatItem label="Years in System" value="2.4" />
              </div>
           </div>

           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
              <Activity className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="font-black text-lg mb-2 relative z-10">Compliance</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed relative z-10">Your digital medical signature is legally valid. All actions are logged for audit compliance.</p>
           </div>

           <button 
             onClick={handleLogout}
             className="w-full bg-white border border-red-100 text-red-600 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm"
           >
              <LogOut className="w-4 h-4 inline mr-2" /> Terminate Session
           </button>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, icon, isEditing }: { label: string, value: string, icon: React.ReactNode, isEditing: boolean }) {
   return (
      <div className="space-y-1.5">
         <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
         {isEditing ? (
            <input className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-slate-900 font-bold text-slate-800 bg-slate-50 transition-all" defaultValue={value} />
         ) : (
            <div className="flex items-center gap-3 p-3.5 bg-slate-50/50 rounded-xl border border-slate-100 group hover:border-slate-200 transition-all">
               <span className="text-slate-400 group-hover:text-slate-900 transition-colors">{icon}</span>
               <span className="text-[13px] font-bold text-slate-700">{value}</span>
            </div>
         )}
      </div>
   );
}

function SecurityCard({ title, desc }: { title: string, desc: string }) {
   return (
      <button className="text-left p-5 border border-slate-100 rounded-2xl hover:border-slate-900 hover:bg-white transition-all group shadow-sm bg-slate-50/30">
         <h4 className="font-black text-slate-800 text-xs uppercase tracking-wide group-hover:text-slate-900">{title}</h4>
         <p className="text-[11px] font-bold text-slate-400 mt-1">{desc}</p>
      </button>
   );
}

function StatItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex items-center justify-between">
         <span className="text-[12px] font-bold text-slate-500">{label}</span>
         <span className="text-xs font-black text-slate-900 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">{value}</span>
      </div>
   );
}
