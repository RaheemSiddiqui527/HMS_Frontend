"use client";
import React, { useState, useEffect } from 'react';
import {
  FaBell, FaPaperPlane, FaTimesCircle, FaEnvelope,
  FaUsers, FaUser, FaTheaterMasks, FaExclamationTriangle,
  FaCheckCircle, FaSpinner, FaChevronDown,
} from 'react-icons/fa';
import { MdCake, MdMosque, MdStar, MdChatBubble, MdAutoAwesome } from 'react-icons/md';
import { GiSheep } from 'react-icons/gi';
import { notificationService } from '../../../../services/notification.service';
import { sendCustomNotification, type TemplateType, type RecipientType, type UserRole } from '../../../../services/email.service';
import { adminService } from '../../../../services/admin.service';
import { pushService } from '../../../../services/push.service';
import { toast } from 'react-hot-toast';

// ── Types ──────────────────────────────────────────────────────────
interface AdminUser { _id: string; firstName: string; lastName: string; email: string; role: string; }
interface GroupedUsers { patients: AdminUser[]; doctors: AdminUser[]; staff: AdminUser[]; admins: AdminUser[]; }

// ── Main Page ──────────────────────────────────────────────────────
export default function AdminNotificationsPage() {
  const [activeTab, setActiveTab]         = useState<'notifications' | 'email'>('notifications');
  const [notifications, setNotifications] = useState<unknown[]>([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [showModal, setShowModal]         = useState(false);
  const [filter, setFilter]               = useState('all');

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      // Use the admin-specific endpoint to see ALL system notifications
      const data = await notificationService.getAllNotificationsAdmin({ 
        type: filter === 'all' ? '' : filter,
        limit: 100 
      });
      const arr = Array.isArray(data.data?.notifications)
        ? data.data.notifications
        : Array.isArray(data.data) ? data.data : [];
      setNotifications(arr);
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  useEffect(() => { fetchNotifications(); }, [filter]);

  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <FaBell className="text-amber-500" /> Notifications &amp; Email Center
          </h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage broadcasts, alerts, and send Islamic/custom emails.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={async () => {
              const granted = await pushService.requestPermission();
              if (granted) toast.success("Notifications enabled!");
              else toast.error("Notification permission denied");
            }}
            className="text-[13px] font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-teal-100 transition-colors shadow-sm"
          >
            <FaBell /> Enable Desktop Notifications
          </button>
          {activeTab === 'notifications' && (
            <button onClick={() => setShowModal(true)}
              className="text-[13px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-blue-100 transition-colors shadow-sm">
              <FaPaperPlane /> Send Broadcast
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 shrink-0">
        <button onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'notifications' ? 'bg-slate-900 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
          <FaBell /> In-App Notifications
        </button>
        <button onClick={() => setActiveTab('email')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'email' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
          <FaEnvelope /> Send Email Notification
        </button>
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white border border-slate-200 rounded-xl flex flex-col flex-1 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex gap-3 shrink-0">
            {['all', 'broadcast', 'system'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-[12px] font-black px-4 py-1.5 rounded-full transition-all capitalize ${filter === f ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
                {f === 'all' ? 'All Notifications' : f === 'broadcast' ? 'Broadcasts' : 'System Logs'}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-auto">
            {isLoading ? (
              <div className="p-12 text-center text-slate-400 font-bold text-sm flex items-center justify-center gap-2">
                <FaSpinner className="animate-spin" /> Loading...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-20 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <FaBell className="text-3xl text-slate-300" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-lg">No Notifications</h3>
                <p className="text-slate-500 text-sm mt-2 max-w-xs">Any broadcasts or alerts will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {(notifications as Record<string, unknown>[]).map(n => (
                  <div key={n._id as string} className="p-4 hover:bg-slate-50 flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'broadcast' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {n.type === 'broadcast' ? <FaPaperPlane /> : <FaBell />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[14px] font-black text-slate-800 truncate">{n.title as string}</h4>
                        <span className="text-[10px] text-slate-400">{new Date(n.createdAt as string).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[13px] text-slate-600 line-clamp-2">{n.message as string}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Email Tab */}
      {activeTab === 'email' && <EmailSenderPanel onSuccess={fetchNotifications} />}

      {showModal && (
        <BroadcastModal onClose={() => setShowModal(false)} onSuccess={() => { setShowModal(false); fetchNotifications(); }} />
      )}
    </div>
  );
}

// ── Email Sender Panel ─────────────────────────────────────────────
const TEMPLATES: { value: TemplateType; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'birthday',         label: 'Happy Birthday',   icon: <MdCake size={22} />,        color: '#f59e0b' },
  { value: 'eid_fitr',        label: 'Eid ul-Fitr',      icon: <MdAutoAwesome size={22} />, color: '#6366f1' },
  { value: 'eid_adha',        label: 'Eid ul-Adha',      icon: <GiSheep size={22} />,       color: '#059669' },
  { value: 'ramadan',          label: 'Ramadan Mubarak',  icon: <MdStar size={22} />,        color: '#7c3aed' },
  { value: 'jumma',            label: 'Jumma Mubarak',    icon: <MdMosque size={22} />,      color: '#065f46' },
  { value: 'islamic_new_year', label: 'Islamic New Year', icon: <MdStar size={22} />,        color: '#1e3a8a' },
  { value: 'custom',           label: 'Custom Message',   icon: <MdChatBubble size={22} />,  color: '#374151' },
];

function EmailSenderPanel({ onSuccess }: { onSuccess?: () => void }) {
  const [template, setTemplate]               = useState<TemplateType>('eid_fitr');
  const [recipientType, setRecipientType]     = useState<RecipientType>('all');
  const [userId, setUserId]                   = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [role, setRole]                       = useState<UserRole>('patient');
  const [customMessage, setCustomMessage]     = useState('');
  const [subject, setSubject]                 = useState('');
  const [title, setTitle]                     = useState('');
  const [message, setMessage]                 = useState('');
  const [loading, setLoading]                 = useState(false);
  const [result, setResult]                   = useState<{ success: boolean; msg: string; data?: Record<string, unknown> } | null>(null);
  const [groupedUsers, setGroupedUsers]       = useState<GroupedUsers>({ patients: [], doctors: [], staff: [], admins: [] });
  const [usersLoading, setUsersLoading]       = useState(false);

  const selected = TEMPLATES.find(t => t.value === template)!;

  useEffect(() => {
    if (recipientType !== 'user') return;
    setUsersLoading(true);
    Promise.all([
      adminService.getAllUsers({ role: 'patient', status: 'active', limit: 100 }),
      adminService.getAllUsers({ role: 'doctor',  status: 'active', limit: 100 }),
      adminService.getAllUsers({ role: 'staff',   status: 'active', limit: 100 }),
      adminService.getAllUsers({ role: 'admin',   status: 'active', limit: 100 }),
    ]).then(([p, d, s, a]) => {
      const extract = (res: Record<string, unknown>): AdminUser[] => {
        const data = res?.data as Record<string, unknown> | undefined;
        return (Array.isArray(data?.users) ? data!.users : Array.isArray(res?.data) ? res.data : []) as AdminUser[];
      };
      setGroupedUsers({ patients: extract(p), doctors: extract(d), staff: extract(s), admins: extract(a) });
    }).catch(console.error).finally(() => setUsersLoading(false));
  }, [recipientType]);

  const handleSend = async () => {
    if (recipientType === 'user' && !userId) { setResult({ success: false, msg: 'Please select a user.' }); return; }
    if (template === 'custom' && !message.trim()) { setResult({ success: false, msg: 'Message is required.' }); return; }
    setLoading(true); setResult(null);
    try {
      const res = await sendCustomNotification({
        templateType: template, recipientType, customMessage,
        ...(recipientType === 'user' && { userId }),
        ...(recipientType === 'role' && { role }),
        ...(template === 'custom'    && { subject, title, message }),
      });
      setResult({ success: true, msg: res.message || 'Sent!', data: res.data });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } };
      setResult({ success: false, msg: e?.response?.data?.message || 'Failed to send.' });
    } finally { setLoading(false); }
  };

  const GROUP_LABELS: { key: keyof GroupedUsers; label: string; emoji: string }[] = [
    { key: 'patients', label: 'Patients', emoji: '🤒' },
    { key: 'doctors',  label: 'Doctors',  emoji: '👨‍⚕️' },
    { key: 'staff',    label: 'Staff',    emoji: '👔' },
    { key: 'admins',   label: 'Admins',   emoji: '🛡️' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">

            {/* Step 1: Template */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">1 — Choose Template</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TEMPLATES.map(t => (
                  <button key={t.value} onClick={() => setTemplate(t.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${template === t.value ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
                    <span style={{ color: template === t.value ? t.color : '#94a3b8' }}>{t.icon}</span>
                    <span className={`text-[11px] font-bold text-center leading-tight ${template === t.value ? 'text-blue-700' : 'text-slate-700'}`}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Recipients */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">2 — Recipients</p>
              <div className="flex gap-2 mb-4">
                {([
                  { key: 'all'  as RecipientType, label: 'All Users',   Icon: FaUsers },
                  { key: 'role' as RecipientType, label: 'By Role',     Icon: FaTheaterMasks },
                  { key: 'user' as RecipientType, label: 'Single User', Icon: FaUser },
                ]).map(({ key, label, Icon }) => (
                  <button key={key} onClick={() => setRecipientType(key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border-2 text-sm font-bold transition-all ${recipientType === key ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                    <Icon /> {label}
                  </button>
                ))}
              </div>

              {/* Single User dropdown */}
              {recipientType === 'user' && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaUser className="text-blue-500" />
                    <span className="text-xs font-semibold text-slate-600">Select User</span>
                    {usersLoading && <FaSpinner className="text-slate-400 animate-spin text-xs" />}
                  </div>
                  <div className="relative">
                    <select value={userId}
                      onChange={e => { setUserId(e.target.value); setSelectedUserName(e.target.options[e.target.selectedIndex].text); }}
                      className="w-full appearance-none px-4 py-3 border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 bg-white pr-10 cursor-pointer">
                      <option value="">— Select a user —</option>
                      {GROUP_LABELS.map(({ key, label, emoji }) =>
                        groupedUsers[key].length > 0 && (
                          <optgroup key={key} label={`${emoji} ${label} (${groupedUsers[key].length})`}>
                            {groupedUsers[key].map((u: AdminUser) => (
                              <option key={u._id} value={u._id}>{u.firstName} {u.lastName} — {u.email}</option>
                            ))}
                          </optgroup>
                        )
                      )}
                    </select>
                    <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs" />
                  </div>
                  {userId && (
                    <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                      <FaCheckCircle className="text-blue-500" /> Selected: <strong>{selectedUserName}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* By Role */}
              {recipientType === 'role' && (
                <div className="grid grid-cols-4 gap-2">
                  {(['patient', 'doctor', 'staff', 'admin'] as UserRole[]).map(r => (
                    <button key={r} onClick={() => setRole(r)}
                      className={`py-2.5 rounded-xl border-2 text-xs font-bold capitalize transition-all ${role === r ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                      {r}s
                    </button>
                  ))}
                </div>
              )}

              {/* All Users */}
              {recipientType === 'all' && (
                <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                  <FaExclamationTriangle className="text-amber-500 shrink-0" />
                  This will send to <strong className="mx-1">all active users</strong> in the system.
                </div>
              )}
            </div>

            {/* Step 3: Message */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                3 — Message {template !== 'custom' && <span className="text-slate-400 normal-case font-normal">(optional personal note)</span>}
              </p>
              {template === 'custom' ? (
                <div className="space-y-3">
                  <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Email Subject"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Message Title"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="Message body *"
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              ) : (
                <textarea value={customMessage} onChange={e => setCustomMessage(e.target.value)} rows={3}
                  placeholder="Add a personal note shown inside the email..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Preview card */}
            <div className="rounded-2xl p-5 text-white shadow-lg text-center"
              style={{ background: `linear-gradient(135deg, ${selected.color}cc, ${selected.color})` }}>
              <div className="flex justify-center mb-3 opacity-90 text-4xl">{selected.icon}</div>
              <div className="font-bold">{selected.label}</div>
              <div className="mt-3 text-xs text-white/70 space-y-1.5">
                <div className="flex justify-between">
                  <span>To:</span>
                  <strong className="text-white">
                    {recipientType === 'all'  && 'All Users'}
                    {recipientType === 'user' && (selectedUserName || 'Select user')}
                    {recipientType === 'role' && `All ${role}s`}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Channels:</span>
                  <strong className="text-white">Email + In-App</strong>
                </div>
              </div>
            </div>

            {/* Send button */}
            <button onClick={handleSend} disabled={loading}
              className="w-full py-3.5 rounded-xl font-extrabold text-white text-sm transition-all shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: loading ? '#9ca3af' : selected.color }}>
              {loading ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaEnvelope /> Send {selected.label}</>}
            </button>

            {/* Result */}
            {result && (
              <div className={`rounded-xl p-4 text-sm border ${result.success ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {result.success ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                  {result.success ? 'Sent Successfully!' : 'Failed'}
                </div>
                <p className="text-xs">{result.msg}</p>
                {result.success && result.data && (
                  <div className="mt-2 text-xs border-t border-green-200 pt-2 space-y-0.5">
                    <div>Recipients: <strong>{String(result.data.recipientCount ?? '')}</strong></div>
                    <div>Emails: <strong>{String(result.data.emailsSent ?? '')}</strong></div>
                    <div>Notifications: <strong>{String(result.data.notificationsSent ?? '')}</strong></div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700 flex gap-2">
              <FaEnvelope className="text-blue-400 mt-0.5 shrink-0" />
              <div><strong>How it works:</strong> Every send fires both an HTML email and an in-app notification simultaneously.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Broadcast Modal ────────────────────────────────────────────────
function BroadcastModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({ title: '', message: '', type: 'broadcast', recipientRole: '' });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await notificationService.sendBroadcast(formData);
      onSuccess();
    } catch (err: unknown) {
      const e = err as { message?: string };
      setError(e.message || 'Failed to send broadcast');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <FaPaperPlane className="text-blue-600" /> Create Broadcast
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-400">
            <FaTimesCircle className="text-xl" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alert Title</label>
            <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800"
              value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., System Maintenance" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Role (Optional)</label>
            <select className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800 bg-white"
              value={formData.recipientRole} onChange={e => setFormData({ ...formData, recipientRole: e.target.value })}>
              <option value="">All Users</option>
              <option value="doctor">Doctors Only</option>
              <option value="patient">Patients Only</option>
              <option value="staff">Staff Only</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message Body</label>
            <textarea required rows={4} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800 resize-none"
              value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Type your announcement here..." />
          </div>
          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-3 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2">
            {loading ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaPaperPlane /> Send Global Broadcast</>}
          </button>
        </form>
      </div>
    </div>
  );
}
