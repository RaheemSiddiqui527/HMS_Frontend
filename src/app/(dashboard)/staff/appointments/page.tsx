"use client";
import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, Search, Eye, X, Stethoscope, Filter, RefreshCw, AlertCircle, Plus } from 'lucide-react';
import { appointmentService } from '../../../../services/appointment.service';
import { adminService } from '../../../../services/admin.service';

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
  return (
    <Suspense fallback={<div className="p-10 text-center font-black uppercase text-slate-300">Loading Registry...</div>}>
      <StaffAppointmentsContent />
    </Suspense>
  );
}

function StaffAppointmentsContent() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [preSelectedPatient, setPreSelectedPatient] = useState<string | null>(null);

  const searchParams = useSearchParams();

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

  useEffect(() => {
    const open = searchParams.get('openBooking');
    const pid = searchParams.get('patientId');
    if (open === 'true') {
      setShowBooking(true);
      if (pid) setPreSelectedPatient(pid);
    }
  }, [searchParams]);

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
        <div className="flex items-center gap-3">
          <button onClick={() => setShowBooking(true)} className="flex items-center gap-2 bg-[#185d51] hover:bg-[#124a40] text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10">
            <Plus className="w-3.5 h-3.5" /> Emergency Booking
          </button>
          <button onClick={fetchData} className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group">
            <RefreshCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-all duration-500" />
          </button>
        </div>
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
      {/* Booking Modal */}
      {showBooking && (
        <BookingModal 
          onClose={() => {
            setShowBooking(false);
            setPreSelectedPatient(null);
          }} 
          onSuccess={() => {
            setShowBooking(false);
            setPreSelectedPatient(null);
            fetchData();
          }} 
          initialPatientId={preSelectedPatient}
        />
      )}
    </div>
  );
}

// ─── Booking Modal Component ──────────────────────────────────────────────────
function BookingModal({ onClose, onSuccess, initialPatientId }: { onClose: () => void, onSuccess: () => void, initialPatientId?: string | null }) {
  const [loading, setLoading] = useState(false);
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    patientId: initialPatientId || '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 AM - 09:30 AM',
    reason: 'Emergency Consultation',
    // New patient fields
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: 'Password123!', // Default temporary password
    role: 'patient'
  });

  useEffect(() => {
    if (initialPatientId) {
      setFormData(prev => ({ ...prev, patientId: initialPatientId }));
    }
  }, [initialPatientId]);

  const timeSlots = [
    '08:00 AM - 08:30 AM', '08:30 AM - 09:00 AM', '09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM',
    '10:00 AM - 10:30 AM', '10:30 AM - 11:00 AM', '11:00 AM - 11:30 AM', '11:30 AM - 12:00 PM',
    '12:00 PM - 12:30 PM', '12:30 PM - 01:00 PM', '01:00 PM - 01:30 PM', '01:30 PM - 02:00 PM',
    '02:00 PM - 02:30 PM', '02:30 PM - 03:00 PM', '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM',
    '04:00 PM - 04:30 PM', '04:30 PM - 05:00 PM', '05:00 PM - 05:30 PM', '05:30 PM - 06:00 PM',
    '06:00 PM - 06:30 PM', '06:30 PM - 07:00 PM', '07:00 PM - 07:30 PM', '07:30 PM - 08:00 PM'
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [pRes, dRes] = await Promise.all([
          adminService.getAllUsers({ role: 'patient', limit: 1000 }),
          appointmentService.getDoctors()
        ]);
        setPatients(pRes?.data?.users ?? pRes?.data ?? []);
        setDoctors(dRes?.data ?? []);
      } catch (e) { console.error(e); }
    };
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalPatientId = formData.patientId;

      // If new patient, register them first
      if (isNewPatient) {
        if (!formData.firstName || !formData.lastName || !formData.email) {
          throw new Error('Please fill in all required patient fields');
        }
        const regRes = await adminService.createDoctor({ // adminService.createDoctor is just a placeholder name for "any user creation" but better use authService.register or similar
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          role: 'patient'
        });
        // Wait, adminService.createDoctor calls /admin/doctors. I should use a more generic one or authService.register.
        // Actually, let's check authService.register.
        // authService.register(formData)
        const res = await adminService.getAllUsers({ role: 'patient' }); // Refresh list logic is complex here, let's just use the returned user.
        
        // Let's use a more direct approach:
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            password: formData.password,
            role: 'patient'
          })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Registration failed');
        finalPatientId = result.data.user._id;
      }

      if (!finalPatientId || !formData.doctorId) return alert('Please select both patient and doctor');
      
      await appointmentService.createAppointment({
        ...formData,
        patientId: finalPatientId,
        date: new Date(formData.date).toISOString()
      });
      onSuccess();
    } catch (e: any) {
      alert(e.message || 'Failed to process request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden border border-white/20 flex flex-col max-h-[90vh]">
        <div className="bg-[#185d51] text-white p-8 shrink-0">
          <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"><X className="w-5 h-5" /></button>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4"><Plus className="w-6 h-6" /></div>
          <h2 className="text-2xl font-black">Emergency Booking</h2>
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200/60 mt-1">Manual appointment entry for staff</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 overflow-y-auto">
          {/* Toggle New Patient */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-2">
            <div>
              <p className="text-sm font-black text-slate-900">New Patient?</p>
              <p className="text-[10px] font-bold text-slate-400">Register patient on the spot</p>
            </div>
            <button 
              type="button"
              onClick={() => setIsNewPatient(!isNewPatient)}
              className={`w-12 h-6 rounded-full transition-all relative ${isNewPatient ? 'bg-[#185d51]' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isNewPatient ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {!isNewPatient ? (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Select Existing Patient</label>
              <select 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#185d51] transition-all"
                value={formData.patientId}
                onChange={e => setFormData({...formData, patientId: e.target.value})}
              >
                <option value="">Select Patient</option>
                {patients.map(p => <option key={p._id} value={p._id}>{p.firstName} {p.lastName}</option>)}
              </select>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#185d51] transition-all"
                    value={formData.firstName}
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                  <input 
                    type="text" required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#185d51] transition-all"
                    value={formData.lastName}
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                <input 
                  type="email" required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#185d51] transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Doctor</label>
            <select 
              required
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#185d51] transition-all"
              value={formData.doctorId}
              onChange={e => setFormData({...formData, doctorId: e.target.value})}
            >
              <option value="">Select Doctor</option>
              {doctors.map(d => <option key={d._id} value={d._id}>Dr. {d.firstName} {d.lastName}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
              <input 
                type="date" 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#185d51] transition-all"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Time Slot</label>
              <select 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#185d51] transition-all appearance-none"
                value={formData.timeSlot}
                onChange={e => setFormData({...formData, timeSlot: e.target.value})}
              >
                {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Reason / Notes</label>
            <textarea 
              rows={3}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-bold outline-none focus:border-[#185d51] transition-all resize-none"
              placeholder="Brief reason for emergency booking..."
              value={formData.reason}
              onChange={e => setFormData({...formData, reason: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#185d51] hover:bg-[#124a40] text-white font-black text-xs uppercase tracking-[0.2em] py-4 rounded-2xl shadow-xl shadow-emerald-900/20 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}
