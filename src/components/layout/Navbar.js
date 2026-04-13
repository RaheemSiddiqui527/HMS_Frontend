"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { FiBell, FiMenu, FiSearch, FiChevronDown, FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { useState } from "react";

export default function Navbar({ title, subtitle, onMenuClick }) {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-20 bg-white/70 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between border-b border-slate-100">
      {/* Search & Menu Trigger */}
      <div className="flex items-center gap-3 sm:gap-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-3 rounded-xl bg-white text-slate-500 hover:text-[#16A34A] border border-slate-200 shadow-sm transition-all active:scale-95"
          aria-label="Open Menu"
        >
          <FiMenu size={22} />
        </button>
        
        {/* Simple Search - Desktop/Tablet */}
        <div className="hidden sm:flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-5 py-3 w-80 lg:w-[480px] xl:w-[600px] focus-within:bg-white focus-within:border-[#16A34A] focus-within:ring-[6px] focus-within:ring-green-50/50 transition-all group shadow-inner">
          <FiSearch className="text-slate-400 group-focus-within:text-[#16A34A] transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search records, patients or doctors..." 
            className="bg-transparent border-none outline-none px-4 text-sm font-black text-slate-700 w-full placeholder:text-slate-300 tracking-tight"
          />
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Quick Search - Mobile only */}
        <button className="sm:hidden p-3 rounded-xl text-slate-400 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
          <FiSearch size={20} />
        </button>

        {/* Notification Bell */}
        <button className="relative p-3 rounded-xl bg-slate-50 sm:bg-white border border-slate-100 text-slate-400 hover:text-[#16A34A] hover:border-[#16A34A] transition-all group shadow-sm sm:shadow-none">
          <FiBell size={20} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/10 group-hover:scale-125 transition-transform" />
        </button>

        <div className="h-8 w-px bg-slate-100 mx-1 hidden sm:block" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#111827] border-2 border-white flex items-center justify-center text-white font-black text-xs shadow-lg transition-transform group-hover:scale-105">
              {user?.avatar || "JD"}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-black text-[#111827] leading-none mb-1">{user?.name || "John Doe"}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user?.role || "Patient"}</p>
            </div>
            <FiChevronDown className={`text-slate-300 transition-transform hidden md:block ${dropdownOpen ? 'rotate-180' : ''}`} size={14} />
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-2 z-50 animate-scale-in origin-top-right">
                <div className="px-6 py-5 border-b border-slate-50 text-center md:text-left">
                   <div className="md:hidden w-16 h-16 rounded-2xl bg-[#16A34A] mx-auto mb-3 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-green-100">JD</div>
                   <p className="text-sm font-black text-[#111827] mb-0.5">{user?.name || "John Doe"}</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight truncate leading-none mb-4">{user?.email || "patient@medicare.com"}</p>
                   <span className="inline-block px-3 py-1 bg-green-50 text-[#16A34A] text-[9px] font-black uppercase rounded-lg border border-green-100/50">Verified Account</span>
                </div>
                <div className="p-2 space-y-1">
                  <button className="w-full flex items-center gap-3.5 px-5 py-3.5 text-left text-[13px] font-black text-slate-600 hover:bg-slate-50 rounded-2xl transition-all">
                    <FiUser size={18} className="text-slate-300" /> Account Details
                  </button>
                  <button className="w-full flex items-center gap-3.5 px-5 py-3.5 text-left text-[13px] font-black text-slate-600 hover:bg-slate-50 rounded-2xl transition-all">
                    <FiSettings size={18} className="text-slate-300" /> System Params
                  </button>
                  <div className="h-px bg-slate-50 my-2 mx-4" />
                  <button onClick={logout} className="w-full flex items-center gap-3.5 px-5 py-3.5 text-left text-[13px] font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                    <FiLogOut size={18} className="text-red-400" /> Logout Securely
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
