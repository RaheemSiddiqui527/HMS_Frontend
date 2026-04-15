import React from 'react';
import { Plus, ChevronLeft, ChevronRight, ChevronDown, Filter, Calendar as CalendarIcon, MoreHorizontal, User } from 'lucide-react';

export default function DoctorDashboardPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Calendar Top ActionBar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center border border-primary-100">
            <CalendarIcon className="w-4 h-4 text-primary-600" />
          </div>
          <div className="font-extrabold text-slate-800 text-[19px]">Doctor Dashboard</div>
        </div>
        <button className="text-[13px] font-extrabold text-primary-700 flex items-center gap-1.5 hover:text-primary-800 transition-colors bg-white">
          Create Appointment <Plus className="w-4 h-4 text-primary-600" />
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
              6 <span className="font-medium text-slate-500">appointments this week</span>
            </span>
          </div>

          <div className="flex items-center text-[13px] font-extrabold text-primary-700 gap-1.5 cursor-pointer px-2">
            <CalendarIcon className="w-4 h-4"/> Today
          </div>

          <div className="font-extrabold text-[15px] text-slate-900 flex items-center gap-4 ml-1">
             14 April – 16 April, 2025
             <div className="flex items-center gap-1.5 text-slate-400">
               <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-slate-800 transition-colors" />
               <ChevronRight className="w-4 h-4 cursor-pointer hover:text-slate-800 transition-colors" />
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white rounded-md text-[13px] font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
             <CalendarIcon className="w-4 h-4 text-slate-400" /> 3 day week <ChevronDown className="w-3 h-3 text-slate-400 ml-1" />
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white rounded-md text-[13px] font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
             <Filter className="w-4 h-4 text-slate-400" /> Filter
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-auto bg-slate-50">
        <div className="min-w-[800px] h-full flex flex-col">

          {/* Day Headers */}
          <div className="grid grid-cols-[80px_1fr_1fr_1fr] border-b border-slate-200 shrink-0 bg-white">
            <div className="p-4 flex flex-col items-center justify-center border-r border-slate-200">
              <span className="text-[10px] font-bold text-slate-400">GMT</span>
              <span className="text-[10px] font-bold text-slate-400">+01:00</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center border-r border-slate-200">
              <span className="text-[13px] font-medium text-slate-500">Monday, 14</span>
              <span className="text-[11px] font-bold text-slate-800 mt-0.5">1 appointment</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center border-r border-slate-200">
              <span className="text-[13px] font-medium text-slate-500">Tuesday, 15</span>
              <span className="text-[11px] font-bold text-slate-800 mt-0.5">2 appointments</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center border-r border-slate-200">
              <span className="text-[13px] font-medium text-slate-500">Wednesday, 16</span>
              <span className="text-[11px] font-bold text-slate-800 mt-0.5">2 appointments</span>
            </div>
          </div>

          {/* Time Rows Container */}
          <div
            className="flex-1 relative"
            style={{
               backgroundImage: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%, transparent 75%, #f8fafc 75%, #f8fafc), linear-gradient(45deg, #f8fafc 25%, transparent 25%, transparent 75%, #f8fafc 75%, #f8fafc)',
               backgroundSize: '20px 20px',
               backgroundPosition: '0 0, 10px 10px',
               backgroundColor: 'white'
             }}
          >
            {[8, 9, 10, 11, 12, 1].map((hour, i) => (
               <div key={i} className="absolute w-full border-t border-slate-100 flex h-24" style={{ top: `${i * 96}px` }}>
                  <div className="w-[80px] bg-white flex items-start justify-center pt-2 border-r border-slate-200 shrink-0 relative z-10">
                     <span className="text-[11px] font-bold text-slate-400 tracking-wide">{hour}{hour === 1 ? 'pm' : 'am'}</span>
                  </div>
                  <div className="flex-1 flex border-r border-slate-100 relative bg-white/70"></div>
                  <div className="flex-1 flex border-r border-slate-100 relative bg-white/70"></div>
                  <div className="flex-1 flex border-r border-slate-100 relative bg-white/70"></div>
               </div>
            ))}

            {/* Event 1: Coronary Bypass (Monday 8:30 - 11:00) */}
            <div className="absolute left-[80px] top-[48px] w-[calc(33.33%-27px)] h-[240px] ml-3 mt-1 bg-[#eaf5f0] border border-[#d6ede4] rounded-xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-20 flex flex-col shadow-sm cursor-pointer hover:shadow-md transition-shadow">
               <div className="flex gap-2 mb-3">
                  <span className="bg-primary-100/60 text-primary-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Cardiology</span>
                  <span className="bg-blue-100/60 text-blue-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">Surgery Intervention</span>
               </div>
               <h4 className="text-[15px] font-black text-slate-800 leading-snug mb-1.5 pr-4">Coronary Bypass Surgery – Patient William Carter</h4>
               <p className="text-[12px] font-bold text-slate-500">8:30am – 11:00am</p>
               <div className="mt-auto flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center overflow-hidden shrink-0">
                    <User className="w-3 h-3 text-white" />
                 </div>
                 <div className="text-[11px] font-bold text-slate-600 leading-tight">
                   You <span className="font-medium text-slate-500">(Dr. Mia Lewis)</span><br/>+ 4 others
                 </div>
               </div>
            </div>

            {/* Event 2: Olivia Bennett (Tuesday 10:15 - 11:30) */}
            <div className="absolute left-[calc(80px+33.33%-26px)] top-[216px] w-[calc(33.33%-27px)] h-[120px] ml-3 mt-1 bg-[#f0f8f5] border border-[#e2efe9] rounded-xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-20 flex flex-col cursor-pointer hover:shadow-md transition-shadow">
               <div className="mb-2">
                  <span className="bg-primary-100/60 text-primary-700 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">Health Status</span>
               </div>
               <h4 className="text-[13px] font-black text-slate-800 leading-snug mb-1 pr-4">Olivia Bennett – Health Status</h4>
               <p className="text-[11px] font-bold text-slate-500 mb-2">10:15am – 11:30am</p>
               <div className="mt-auto flex items-center justify-between">
                 <div className="text-[11px] font-bold text-slate-600 leading-tight">
                   You <span className="font-medium text-slate-500">(Dr. Mia Lewis)</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
