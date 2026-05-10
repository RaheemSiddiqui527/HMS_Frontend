"use client";
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, HelpCircle, PhoneCall, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { faqService } from '@/services/faq.service';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0, limit: 10 });

  const fetchFaqs = async () => {
    try {
      setIsLoading(true);
      const response = await faqService.getAllFAQs({ page, limit: 10 });
      setFaqs(response.data.faqs || []);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [page]);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-32 pb-20 px-6 bg-white border-b border-slate-100">
         <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
               Frequently Asked <span className="text-primary-600">Questions</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium mb-12">
               Find answers to common questions about our services, appointments, and medical care.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
               <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
               </div>
               <input 
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-5 pl-16 pr-8 text-sm font-bold text-slate-800 outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-500 transition-all shadow-sm"
               />
            </div>
         </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 px-6">
         <div className="max-w-3xl mx-auto">
            {isLoading ? (
               <div className="text-center py-20 text-slate-400 font-black italic animate-pulse">Loading FAQs...</div>
            ) : filteredFaqs.length > 0 ? (
               <>
                  <div className="space-y-4 mb-16">
                     {filteredFaqs.map((faq, idx) => (
                        <div key={faq._id || idx} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                           <button 
                              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                              className="w-full px-8 py-7 flex items-center justify-between text-left group"
                           >
                              <span className="text-lg font-black text-slate-800 group-hover:text-primary-600 transition-colors">{faq.question}</span>
                              {openIndex === idx ? (
                                 <ChevronUp className="w-5 h-5 text-primary-600" />
                              ) : (
                                 <ChevronDown className="w-5 h-5 text-slate-400" />
                              )}
                           </button>
                           
                           {openIndex === idx && (
                              <div className="px-8 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                                 <div className="w-12 h-1 bg-primary-100 rounded-full mb-6"></div>
                                 <p className="text-slate-500 font-medium leading-relaxed">
                                    {faq.answer}
                                 </p>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>

                  {/* Pagination UI */}
                  {pagination.pages > 1 && (
                     <div className="flex items-center justify-center gap-4">
                        <button 
                           disabled={page === 1}
                           onClick={() => setPage(p => Math.max(1, p - 1))}
                           className="p-4 bg-white rounded-2xl text-slate-400 hover:text-primary-600 disabled:opacity-30 transition-all shadow-sm border border-slate-100"
                        >
                           <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mx-4">
                           Page {pagination.page} / {pagination.pages}
                        </div>
                        <button 
                           disabled={page >= pagination.pages}
                           onClick={() => setPage(p => p + 1)}
                           className="p-4 bg-white rounded-2xl text-slate-400 hover:text-primary-600 disabled:opacity-30 transition-all shadow-sm border border-slate-100"
                        >
                           <ChevronRight className="w-5 h-5" />
                        </button>
                     </div>
                  )}
               </>
            ) : (
               <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 border-dashed">
                  <HelpCircle className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                  <h3 className="text-xl font-black text-slate-800 mb-2">No results found</h3>
                  <p className="text-slate-500 font-medium">Try searching for different keywords or contact us directly.</p>
               </div>
            )}
         </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-32 px-6">
         <div className="max-w-5xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
               <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600 rounded-full blur-[120px]"></div>
            </div>
            
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Still have questions?</h2>
               <p className="text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
                  If you couldn't find the answer you were looking for, please feel free to reach out to our dedicated support team.
               </p>
               
               <div className="flex flex-wrap justify-center gap-6">
                  <ContactCard icon={<PhoneCall className="w-5 h-5" />} label="Call Us" value="075592 85928" />
                  <ContactCard icon={<Mail className="w-5 h-5" />} label="Email Us" value="care@sdihospital.com" />
                  <ContactCard icon={<MessageCircle className="w-5 h-5" />} label="Live Chat" value="Active 24/7" />
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}

function ContactCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
   return (
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 flex items-center gap-5 min-w-[240px]">
         <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center text-white shrink-0">
            {icon}
         </div>
         <div className="text-left">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{label}</div>
            <div className="text-sm font-black text-white">{value}</div>
         </div>
      </div>
   );
}
