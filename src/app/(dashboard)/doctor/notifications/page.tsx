"use client";
import React, { useState, useEffect } from 'react';
import { 
  FaBell, FaPaperPlane, FaTimesCircle, FaEnvelope, 
  FaUsers, FaUser, FaTheaterMasks, FaExclamationTriangle, 
  FaCheckCircle, FaSpinner, FaChevronDown, FaClipboardList, FaFileAlt, FaPlus, FaTrashAlt
} from 'react-icons/fa';
import { MdCake, MdMosque, MdStar, MdChatBubble, MdAutoAwesome, MdMedicalServices } from 'react-icons/md';
import { GiSheep } from 'react-icons/gi';
import { notificationService } from '../../../../services/notification.service';
import { sendCustomNotification, type TemplateType, type RecipientType, type UserRole } from '../../../../services/email.service';
import { pushService } from '../../../../services/push.service';
import { toast } from 'react-hot-toast';
import { adminService } from '../../../../services/admin.service';

// ── Types ──────────────────────────────────────────────────────────
interface AdminUser { _id: string; firstName: string; lastName: string; email: string; role: string; }
interface GroupedUsers { patients: AdminUser[]; doctors: AdminUser[]; staff: AdminUser[]; admins: AdminUser[]; }

// ── Main Page ──────────────────────────────────────────────────────
export default function DoctorNotificationsPage() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'templates' | 'email'>('alerts');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const fetchAll = async () => {
    try {
      setIsLoading(true);
      // Doctors get their own notifications and templates
      const [notifRes, tempRes] = await Promise.all([
        notificationService.getNotifications(),
        notificationService.getTemplates()
      ]);
      setNotifications(notifRes.data?.notifications || notifRes.data || []);
      setTemplates(tempRes.data?.templates || tempRes.data || []);
    } catch (error) {
      console.error('Error fetching clinical data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this clinical template?")) return;
    try {
      await notificationService.deleteTemplate(id);
      fetchAll();
    } catch (error) {
      alert("Failed to delete template");
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Page Header */}
      <div className="px-6 py-6 border-b border-slate-200 bg-white shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <MdMedicalServices className="text-blue-600" /> Clinical Communication Center
            </h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Manage institutional alerts, clinical templates, and Islamic/custom emails.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={async () => {
                const granted = await pushService.requestPermission();
                if (granted) toast.success("Notifications enabled!");
                else toast.error("Notification permission denied");
              }}
              className="text-[12px] font-black text-teal-700 bg-teal-50 px-5 py-2.5 rounded-xl hover:bg-teal-100 transition-all border border-teal-100 flex items-center gap-2"
            >
              <FaBell className="w-4 h-4" /> Enable Desktop Notifications
            </button>
            <button 
              onClick={() => {
                setSelectedTemplate(null);
                setShowBroadcastModal(true);
              }}
              className="text-[12px] font-black text-white bg-slate-900 px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-md flex items-center gap-2"
            >
              <FaPaperPlane className="w-4 h-4" /> New Announcement
            </button>
            {activeTab === 'templates' && (
              <button 
                onClick={() => setShowTemplateModal(true)}
                className="text-[12px] font-black text-indigo-600 bg-indigo-50 px-5 py-2.5 rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100 flex items-center gap-2"
              >
                <FaPlus className="w-3 h-3" /> Save Template
              </button>
            )}
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-8 mt-8 border-t border-slate-50 pt-4">
          {[
            { id: 'alerts', label: 'Alert Stream', Icon: FaBell },
            { id: 'templates', label: 'Clinical Templates', Icon: FaClipboardList },
            { id: 'email', label: 'Islamic Emailer', Icon: FaEnvelope }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-[11px] font-black uppercase tracking-widest relative transition-all flex items-center gap-2 ${
                activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.Icon className={activeTab === tab.id ? 'text-blue-500' : ''} /> {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900 rounded-full"></div>}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400 font-bold flex flex-col items-center gap-3">
              <FaSpinner className="animate-spin text-2xl" />
              <span>Synchronizing medical registries...</span>
            </div>
          ) : activeTab === 'alerts' ? (
            /* Alerts Stream View */
            notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[2rem] border border-slate-200 mt-10">
                <FaBell className="w-12 h-12 text-slate-200 mb-6" />
                <h3 className="text-xl font-black text-slate-800">Static Registry</h3>
                <p className="text-slate-500 text-sm font-medium mt-2">No institutional alerts or global broadcasts found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 pb-10">
                {notifications.map((notif: any) => (
                  <div key={notif._id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex gap-5 group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      notif.type === 'broadcast' ? 'bg-blue-50 text-blue-600' :
                      notif.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                      notif.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {notif.type === 'broadcast' ? <FaPaperPlane className="w-5 h-5" /> : <FaBell className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[14px] md:text-[15px] font-black text-slate-900 truncate">{notif.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                          {new Date(notif.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-[13px] font-medium text-slate-600 leading-relaxed">{notif.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeTab === 'templates' ? (
            /* Templates Gallery View */
            templates.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-20 text-center bg-white rounded-[2rem] border border-slate-200 border-dashed mt-10">
                <FaClipboardList className="w-12 h-12 text-slate-200 mb-6" />
                <h3 className="text-xl font-black text-slate-800">Personal Template Registry</h3>
                <p className="text-slate-500 text-sm font-medium mt-2">Create reusable templates for frequent rounds, medical updates, or instructions.</p>
                <button 
                  onClick={() => setShowTemplateModal(true)}
                  className="mt-6 text-[12px] font-black text-white bg-slate-900 px-6 py-3 rounded-xl hover:bg-black transition-all"
                >
                  Initialize First Template
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {templates.map((temp: any) => (
                  <div key={temp._id} className="bg-white rounded-3xl border border-slate-200 p-6 hover:shadow-xl transition-all group flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          <FaFileAlt className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleDeleteTemplate(temp._id)}
                            className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                          >
                            <FaTrashAlt className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-base font-black text-slate-900 mb-2">{temp.name}</h4>
                      <p className="text-[12px] text-slate-600 line-clamp-3 italic mb-6">"{temp.content}"</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedTemplate(temp);
                        setShowBroadcastModal(true);
                      }}
                      className="w-full py-3 rounded-2xl bg-slate-50 text-indigo-600 font-extrabold text-[11px] hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 uppercase tracking-widest"
                    >
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            /* Email Center View */
            <EmailSenderPanel onSuccess={fetchAll} />
          )}
        </div>
      </div>

      {showBroadcastModal && (
        <BroadcastModal 
           template={selectedTemplate}
           onClose={() => setShowBroadcastModal(false)}
           onSuccess={() => {
              setShowBroadcastModal(false);
              fetchAll();
           }}
        />
      )}

      {showTemplateModal && (
        <TemplateModal 
           onClose={() => setShowTemplateModal(false)}
           onSuccess={() => {
              setShowTemplateModal(false);
              fetchAll();
           }}
        />
      )}
    </div>
  );
}

// ── Email Sender Panel ─────────────────────────────────────────────
const EMAIL_TEMPLATES: { value: TemplateType; label: string; icon: React.ReactNode; color: string }[] = [
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

  const selected = EMAIL_TEMPLATES.find(t => t.value === template)!;

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
    <div className="pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Template */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">1 — Choose Islamic Template</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {EMAIL_TEMPLATES.map(t => (
                <button key={t.value} onClick={() => setTemplate(t.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${template === t.value ? 'border-blue-500 bg-blue-50' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                  <span style={{ color: template === t.value ? t.color : '#94a3b8' }}>{t.icon}</span>
                  <span className={`text-[10px] font-black text-center leading-tight uppercase tracking-tighter ${template === t.value ? 'text-blue-700' : 'text-slate-500'}`}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Recipients */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">2 — Target Recipients</p>
            <div className="flex gap-2 mb-6">
              {([
                { key: 'all'  as RecipientType, label: 'All Users',   Icon: FaUsers },
                { key: 'role' as RecipientType, label: 'By Role',     Icon: FaTheaterMasks },
                { key: 'user' as RecipientType, label: 'Single User', Icon: FaUser },
              ]).map(({ key, label, Icon }) => (
                <button key={key} onClick={() => setRecipientType(key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl border-2 text-[11px] font-black uppercase tracking-tight transition-all ${recipientType === key ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                  <Icon /> {label}
                </button>
              ))}
            </div>

            {/* Single User dropdown */}
            {recipientType === 'user' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 ml-1">
                  <FaUser className="text-blue-500 text-xs" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Patient/User</span>
                  {usersLoading && <FaSpinner className="animate-spin text-blue-500 text-xs" />}
                </div>
                <div className="relative">
                  <select value={userId}
                    onChange={e => { setUserId(e.target.value); setSelectedUserName(e.target.options[e.target.selectedIndex].text); }}
                    className="w-full appearance-none px-5 py-3.5 border-2 border-slate-100 rounded-2xl text-sm focus:outline-none focus:border-blue-500 bg-slate-50 font-bold text-slate-700 pr-10 cursor-pointer transition-all">
                    <option value="">— Select from registry —</option>
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
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                {userId && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl text-[11px] text-blue-700 font-bold">
                    <FaCheckCircle className="text-blue-500" /> Destination: {selectedUserName}
                  </div>
                )}
              </div>
            )}

            {/* By Role */}
            {recipientType === 'role' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(['patient', 'doctor', 'staff', 'admin'] as UserRole[]).map(r => (
                  <button key={r} onClick={() => setRole(r)}
                    className={`py-3 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${role === r ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}>
                    {r}s
                  </button>
                ))}
              </div>
            )}

            {/* All Users */}
            {recipientType === 'all' && (
              <div className="flex items-center gap-3 px-5 py-4 bg-amber-50 border border-amber-100 rounded-2xl text-[11px] text-amber-800 font-bold">
                <FaExclamationTriangle className="text-amber-500 text-lg shrink-0" />
                <span>HEADS UP: This message will be dispatched to <strong className="underline underline-offset-2">EVERYONE</strong> in the institutional registry.</span>
              </div>
            )}
          </div>

          {/* Step 3: Message */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">
              3 — Composition {template !== 'custom' && <span className="text-slate-300 normal-case italic">(optional note)</span>}
            </p>
            {template === 'custom' ? (
              <div className="space-y-4">
                <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Email Subject Line"
                  className="w-full px-5 py-3.5 border-2 border-slate-100 rounded-2xl text-sm outline-none focus:border-blue-500 bg-slate-50 font-bold text-slate-800 transition-all" />
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Message Heading"
                  className="w-full px-5 py-3.5 border-2 border-slate-100 rounded-2xl text-sm outline-none focus:border-blue-500 bg-slate-50 font-bold text-slate-800 transition-all" />
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder="Compose your message body..."
                  className="w-full px-5 py-4 border-2 border-slate-100 rounded-3xl text-sm outline-none focus:border-blue-500 bg-slate-50 font-semibold text-slate-700 resize-none transition-all" />
              </div>
            ) : (
              <textarea value={customMessage} onChange={e => setCustomMessage(e.target.value)} rows={3}
                placeholder="Include a personalized professional note within the email..."
                className="w-full px-5 py-4 border-2 border-slate-100 rounded-3xl text-sm outline-none focus:border-blue-500 bg-slate-50 font-semibold text-slate-700 resize-none transition-all" />
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Preview card */}
          <div className="rounded-[2.5rem] p-8 text-white shadow-2xl text-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${selected.color}cc, ${selected.color})` }}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <MdMosque size={120} />
            </div>
            <div className="flex justify-center mb-4 text-5xl drop-shadow-lg">{selected.icon}</div>
            <div className="font-black text-lg uppercase tracking-wider mb-6">{selected.label}</div>
            
            <div className="space-y-3 bg-white/10 p-5 rounded-3xl backdrop-blur-md text-left text-[11px] font-bold">
              <div className="flex justify-between items-center">
                <span className="opacity-70">RECIPIENT</span>
                <span className="truncate max-w-[120px]">
                  {recipientType === 'all'  && 'Institutional Registry'}
                  {recipientType === 'user' && (selectedUserName.split('—')[0] || 'Select User')}
                  {recipientType === 'role' && `All ${role}s`}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-3">
                <span className="opacity-70">DELIVERY</span>
                <span>EMAIL + IN-APP</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button onClick={handleSend} disabled={loading}
            className="w-full py-5 rounded-[2rem] font-black text-white text-sm transition-all shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 uppercase tracking-widest"
            style={{ background: loading ? '#94a3b8' : selected.color }}>
            {loading ? <><FaSpinner className="animate-spin" /> DISPATCHING...</> : <><FaPaperPlane /> SEND {selected.label}</>}
          </button>

          {/* Success/Error Feedback */}
          {result && (
            <div className={`rounded-3xl p-6 border-2 animate-in fade-in slide-in-from-top-2 ${result.success ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}>
              <div className="flex items-center gap-3 font-black text-sm mb-2">
                {result.success ? <FaCheckCircle className="text-emerald-500 text-lg" /> : <FaTimesCircle className="text-rose-500 text-lg" />}
                {result.success ? 'TRANSMISSION COMPLETE' : 'DISPATCH FAILED'}
              </div>
              <p className="text-[11px] font-bold opacity-80 leading-relaxed mb-4">{result.msg}</p>
              {result.success && result.data && (
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-emerald-100">
                   <div className="bg-white/50 p-2 rounded-xl text-center">
                      <div className="text-[9px] opacity-60">EMAILS</div>
                      <div className="text-sm font-black">{String(result.data.emailsSent ?? '0')}</div>
                   </div>
                   <div className="bg-white/50 p-2 rounded-xl text-center">
                      <div className="text-[9px] opacity-60">ALERTS</div>
                      <div className="text-sm font-black">{String(result.data.notificationsSent ?? '0')}</div>
                   </div>
                </div>
              )}
            </div>
          )}

          {/* Info Box */}
          <div className="bg-slate-900 rounded-[2rem] p-6 text-white/90 text-[11px] font-bold leading-relaxed flex gap-4 shadow-lg shadow-slate-200">
            <FaEnvelope className="text-blue-400 text-2xl shrink-0" />
            <div>
              <p className="mb-1 text-blue-400">MEDICAL COMMUNICATION PROTOCOL</p>
              Every dispatch triggers a secure institutional alert and a professional HTML email. All medical communication is logged for audit purposes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Broadcast Modal ────────────────────────────────────────────────
function BroadcastModal({ template, onClose, onSuccess }: { template?: any, onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({ title: template?.name || '', message: template?.content || '', type: 'broadcast', recipientRole: '' });
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <FaPaperPlane className="text-blue-600" /> New Clinical Broadcast
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
            <FaTimesCircle size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && <div className="text-[11px] font-black text-rose-600 bg-rose-50 p-4 rounded-2xl border border-rose-100">{error}</div>}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Announcement Title</label>
            <input required className="w-full text-sm border-2 border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:border-blue-500 bg-slate-50 font-bold text-slate-800"
              value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g., Clinical Update" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Target Group</label>
            <select className="w-full text-sm border-2 border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:border-blue-500 bg-slate-50 font-bold text-slate-800"
              value={formData.recipientRole} onChange={e => setFormData({ ...formData, recipientRole: e.target.value })}>
              <option value="">Global Public</option>
              <option value="patient">All Patients</option>
              <option value="doctor">Medical Staff Only</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Clinical Instruction</label>
            <textarea required rows={4} className="w-full text-sm border-2 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-blue-500 bg-slate-50 font-semibold text-slate-700 resize-none"
              value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Detail your clinical announcement..." />
          </div>
          <button disabled={loading} className="w-full bg-slate-900 hover:bg-black text-white font-black text-xs py-4 rounded-2xl transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-2">
            {loading ? <><FaSpinner className="animate-spin" /> DISPATCHING...</> : <><FaPaperPlane /> AUTHORIZE BROADCAST</>}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Template Modal ──────────────────────────────────────────────────
function TemplateModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await notificationService.createTemplate(formData);
      onSuccess();
    } catch (err: unknown) {
      const e = err as { message?: string };
      alert(e.message || 'Failed to save template');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <FaClipboardList className="text-indigo-600" /> Save Clinical Template
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
            <FaTimesCircle size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Template Identifier</label>
            <input required className="w-full text-sm border-2 border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:border-indigo-600 bg-slate-50 font-bold text-slate-800"
              value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Surgery Prep Guide" />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Message Content</label>
            <textarea required rows={6} className="w-full text-sm border-2 border-slate-100 rounded-[2rem] px-6 py-4 outline-none focus:border-indigo-600 bg-slate-50 font-semibold text-slate-700 resize-none"
              value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="Define the clinical template content..." />
          </div>
          <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-4 rounded-2xl transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-2">
            {loading ? <><FaSpinner className="animate-spin" /> ARCHIVING...</> : <><FaPlus /> COMMIT TO REGISTRY</>}
          </button>
        </form>
      </div>
    </div>
  );
}
