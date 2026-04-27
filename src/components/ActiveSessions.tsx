'use client';

import React, { useEffect, useState } from 'react';
import { authService } from '../services/auth.service';
import { Monitor, Smartphone, Tablet, LogOut, Shield, MapPin, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Session {
  _id: string;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
  };
  ipAddress: string;
  lastActive: string;
  createdAt: string;
  token: string;
}

const ActiveSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  useEffect(() => {
    fetchSessions();
    setCurrentToken(localStorage.getItem('token'));
  }, []);

  const fetchSessions = async () => {
    try {
      const data = await authService.getSessions();
      setSessions(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRevoke = async (sessionId: string) => {
    try {
      await authService.revokeSession(sessionId);
      toast.success('Session logged out');
      fetchSessions();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleRevokeOthers = async () => {
    try {
      await authService.revokeAllOtherSessions();
      toast.success('Other sessions logged out');
      fetchSessions();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return <Smartphone className="w-5 h-5" />;
      case 'Tablet': return <Tablet className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-16 bg-slate-50 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900">Active Sessions</h3>
          <p className="text-xs text-slate-500">Currently logged in devices</p>
        </div>
        {sessions.length > 1 && (
          <button
            onClick={handleRevokeOthers}
            className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider"
          >
            Logout others
          </button>
        )}
      </div>

      <div className="space-y-3">
        {sessions.map((session) => {
          const isCurrent = session.token === currentToken;
          
          return (
            <div
              key={session._id}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrent 
                  ? 'border-slate-900 bg-white shadow-sm' 
                  : 'border-slate-100 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isCurrent ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'
                  }`}>
                    {getDeviceIcon(session.deviceInfo.device)}
                  </div>
                  
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {session.deviceInfo.browser} on {session.deviceInfo.os}
                      </span>
                      {isCurrent && (
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-slate-100 text-slate-600 rounded uppercase">
                          Current
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-4 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {session.ipAddress}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(session.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                {!isCurrent && (
                  <button
                    onClick={() => handleRevoke(session._id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-3 items-start">
        <Shield className="w-4 h-4 text-slate-400 mt-0.5" />
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Unrecognized activity? We recommend updating your security credentials and terminating all other sessions immediately.
        </p>
      </div>
    </div>
  );
};

export default ActiveSessions;
