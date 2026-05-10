"use client";
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useRouter } from 'next/navigation';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 relative">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col h-full w-0 overflow-hidden relative bg-white md:bg-slate-50">
         <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
         <main className="flex-1 overflow-auto bg-white md:m-4 md:rounded-[2rem] md:border border-slate-200 md:shadow-sm relative">
           {children}
         </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
