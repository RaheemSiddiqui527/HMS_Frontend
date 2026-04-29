"use client";
import React, { useState, useCallback } from 'react';
import {
  Stethoscope, Calendar, Clock, ChevronRight, Search,
  CheckCircle2, XCircle, AlertCircle, RefreshCw, User
} from 'lucide-react';
import { appointmentService } from '../../../../services/appointment.service';
import { adminService } from '../../../../services/admin.service';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Doctor {
  _id: string; firstName: string; lastName: string;
  specialization: string; email: string;
}
interface ScheduleAppointment {
  _id: string; timeSlot: string; status: string; reason: string;
  patientId?: { firstName: string; lastName: string; email: string };
}

// ─── Status helpers ──────────────────────────────────────────────────────────
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

// ─── Doctor Card ─────────────────────────────────────────────────────────────
function DoctorCard({ doctor, selected, onClick }: { doctor: Doctor; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border transition-all group ${selected ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-white border-slate-100 hover:border-slate-900 hover:shadow-md'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl font-black text-sm flex items-center justify-center shrink-0 transition-all ${selected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-900 group-hover:text-white'}`}>
          {doctor.firstName?.[0]}{doctor.lastName?.[0]}
        </div>
        <div className="min-w-0">
          <p className={`font-black text-sm truncate ${selected ? 'text-white' : 'text-slate-900'}`}>Dr. {doctor.firstName} {doctor.lastName}</p>
          <p className={`text-[10px] font-bold uppercase tracking-wider truncate mt-0.5 ${selected ? 'text-slate-300' : 'text-slate-400'}`}>{doctor.specialization}</p>
        </div>
        <ChevronRight className={`w-4 h-4 ml-auto shrink-0 ${selected ? 'text-white' : 'text-slate-300'}`} />
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StaffDoctorSchedulePage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [doctorSearch, setDoctorSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [schedule, setSchedule] = useState<ScheduleAppointment[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [doctorsLoaded, setDoctorsLoaded] = useState(false);

  // ── Load doctors
  const loadDoctors = useCallback(async () => {
    if (doctorsLoaded) return;
    setLoadingDoctors(true);
    try {
      const res = await adminService.getAllUsers({ role: 'doctor', limit: 100 });
      const arr = res?.data?.users ?? res?.data ?? [];
      const docList = Array.isArray(arr) ? arr.filter((u: any) => u.role === 'doctor') : [];
      setDoctors(docList);
      setDoctorsLoaded(true);
    } catch (e) {
      console.error('Failed to load doctors', e);
    } finally {
      setLoadingDoctors(false);
    }
  }, [doctorsLoaded]);

  // ── Load doctor's schedule for selected date
  const loadSchedule = useCallback(async (doctorId: string, date: string) => {
    setLoadingSchedule(true);
    try {
      const res = await appointmentService.getSchedule(doctorId, date);
      const appts = res?.data?.appointments ?? [];
      setSchedule(Array.isArray(appts) ? appts : []);
    } catch (e) {
      console.error('Failed to load schedule', e);
      setSchedule([]);
    } finally {
      setLoadingSchedule(false);
    }
  }, []);

  const handleSelectDoctor = (doc: Doctor) => {
    setSelectedDoctor(doc);
    loadSchedule(doc._id, selectedDate);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    if (selectedDoctor) loadSchedule(selectedDoctor._id, date);
  };

  const filteredDoctors = doctors.filter(d =>
    !doctorSearch || `${d.firstName} ${d.lastName} ${d.specialization}`.toLowerCase().includes(doctorSearch.toLowerCase())
  );

  const stats = {
    total: schedule.length,
    pending: schedule.filter(a => a.status === 'pending').length,
    scheduled: schedule.filter(a => a.status === 'scheduled').length,
    completed: schedule.filter(a => a.status === 'completed').length,
  };

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 shrink-0">
        <h1 className="text-xl font-black text-slate-900">Doctor Schedules</h1>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">View any doctor's appointments by date</p>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── LEFT: Doctor Picker ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-50">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Select Doctor</p>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      placeholder="Search doctors..."
                      value={doctorSearch}
                      onChange={e => setDoctorSearch(e.target.value)}
                      onFocus={loadDoctors}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="p-3 space-y-2 max-h-[420px] overflow-y-auto">
                  {!doctorsLoaded && !loadingDoctors ? (
                    <button onClick={loadDoctors}
                      className="w-full py-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors flex flex-col items-center gap-2">
                      <Stethoscope className="w-8 h-8 text-slate-200" />
                      Click to load doctors
                    </button>
                  ) : loadingDoctors ? (
                    [...Array(4)].map((_, i) => (
                      <div key={i} className="animate-pulse h-16 bg-slate-50 rounded-2xl border border-slate-100" />
                    ))
                  ) : filteredDoctors.length === 0 ? (
                    <div className="py-10 text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No doctors found</p>
                    </div>
                  ) : filteredDoctors.map(doc => (
                    <DoctorCard
                      key={doc._id}
                      doctor={doc}
                      selected={selectedDoctor?._id === doc._id}
                      onClick={() => handleSelectDoctor(doc)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Schedule View ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Picker + Doctor Info */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div>
                    {selectedDoctor ? (
                      <>
                        <h2 className="font-black text-slate-900 text-lg">Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{selectedDoctor.specialization}</p>
                      </>
                    ) : (
                      <p className="font-bold text-slate-400 text-sm">← Select a doctor to view their schedule</p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block mb-1.5 ml-1">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={e => handleDateChange(e.target.value)}
                      className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              {selectedDoctor && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Total', value: stats.total, color: 'text-slate-900' },
                    { label: 'Pending', value: stats.pending, color: 'text-amber-600' },
                    { label: 'Scheduled', value: stats.scheduled, color: 'text-sky-600' },
                    { label: 'Completed', value: stats.completed, color: 'text-emerald-600' },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm px-5 py-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                      <p className={`text-2xl font-black mt-0.5 ${s.color}`}>{loadingSchedule ? '—' : s.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Appointments List */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    {selectedDoctor
                      ? `Appointments for ${new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long' })}`
                      : 'Appointment Log'}
                  </p>
                  {selectedDoctor && (
                    <button onClick={() => loadSchedule(selectedDoctor._id, selectedDate)}
                      className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-slate-900 hover:text-white text-slate-400 transition-all group">
                      <RefreshCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-all duration-500" />
                    </button>
                  )}
                </div>

                {!selectedDoctor ? (
                  <div className="py-20 text-center">
                    <Stethoscope className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Select a doctor from the left panel</p>
                  </div>
                ) : loadingSchedule ? (
                  <div className="divide-y divide-slate-50">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="animate-pulse flex gap-4 p-5">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-100 rounded w-1/2" />
                          <div className="h-2.5 bg-slate-100 rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : schedule.length === 0 ? (
                  <div className="py-20 text-center">
                    <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No appointments on this date</p>
                    <p className="text-xs font-bold text-slate-400 mt-1">Doctor is free on this day</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {schedule.map((appt, idx) => (
                      <div key={appt._id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors">
                        {/* Number */}
                        <div className="w-8 h-8 rounded-xl bg-slate-100 font-black text-slate-500 text-xs flex items-center justify-center shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        {/* Patient */}
                        <div className="flex-1 min-w-0">
                          <p className="font-black text-sm text-slate-900">
                            {appt.patientId ? `${appt.patientId.firstName} ${appt.patientId.lastName}` : 'Unknown Patient'}
                          </p>
                          <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-3 h-3" /> {appt.timeSlot ?? '—'}
                          </p>
                        </div>
                        {/* Reason */}
                        <p className="text-[11px] font-bold text-slate-400 max-w-[140px] truncate hidden md:block italic">
                          {appt.reason ?? 'Consultation'}
                        </p>
                        {/* Status */}
                        <StatusBadge status={appt.status} />
                      </div>
                    ))}
                  </div>
                )}

                {selectedDoctor && !loadingSchedule && schedule.length > 0 && (
                  <div className="px-6 py-4 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400">{schedule.length} appointment{schedule.length !== 1 ? 's' : ''} scheduled</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
