"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { FiLogOut, FiX, FiChevronLeft, FiChevronRight, FiMenu } from "react-icons/fi";

export default function Sidebar({ items, roleName, isOpen, setIsOpen }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse sidebar on smaller desktops
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1280) {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-100 z-[70]
          flex flex-col transition-all duration-300 ease-in-out shadow-xl lg:shadow-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-[88px]" : "lg:w-[280px] w-full max-w-[300px] lg:max-w-none"}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 h-24 shrink-0 border-b border-slate-50">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex flex-col items-center justify-center text-white shadow-lg shadow-green-100 shrink-0">
               <img src="/logo2.png" alt="Logo" className="w-[70%] h-[70%] object-contain" />
            </div>
            {!isCollapsed && (
              <div className="animate-fade-in whitespace-nowrap">
                <h1 className="font-black text-[#111827] text-lg tracking-tight leading-none mb-1">SDI Healthcare</h1>
                <p className="text-[10px] text-[#16A34A] font-black uppercase tracking-[0.2em]">{roleName}</p>
              </div>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2.5 rounded-xl bg-slate-50 text-slate-400">
            <FiX size={20} />
          </button>
        </div>

        {/* Dynamic Nav Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 custom-scrollbar-hidden">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative
                  ${isActive 
                    ? "bg-green-50 text-[#16A34A] font-bold" 
                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  }`}
              >
                <div className={`shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-[#16A34A]" : "text-slate-300"}`}>
                  <Icon size={22} />
                </div>
                {!isCollapsed && (
                  <span className="text-[14px] animate-fade-in tracking-tight">{item.label}</span>
                )}
                {item.badge && !isCollapsed && (
                  <span className="ml-auto bg-[#16A34A] text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-sm">
                    {item.badge}
                  </span>
                )}
                {/* Active Indicator Line */}
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 w-1.5 h-6 bg-[#16A34A] rounded-r-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Quick Profile & Logout */}
        <div className="p-4 border-t border-slate-50 bg-slate-50/30 space-y-3">
          {!isCollapsed && (
            <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm mb-4">
               <div className="w-10 h-10 rounded-xl bg-[#16A34A] flex items-center justify-center text-white font-black text-xs">DO</div>
               <div className="overflow-hidden">
                  <p className="text-xs font-black text-[#111827] truncate">Doctor</p>
                  <p className="text-[10px] text-slate-400 font-bold truncate tracking-tight">doctor@medicare.com</p>
               </div>
            </div>
          )}
          
          <button 
            onClick={logout}
            className={`w-full flex items-center gap-4 py-4 rounded-2xl transition-all font-black uppercase tracking-widest text-[11px]
              ${isCollapsed ? "justify-center text-slate-300 hover:text-red-500" : "px-6 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white shadow-sm hover:shadow-red-100"}`}
          >
            <FiLogOut size={18} />
            {!isCollapsed && <span>Logout Account</span>}
          </button>
          
          {/* <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-full mt-2 items-center justify-center py-2 text-slate-200 hover:text-slate-400 transition-colors"
          >
            {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button> */}
        </div>
      </aside>
    </>
  );
}
