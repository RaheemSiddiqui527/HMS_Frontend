"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Users, Search, Mail, Phone, Eye, X, RefreshCw, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { adminService } from '../../../../services/admin.service';
import { toast } from 'react-hot-toast';

interface Patient {
  _id: string; firstName: string; lastName: string;
  email: string; phoneNumber?: string; gender?: string; dateOfBirth?: string;
}

export default function StaffPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Patient | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, pages: 1, total: 0, limit: 12 });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminService.getAllUsers({ 
         role: 'patient', 
         search,
         page,
         limit: 12 
      });
      setPatients(res.data?.users || []);
      setPagination(res.data?.pagination || { currentPage: 1, pages: 1, total: 0, limit: 12 });
    } catch (e) { 
       console.error(e);
       toast.error("Failed to load patient records");
    } finally { 
       setIsLoading(false); 
    }
  }, [page, search]);

  useEffect(() => { 
     const timer = setTimeout(() => fetchData(), 400);
     return () => clearTimeout(timer);
  }, [fetchData]);

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">Patient Directory</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Registered patients in the system</p>
        </div>
        <button onClick={() => { setPage(1); fetchData(); }} className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group">
          <RefreshCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-all duration-500" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-px bg-slate-100 border-b border-slate-100 shrink-0">
        <div className="bg-white px-6 py-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Patients</p>
          <p className="text-2xl font-black text-slate-900 mt-0.5">{pagination.total}</p>
        </div>
        <div className="bg-white px-6 py-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Current View</p>
          <p className="text-2xl font-black text-slate-900 mt-0.5">{patients.length}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-6">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
               type="text" 
               placeholder="Search by name or email..." 
               value={search} 
               onChange={e => { setSearch(e.target.value); setPage(1); }}
               className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all placeholder:text-slate-300 shadow-sm" 
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-[2rem] border border-slate-100 p-6 h-36" />
               ))}
            </div>
          ) : patients.length === 0 ? (
            <div className="py-20 text-center">
              <Users className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No patients found</p>
            </div>
          ) : (
            <>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patients.map(p => (
                  <div key={p._id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 hover:border-slate-900 hover:shadow-md transition-all group cursor-pointer" onClick={() => setSelected(p)}>
                     <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 font-black text-slate-500 text-lg flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-all">
                        {p.firstName?.[0]}{p.lastName?.[0]}
                        </div>
                        <div className="min-w-0">
                        <p className="font-black text-slate-900 truncate">{p.firstName} {p.lastName}</p>
                        {p.gender && <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{p.gender}</p>}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                        <Mail className="w-3 h-3 text-slate-300 shrink-0" />
                        <span className="truncate">{p.email}</span>
                        </div>
                        {p.phoneNumber && (
                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                           <Phone className="w-3 h-3 text-slate-300 shrink-0" />
                           <span>{p.phoneNumber}</span>
                        </div>
                        )}
                     </div>
                  </div>
                  ))}
               </div>

               {/* Pagination Controls */}
               {pagination.pages > 1 && (
                  <div className="flex items-center justify-between bg-white px-8 py-5 rounded-[2rem] border border-slate-100 mt-8 mb-10 shadow-sm">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Page {pagination.currentPage} of {pagination.pages}
                     </div>
                     <div className="flex items-center gap-2">
                        <button 
                           disabled={page === 1}
                           onClick={() => setPage(p => Math.max(1, p - 1))}
                           className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all border border-slate-100"
                        >
                           <ChevronLeft className="w-4 h-4" /> Previous
                        </button>
                        <button 
                           disabled={page >= pagination.pages}
                           onClick={() => setPage(p => p + 1)}
                           className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black disabled:opacity-30 transition-all shadow-lg shadow-slate-200"
                        >
                           Next <ChevronRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               )}
            </>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white px-8 py-8">
              <button onClick={() => setSelected(null)} className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><X className="w-4 h-4" /></button>
              <div className="w-16 h-16 rounded-2xl bg-white/10 font-black text-2xl flex items-center justify-center mb-4">{selected.firstName?.[0]}{selected.lastName?.[0]}</div>
              <h2 className="text-xl font-black">{selected.firstName} {selected.lastName}</h2>
              {selected.gender && <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">{selected.gender}</p>}
            </div>
            <div className="p-8 space-y-5">
              {[
                { icon: <Mail className="w-4 h-4" />, label: 'Email', value: selected.email },
                { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: selected.phoneNumber ?? '—' },
                { icon: <Calendar className="w-4 h-4" />, label: 'Date of Birth', value: selected.dateOfBirth ? new Date(selected.dateOfBirth).toLocaleDateString('en-GB') : '—' },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">{row.icon}</div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{row.label}</p>
                    <p className="text-sm font-bold text-slate-900">{row.value}</p>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => {
                  window.location.href = '/staff/appointments?openBooking=true&patientId=' + selected._id;
                }}
                className="w-full bg-[#185d51] hover:bg-[#124a40] text-white font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 mt-4"
              >
                <Calendar className="w-4 h-4" /> Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
