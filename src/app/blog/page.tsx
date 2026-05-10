"use client";
import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, ArrowRight, Eye, Tag, ChevronRight, ChevronLeft } from 'lucide-react';
import { blogService } from '@/services/blog.service';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PublicBlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 9 });

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await blogService.getAllBlogs({ 
        status: 'published',
        category: activeCategory === 'All' ? undefined : activeCategory,
        page,
        limit: 9
      });
      setBlogs(response.data.blogs || []);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [activeCategory, page]);

   const categories = ['All', 'Health', 'Nutrition', 'Fitness', 'Mental Health'];

   const [newsletterEmail, setNewsletterEmail] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

   const handleSubscribe = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newsletterEmail) return;
      
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setSubscribeStatus('success');
      setNewsletterEmail('');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubscribeStatus('idle'), 5000);
   };

   return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Navigation Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
         <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">Health Blog</span>
         </div>
      </div>

      {/* Hero Header */}
      <section className="pt-20 pb-16 px-6 bg-slate-50">
         <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
               SDI <span className="text-primary-600">Health Blog</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
               Expert medical insights, wellness tips, and institutional updates to help you live a healthier, longer life.
            </p>
         </div>
      </section>

      {/* Search & Categories */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100 overflow-x-auto no-scrollbar max-w-full">
               {categories.map(cat => (
                  <button 
                     key={cat}
                     onClick={() => { setActiveCategory(cat); setPage(1); }}
                     className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-white text-primary-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
            <div className="relative w-full md:w-80">
               <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
               <input placeholder="Search health topics..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-700 outline-none focus:border-primary-500 transition-all" />
            </div>
         </div>
      </section>

      {/* Blog Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20">
         {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse space-y-6">
                     <div className="aspect-video bg-slate-100 rounded-[2.5rem]"></div>
                     <div className="h-4 w-1/4 bg-slate-100 rounded-full"></div>
                     <div className="h-8 w-3/4 bg-slate-100 rounded-xl"></div>
                     <div className="h-20 w-full bg-slate-50 rounded-2xl"></div>
                  </div>
               ))}
            </div>
         ) : blogs.length === 0 ? (
            <div className="py-40 text-center">
               <h3 className="text-2xl font-black text-slate-800 mb-2">No articles found in this category</h3>
               <p className="text-slate-500 font-medium">Check back soon for new health insights.</p>
            </div>
         ) : (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                  {blogs.map((blog: any) => (
                     <article key={blog._id} className="group flex flex-col h-full">
                        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden bg-slate-100 mb-8 border border-slate-100 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary-600/10 transition-all duration-500">
                           <img 
                              src={blog.coverImage || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'} 
                              alt={blog.title} 
                              onError={(e: any) => {
                                 e.target.onerror = null;
                                 e.target.src = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop';
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                           />
                           <div className="absolute top-6 left-6">
                              <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/20">
                                 {blog.category}
                              </span>
                           </div>
                        </div>

                        <div className="flex-1 flex flex-col">
                           <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                              <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {blog.views} Reads</span>
                           </div>
                           <h2 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors">
                              {blog.title}
                           </h2>
                           <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
                              {blog.excerpt}
                           </p>
                           
                           <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-[11px] font-black text-primary-600 border border-primary-100">
                                    {blog.author?.firstName?.[0] || 'A'}
                                 </div>
                                 <div>
                                    <div className="text-xs font-black text-slate-900 leading-none">Dr. {blog.author?.lastName || 'Admin'}</div>
                                    <div className="text-[10px] font-bold text-slate-400 mt-1">Medical Editor</div>
                                 </div>
                              </div>
                              <Link href={`/blog/${blog.slug}`} className="flex items-center gap-2 text-xs font-black text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                                 Read Full <ArrowRight className="w-4 h-4 text-primary-600" />
                              </Link>
                           </div>
                        </div>
                     </article>
                  ))}
               </div>

               {/* Pagination UI */}
               {pagination.pages > 1 && (
                  <div className="flex items-center justify-center gap-4 border-t border-slate-100 pt-16">
                     <button 
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        className="flex items-center gap-2 px-8 py-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-all"
                     >
                        <ChevronLeft className="w-4 h-4" /> Previous
                     </button>
                     <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mx-4">
                        Page {pagination.page} / {pagination.pages}
                     </div>
                     <button 
                        disabled={page >= pagination.pages}
                        onClick={() => setPage(p => p + 1)}
                        className="flex items-center gap-2 px-8 py-4 bg-primary-600 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary-700 disabled:opacity-30 transition-all shadow-xl shadow-primary-600/20"
                     >
                        Next Page <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               )}
            </>
         )}
      </main>

      {/* Institutional Newsletter */}
      <section className="bg-slate-900 py-32 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Stay informed about your health</h2>
            <p className="text-slate-400 text-lg font-medium mb-10 max-w-xl mx-auto">Join 10,000+ patients who receive weekly medical insights directly from our specialized doctors.</p>
            
            {subscribeStatus === 'success' ? (
               <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-white text-2xl font-black mb-2">Thank You for Subscribing!</h3>
                  <p className="text-emerald-100/60 font-medium">You've been successfully added to our medical newsletter.</p>
               </div>
            ) : (
               <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                  <input 
                     type="email"
                     required
                     value={newsletterEmail}
                     onChange={(e) => setNewsletterEmail(e.target.value)}
                     placeholder="Enter your email address" 
                     className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-medium outline-none focus:border-primary-500 transition-all" 
                  />
                  <button 
                     disabled={isSubmitting}
                     className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                  >
                     {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
               </form>
            )}
         </div>
      </section>
      <Footer />
    </div>
  );
}
