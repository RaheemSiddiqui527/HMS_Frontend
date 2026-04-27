"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Calendar, Clock, Search, X, Stethoscope, RefreshCw, Filter } from 'lucide-react';
import { appointmentService } from '../../../../services/appointment.service';

const STATUS_CLASSES: Record<string, string> = {
  pending:   'bg-amber-50  text-amber-700  border-amber-100',
  scheduled: 'bg-sky-50    text-sky-700    border-sky-100',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  cancelled: 'bg-red-50    text-red-600    border-red-100',
};
const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${STATUS_CLASSES[status] ?? 'bg-slate-50 text-slate-500 border-slate-100'}`}>{status}</span>
);

interface Appointment {
  _id: string; date: string; timeSlot: string; status: string; reason: string;
  doctorId?: { firstName: string; lastName: string; specialization: string };
}

export default function PatientAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState<Appointment | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await appointmentService.getAppointments();
      const d = res?.data;
      const arr = Array.isArray(d?.appointments) ? d.appointments : Array.isArray(d) ? d : [];
      setAppointments(arr);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCancel = async (id: string) => {
    if (!confirm('Cancel this appointment?')) return;
    await appointmentService.updateStatus(id, 'cancelled');
    fetchData();
  };

  const filtered = appointments.filter(a => {
    const matchS = filterStatus === 'all' || a.status === filterStatus;
    const q = search.toLowerCase();
    return matchS && (!q || `${a.doctorId?.firstName} ${a.doctorId?.lastName} ${a.doctorId?.specialization}`.toLowerCase().includes(q));
  });

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">My Appointments</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">All your clinical visits</p>
        </div>
        <button onClick={fetchData} className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group">
          <RefreshCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-all duration-500" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 border-b border-slate-100 shrink-0">
        {[
          { label: 'Total', value: appointments.length },
          { label: 'Upcoming', value: appointments.filter(a => a.status === 'scheduled' || a.status === 'pending').length },
          { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length },
          { label: 'Cancelled', value: appointments.filter(a => a.status === 'cancelled').length },
        ].map(s => (
          <div key={s.label} className="bg-white px-6 py-4">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type="text" placeholder="Search by doctor name..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all placeholder:text-slate-300" />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              {['all','pending','scheduled','completed','cancelled'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${filterStatus === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-400'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="animate-pulse bg-white rounded-[2rem] border border-slate-100 h-24" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No appointments found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(appt => (
                <div key={appt._id} onClick={() => setSelected(appt)}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-sm px-6 py-5 flex items-center gap-5 hover:border-slate-900 hover:shadow-md transition-all group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                    <Stethoscope className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-slate-900">Dr. {appt.doctorId?.firstName ?? '—'} {appt.doctorId?.lastName ?? ''}</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">{appt.doctorId?.specialization ?? '—'}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold text-slate-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(appt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {appt.timeSlot ?? '—'}</span>
                    </div>
                  </div>
                  <StatusBadge status={appt.status} />
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
          <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-slate-900 text-white px-8 py-8">
              <button onClick={() => setSelected(null)} className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><X className="w-4 h-4" /></button>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Appointment</p>
              <h2 className="text-xl font-black">Dr. {selected.doctorId?.firstName ?? '—'} {selected.doctorId?.lastName ?? ''}</h2>
              <p className="text-slate-400 text-sm font-bold mt-1">{selected.doctorId?.specialization ?? '—'}</p>
              <div className="mt-4"><StatusBadge status={selected.status} /></div>
            </div>
            <div className="p-8 space-y-5">
              {[
                { icon: <Calendar className="w-4 h-4" />, label: 'Date', value: new Date(selected.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) },
                { icon: <Clock className="w-4 h-4" />, label: 'Time', value: selected.timeSlot ?? '—' },
                { icon: <Stethoscope className="w-4 h-4" />, label: 'Reason', value: selected.reason ?? '—' },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">{row.icon}</div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{row.label}</p>
                    <p className="text-sm font-bold text-slate-900">{row.value}</p>
                  </div>
                </div>
              ))}
              {(selected.status === 'scheduled' || selected.status === 'pending') && (
                <button onClick={() => { handleCancel(selected._id); setSelected(null); }}
                  className="w-full py-3 rounded-2xl border border-red-100 text-red-600 font-black text-[12px] uppercase tracking-widest hover:bg-red-50 transition-all mt-4">
                  Cancel Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
