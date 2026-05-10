"use client";
import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Filter, MoreHorizontal, Edit, Trash, Eye, Calendar, User, Tag, Image as ImageIcon, Save, X } from 'lucide-react';
import { blogService } from '../../../../services/blog.service';
import { toast } from 'react-hot-toast';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 10 });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    category: 'Health',
    tags: '',
    status: 'published' as 'published' | 'draft'
  });

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await blogService.getAllBlogs({ status: filterStatus, page, limit: 9 });
      setBlogs(response.data.blogs || []);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error("Failed to load blog posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [filterStatus, page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== '')
      };

      if (editingBlog) {
        await blogService.updateBlog(editingBlog._id, dataToSubmit);
        toast.success("Blog post updated successfully");
      } else {
        await blogService.createBlog(dataToSubmit);
        toast.success("Blog post published successfully");
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      toast.error("Operation failed. Please check inputs.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await blogService.deleteBlog(id);
      toast.success("Blog post deleted");
      fetchBlogs();
    } catch (error) {
      toast.error("Deletion failed");
    }
  };

  const openEditModal = (blog: any) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage || '',
      category: blog.category || 'Health',
      tags: blog.tags?.join(', ') || '',
      status: blog.status || 'published'
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      coverImage: '',
      category: 'Health',
      tags: '',
      status: 'published'
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-slate-200 bg-white shrink-0">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary-600" /> Health Blog Manager
               </h2>
               <p className="text-slate-500 font-medium text-sm mt-1">Create and manage health awareness articles for your patients.</p>
            </div>
            <button 
               onClick={() => { resetForm(); setIsModalOpen(true); }}
               className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
            >
               <Plus className="w-4 h-4" /> New Article
            </button>
         </div>
      </div>

      {/* Toolbar */}
      <div className="px-8 py-4 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
             <FilterBtn active={filterStatus === 'all'} label="All Posts" onClick={() => setFilterStatus('all')} />
             <FilterBtn active={filterStatus === 'published'} label="Published" onClick={() => setFilterStatus('published')} />
             <FilterBtn active={filterStatus === 'draft'} label="Drafts" onClick={() => setFilterStatus('draft')} />
          </div>
          <div className="relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input placeholder="Search articles..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-primary-500 w-64 bg-slate-50/50" />
          </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-8">
         {isLoading ? (
            <div className="p-20 text-center text-slate-400 font-black italic animate-pulse">Synchronizing Editorial Database...</div>
         ) : blogs.length === 0 ? (
            <div className="p-20 text-center bg-white rounded-[3rem] border border-slate-200 border-dashed max-w-2xl mx-auto mt-10">
               <FileText className="w-16 h-16 text-slate-200 mx-auto mb-6" />
               <h3 className="text-xl font-black text-slate-800 mb-2">No Articles Found</h3>
               <p className="text-slate-500 text-sm font-medium">Start your institutional blog by creating your first health awareness article.</p>
            </div>
         ) : (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                  {blogs.map((blog: any) => (
                     <div key={blog._id} className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                        <div className="h-48 bg-slate-100 relative overflow-hidden">
                           <img 
                              src={blog.coverImage || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'} 
                              alt={blog.title} 
                              onError={(e: any) => {
                                 e.target.onerror = null;
                                 e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                           />
                           <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${blog.status === 'published' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                 {blog.status}
                              </span>
                           </div>
                        </div>
                        <div className="p-6">
                           <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {blog.views}</span>
                           </div>
                           <h3 className="text-lg font-black text-slate-800 mb-3 line-clamp-2 leading-tight">{blog.title}</h3>
                           <p className="text-slate-500 text-xs font-medium mb-6 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                           
                           <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                              <div className="flex items-center gap-2">
                                 <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                                    {blog.author?.firstName?.[0] || 'A'}
                                 </div>
                                 <span className="text-[10px] font-bold text-slate-600">Dr. {blog.author?.lastName || 'Admin'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <button onClick={() => openEditModal(blog)} className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"><Edit className="w-4 h-4" /></button>
                                 <button onClick={() => handleDelete(blog._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash className="w-4 h-4" /></button>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Pagination Controls */}
               <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[2rem] border border-slate-200 mb-10 shadow-sm">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     Showing Page {pagination.page} of {pagination.pages}
                  </div>
                  <div className="flex items-center gap-2">
                     <button 
                        disabled={pagination.page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="px-4 py-2 bg-slate-50 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition-all border border-slate-100"
                     >
                        Previous
                     </button>
                     <button 
                        disabled={pagination.page >= pagination.pages}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-black disabled:opacity-30 transition-all shadow-lg shadow-slate-200"
                     >
                        Next Page
                     </button>
                  </div>
               </div>
            </>
         )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
               <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                     <Edit className="w-6 h-6 text-primary-600" /> {editingBlog ? 'Edit Article' : 'Write New Article'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400">
                     <X className="w-6 h-6" />
                  </button>
               </div>
               
               <form onSubmit={handleSubmit} className="flex-1 overflow-auto p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Article Title</label>
                        <input 
                           required 
                           value={formData.title} 
                           onChange={(e) => setFormData({...formData, title: e.target.value})}
                           placeholder="Enter a catchy title..." 
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all" 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                        <select 
                           value={formData.category} 
                           onChange={(e) => setFormData({...formData, category: e.target.value})}
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all"
                        >
                           <option value="Health">General Health</option>
                           <option value="Nutrition">Nutrition</option>
                           <option value="Fitness">Fitness</option>
                           <option value="Mental Health">Mental Health</option>
                        </select>
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image URL</label>
                     <div className="relative">
                        <ImageIcon className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input 
                           value={formData.coverImage} 
                           onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                           placeholder="https://images.unsplash.com/..." 
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium text-slate-600 outline-none focus:border-primary-600 transition-all" 
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Short Excerpt (Brief Summary)</label>
                     <textarea 
                        required 
                        rows={2} 
                        value={formData.excerpt} 
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        placeholder="A brief summary for the listing page..." 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium text-slate-600 outline-none focus:border-primary-600 transition-all resize-none" 
                     />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Content (Markdown Supported)</label>
                     <textarea 
                        required 
                        rows={10} 
                        value={formData.content} 
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        placeholder="Write your article content here..." 
                        className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-6 text-sm font-medium text-slate-700 outline-none focus:border-primary-600 transition-all" 
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Tags (Comma separated)</label>
                        <div className="relative">
                           <Tag className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                           <input 
                              value={formData.tags} 
                              onChange={(e) => setFormData({...formData, tags: e.target.value})}
                              placeholder="wellness, heart, cardio" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-medium text-slate-600 outline-none focus:border-primary-600 transition-all" 
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Publication Status</label>
                        <div className="flex gap-4">
                           <StatusRadio active={formData.status === 'published'} label="Publish Now" onClick={() => setFormData({...formData, status: 'published'})} />
                           <StatusRadio active={formData.status === 'draft'} label="Save as Draft" onClick={() => setFormData({...formData, status: 'draft'})} />
                        </div>
                     </div>
                  </div>
               </form>

               <div className="p-10 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4 shrink-0">
                  <button onClick={() => setIsModalOpen(false)} className="px-8 py-3 text-[13px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Cancel</button>
                  <button onClick={handleSubmit} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-xl shadow-slate-900/10">
                     <Save className="w-4 h-4" /> {editingBlog ? 'Update Article' : 'Publish Article'}
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

function FilterBtn({ active, label, onClick }: { active?: boolean, label: string, onClick: () => void }) {
   return (
      <button 
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-tight transition-all ${active ? 'bg-white text-primary-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
      >
         {label}
      </button>
   );
}

function StatusRadio({ active, label, onClick }: { active: boolean, label: string, onClick: () => void }) {
   return (
      <button 
         type="button" 
         onClick={onClick}
         className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border transition-all font-black text-[11px] uppercase tracking-widest ${active ? 'bg-white border-primary-600 text-primary-600 shadow-sm shadow-primary-900/5' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
      >
         <div className={`w-3 h-3 rounded-full border-2 ${active ? 'border-primary-600 bg-primary-600' : 'border-slate-300'}`}></div>
         {label}
      </button>
   );
}
