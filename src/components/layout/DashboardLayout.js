"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({ children, sidebarItems, roleName, pageTitle, pageSubtitle }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Robust responsive monitor
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // Laptop / Medium screens (1024px to 1366px)
      if (width >= 1024 && width < 1366) {
        setIsCollapsed(true);
      } 
      // Large screens (Above 1366px)
      else if (width >= 1366) {
        setIsCollapsed(false);
      }
      // Tablet / Mobile (Below 1024px)
      else {
        setIsSidebarOpen(false);
        setIsCollapsed(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial trigger
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex overflow-x-hidden relative selection:bg-green-100 selection:text-green-900">
      {/* Sidebar - Precision Control */}
      <Sidebar 
        items={sidebarItems} 
        roleName={roleName} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      
      {/* Main Content Hub - No Overlap Guaranteed */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out relative
        ${isCollapsed ? "lg:pl-[88px]" : "lg:pl-[280px]"}
        ${isSidebarOpen ? "pl-0" : "pl-0"}
      `}>
        <Navbar 
          title={pageTitle} 
          subtitle={pageSubtitle} 
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        
        <main className="p-4 sm:p-6 lg:p-10 flex-1 animate-fade-in w-full overflow-y-auto">
          <div className="max-w-full mx-auto space-y-8 pb-32">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Close (Manual Trigger) */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          .lg\\:pl-\\[280px\\] { padding-left: 0 !important; }
          .lg\\:pl-\\[88px\\] { padding-left: 0 !important; }
        }
      `}</style>
    </div>
  );
}
