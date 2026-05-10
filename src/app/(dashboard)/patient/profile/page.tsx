"use client";
import React, { useState, useEffect } from 'react';
import { User, Shield, Lock, LogOut, Mail, Phone, Camera, Save, Activity, Heart, Ruler, Scale, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { toast } from 'react-hot-toast';
import ActiveSessions from '../../../../components/ActiveSessions';

export default function PatientProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const data = await authService.getProfile();
      setProfile(data.data);
      setFormData(data.data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load profile details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await authService.updateProfile(formData);
      toast.success("Profile updated successfully");
      fetchProfile();
    } catch (e) {
      console.error(e);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    router.push('/login');
  };

  if (isLoading) return (
    <div className="h-full flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
         <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
         <p className="text-slate-400 font-bold text-sm">Synchronizing Health Data...</p>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-50/50 p-6 overflow-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Health Profile</h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Manage your clinical records & identity</p>
        </div>
        <button 
          onClick={handleUpdate}
          disabled={isSaving}
          className="bg-primary-700 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-800 transition-all flex items-center gap-2 shadow-lg shadow-primary-900/10 active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full pb-20">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Identity Section */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-10">
             <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                <User className="w-6 h-6 text-primary-600" /> Identity Information
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="First Name" value={formData.firstName} onChange={(v) => setFormData({...formData, firstName: v})} />
                <InputGroup label="Last Name" value={formData.lastName} onChange={(v) => setFormData({...formData, lastName: v})} />
                <InputGroup label="Email Address" value={formData.email} disabled />
                <InputGroup label="Phone Number" value={formData.phoneNumber} onChange={(v) => setFormData({...formData, phoneNumber: v})} />
                <InputGroup label="Date of Birth" value={formData.dateOfBirth?.split('T')[0]} type="date" onChange={(v) => setFormData({...formData, dateOfBirth: v})} />
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                   <select 
                     value={formData.gender} 
                     onChange={(e) => setFormData({...formData, gender: e.target.value})}
                     className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-primary-600 transition-all"
                   >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                   </select>
                </div>
             </div>
          </div>

          {/* Clinical Vitals Section */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-10">
             <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                <Activity className="w-6 h-6 text-emerald-600" /> Medical Vitals
             </h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                      <Heart className="w-3 h-3" /> Blood Type
                   </label>
                   <input 
                     value={formData.bloodType || ''} 
                     onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                     className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 text-center outline-none focus:border-primary-600"
                     placeholder="e.g. O+"
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                      <Scale className="w-3 h-3" /> Weight (kg)
                   </label>
                   <input 
                     type="number"
                     value={formData.weight || ''} 
                     onChange={(e) => setFormData({...formData, weight: e.target.value})}
                     className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 text-center outline-none focus:border-primary-600"
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                      <Ruler className="w-3 h-3" /> Height (cm)
                   </label>
                   <input 
                     type="number"
                     value={formData.height || ''} 
                     onChange={(e) => setFormData({...formData, height: e.target.value})}
                     className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 text-center outline-none focus:border-primary-600"
                   />
                </div>
             </div>
          </div>

          {/* Clinical History Section */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-10">
             <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-600" /> Health History
             </h3>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Known Allergies</label>
                   <textarea 
                     value={formData.allergies?.join(', ') || ''} 
                     onChange={(e) => setFormData({...formData, allergies: e.target.value.split(',').map((s:string) => s.trim())})}
                     placeholder="Penicillin, Pollen, etc. (Comma separated)"
                     rows={3}
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium text-slate-700 outline-none focus:border-primary-600 resize-none"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Medical History</label>
                   <textarea 
                     value={formData.medicalHistory?.join(', ') || ''} 
                     onChange={(e) => setFormData({...formData, medicalHistory: e.target.value.split(',').map((s:string) => s.trim())})}
                     placeholder="Diabetes, Hypertension, etc. (Comma separated)"
                     rows={3}
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium text-slate-700 outline-none focus:border-primary-600 resize-none"
                   />
                </div>
             </div>
          </div>

          {/* Security & Sessions */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10">
             <h3 className="text-lg font-black text-slate-900 mb-10 flex items-center gap-3">
                <Lock className="w-6 h-6 text-slate-400" /> Account Security
             </h3>
             <div className="border-t border-slate-100 pt-10">
                <ActiveSessions />
             </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-sm">
              <Shield className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="font-black text-xl mb-4 relative z-10 italic">SDI Privacy Guard</h3>
              <p className="text-slate-400 text-sm font-bold leading-relaxed relative z-10">Your health data is protected under strict HIPAA guidelines. Only authorized clinical staff can access your medical history.</p>
           </div>

           <button 
             onClick={handleLogout}
             className="w-full bg-white border border-red-100 text-red-600 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all shadow-sm flex items-center justify-center gap-2"
           >
              <LogOut className="w-4 h-4" /> Secure Termination
           </button>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, value, type = "text", disabled = false, onChange }: any) {
  return (
    <div className="space-y-1.5">
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
       <input 
         type={type}
         value={value || ''} 
         disabled={disabled}
         onChange={(e) => onChange && onChange(e.target.value)}
         className={`w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold outline-none transition-all ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'text-slate-700 focus:border-primary-600 focus:bg-white'
         }`}
       />
    </div>
  );
}
