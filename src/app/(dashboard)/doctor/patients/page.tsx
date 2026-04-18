"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Search, Filter, Mail, Phone, MoreHorizontal, User as UserIcon, Activity, FileText, ChevronRight } from 'lucide-react';
import { adminService } from '../../../../services/admin.service';

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getAllUsers({ role: 'patient', search: searchTerm });
      setPatients(response.data?.users || response.data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPatients();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-200 bg-white shrink-0">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary-600" /> Patient Directory
               </h2>
               <p className="text-slate-500 font-medium text-sm mt-1">Access medical history and records for all registered patients.</p>
            </div>
         </div>
      </div>

      <div className="px-6 py-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="relative flex-1 max-w-md">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
                placeholder="Search patient by name or ID..." 
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-primary-500 transition-all bg-slate-50/50" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter className="w-3.5 h-3.5" /> Filter Results
             </button>
          </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
         {isLoading ? (
            <div className="p-10 text-center text-slate-400 font-bold italic">Querying patient databases...</div>
         ) : patients.length === 0 ? (
            <div className="p-20 text-center bg-white rounded-[2rem] border border-slate-200 border-dashed max-w-2xl mx-auto mt-10">
               <h3 className="text-lg font-black text-slate-800 mb-2">No Patients Found</h3>
               <p className="text-slate-500 text-sm font-medium">The search query did not yield any results in the patient directory.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {patients.map((patient: any) => (
                  <PatientCard key={patient._id} patient={patient} />
               ))}
            </div>
         )}
      </div>
    </div>
  );
}

function PatientCard({ patient }: { patient: any }) {
   return (
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all group overflow-hidden relative">
         <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-slate-400 hover:text-slate-900"><MoreHorizontal className="w-5 h-5"/></button>
         </div>
         
         <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center font-black text-primary-600 text-xl overflow-hidden shrink-0">
               {patient.firstName?.[0] || 'P'}
            </div>
            <div className="min-w-0 flex-1">
               <h4 className="text-[16px] font-black text-slate-900 truncate tracking-tight">{patient.firstName} {patient.lastName}</h4>
               <div className="flex items-center gap-2 mt-0.5">
                  <div className="bg-slate-100 text-slate-500 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                     ID: {patient._id?.substring(patient._id.length - 8).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">• ACTIVE</span>
               </div>
            </div>
         </div>

         <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
               <Mail className="w-4 h-4 text-slate-400" /> {patient.email}
            </div>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
               <Activity className="w-4 h-4 text-slate-400" /> <span className="text-[10px] break-all">ID: {patient._id}</span>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-2 mt-auto">
            <Link 
               href={`/doctor/records?patientId=${patient._id}`}
               className="flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-xl text-[11px] font-black hover:bg-black transition-colors"
            >
               <FileText className="w-3.5 h-3.5" /> Case History
            </Link>
            <Link 
               href={`/doctor/records?patientId=${patient._id}&type=vitals`}
               className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-2.5 rounded-xl text-[11px] font-black hover:bg-slate-200 transition-colors"
            >
               <Activity className="w-3.5 h-3.5" /> Vital Logs
            </Link>
         </div>
      </div>
   );
}
