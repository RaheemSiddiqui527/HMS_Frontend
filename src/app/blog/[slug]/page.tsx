"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { blogService } from '@/services/blog.service';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Calendar, User, Tag, Clock, ChevronLeft, Share2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function SingleBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        const response = await blogService.getBlogBySlug(slug as string);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-20 text-center text-slate-400 font-black italic animate-pulse">
           Loading Clinical Article...
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-40 pb-20 text-center">
           <h1 className="text-4xl font-black text-slate-900 mb-4">Article Not Found</h1>
           <Link href="/blog" className="text-primary-600 font-bold hover:underline">Back to Health Blog</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Article Header */}
      <header className="pt-32 pb-20 px-6 bg-slate-50 border-b border-slate-100">
         <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-10 hover:-translate-x-2 transition-transform">
               <ChevronLeft className="w-4 h-4" /> Back to Articles
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
               <span className="px-4 py-1.5 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                  {blog.category}
               </span>
               <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" /> 5 Min Read
               </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 leading-[1.1] tracking-tight">
               {blog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-slate-200">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center text-xl font-black text-slate-400 overflow-hidden">
                     {blog.author?.avatar ? <img src={blog.author.avatar} alt="Author" className="w-full h-full object-cover" /> : blog.author?.firstName?.[0]}
                  </div>
                  <div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Written By</div>
                     <div className="text-lg font-black text-slate-900">Dr. {blog.author?.firstName} {blog.author?.lastName}</div>
                  </div>
               </div>
               
               <div className="flex items-center gap-8">
                  <div className="text-right">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Published On</div>
                     <div className="text-sm font-black text-slate-600">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                  <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>
      </header>

      {/* Main Content */}
      <main className="py-24 px-6">
         <div className="max-w-4xl mx-auto">
            {blog.coverImage && (
               <div className="aspect-[21/9] bg-slate-100 rounded-[3rem] overflow-hidden mb-20 shadow-2xl shadow-slate-200">
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
               </div>
            )}

            <div className="prose prose-lg prose-slate max-w-none">
               <div className="text-slate-600 text-xl font-medium leading-[1.8] whitespace-pre-wrap">
                  {blog.content}
               </div>
            </div>

            {/* Tags */}
            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap gap-3">
               {blog.tags?.map((tag: string, idx: number) => (
                  <span key={idx} className="flex items-center gap-2 px-6 py-2.5 bg-slate-50 border border-slate-100 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest hover:bg-primary-50 hover:text-primary-600 hover:border-primary-100 transition-all cursor-pointer">
                     <Tag className="w-3.5 h-3.5" /> {tag}
                  </span>
               ))}
            </div>

            {/* Engagement */}
            <div className="mt-16 flex items-center gap-10">
               <div className="flex items-center gap-3 text-slate-400">
                  <Eye className="w-6 h-6" />
                  <span className="text-sm font-black uppercase tracking-widest">{blog.views} Views</span>
               </div>
            </div>
         </div>
      </main>

      <Footer />
    </div>
  );
}
