"use client";
import React, { useState, useEffect } from 'react';
import { User, Shield, Stethoscope, Mail, Phone, Camera, Save, Lock, Activity, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
                specialization: 'Cardiology', // Placeholder for now
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (isLoading) return <div className="p-12 text-center font-bold text-slate-400">Verifying secure credentials...</div>;

  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-800">Professional Identity</h1>
        <p className="text-slate-500 font-medium text-sm mt-1">Manage your medical credentials and system preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="h-40 bg-primary-600 flex items-end px-10 pb-6 relative">
                <div className="absolute -bottom-14 left-10">
                   <div className="w-28 h-28 rounded-3xl bg-white border-4 border-white shadow-xl flex items-center justify-center overflow-hidden relative">
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                         <User className="w-14 h-14" />
                      </div>
                      <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                         <Camera className="w-6 h-6" />
                      </button>
                   </div>
                </div>
             </div>
             
             <div className="pt-20 px-10 pb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                   <div>
                      <h2 className="text-2xl font-black text-slate-900">{profile?.firstName} {profile?.lastName}</h2>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                         <span className="bg-primary-50 text-primary-700 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-primary-100/50">
                            Verified Practitioner
                         </span>
                         <span className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border border-slate-100 flex items-center gap-1.5">
                            <Stethoscope className="w-3 h-3" /> {profile?.specialization || 'General Practice'}
                         </span>
                      </div>
                   </div>
                   <button 
                     onClick={() => setIsEditing(!isEditing)}
                     className="px-6 py-2.5 border border-slate-200 rounded-2xl text-[13px] font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
                   >
                      {isEditing ? 'Cancel Session' : 'Update Credentials'}
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <ProfileField label="Professional Email" value={profile?.email} icon={<Mail className="w-4 h-4" />} isEditing={false} />
                   <ProfileField label="Official License No." value={profile?.licenseNo} icon={<Shield className="w-4 h-4" />} isEditing={isEditing} />
                   <ProfileField label="Registered Contact" value={profile?.phoneNumber} icon={<Phone className="w-4 h-4" />} isEditing={isEditing} />
                   <ProfileField label="Departmental Specialty" value={profile?.specialization} icon={<Stethoscope className="w-4 h-4" />} isEditing={isEditing} />
                </div>

                {isEditing && (
                   <div className="mt-12 flex justify-end">
                      <button className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-black text-[14px] shadow-xl flex items-center gap-2 hover:bg-black transition-all">
                         <Save className="w-4 h-4" /> Save Professional Updates
                      </button>
                   </div>
                )}
             </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
             <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                <Lock className="w-6 h-6 text-indigo-600" /> Security Framework
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SecurityCard title="Consultation Password" desc="Last updated 3 months ago" />
                <SecurityCard title="Clinical Biometrics" desc="Enabled for mobile access" />
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
              <Activity className="absolute -right-8 -bottom-8 w-32 h-32 text-white/5" />
              <h3 className="font-black text-xl mb-3 relative z-10">Data Integrity</h3>
              <p className="text-slate-400 text-[13px] font-medium mb-6 leading-relaxed relative z-10">Your digital medical signature is legally binding. All edits to medical records are cryptographically signed and logged.</p>
              <div className="space-y-3 relative z-10">
                 <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-bold text-slate-300">Secure Audit Trail Active</span>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <h3 className="text-xs font-black text-slate-400 mb-6 tracking-widest uppercase">System Stats</h3>
              <div className="space-y-6">
                 <StatItem label="Total Records Created" value="156" />
                 <StatItem label="Prescriptions Issued" value="482" />
                 <StatItem label="Account Seniority" value="2 Years" />
              </div>
           </div>

           <button 
             onClick={handleLogout}
             className="w-full bg-red-50 text-red-600 py-4 rounded-3xl font-black text-sm flex items-center justify-center gap-2 hover:bg-red-100 transition-all border border-red-100"
           >
              <LogOut className="w-4 h-4" /> Terminate Professional Session
           </button>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, icon, isEditing }: { label: string, value: string, icon: React.ReactNode, isEditing: boolean }) {
   return (
      <div className="space-y-2">
         <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">{label}</label>
         {isEditing ? (
            <input className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-primary-600 font-bold text-slate-800 bg-slate-50 transition-all shadow-inner" defaultValue={value} />
         ) : (
            <div className="flex items-center gap-3 p-3.5 bg-slate-50/50 rounded-2xl border border-slate-100 group hover:border-slate-200 transition-all">
               <span className="text-slate-400 group-hover:text-primary-600 transition-colors">{icon}</span>
               <span className="text-[14px] font-bold text-slate-700">{value}</span>
            </div>
         )}
      </div>
   );
}

function SecurityCard({ title, desc }: { title: string, desc: string }) {
   return (
      <button className="text-left p-5 border border-slate-100 rounded-2xl hover:border-primary-200 hover:bg-slate-50 transition-all group">
         <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-primary-700">{title}</h4>
         <p className="text-[11px] font-medium text-slate-400 mt-1">{desc}</p>
      </button>
   );
}

function StatItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="flex items-center justify-between">
         <span className="text-[13px] font-bold text-slate-500">{label}</span>
         <span className="text-sm font-black text-slate-900 bg-slate-50 px-3 py-1 rounded-lg">{value}</span>
      </div>
   );
}
