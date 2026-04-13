"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { FiGrid, FiUsers, FiBriefcase, FiUser, FiPieChart, FiSettings } from "react-icons/fi";

const ADMIN_SIDEBAR_ITEMS = [
  { label: "Overview", href: "/admin/dashboard", icon: FiGrid },
  { label: "Doctors", href: "/admin/doctors", icon: FiUsers },
  { label: "Staff", href: "/admin/staff", icon: FiBriefcase },
  { label: "Patients", href: "/admin/patients", icon: FiUser },
  { label: "Reports", href: "/admin/reports", icon: FiPieChart, badge: "Live" },
  { label: "Settings", href: "/admin/settings", icon: FiSettings },
];

export default function AdminLayout({ children }) {
  return (
    <DashboardLayout
      role="admin"
      roleName="System Administrator"
      sidebarItems={ADMIN_SIDEBAR_ITEMS}
      pageTitle="Admin Dashboard"
      pageSubtitle="Comprehensive system-wide overview"
    >
      {children}
    </DashboardLayout>
  );
}
