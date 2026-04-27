"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { FileText, Search, X, RefreshCw, Calendar, Stethoscope } from 'lucide-react';
import { medicalService } from '../../../../services/medical.service';

interface MedicalRecord {
  _id: string; createdAt: string; diagnosis?: string; notes?: string; type?: string;
  doctorId?: { firstName: string; lastName: string; specialization: string };
  vitals?: { bloodPressure?: string; heartRate?: string; temperature?: string; weight?: string };
}

export default function PatientRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MedicalRecord | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await medicalService.getMedicalRecords({ limit: 100 });
      const d = res?.data;
      const arr = Array.isArray(d?.records) ? d.records : Array.isArray(d) ? d : [];
      setRecords(arr);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = records.filter(r => {
    const q = search.toLowerCase();
    return !q || `${r.diagnosis} ${r.doctorId?.firstName} ${r.doctorId?.lastName} ${r.type}`.toLowerCase().includes(q);
  });

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">Medical Records</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Your complete health history</p>
        </div>
        <button onClick={fetchData} className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group">
          <RefreshCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-all duration-500" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-px bg-slate-100 border-b border-slate-100 shrink-0">
        <div className="bg-white px-6 py-4"><p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Total Records</p><p className="text-2xl font-black text-slate-900 mt-0.5">{records.length}</p></div>
        <div className="bg-white px-6 py-4"><p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Filtered</p><p className="text-2xl font-black text-slate-900 mt-0.5">{filtered.length}</p></div>
      </div>

      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-6">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
            <input type="text" placeholder="Search by diagnosis or doctor..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all placeholder:text-slate-300" />
          </div>

          {isLoading ? (
            <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="animate-pulse bg-white rounded-[2rem] border border-slate-100 h-24" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center"><FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" /><p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No records found</p></div>
          ) : (
            <div className="space-y-4">
              {filtered.map(rec => (
                <div key={rec._id} onClick={() => setSelected(rec)}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 hover:border-slate-900 hover:shadow-md transition-all group cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:border-slate-900 transition-all">
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900">{rec.diagnosis ?? 'General Record'}</p>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">Dr. {rec.doctorId?.firstName ?? '—'} · {rec.doctorId?.specialization ?? 'General'}</p>
                        <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" /> {new Date(rec.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    {rec.type && <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-100">{rec.type}</span>}
                  </div>
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
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Medical Record</p>
              <h2 className="text-xl font-black">{selected.diagnosis ?? 'General Record'}</h2>
              <p className="text-slate-400 text-xs font-bold mt-1">Dr. {selected.doctorId?.firstName ?? '—'} {selected.doctorId?.lastName ?? ''}</p>
            </div>
            <div className="p-8 overflow-auto flex-1 space-y-5">
              {[
                { label: 'Doctor', value: `Dr. ${selected.doctorId?.firstName ?? '—'} ${selected.doctorId?.lastName ?? ''}`, icon: <Stethoscope className="w-4 h-4" /> },
                { label: 'Date', value: new Date(selected.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }), icon: <Calendar className="w-4 h-4" /> },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">{row.icon}</div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{row.label}</p>
                    <p className="text-sm font-bold text-slate-900">{row.value}</p>
                  </div>
                </div>
              ))}
              {selected.vitals && (
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Vitals</p>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selected.vitals).filter(([,v]) => v).map(([k,v]) => (
                      <div key={k} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[9px] font-black uppercase text-slate-400">{k.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-sm font-black text-slate-900 mt-0.5">{v as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {selected.notes && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Clinical Notes</p>
                  <p className="text-sm font-bold text-slate-700 leading-relaxed">{selected.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
