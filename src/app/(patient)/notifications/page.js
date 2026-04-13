"use client";

import { useState } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import { FiBell, FiCheckCircle, FiCalendar, FiFileText, FiGift, FiSmile, FiRefreshCw } from "react-icons/fi";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: "Appointment Reminder", 
      desc: "You have an upcoming appointment with Dr. Sarah Jenkins (Cardiology) tomorrow at 10:00 AM. Please arrive 15 minutes early.", 
      type: "appointment", 
      time: "2 hours ago",
      icon: FiCalendar,
      color: "bg-green-50 text-[#16A34A] border-green-100",
      unread: true
    },
    { 
      id: 2, 
      title: "Prescription Ready", 
      desc: "The prescription from your last consultation is now available. You can view or download the PDF from your medical history.", 
      type: "prescription", 
      time: "5 hours ago",
      icon: FiFileText,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      unread: true
    },
    { 
      id: 3, 
      title: "Happy Birthday, John!", 
      desc: "Wishing you a wonderful birthday from the entire MediCare family! We wish you a year filled with happiness and excellent health.", 
      type: "personal", 
      time: "Oct 15, 2023",
      icon: FiGift,
      color: "bg-orange-50 text-orange-600 border-orange-100",
      unread: false
    },
    { 
      id: 4, 
      title: "Eid Mubarak!", 
      desc: "Eid Mubarak to you and your family! May this special day bring peace, happiness, and prosperity to everyone.", 
      type: "greeting", 
      time: "Jun 28, 2023",
      icon: FiSmile,
      color: "bg-purple-50 text-purple-600 border-purple-100",
      unread: false
    },
    { 
      id: 5, 
      title: "Appointment Completed", 
      desc: "Your consultation with Dr. Michael Chang (Dentistry) was completed successfully. Don't forget to leave a review of your experience.", 
      type: "log", 
      time: "Jun 10, 2023",
      icon: FiCheckCircle,
      color: "bg-slate-50 text-slate-400 border-slate-100",
      unread: false
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({...n, unread: false})));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-1">
        <div>
          <h1 className="text-3xl font-black text-[#111827] tracking-tight">Notifications</h1>
          <p className="text-sm text-slate-400 font-bold mt-1">Stay updated with your appointments, medical records, and reminders.</p>
        </div>
        <Button 
          variant="secondary" 
          size="sm" 
          icon={FiCheckCircle} 
          onClick={markAllRead}
          className="px-6 rounded-xl text-[11px] font-black uppercase tracking-widest border border-slate-100 hover:bg-[#16A34A] hover:text-white transition-all"
        >
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <Card 
            key={n.id} 
            className={`border-none shadow-sm transition-all hover:shadow-md group rounded-[2rem] overflow-hidden
              ${n.unread ? 'bg-white' : 'bg-white/60 opcaity-80'}`}
          >
            <CardContent className="p-6 sm:p-8 flex items-start gap-6">
              {/* Category Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110 shadow-sm border ${n.color}`}>
                <n.icon />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="flex items-center gap-3 text-lg font-black text-[#111827]">
                    {n.title}
                    {n.unread && (
                      <span className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                    )}
                  </h4>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">
                    {n.time}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
                  {n.desc}
                </p>
              </div>

              {/* Quick Actions Hidden on small */}
              <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-slate-600 transition-opacity">
                <FiRefreshCw size={16} />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="h-20" /> {/* Spacing */}
    </div>
  );
}
