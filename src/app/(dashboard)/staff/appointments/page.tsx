"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, Clock, Search, Eye, X, Stethoscope, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import { appointmentService } from '../../../../services/appointment.service';

const STATUS_CLASSES: Record<string, string> = {
  pending:   'bg-amber-50  text-amber-700  border-amber-100',
  scheduled: 'bg-sky-50    text-sky-700    border-sky-100',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  cancelled: 'bg-red-50    text-red-600    border-red-100',
};

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${STATUS_CLASSES[status] ?? 'bg-slate-50 text-slate-500 border-slate-100'}`}>
    {status}
  </span>
);

interface Appointment {
  _id: string; date: string; timeSlot: string; status: string; reason: string;
  patientId?: { firstName: string; lastName: string; email: string };
  doctorId?: { firstName: string; lastName: string; specialization: string };
}

export default function StaffAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState<Appointment | null>(null);

  const toArray = (v: any): any[] => Array.isArray(v) ? v : [];

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await appointmentService.getAppointments({ limit: 200 });
      const d = res?.data;
      setAppointments(toArray(d?.appointments ?? d));
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filtered = appointments.filter(a => {
    const matchS = filterStatus === 'all' || a.status === filterStatus;
    const q = search.toLowerCase();
    return matchS && (!q || `${a.patientId?.firstName} ${a.patientId?.lastName} ${a.doctorId?.firstName} ${a.doctorId?.lastName}`.toLowerCase().includes(q));
  });

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 flex items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">Appointments Registry</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Full hospital appointment log</p>
        </div>
        <button onClick={fetchData} className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group">
          <RefreshCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-all duration-500" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 border-b border-slate-100 shrink-0">
        {[
          { label: 'Total', value: appointments.length },
          { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length },
          { label: 'Scheduled', value: appointments.filter(a => a.status === 'scheduled').length },
          { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length },
        ].map(s => (
          <div key={s.label} className="bg-white px-6 py-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type="text" placeholder="Search patient or doctor..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all placeholder:text-slate-300" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              {['all','pending','scheduled','completed','cancelled'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${filterStatus === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-400'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-50">
                    {['Patient', 'Doctor', 'Date & Time', 'Status', ''].map(h => (
                      <th key={h} className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        {[...Array(5)].map((_, j) => (
                          <td key={j} className="px-6 py-4"><div className="h-3 bg-slate-100 rounded w-4/5" /></td>
                        ))}
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={5} className="py-20 text-center text-[10px] font-black uppercase tracking-widest text-slate-300">No records found</td></tr>
                  ) : filtered.map(appt => (
                    <tr key={appt._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 font-black text-slate-500 text-sm flex items-center justify-center shrink-0">{appt.patientId?.firstName?.[0] ?? '?'}</div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{appt.patientId?.firstName ?? '—'} {appt.patientId?.lastName ?? ''}</p>
                            <p className="text-[10px] font-bold text-slate-400">{appt.patientId?.email ?? ''}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-700">Dr. {appt.doctorId?.firstName ?? '—'} {appt.doctorId?.lastName ?? ''}</p>
                        <p className="text-[10px] font-bold text-slate-400">{appt.doctorId?.specialization ?? '—'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-700">{new Date(appt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                        <p className="text-[10px] font-bold text-slate-400">{appt.timeSlot ?? '—'}</p>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={appt.status} /></td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setSelected(appt)} className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900">
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!isLoading && (
              <div className="px-6 py-4 border-t border-slate-50">
                <p className="text-[10px] font-bold text-slate-400">Showing {filtered.length} of {appointments.length} records</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-slate-900 text-white px-8 py-8">
              <button onClick={() => setSelected(null)} className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><X className="w-4 h-4" /></button>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Appointment Detail</p>
              <h2 className="text-xl font-black">{selected.patientId?.firstName ?? '—'} {selected.patientId?.lastName ?? ''}</h2>
              <StatusBadge status={selected.status} />
            </div>
            <div className="p-8 space-y-5">
              {[
                { icon: <Stethoscope className="w-4 h-4" />, label: 'Doctor', value: `Dr. ${selected.doctorId?.firstName ?? '—'} ${selected.doctorId?.lastName ?? ''}` },
                { icon: <Calendar className="w-4 h-4" />, label: 'Date', value: new Date(selected.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) },
                { icon: <Clock className="w-4 h-4" />, label: 'Time', value: selected.timeSlot ?? '—' },
                { icon: <AlertCircle className="w-4 h-4" />, label: 'Reason', value: selected.reason ?? '—' },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">{row.icon}</div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{row.label}</p>
                    <p className="text-sm font-bold text-slate-900">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
