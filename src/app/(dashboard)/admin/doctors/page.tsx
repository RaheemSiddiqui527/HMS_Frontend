"use client";
import React, { useEffect, useState } from 'react';
import { Stethoscope, Search, Activity, Trash2, Plus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { adminService } from '../../../../services/admin.service';
import { toast } from 'react-hot-toast';

export default function AdminDoctorsPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [search, setSearch] = useState('');
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ currentPage: 1, pages: 1, total: 0, limit: 10 });

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const data = await adminService.getAllUsers({ 
         role: 'doctor', 
         search,
         page,
         limit: 10
      });
      setUsers(data.data?.users || []);
      setPagination(data.data?.pagination || { currentPage: 1, pages: 1, total: 0, limit: 10 });
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error("Failed to load doctors roster");
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
       fetchUsers();
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [search, page]);

  const handleUpdateStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
       await adminService.updateUserStatus(userId, newStatus);
       toast.success(`Status updated to ${newStatus}`);
       fetchUsers();
    } catch (error) {
       toast.error("Status update failed");
    }
  };

  const handleDeleteUser = async (userId: string) => {
     if (!confirm("Are you sure you want to delete this doctor?")) return;
     try {
       await adminService.deleteUser(userId, false);
       toast.success("Doctor profile deleted");
       fetchUsers();
     } catch(error) {
       toast.error("Deletion failed");
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
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
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
                                 <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                    <img 
                                       src={user.profileImage || (user.gender === 'female' ? '/images/avatars/female_ai.png' : '/images/avatars/male_ai.png')} 
                                       alt="Dr." 
                                       className="w-full h-full object-cover"
                                    />
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

         {/* Pagination Footer */}
         {!isLoadingUsers && pagination.pages > 1 && (
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Showing {users.length} of {pagination.total} Providers
               </div>
               <div className="flex items-center gap-2">
                  <button 
                     disabled={page === 1}
                     onClick={() => setPage(p => Math.max(1, p - 1))}
                     className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 disabled:opacity-30 hover:text-emerald-600 transition-all shadow-xs"
                  >
                     <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="text-[11px] font-black text-slate-600 px-3">
                     Page {pagination.currentPage} / {pagination.pages}
                  </div>
                  <button 
                     disabled={page >= pagination.pages}
                     onClick={() => setPage(p => p + 1)}
                     className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 disabled:opacity-30 hover:text-emerald-600 transition-all shadow-xs"
                  >
                     <ChevronRight className="w-4 h-4" />
                  </button>
               </div>
            </div>
         )}
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
      specialization: '', licenseNumber: '', phoneNumber: '',
      yearsOfExperience: 0, consultationFee: 0,
      gender: 'male', profileImage: '/images/avatars/male_ai.png'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await adminService.createDoctor(formData);
      toast.success("Doctor profile registered successfully");
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to create doctor');
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
         <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-linear-to-r from-slate-50 to-white">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                Register New Physician
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 ml-13">Add a verified doctor to the roster</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"><X className="w-6 h-6"/></button>
         </div>
         <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
            {error && <div className="mb-6 text-xs font-bold text-red-600 bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
              {error}
            </div>}

            <div className="grid grid-cols-2 gap-6 mb-6">
               <div className="space-y-1.5">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800"
                   value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
               </div>
               <div className="space-y-1.5">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800"
                   value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" required className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800"
                  value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800"
                  value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
              </div>
            </div>

            <div className="mb-6 space-y-1.5">
               <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Temporary Password</label>
               <input type="password" required minLength={6} className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-bold text-slate-800"
                 value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
               <div className="space-y-1.5">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Specialization</label>
                 <select required className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 font-bold text-slate-800 bg-white appearance-none cursor-pointer"
                   value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})}>
                     <option value="" disabled>Select Field</option>
                     {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Practice', 'Dermatology', 'Gynecology', 'Psychiatry', 'Oncology', 'Urology'].map(s => (
                       <option key={s} value={s}>{s}</option>
                     ))}
                 </select>
               </div>
               <div className="space-y-1.5">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">License Number</label>
                 <input required className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 font-bold text-slate-800 transition-all"
                   value={formData.licenseNumber} onChange={e => setFormData({...formData, licenseNumber: e.target.value})} />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
               <div className="space-y-1.5">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience (Yrs)</label>
                 <input type="number" required min={0} className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 font-bold text-slate-800"
                   value={formData.yearsOfExperience} onChange={e => setFormData({...formData, yearsOfExperience: parseInt(e.target.value) || 0})} />
               </div>
               <div className="space-y-1.5">
                 <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fee (USD)</label>
                 <input type="number" required min={0} className="w-full text-sm border border-slate-200 rounded-2xl px-4 py-3.5 outline-none focus:border-blue-500 font-bold text-slate-800"
                   value={formData.consultationFee} onChange={e => setFormData({...formData, consultationFee: parseInt(e.target.value) || 0})} />
               </div>
            </div>

            <div className="mb-10 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
               <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 text-center">Assign Provider Identity</label>
               <div className="grid grid-cols-4 gap-4">
                  {[
                    { url: '/images/avatars/male_ai.png', label: 'Male AI' },
                    { url: '/images/avatars/male1.png', label: 'Male 1' },
                    { url: '/images/avatars/female_ai.png', label: 'Female AI' },
                    { url: '/images/avatars/feamle 1.png', label: 'Female 1' }
                  ].map((avatar) => (
                    <button
                      key={avatar.url}
                      type="button"
                      onClick={() => setFormData({ ...formData, profileImage: avatar.url, gender: avatar.url.includes('female') || avatar.url.includes('feamle') ? 'female' : 'male' })}
                      className={`relative aspect-square rounded-[1.5rem] overflow-hidden border-2 transition-all duration-300 ${
                        formData.profileImage === avatar.url ? 'border-blue-600 scale-105 shadow-xl shadow-blue-600/20' : 'border-white hover:border-slate-200'
                      }`}
                    >
                      <img src={avatar.url} alt={avatar.label} className="w-full h-full object-cover" />
                      {formData.profileImage === avatar.url && (
                        <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                          <div className="bg-blue-600 text-white rounded-full p-1 shadow-lg">
                            <Plus className="w-3 h-3 rotate-45" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
               </div>
            </div>

            <button disabled={loading} className="w-full bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black text-xs uppercase tracking-widest py-5 rounded-[1.5rem] transition-all shadow-xl shadow-blue-600/30 disabled:opacity-50">
               {loading ? 'Finalizing Profile...' : 'Complete Registration'}
            </button>
         </form>
      </div>
    </div>
  );
}
