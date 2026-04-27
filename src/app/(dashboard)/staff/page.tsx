"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
  Calendar, Clock, Users, Search, Bell, RefreshCw,
  CheckCircle2, XCircle, AlertCircle, ChevronRight,
  User, Stethoscope, Building2, X, Eye, Filter
} from 'lucide-react';
import { appointmentService } from '../../../services/appointment.service';
import { notificationService } from '../../../services/notification.service';
import { authService } from '../../../services/auth.service';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Appointment {
  _id: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  patientId?: { firstName: string; lastName: string; email: string; phoneNumber?: string };
  doctorId?: { firstName: string; lastName: string; specialization: string };
}

interface Notification {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STATUS_MAP: Record<string, string> = {
  pending:   'bg-amber-50  text-amber-700  border-amber-100',
  scheduled: 'bg-sky-50    text-sky-700    border-sky-100',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  cancelled: 'bg-red-50    text-red-600    border-red-100',
};

const StatusBadge = ({ status }: { status: string }) => (
  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${STATUS_MAP[status] ?? 'bg-slate-50 text-slate-500 border-slate-100'}`}>
    {status}
  </span>
);

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[1,2,3,4].map(i => (
      <td key={i} className="px-5 py-4">
        <div className="h-3 bg-slate-100 rounded w-4/5" />
      </td>
    ))}
  </tr>
);

// ─── Appointment Detail Modal ─────────────────────────────────────────────────
function AppointmentModal({ appt, onClose }: { appt: Appointment; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white px-8 py-8">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
            <X className="w-4 h-4" />
          </button>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Appointment Record</p>
          <h2 className="text-xl font-black">
            {appt.patientId?.firstName ?? '—'} {appt.patientId?.lastName ?? ''}
          </h2>
          <StatusBadge status={appt.status} />
        </div>
        <div className="p-8 space-y-5">
          <DetailRow icon={<Stethoscope className="w-4 h-4" />} label="Doctor" value={`Dr. ${appt.doctorId?.firstName ?? '—'} ${appt.doctorId?.lastName ?? ''}`} />
          <DetailRow icon={<Building2 className="w-4 h-4" />} label="Specialization" value={appt.doctorId?.specialization ?? '—'} />
          <DetailRow icon={<Calendar className="w-4 h-4" />} label="Date" value={new Date(appt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} />
          <DetailRow icon={<Clock className="w-4 h-4" />} label="Time Slot" value={appt.timeSlot ?? '—'} />
          <DetailRow icon={<AlertCircle className="w-4 h-4" />} label="Reason" value={appt.reason ?? '—'} />
          {appt.patientId?.email && <DetailRow icon={<User className="w-4 h-4" />} label="Patient Email" value={appt.patientId.email} />}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StaffDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [notifPanel, setNotifPanel] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toArray = (val: any): any[] => Array.isArray(val) ? val : [];

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [appRes, notifRes] = await Promise.allSettled([
        appointmentService.getAppointments({ limit: 100 }),
        notificationService.getNotifications({ limit: 20 }),
      ]);
      if (appRes.status === 'fulfilled') {
        const d = appRes.value?.data;
        setAppointments(toArray(d?.appointments ?? d));
      }
      if (notifRes.status === 'fulfilled') {
        const d = notifRes.value?.data;
        setNotifications(toArray(d?.notifications ?? d));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleMarkRead = async (id: string) => {
    await notificationService.markAsRead(id);
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // ── Filter & Search ──
  const filtered = appointments.filter(appt => {
    const matchStatus = filterStatus === 'all' || appt.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q
      || `${appt.patientId?.firstName} ${appt.patientId?.lastName}`.toLowerCase().includes(q)
      || `${appt.doctorId?.firstName} ${appt.doctorId?.lastName}`.toLowerCase().includes(q)
      || appt.status.includes(q);
    return matchStatus && matchSearch;
  });

  // ── Stats ──
  const stats = [
    { label: 'Total Today', value: appointments.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length, icon: <Calendar className="w-4 h-4" /> },
    { label: 'Pending Check-in', value: appointments.filter(a => a.status === 'pending').length, icon: <Clock className="w-4 h-4" /> },
    { label: 'Scheduled', value: appointments.filter(a => a.status === 'scheduled').length, icon: <CheckCircle2 className="w-4 h-4" /> },
    { label: 'Total Appointments', value: appointments.length, icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">Staff Operations</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">Hospital Appointment Registry</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAll}
            className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group"
          >
            <RefreshCw className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:rotate-180 transition-all duration-500" />
          </button>
          <button
            onClick={() => setNotifPanel(true)}
            className="relative w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all"
          >
            <Bell className="w-4 h-4 text-slate-500" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-100 border-b border-slate-100 shrink-0">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white px-5 py-5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Table Section ── */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="text"
                placeholder="Search patient or doctor..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 outline-none focus:border-slate-900 transition-all placeholder:text-slate-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              {(['all','pending','scheduled','completed','cancelled'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                    filterStatus === s
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Patient</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Doctor</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Date & Time</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">Status</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {isLoading ? (
                    <><SkeletonRow /><SkeletonRow /><SkeletonRow /><SkeletonRow /></>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-20 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                          {search || filterStatus !== 'all' ? 'No matching records' : 'Registry is empty'}
                        </p>
                      </td>
                    </tr>
                  ) : filtered.map(appt => (
                    <tr key={appt._id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-black text-slate-500 text-sm shrink-0">
                            {appt.patientId?.firstName?.[0] ?? '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-black text-slate-900 truncate">{appt.patientId?.firstName ?? '—'} {appt.patientId?.lastName ?? ''}</p>
                            <p className="text-[10px] font-bold text-slate-400 truncate">{appt.patientId?.email ?? ''}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-700">Dr. {appt.doctorId?.firstName ?? '—'} {appt.doctorId?.lastName ?? ''}</p>
                        <p className="text-[10px] font-bold text-slate-400">{appt.doctorId?.specialization ?? '—'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-700">
                          {new Date(appt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400">{appt.timeSlot ?? '—'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={appt.status} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedAppt(appt)}
                          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            {!isLoading && (
              <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between">
                <p className="text-[10px] font-bold text-slate-400">
                  Showing {filtered.length} of {appointments.length} records
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Appointment Detail Modal ── */}
      {selectedAppt && (
        <AppointmentModal appt={selectedAppt} onClose={() => setSelectedAppt(null)} />
      )}

      {/* ── Notification Slide-over ── */}
      {notifPanel && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={() => setNotifPanel(false)} />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-black text-slate-900">Notifications</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{unreadCount} unread</p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllRead} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                    Mark all read
                  </button>
                )}
                <button onClick={() => setNotifPanel(false)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto divide-y divide-slate-50">
              {notifications.length === 0 ? (
                <div className="py-16 text-center">
                  <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">No notifications</p>
                </div>
              ) : notifications.map(notif => (
                <div key={notif._id}
                  className={`p-5 cursor-pointer transition-colors ${notif.isRead ? 'opacity-50' : 'bg-slate-50/70 hover:bg-slate-50'}`}
                  onClick={() => !notif.isRead && handleMarkRead(notif._id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${notif.isRead ? 'bg-slate-200' : 'bg-slate-900'}`} />
                    <div>
                      <p className="font-black text-sm text-slate-900">{notif.title}</p>
                      <p className="text-[11px] text-slate-500 font-bold mt-0.5 leading-relaxed">{notif.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1.5">{new Date(notif.createdAt).toLocaleString()}</p>
                    </div>
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
