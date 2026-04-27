"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { FileText, TrendingUp, Calendar, Users, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { appointmentService } from '../../../../services/appointment.service';

export default function StaffReportsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await appointmentService.getAppointments({ limit: 500 });
      const d = res?.data;
      const arr = Array.isArray(d?.appointments) ? d.appointments : Array.isArray(d) ? d : [];
      setAppointments(arr);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const total = appointments.length;
  const completed = appointments.filter(a => a.status === 'completed').length;
  const cancelled = appointments.filter(a => a.status === 'cancelled').length;
  const pending = appointments.filter(a => a.status === 'pending').length;
  const scheduled = appointments.filter(a => a.status === 'scheduled').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const cancellationRate = total > 0 ? Math.round((cancelled / total) * 100) : 0;

  // Doctor distribution
  const doctorMap = new Map<string, { name: string; count: number }>();
  appointments.forEach(a => {
    if (a.doctorId) {
      const name = `Dr. ${a.doctorId.firstName ?? ''} ${a.doctorId.lastName ?? ''}`.trim();
      const entry = doctorMap.get(a.doctorId._id ?? name) ?? { name, count: 0 };
      entry.count++;
      doctorMap.set(a.doctorId._id ?? name, entry);
    }
  });
  const topDoctors = Array.from(doctorMap.values()).sort((a, b) => b.count - a.count).slice(0, 5);
  const maxCount = topDoctors[0]?.count || 1;

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">System Reports</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Operational analytics overview</p>
        </div>
        <button onClick={fetchData} className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group">
          <RefreshCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-all duration-500" />
        </button>
      </div>

      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* KPI Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Total', value: total, icon: <FileText className="w-4 h-4" /> },
              { label: 'Pending', value: pending, icon: <Calendar className="w-4 h-4" /> },
              { label: 'Scheduled', value: scheduled, icon: <Users className="w-4 h-4" /> },
              { label: 'Completed', value: completed, icon: <CheckCircle2 className="w-4 h-4" /> },
              { label: 'Cancelled', value: cancelled, icon: <XCircle className="w-4 h-4" /> },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">{s.icon}</div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{isLoading ? '—' : s.value}</p>
              </div>
            ))}
          </div>

          {/* Rate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <h2 className="font-black text-slate-900">Completion Rate</h2>
              </div>
              <div className="text-5xl font-black text-slate-900 mb-3">{completionRate}<span className="text-2xl text-slate-400">%</span></div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${completionRate}%` }} />
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-2">{completed} of {total} appointments completed</p>
            </div>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-5 h-5 text-red-400" />
                <h2 className="font-black text-slate-900">Cancellation Rate</h2>
              </div>
              <div className="text-5xl font-black text-slate-900 mb-3">{cancellationRate}<span className="text-2xl text-slate-400">%</span></div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 rounded-full transition-all duration-1000" style={{ width: `${cancellationRate}%` }} />
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-2">{cancelled} of {total} appointments cancelled</p>
            </div>
          </div>

          {/* Top Doctors */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
            <h2 className="font-black text-slate-900 mb-6 flex items-center gap-3"><Users className="w-5 h-5 text-slate-400" /> Doctor Appointment Distribution</h2>
            {isLoading ? (
              <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="animate-pulse h-8 bg-slate-100 rounded-2xl" />)}</div>
            ) : topDoctors.length === 0 ? (
              <p className="text-sm font-bold text-slate-400 text-center py-8">No data available</p>
            ) : (
              <div className="space-y-5">
                {topDoctors.map(doc => (
                  <div key={doc.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-slate-700">{doc.name}</span>
                      <span className="text-sm font-black text-slate-900">{doc.count}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-900 rounded-full transition-all duration-700" style={{ width: `${(doc.count / maxCount) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
