"use client";
import React, { useState, useEffect } from 'react';
import { User, Activity, Heart, Ruler, Scale, AlertCircle, Save, ChevronLeft, Phone, Mail, Calendar, FileText, ClipboardList, Shield } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { adminService } from '../../../../../services/admin.service';
import { toast } from 'react-hot-toast';

export default function DoctorPatientDetailPage() {
  const { id } = useParams();
  const [patient, setPatient] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getUserById(id as string);
      setPatient(response.data);
      setFormData(response.data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load patient records");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await adminService.updateUser(id as string, formData);
      toast.success("Clinical records updated successfully");
      fetchPatient();
    } catch (e: any) {
      console.error(e);
      toast.error(e.message || "Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return (
    <div className="h-full flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
         <div className="w-10 h-10 border-4 border-slate-100 border-t-primary-600 rounded-full animate-spin"></div>
         <p className="text-slate-400 font-bold text-sm">Accessing Clinical Registry...</p>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-hidden">
      {/* Header Area */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between shrink-0">
         <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()}
              className="p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-400"
            >
               <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
               <h1 className="text-xl font-black text-slate-900 leading-none">Clinical Case File</h1>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1.5">Patient ID: {patient?._id}</p>
            </div>
         </div>
         <button 
           onClick={handleUpdate}
           disabled={isSaving}
           className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-xl shadow-slate-200 disabled:opacity-50"
         >
           {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Save className="w-4 h-4" />}
           Save Clinical Updates
         </button>
      </div>

      <div className="flex-1 overflow-auto p-8 bg-slate-50/30">
         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Summary */}
            <div className="space-y-6">
               <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-primary-600"></div>
                  <div className="w-24 h-24 rounded-3xl bg-slate-50 border border-slate-100 mx-auto mb-6 flex items-center justify-center text-3xl font-black text-slate-300">
                     {patient?.firstName?.[0]}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">{patient?.firstName} {patient?.lastName}</h2>
                  <div className="flex items-center justify-center gap-2 mb-6">
                     <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widest">Active File</span>
                  </div>
                  
                  <div className="space-y-3 text-left border-t border-slate-50 pt-6">
                     <DetailRow icon={<Mail className="w-3.5 h-3.5"/>} label="Email" value={patient?.email} />
                     <DetailRow icon={<Phone className="w-3.5 h-3.5"/>} label="Phone" value={patient?.phoneNumber || 'Not provided'} />
                     <DetailRow icon={<Calendar className="w-3.5 h-3.5"/>} label="DOB" value={patient?.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'Not provided'} />
                  </div>
               </div>

               <div className="bg-blue-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                  <ClipboardList className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                  <h3 className="font-black text-lg mb-2 relative z-10 italic">Quick Vitals</h3>
                  <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
                     <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                        <div className="text-[9px] font-black uppercase text-blue-300 mb-1">Blood</div>
                        <div className="text-lg font-black">{patient?.bloodType || '--'}</div>
                     </div>
                     <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                        <div className="text-[9px] font-black uppercase text-blue-300 mb-1">BMI</div>
                        <div className="text-lg font-black">{patient?.weight ? Math.round(patient.weight / ((patient.height/100)**2)) : '--'}</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column: Edit Forms */}
            <div className="lg:col-span-2 space-y-8 pb-20">
               {/* Clinical Data Section */}
               <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-10">
                  <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                     <Activity className="w-6 h-6 text-primary-600" /> Patient Vitals & Clinical Data
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Blood Type</label>
                        <select 
                           value={formData.bloodType || ''} 
                           onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                           className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700"
                        >
                           <option value="">Select</option>
                           {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                        <input 
                           type="number"
                           value={formData.weight || ''} 
                           onChange={(e) => setFormData({...formData, weight: e.target.value})}
                           className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-primary-600 transition-all"
                        />
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Height (cm)</label>
                        <input 
                           type="number"
                           value={formData.height || ''} 
                           onChange={(e) => setFormData({...formData, height: e.target.value})}
                           className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-primary-600 transition-all"
                        />
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <AlertCircle className="w-4 h-4 text-red-500" /> Clinical Allergies
                        </label>
                        <textarea 
                           value={formData.allergies?.join(', ') || ''} 
                           onChange={(e) => setFormData({...formData, allergies: e.target.value.split(',').map((s:string) => s.trim())})}
                           placeholder="Enter known allergies, separated by commas..."
                           rows={3}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium text-slate-700 outline-none focus:border-primary-600 resize-none"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <FileText className="w-4 h-4 text-blue-500" /> Pre-existing Conditions / Medical History
                        </label>
                        <textarea 
                           value={formData.medicalHistory?.join(', ') || ''} 
                           onChange={(e) => setFormData({...formData, medicalHistory: e.target.value.split(',').map((s:string) => s.trim())})}
                           placeholder="Enter chronic conditions, past surgeries, etc..."
                           rows={4}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium text-slate-700 outline-none focus:border-primary-600 resize-none"
                        />
                     </div>

                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Medications</label>
                        <textarea 
                           value={formData.currentMedications?.join(', ') || ''} 
                           onChange={(e) => setFormData({...formData, currentMedications: e.target.value.split(',').map((s:string) => s.trim())})}
                           placeholder="Active medication list..."
                           rows={3}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium text-slate-700 outline-none focus:border-primary-600 resize-none"
                        />
                     </div>
                  </div>
               </div>

               <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-10 overflow-hidden relative">
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                        <Shield className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="font-extrabold text-slate-800 text-lg">Insurance & Compliance</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Billing and policy information</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <InputGroup label="Insurance Provider" value={formData.insuranceProvider} onChange={(v:string) => setFormData({...formData, insuranceProvider: v})} />
                     <InputGroup label="Policy Number" value={formData.insurancePolicyNumber} onChange={(v:string) => setFormData({...formData, insurancePolicyNumber: v})} />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: any) {
   return (
      <div className="flex items-center gap-3">
         <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
            {icon}
         </div>
         <div className="min-w-0">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{label}</div>
            <div className="text-[11px] font-bold text-slate-700 truncate">{value}</div>
         </div>
      </div>
   );
}

function InputGroup({ label, value, type = "text", onChange }: any) {
  return (
    <div className="space-y-1.5">
       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
       <input 
         type={type}
         value={value || ''} 
         onChange={(e) => onChange && onChange(e.target.value)}
         className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:border-primary-600 focus:bg-white transition-all"
       />
    </div>
  );
}
