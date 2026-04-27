"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Bell, CheckCircle2, Trash2, RefreshCw, X } from 'lucide-react';
import { notificationService } from '../../../../services/notification.service';

interface Notification { _id: string; title: string; message: string; isRead: boolean; createdAt: string; type?: string; }

export default function StaffNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all'|'unread'>('all');

  const toArray = (v: any): any[] => Array.isArray(v) ? v : [];

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await notificationService.getNotifications({ limit: 50 });
      const d = res?.data;
      setNotifications(toArray(d?.notifications ?? d));
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleMarkRead = async (id: string) => {
    await notificationService.markAsRead(id);
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAll = async () => {
    await notificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDelete = async (id: string) => {
    await notificationService.deleteNotification(id);
    setNotifications(prev => prev.filter(n => n._id !== id));
  };

  const displayed = filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications;
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="h-full flex flex-col bg-slate-50/50 overflow-auto">
      <div className="bg-white border-b border-slate-100 px-4 sm:px-8 py-5 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-black text-slate-900">Notifications</h1>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">{unreadCount} unread messages</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={handleMarkAll} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 border border-slate-100 bg-white px-3 py-2 rounded-xl transition-all">
              Mark all read
            </button>
          )}
          <button onClick={fetchData} className="w-10 h-10 rounded-xl border border-slate-100 bg-white flex items-center justify-center hover:border-slate-900 transition-all group">
            <RefreshCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-all duration-500" />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="bg-white border-b border-slate-100 px-8 flex gap-0 shrink-0">
        {(['all', 'unread'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-5 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${filter === f ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>
            {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-3">
          {isLoading ? (
            [...Array(5)].map((_, i) => <div key={i} className="animate-pulse bg-white rounded-[2rem] border border-slate-100 p-6 h-20" />)
          ) : displayed.length === 0 ? (
            <div className="py-24 text-center">
              <Bell className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{filter === 'unread' ? 'All caught up!' : 'No notifications'}</p>
            </div>
          ) : displayed.map(n => (
            <div key={n._id}
              className={`bg-white rounded-[2rem] border transition-all px-6 py-5 flex items-start gap-4 group cursor-pointer ${!n.isRead ? 'border-slate-200 shadow-sm' : 'border-slate-100 opacity-60'}`}
              onClick={() => !n.isRead && handleMarkRead(n._id)}>
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.isRead ? 'bg-slate-200' : 'bg-slate-900'}`} />
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-slate-900">{n.title}</p>
                <p className="text-[12px] text-slate-500 font-bold mt-0.5 leading-relaxed">{n.message}</p>
                <p className="text-[10px] text-slate-400 mt-1.5">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                {!n.isRead && (
                  <button onClick={e => { e.stopPropagation(); handleMarkRead(n._id); }}
                    className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button onClick={e => { e.stopPropagation(); handleDelete(n._id); }}
                  className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
