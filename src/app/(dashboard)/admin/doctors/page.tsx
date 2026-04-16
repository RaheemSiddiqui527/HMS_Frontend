"use client";
import React, { useEffect, useState } from 'react';
import { Stethoscope, Search, Activity, Trash2, Plus, X } from 'lucide-react';
import { adminService } from '../../../../services/admin.service';

export default function AdminDoctorsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [search, setSearch] = useState('');
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      // Hardcode role to 'doctor' for this specific view
      const data = await adminService.getAllUsers({ role: 'doctor', search });
      setUsers(data.data?.users || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
       fetchUsers();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

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
     if (!confirm("Are you sure you want to delete this doctor?")) return;
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
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Stethoscope className="w-5 h-5 text-emerald-600"/> Manage Doctors</h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Add, update, and manage verified physicians in the system.</p>
          </div>
          <button
             onClick={() => setShowDoctorModal(true)}
             className="text-[13px] font-extrabold text-blue-700 bg-blue-50 border border-blue-200 px-5 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-blue-100 transition-colors shadow-sm"
           >
             <Plus className="w-4 h-4" /> Add Doctor Profile
          </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col flex-1 overflow-hidden">
         <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between bg-white shrink-0">
            <div className="relative max-w-sm w-full">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               <input
                  type="text"
                  placeholder="Search doctors by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-[13px] w-full border border-slate-200 rounded-lg outline-none focus:border-emerald-500 font-bold"
               />
            </div>
         </div>

         <div className="flex-1 overflow-auto">
           <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="sticky top-0 bg-slate-50 z-10 border-b border-slate-200 shadow-sm">
                 <tr>
                    <th className="p-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">Provider Profile</th>
                    <th className="p-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">Credentials</th>
                    <th className="p-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">Status</th>
                    <th className="p-4 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {isLoadingUsers ? (
                    <tr>
                       <td colSpan={4} className="p-12 text-center text-slate-400 font-bold text-sm">Loading doctors roster...</td>
                    </tr>
                 ) : users.length === 0 ? (
                    <tr>
                       <td colSpan={4} className="p-12 text-center text-slate-400 font-bold text-sm flex flex-col items-center">
                         <Search className="w-8 h-8 mb-3 text-slate-300" />
                         No doctors found matching the given search.
                       </td>
                    </tr>
                 ) : (
                    users.map((user) => (
                       <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-100">
                                   {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <div>
                                   <div className="text-[13.5px] font-bold text-slate-800">Dr. {user.firstName} {user.lastName}</div>
                                   <div className="text-[11px] font-bold text-slate-400">{user.email}</div>
                                </div>
                             </div>
                          </td>
                          <td className="p-4">
                             <div className="text-[12px] font-bold text-slate-700">{user.specialization || 'General Practice'}</div>
                             <div className="text-[11px] font-semibold text-slate-400">Lic: {user.licenseNumber || 'Not provided'}</div>
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
                                   className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                                >
                                   <Activity className="w-4 h-4" />
                                </button>
                                <button
                                   onClick={() => handleDeleteUser(user._id)}
                                   title="Delete Profile"
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

      {showDoctorModal && (
         <AddDoctorModal
           onClose={() => setShowDoctorModal(false)}
           onSuccess={() => {
             setShowDoctorModal(false);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
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
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800"
                   value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800"
                   value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
               </div>
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
               <input type="email" required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800"
                 value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Temporary Password</label>
               <input type="password" required minLength={6} className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800"
                 value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>

            <div className="mb-4">
               <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
               <input className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800"
                 value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Specialization</label>
                 <select required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800 bg-white"
                   value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})}>
                     <option value="" disabled>Select Specialization</option>
                     <option value="Cardiology">Cardiology</option>
                     <option value="Neurology">Neurology</option>
                     <option value="Orthopedics">Orthopedics</option>
                     <option value="Pediatrics">Pediatrics</option>
                     <option value="General Practice">General Practice</option>
                     <option value="Dermatology">Dermatology</option>
                     <option value="Gynecology">Gynecology</option>
                     <option value="Psychiatry">Psychiatry</option>
                     <option value="Oncology">Oncology</option>
                     <option value="Urology">Urology</option>
                 </select>
               </div>
               <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-1">License No.</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold text-slate-800"
                   value={formData.licenseNumber} onChange={e => setFormData({...formData, licenseNumber: e.target.value})} />
               </div>
            </div>

            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-sm py-3 rounded-lg transition-colors shadow-sm">
               {loading ? 'Processing...' : 'Register Doctor Profile'}
            </button>
         </form>
      </div>
    </div>
  );
}
