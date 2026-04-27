"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Pill, Search, X, RefreshCw } from 'lucide-react';
import { medicalService } from '../../../../services/medical.service';

interface Prescription {
  _id: string; createdAt: string; status: string;
  medications?: { name: string; dosage: string; frequency: string; duration: string }[];
  doctorId?: { firstName: string; lastName: string };
  notes?: string;
}

const StatusBadge = ({ status }: { status: string }) => {
  const cls = status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100';
  return <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${cls}`}>{status ?? 'active'}</span>;
};

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Prescription | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await medicalService.getPrescriptions({ limit: 100 });
      const d = res?.data;
      const arr = Array.isArray(d?.prescriptions) ? d.prescriptions : Array.isArray(d) ? d : [];
      setPrescriptions(arr);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = prescriptions.filter(p => {
    const q = search.toLowerCase();
    const meds = p.medications?.map(m => m.name).join(' ') ?? '';
    return !q || `${p.doctorId?.firstName} ${p.doctorId?.lastName} ${meds}`.toLowerCase().includes(q);
  });

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">My Prescriptions</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Prescribed medications history</p>
        </div>
        <button onClick={fetchData} className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group">
          <RefreshCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-all duration-500" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-px bg-slate-100 border-b border-slate-100 shrink-0">
        <div className="bg-white px-6 py-4"><p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total</p><p className="text-2xl font-black text-slate-900 mt-0.5">{prescriptions.length}</p></div>
        <div className="bg-white px-6 py-4"><p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Active</p><p className="text-2xl font-black text-slate-900 mt-0.5">{prescriptions.filter(p => (p.status ?? 'active') === 'active').length}</p></div>
      </div>

      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-6">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input type="text" placeholder="Search medications or doctor..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all placeholder:text-slate-300" />
          </div>

          {isLoading ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="animate-pulse bg-white rounded-[2rem] border border-slate-100 h-28" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center"><Pill className="w-10 h-10 text-slate-200 mx-auto mb-3" /><p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No prescriptions found</p></div>
          ) : (
            <div className="space-y-4">
              {filtered.map(presc => (
                <div key={presc._id} onClick={() => setSelected(presc)}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 hover:border-slate-900 hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-black text-slate-900">Prescribed by Dr. {presc.doctorId?.firstName ?? '—'} {presc.doctorId?.lastName ?? ''}</p>
                      <p className="text-[11px] font-bold text-slate-400 mt-0.5">{new Date(presc.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <StatusBadge status={presc.status ?? 'active'} />
                  </div>
                  {presc.medications && presc.medications.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {presc.medications.map((med, i) => (
                        <span key={i} className="text-[10px] font-black uppercase tracking-wide bg-slate-100 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-100">
                          {med.name} · {med.dosage}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-slate-900 text-white px-8 py-8 shrink-0">
              <button onClick={() => setSelected(null)} className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><X className="w-4 h-4" /></button>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Prescription</p>
              <h2 className="text-lg font-black">Dr. {selected.doctorId?.firstName ?? '—'} {selected.doctorId?.lastName ?? ''}</h2>
              <p className="text-slate-400 text-xs font-bold mt-1">{new Date(selected.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              <div className="mt-4"><StatusBadge status={selected.status ?? 'active'} /></div>
            </div>
            <div className="p-8 overflow-auto flex-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4">Medications</p>
              {selected.medications && selected.medications.length > 0 ? (
                <div className="space-y-3">
                  {selected.medications.map((med, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="font-black text-slate-900 text-sm">{med.name}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-[11px] font-bold text-slate-500">
                        <span>Dosage: {med.dosage}</span>
                        <span>Frequency: {med.frequency}</span>
                        {med.duration && <span>Duration: {med.duration}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm font-bold text-slate-400">No medication details available</p>}
              {selected.notes && (
                <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Clinical Notes</p>
                  <p className="text-sm font-bold text-slate-700">{selected.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
