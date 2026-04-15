import React from 'react';
import { Plus, ChevronLeft, ChevronRight, ChevronDown, Filter, Calendar as CalendarIcon, User } from 'lucide-react';

export default function PatientDashboardPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Calendar Top ActionBar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center border border-primary-100">
            <CalendarIcon className="w-4 h-4 text-primary-600" />
          </div>
          <div className="font-extrabold text-slate-800 text-[19px]">My Patient Portal</div>
        </div>
        <button className="text-[13px] font-extrabold text-primary-700 flex items-center gap-1.5 hover:text-primary-800 transition-colors bg-white">
          Book Appointment <Plus className="w-4 h-4 text-primary-600" />
        </button>
      </div>

      {/* Calendar Toolbar */}
      <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 shrink-0 bg-white">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 border-r border-slate-200 pr-5">
            <div className="w-7 h-7 bg-slate-100 border border-slate-200 rounded flex items-center justify-center">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-600" />
            </div>
            <span className="font-extrabold text-[15px] text-slate-900 flex items-center gap-1.5">
              1 <span className="font-medium text-slate-500">upcoming appointment</span>
            </span>
          </div>

          <div className="flex items-center text-[13px] font-extrabold text-primary-700 gap-1.5 cursor-pointer px-2">
            <CalendarIcon className="w-4 h-4"/> Today
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 bg-slate-50 overflow-auto">
         <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center max-w-lg mx-auto mt-20">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
               <User className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Welcome to Your Portal</h3>
            <p className="text-slate-500 font-medium">As requested, your dashboard is currently mirroring the administrative layout structure. Your personal medical records and prescriptions will be displayed here soon.</p>
         </div>
      </div>
    </div>
  );
}
