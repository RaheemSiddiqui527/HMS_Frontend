"use client";
import React, { useEffect, useState } from 'react';
import { Users, Search, Activity, Trash2 } from 'lucide-react';
import { adminService } from '../../../../services/admin.service';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Filters for user table
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const data = await adminService.getAllUsers({ role: roleFilter, status: statusFilter, search });
      setUsers(data.data?.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
       fetchUsers();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [roleFilter, statusFilter, search]);

  const handleUpdateStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
       await adminService.updateUserStatus(userId, newStatus);
       fetchUsers();
    } catch (error) {
       console.error("Failed to update status", error);
       alert("Failed to update status");
    }
  };

  const handleDeleteUser = async (userId: string) => {
     if (!confirm("Are you sure you want to delete this user?")) return;
     try {
       await adminService.deleteUser(userId, false);
       fetchUsers();
     } catch(error) {
       console.error("Failed to delete user", error);
       alert("Failed to delete user");
     }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Users className="w-5 h-5 text-slate-600"/> User Directory</h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Manage global access for patients, doctors, and staff.</p>
          </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col flex-1 overflow-hidden">
         {/* Table Toolbar */}
         <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between bg-white shrink-0">
            <div className="relative max-w-sm w-full">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-[13px] w-full border border-slate-200 rounded-lg outline-none focus:border-primary-500 font-bold"
               />
            </div>
            <div className="flex gap-3 items-center">
               <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="text-[13px] border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 font-bold bg-slate-50"
               >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff</option>
                  <option value="patient">Patient</option>
               </select>

               <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-[13px] border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 font-bold bg-slate-50"
               >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
               </select>
            </div>
         </div>

         {/* Table */}
         <div className="flex-1 overflow-auto">
           <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200 shadow-sm">
                 <tr>
                    <th className="p-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">User Info</th>
                    <th className="p-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">Role</th>
                    <th className="p-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">Status</th>
                    <th className="p-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {isLoadingUsers ? (
                    <tr>
                       <td colSpan={4} className="p-12 text-center text-slate-400 font-bold text-sm">Synchronizing directory data...</td>
                    </tr>
                 ) : users.length === 0 ? (
                    <tr>
                       <td colSpan={4} className="p-12 text-center text-slate-400 font-bold text-sm flex flex-col items-center">
                         <Search className="w-8 h-8 mb-3 text-slate-300" />
                         No users found matching the given criteria.
                       </td>
                    </tr>
                 ) : (
                    users.map((user) => (
                       <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                             <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
                                   {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <div>
                                   <div className="text-[13px] font-bold text-slate-800">{user.firstName} {user.lastName}</div>
                                   <div className="text-[11px] font-bold text-slate-400">{user.email}</div>
                                </div>
                             </div>
                          </td>
                          <td className="p-4">
                             <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' :
                                user.role === 'doctor' ? 'bg-emerald-100 text-emerald-700' :
                                user.role === 'staff' ? 'bg-purple-100 text-purple-700' :
                                'bg-blue-100 text-blue-700'
                             }`}>
                                {user.role}
                             </span>
                          </td>
                          <td className="p-4">
                             <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${
                                  user.status === 'active' ? 'bg-green-500' :
                                  user.status === 'inactive' ? 'bg-red-500' : 'bg-amber-500'
                                }`}></span>
                                <span className="text-[12px] font-bold text-slate-600 capitalize">
                                   {user.status}
                                </span>
                             </div>
                          </td>
                          <td className="p-4 text-right">
                             <div className="flex items-center gap-2 justify-end">
                                <button
                                   onClick={() => handleUpdateStatus(user._id, user.status)}
                                   title="Toggle Status"
                                   className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                                >
                                   <Activity className="w-4 h-4" />
                                </button>
                                <button
                                   onClick={() => handleDeleteUser(user._id)}
                                   title="Delete User"
                                   className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                >
                                   <Trash2 className="w-4 h-4" />
                                </button>
                             </div>
                          </td>
                       </tr>
                    ))
                 )}
              </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
