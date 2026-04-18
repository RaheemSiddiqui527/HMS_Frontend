"use client";
import React, { useState, useEffect } from 'react';
import { Bell, Search, Send, Trash2, Filter, AlertTriangle, Info, CheckCircle, XCircle, Plus, Users } from 'lucide-react';
import { notificationService } from '../../../../services/notification.service';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await notificationService.getAllNotifications({ type: filter === 'all' ? '' : filter });
      setNotifications(data.data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" /> System Notifications
          </h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Manage global broadcasts and system-wide alerts.</p>
        </div>
        <button
          onClick={() => setShowBroadcastModal(true)}
          className="text-[13px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-blue-100 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" /> Send Broadcast
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between bg-white shrink-0">
          <div className="flex gap-4 items-center">
             <button 
               onClick={() => setFilter('all')}
               className={`text-[12px] font-black px-4 py-1.5 rounded-full transition-all ${filter === 'all' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
             >
               All Notifications
             </button>
             <button 
               onClick={() => setFilter('broadcast')}
               className={`text-[12px] font-black px-4 py-1.5 rounded-full transition-all ${filter === 'broadcast' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
             >
               Broadcasts
             </button>
             <button 
               onClick={() => setFilter('system')}
               className={`text-[12px] font-black px-4 py-1.5 rounded-full transition-all ${filter === 'system' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
             >
               System Logs
             </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-50/30">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400 font-bold text-sm">
               Authenticating notification stream...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-slate-300" />
               </div>
               <h3 className="font-extrabold text-slate-800 text-lg">No Notifications</h3>
               <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">The system directory is currently quiet. Any broadcasts or alerts will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 bg-white">
               {notifications.map((notif: any) => (
                 <div key={notif._id} className="p-4 hover:bg-slate-50/50 transition-colors flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                       notif.type === 'broadcast' ? 'bg-blue-50 text-blue-600' :
                       notif.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                       notif.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                       {notif.type === 'broadcast' ? <Send className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between mb-1">
                          <h4 className="text-[14px] font-black text-slate-800 truncate">{notif.title}</h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                             {new Date(notif.createdAt).toLocaleDateString()}
                          </span>
                       </div>
                       <p className="text-[13px] font-medium text-slate-600 line-clamp-2">{notif.message}</p>
                       <div className="mt-2 flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2 py-0.5 bg-slate-100 rounded">
                             {notif.recipientRole || 'Global'}
                          </span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>

      {showBroadcastModal && (
        <BroadcastModal 
          onClose={() => setShowBroadcastModal(false)}
          onSuccess={() => {
            setShowBroadcastModal(false);
            fetchNotifications();
          }}
        />
      )}
    </div>
  );
}

function BroadcastModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'broadcast',
    recipientRole: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await notificationService.sendBroadcast(formData as any);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to send broadcast');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
           <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
             <Send className="w-5 h-5 text-blue-600" /> Create Broadcast
           </h3>
           <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-400">
             <XCircle className="w-5 h-5" />
           </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
           {error && <div className="mb-4 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

           <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alert Title</label>
              <input 
                required 
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800"
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                placeholder="e.g., System Maintenance"
              />
           </div>

           <div className="mb-4">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Role (Optional)</label>
              <select 
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800 bg-white"
                value={formData.recipientRole} 
                onChange={e => setFormData({...formData, recipientRole: e.target.value})}
              >
                  <option value="">All Users</option>
                  <option value="doctor">Doctors Only</option>
                  <option value="patient">Patients Only</option>
                  <option value="staff">Staff Only</option>
              </select>
           </div>

           <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message Body</label>
              <textarea 
                required 
                rows={4}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800 resize-none"
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})}
                placeholder="Type your global announcement here..."
              />
           </div>

           <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-3 rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2">
              {loading ? 'Transmitting...' : <><Send className="w-4 h-4" /> Send Global Broadcast</>}
           </button>
        </form>
      </div>
    </div>
  );
}
