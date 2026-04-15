"use client";
import React, { useEffect, useState } from 'react';
import { Plus, Users, UserPlus, Activity, Database, Search, Trash2, Edit, X } from 'lucide-react';
import { adminService } from '../../../services/admin.service';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Modals state
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);

  // Filters for user table
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchStats = async () => {
    try {
      const data = await adminService.getStats();
      setStats(data.data);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const data = await adminService.getAllUsers({ role: roleFilter, status: statusFilter, search });
      setUsers(data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
       fetchUsers();
    }, 400); // 400ms debounce on search
    return () => clearTimeout(delayDebounceFn);
  }, [roleFilter, statusFilter, search]);

  const handleUpdateStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
       await adminService.updateUserStatus(userId, newStatus);
       fetchUsers();
       fetchStats(); // Update stats block
    } catch (error) {
       console.error("Failed to update status", error);
       alert("Failed to update status");
    }
  };

  const handleDeleteUser = async (userId: string) => {
     if (!confirm("Are you sure you want to delete this user?")) return;
     try {
       // Using hard delete false to do a soft delete or true based on backend design
       await adminService.deleteUser(userId, false);
       fetchUsers();
       fetchStats();
     } catch(error) {
       console.error("Failed to delete user", error);
       alert("Failed to delete user");
     }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Quick Stats Integration Section */}
      {!isLoadingStats && stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 shrink-0 bg-white border-b border-slate-200">
          <StatsCard
             title="Total Patients"
             value={stats.totalPatients}
             icon={<Users className="w-5 h-5 text-blue-600" />}
             bgColor="bg-blue-50"
             borderColor="border-blue-100"
          />
          <StatsCard
             title="Active Doctors"
             value={stats.totalDoctors}
             icon={<Activity className="w-5 h-5 text-emerald-600" />}
             bgColor="bg-emerald-50"
             borderColor="border-emerald-100"
          />
          <StatsCard
             title="Hospital Staff"
             value={stats.totalStaff}
             icon={<UserPlus className="w-5 h-5 text-purple-600" />}
             bgColor="bg-purple-50"
             borderColor="border-purple-100"
          />
          <StatsCard
             title="System Users"
             value={stats.totalUsers}
             icon={<Database className="w-5 h-5 text-slate-600" />}
             bgColor="bg-slate-50"
             borderColor="border-slate-100"
          />
        </div>
      )}

      {/* User Management Section */}
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
           <h2 className="text-xl font-black text-slate-800">User Management</h2>

           {/* Add Doctor / Staff buttons */}
           <div className="flex gap-2">
             <button
               onClick={() => setShowDoctorModal(true)}
               className="text-[13px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-blue-100 transition-colors"
             >
               <Plus className="w-4 h-4" /> Add Doctor
             </button>
             <button
               onClick={() => setShowStaffModal(true)}
               className="text-[13px] font-extrabold text-purple-700 bg-purple-50 border border-purple-200 px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-purple-100 transition-colors"
             >
               <Plus className="w-4 h-4" /> Add Staff
             </button>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
           {/* Table Toolbar */}
           <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between bg-white">
              <div className="relative max-w-sm w-full">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 w-full text-sm border border-slate-200 rounded-lg outline-none focus:border-primary-500 font-medium"
                 />
              </div>
              <div className="flex gap-3 items-center">
                 <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 font-medium bg-white"
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
                    className="text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 font-medium bg-white"
                 >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                 </select>
              </div>
           </div>

           {/* Table */}
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                   <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 text-xs font-bold tracking-wider text-slate-500 uppercase">User Info</th>
                      <th className="p-4 text-xs font-bold tracking-wider text-slate-500 uppercase">Role</th>
                      <th className="p-4 text-xs font-bold tracking-wider text-slate-500 uppercase">Status</th>
                      <th className="p-4 text-xs font-bold tracking-wider text-slate-500 uppercase text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {isLoadingUsers ? (
                      <tr>
                         <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">Loading users...</td>
                      </tr>
                   ) : users.length === 0 ? (
                      <tr>
                         <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">No users found matching the criteria.</td>
                      </tr>
                   ) : (
                      users.map((user) => (
                         <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0">
                                     {user.firstName[0]}{user.lastName[0]}
                                  </div>
                                  <div>
                                     <div className="text-sm font-bold text-slate-800">{user.firstName} {user.lastName}</div>
                                     <div className="text-xs font-medium text-slate-500">{user.email}</div>
                                  </div>
                               </div>
                            </td>
                            <td className="p-4">
                               <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                  user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' :
                                  user.role === 'doctor' ? 'bg-emerald-100 text-emerald-700' :
                                  user.role === 'staff' ? 'bg-purple-100 text-purple-700' :
                                  'bg-blue-100 text-blue-700'
                               }`}>
                                  {user.role}
                               </span>
                            </td>
                            <td className="p-4">
                               <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                  user.status === 'active' ? 'bg-green-100 text-green-700' :
                                  user.status === 'inactive' ? 'bg-red-100 text-red-700' :
                                  'bg-amber-100 text-amber-700'
                               }`}>
                                  {user.status}
                               </span>
                            </td>
                            <td className="p-4 text-right">
                               <div className="flex items-center gap-2 justify-end">
                                  <button
                                     onClick={() => handleUpdateStatus(user._id, user.status)}
                                     title="Toggle Status"
                                     className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                                  >
                                     <Activity className="w-4 h-4" />
                                  </button>
                                  <button
                                     onClick={() => handleDeleteUser(user._id)}
                                     title="Delete User"
                                     className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
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

      {showDoctorModal && (
         <AddDoctorModal
           onClose={() => setShowDoctorModal(false)}
           onSuccess={() => {
             setShowDoctorModal(false);
             fetchStats();
             fetchUsers();
           }}
         />
      )}

      {showStaffModal && (
         <AddStaffModal
           onClose={() => setShowStaffModal(false)}
           onSuccess={() => {
             setShowStaffModal(false);
             fetchStats();
             fetchUsers();
           }}
         />
      )}
    </div>
  );
}

function AddDoctorModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
      firstName: '', lastName: '', email: '', password: '',
      specialization: '', licenseNumber: '', phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminService.createDoctor(formData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to create doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
         <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Plus className="w-5 h-5 text-blue-600"/> Register Doctor</h3>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-400"><X className="w-5 h-5"/></button>
         </div>
         <form onSubmit={handleSubmit} className="p-6">
            {error && <div className="mb-4 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

            <div className="grid grid-cols-2 gap-4 mb-4">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">First Name</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
                   value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
                   value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
               </div>
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
               <input type="email" required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
                 value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Temporary Password</label>
               <input type="password" required minLength={6} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
                 value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
               <input className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
                 value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Specialization</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
                   value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">License No.</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-medium"
                   value={formData.licenseNumber} onChange={e => setFormData({...formData, licenseNumber: e.target.value})} />
               </div>
            </div>

            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-2.5 rounded-lg transition-colors">
               {loading ? 'Processing...' : 'Register Doctor Profile'}
            </button>
         </form>
      </div>
    </div>
  );
}

function AddStaffModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
  const [formData, setFormData] = useState({
      firstName: '', lastName: '', email: '', password: '',
      designation: '', department: '', phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminService.createStaff(formData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to create staff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
         <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Plus className="w-5 h-5 text-purple-600"/> Register Staff</h3>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded text-slate-400"><X className="w-5 h-5"/></button>
         </div>
         <form onSubmit={handleSubmit} className="p-6">
            {error && <div className="mb-4 text-xs font-bold text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

            <div className="grid grid-cols-2 gap-4 mb-4">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">First Name</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-purple-500 font-medium"
                   value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-purple-500 font-medium"
                   value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
               </div>
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
               <input type="email" required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-purple-500 font-medium"
                 value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Temporary Password</label>
               <input type="password" required minLength={6} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-purple-500 font-medium"
                 value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
               <input className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-purple-500 font-medium"
                 value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Designation</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-purple-500 font-medium"
                   value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Department</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-purple-500 font-medium"
                   value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} />
               </div>
            </div>

            <button disabled={loading} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm py-2.5 rounded-lg transition-colors">
               {loading ? 'Processing...' : 'Register Staff Profile'}
            </button>
         </form>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon, bgColor, borderColor }: { title: string, value: number, icon: React.ReactNode, bgColor: string, borderColor: string }) {
  return (
    <div className={`p-4 rounded-2xl border ${borderColor} ${bgColor} flex items-center gap-4 transition-all hover:shadow-sm`}>
       <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-xs border border-white/50 shrink-0">
          {icon}
       </div>
       <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">{title}</div>
          <div className="text-xl font-black text-slate-900 leading-tight">{value}</div>
       </div>
    </div>
  );
}
