"use client";
import React, { useEffect, useState, useCallback } from 'react';
import {
  Calendar, Clock, Pill, FileText, Bell, ChevronRight,
  Activity, Heart, Stethoscope, User, X, AlertCircle, CheckCircle2
} from 'lucide-react';
import { appointmentService } from '../../../services/appointment.service';
import { medicalService } from '../../../services/medical.service';
import { notificationService } from '../../../services/notification.service';
import { authService } from '../../../services/auth.service';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Appointment {
  _id: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  doctorId?: { firstName: string; lastName: string; specialization: string };
}
interface Prescription {
  _id: string;
  createdAt: string;
  status: string;
  medications?: { name: string; dosage: string; frequency: string }[];
  doctorId?: { firstName: string; lastName: string };
}
interface Notification {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: string;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    pending:   'bg-amber-50  text-amber-700  border-amber-100',
    scheduled: 'bg-sky-50    text-sky-700    border-sky-100',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    cancelled: 'bg-red-50    text-red-600    border-red-100',
    active:    'bg-emerald-50 text-emerald-700 border-emerald-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${map[status] ?? 'bg-slate-50 text-slate-500 border-slate-100'}`}>
      {status}
    </span>
  );
};

// ─── Empty State ─────────────────────────────────────────────────────────────
const EmptyState = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="py-12 flex flex-col items-center gap-3 text-center">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
      {icon}
    </div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{text}</p>
  </div>
);

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <div className="animate-pulse flex gap-4 p-4">
    <div className="w-10 h-10 rounded-xl bg-slate-100 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-slate-100 rounded w-1/2" />
      <div className="h-2.5 bg-slate-100 rounded w-1/3" />
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PatientDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'appointments' | 'prescriptions' | 'notifications'>('appointments');
  const [notifPanel, setNotifPanel] = useState(false);

  const user = authService.getCurrentUser();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toArray = (val: any): any[] => Array.isArray(val) ? val : [];

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [appRes, prescRes, notifRes, profileRes] = await Promise.allSettled([
        appointmentService.getAppointments(),
        medicalService.getPrescriptions({ limit: 20 }),
        notificationService.getNotifications({ limit: 20 }),
        authService.getProfile(),
      ]);

      if (appRes.status === 'fulfilled') {
        const d = appRes.value?.data;
        setAppointments(toArray(d?.appointments ?? d));
      }
      if (prescRes.status === 'fulfilled') {
        const d = prescRes.value?.data;
        setPrescriptions(toArray(d?.prescriptions ?? d));
      }
      if (notifRes.status === 'fulfilled') {
        const d = notifRes.value?.data;
        setNotifications(toArray(d?.notifications ?? d));
      }
      if (profileRes.status === 'fulfilled') {
        setUserProfile(profileRes.value?.data);
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

  const handleCancelAppt = async (id: string) => {
    if (!confirm('Cancel this appointment?')) return;
    await appointmentService.updateStatus(id, 'cancelled');
    fetchAll();
  };

  const upcomingAppt = appointments.find(a => a.status === 'scheduled' || a.status === 'pending');

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">Patient Portal</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            {user?.firstName ? `Welcome, ${user.firstName}` : 'Health Overview'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
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
        {[
          { label: 'Total Appointments', value: appointments.length, icon: <Calendar className="w-4 h-4" /> },
          { label: 'Upcoming', value: appointments.filter(a => a.status === 'scheduled' || a.status === 'pending').length, icon: <Clock className="w-4 h-4" /> },
          { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length, icon: <CheckCircle2 className="w-4 h-4" /> },
          { label: 'Prescriptions', value: prescriptions.length, icon: <Pill className="w-4 h-4" /> },
        ].map(stat => (
          <div key={stat.label} className="bg-white px-6 py-5 flex items-center justify-between">
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

      {/* ── Body ── */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* ── Left Column ── */}
          <div className="xl:col-span-2 space-y-8">
            {/* Next Appointment Hero */}
            {upcomingAppt ? (
              <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full" />
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Next Visit</p>
                <h2 className="text-2xl font-black mb-1">
                  Dr. {upcomingAppt.doctorId?.firstName ?? '—'} {upcomingAppt.doctorId?.lastName ?? ''}
                </h2>
                <p className="text-slate-400 text-sm font-bold mb-6">{upcomingAppt.doctorId?.specialization ?? 'General Practice'}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 rounded-2xl px-5 py-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold">{new Date(upcomingAppt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="bg-white/10 rounded-2xl px-5 py-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold">{upcomingAppt.timeSlot ?? '—'}</span>
                  </div>
                  <StatusBadge status={upcomingAppt.status} />
                </div>
              </div>
            ) : !isLoading && (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center">
                <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                <p className="font-bold text-slate-400 text-sm">No upcoming appointments</p>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-slate-100">
                {(['appointments', 'prescriptions', 'notifications'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-slate-50">
                {isLoading ? (
                  <><SkeletonRow /><SkeletonRow /><SkeletonRow /></>
                ) : activeTab === 'appointments' ? (
                  appointments.length === 0 ? (
                    <EmptyState icon={<Calendar className="w-5 h-5" />} text="No appointments found" />
                  ) : appointments.map(appt => (
                    <div key={appt._id} className="flex items-center gap-4 p-5 hover:bg-slate-50/50 transition-colors group">
                      <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-slate-900 truncate">
                          Dr. {appt.doctorId?.firstName ?? '—'} {appt.doctorId?.lastName ?? ''}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 flex items-center gap-2 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(appt.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                          &nbsp;·&nbsp;
                          {appt.timeSlot ?? '—'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusBadge status={appt.status} />
                        {(appt.status === 'scheduled' || appt.status === 'pending') && (
                          <button
                            onClick={() => handleCancelAppt(appt._id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-300 hover:text-red-500"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : activeTab === 'prescriptions' ? (
                  prescriptions.length === 0 ? (
                    <EmptyState icon={<Pill className="w-5 h-5" />} text="No prescriptions found" />
                  ) : prescriptions.map(presc => (
                    <div key={presc._id} className="flex items-start gap-4 p-5 hover:bg-slate-50/50 transition-colors">
                      <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                        <Pill className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-slate-900 truncate">
                          Prescribed by Dr. {presc.doctorId?.firstName ?? '—'} {presc.doctorId?.lastName ?? ''}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                          {new Date(presc.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                        {presc.medications && presc.medications.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {presc.medications.slice(0, 3).map((med, i) => (
                              <span key={i} className="text-[9px] font-black uppercase tracking-wide bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                                {med.name} · {med.dosage}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <StatusBadge status={presc.status ?? 'active'} />
                    </div>
                  ))
                ) : (
                  notifications.length === 0 ? (
                    <EmptyState icon={<Bell className="w-5 h-5" />} text="No notifications" />
                  ) : notifications.map(notif => (
                    <div key={notif._id} className={`flex items-start gap-4 p-5 transition-colors cursor-pointer ${notif.isRead ? 'opacity-60' : 'bg-slate-50/60 hover:bg-slate-50'}`}
                      onClick={() => !notif.isRead && handleMarkRead(notif._id)}>
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notif.isRead ? 'bg-slate-200' : 'bg-slate-900'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-slate-900 truncate">{notif.title}</p>
                        <p className="text-[11px] font-bold text-slate-500 mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Health Summary</h3>
              <div className="space-y-4">
                <SidebarStat 
                  icon={<Heart className="w-4 h-4 text-rose-400" />} 
                  label="Blood Type" 
                  value={userProfile?.bloodType || user?.bloodType || "—"} 
                />
                <SidebarStat 
                  icon={<Activity className="w-4 h-4 text-slate-400" />} 
                  label="Last Visit" 
                  value={(() => {
                    const completed = appointments
                      .filter(a => a.status === 'completed')
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    return completed[0] ? new Date(completed[0].date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—';
                  })()} 
                />
                <SidebarStat icon={<Pill className="w-4 h-4 text-slate-400" />} label="Active Meds" value={`${prescriptions.filter(p => p.status === 'active').length}`} />
                <SidebarStat icon={<FileText className="w-4 h-4 text-slate-400" />} label="Total Records" value={`${appointments.length}`} />
              </div>
            </div>

            {/* Privacy Banner */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700" />
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Data Protection</p>
              <p className="font-black text-lg mb-2">HIPAA Compliant</p>
              <p className="text-xs font-bold text-slate-400 leading-relaxed">Your clinical data is encrypted end-to-end. You control access to your medical records.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Notification Slide-over Panel ── */}
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
                <EmptyState icon={<Bell className="w-5 h-5" />} text="No notifications" />
              ) : notifications.map(notif => (
                <div key={notif._id}
                  className={`p-5 cursor-pointer transition-colors ${notif.isRead ? 'opacity-50' : 'bg-slate-50/70 hover:bg-slate-50'}`}
                  onClick={() => !notif.isRead && handleMarkRead(notif._id)}>
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

function SidebarStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-xs font-bold text-slate-500">{label}</span>
      </div>
      <span className="text-xs font-black text-slate-900 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">{value}</span>
    </div>
  );
}
