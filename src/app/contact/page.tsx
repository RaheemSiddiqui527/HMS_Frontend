"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Globe } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { inquiryService } from '@/services/inquiry.service';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    department: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await inquiryService.submitInquiry(formData);
      toast.success("Enquiry submitted successfully! Our team will contact you soon.");
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        department: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header */}
      <section className="pt-32 pb-20 px-6 bg-slate-900 text-white overflow-hidden relative">
         <div className="absolute top-0 right-0 w-full h-full opacity-10">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600 rounded-full blur-[120px]"></div>
         </div>
         
         <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">How can we <span className="text-primary-500">help you?</span></h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
               Have a question about our services, medical reports, or appointments? Our clinical support team is here for you 24/7.
            </p>
         </div>
      </section>

      <section className="py-24 px-6 relative">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               
               {/* Contact Form */}
               <div className="lg:col-span-7 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-10 md:p-16 relative -mt-32 z-20">
                  <h2 className="text-3xl font-black text-slate-900 mb-2">Send us a message</h2>
                  <p className="text-slate-400 font-medium mb-10">We'll get back to you within 24 business hours.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                           <input 
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                              placeholder="John Doe" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                           <input 
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="john@example.com" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all" 
                           />
                        </div>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                           <input 
                              required
                              value={formData.phoneNumber}
                              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                              placeholder="075592 85928" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all" 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Department</label>
                           <select 
                              value={formData.department}
                              onChange={(e) => setFormData({...formData, department: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 outline-none focus:border-primary-600 transition-all appearance-none"
                           >
                              <option>General Inquiry</option>
                              <option>Appointment Issue</option>
                              <option>Medical Records</option>
                              <option>Billing & Insurance</option>
                           </select>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea 
                           required
                           rows={5} 
                           value={formData.message}
                           onChange={(e) => setFormData({...formData, message: e.target.value})}
                           placeholder="How can we help you today?" 
                           className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-6 text-sm font-medium text-slate-700 outline-none focus:border-primary-600 transition-all resize-none"
                        ></textarea>
                     </div>
                     
                     <button 
                        disabled={isSubmitting}
                        className="bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary-600/20 flex items-center gap-3"
                     >
                        {isSubmitting ? "Submitting..." : <><Send className="w-4 h-4" /> Send Inquiry</>}
                     </button>
                  </form>
               </div>

               {/* Contact Info */}
               <div className="lg:col-span-5 space-y-12">
                  <div className="space-y-8">
                     <h3 className="text-2xl font-black text-slate-900">Direct Contact</h3>
                     <div className="space-y-6">
                        <InfoItem icon={<Phone className="w-5 h-5" />} title="Emergency Helpline" value="075592 85928" color="text-red-500" />
                        <InfoItem icon={<Mail className="w-5 h-5" />} title="Medical Support" value="care@sdihospital.com" />
                        <InfoItem icon={<Clock className="w-5 h-5" />} title="Opening Hours" value="Open 24 Hours (Emergency)" />
                     </div>
                  </div>

                  <div className="space-y-8">
                     <h3 className="text-2xl font-black text-slate-900">Our Location</h3>
                     <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 flex items-start gap-6">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm shrink-0">
                           <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                           <div className="text-[13px] font-black text-slate-900 mb-1 uppercase tracking-widest">SDI HEALTHCARE HOSPITAL</div>
                           <p className="text-slate-500 text-sm font-medium leading-relaxed">
                              Mushtaque Ahmed Arcade, next to Metro Hotel,<br />
                              Vanjar Patti Naka, Gokul Nagar,<br />
                              Bhiwandi, Maharashtra 421302
                           </p>
                           <a href="https://www.google.com/maps/search/SDI+HEALTHCARE+HOSPITAL+AND+DIAGNOSTIC+CENTRE+Bhiwandi" target="_blank" rel="noopener noreferrer" className="text-primary-600 font-black text-[10px] uppercase tracking-[0.2em] mt-4 flex items-center gap-2 hover:translate-x-2 transition-transform">
                              Open in Maps <Globe className="w-3 h-3" />
                           </a>
                        </div>
                     </div>
                  </div>

                  <div className="pt-8 flex gap-4">
                     {/* YouTube */}
                     <SocialBtn icon={<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>} href="https://www.youtube.com/user/sdichannel" hoverColor="hover:text-red-600" />
                     {/* Facebook */}
                     <SocialBtn icon={<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>} href="https://www.facebook.com/sdi.channel/" hoverColor="hover:text-blue-600" />
                     {/* Instagram */}
                     <SocialBtn icon={<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>} href="https://www.instagram.com/sdichannel/" hoverColor="hover:text-pink-600" />
                     {/* X */}
                     <SocialBtn icon={<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>} href="https://x.com/sdichannel" hoverColor="hover:text-black" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-24">
         <div className="max-w-7xl mx-auto h-[450px] bg-slate-100 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white relative group">
            <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.3570684796678!2d73.0645606!3d19.310306000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bd5e9438be27%3A0x4adca20d41e5e099!2sSDI%20HEALTHCARE%20HOSPITAL%20AND%20DIAGNOSTIC%20CENTRE!5e0!3m2!1sen!2sin!4v1778408431894!5m2!1sen!2sin"
               className="w-full h-full grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700" 
               style={{ border: 0 }} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white">
                     <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                     <div className="text-xs font-black text-slate-900 uppercase tracking-widest">Live Location</div>
                     <div className="text-[10px] font-bold text-slate-400 mt-0.5">Bhiwandi, Maharashtra</div>
                  </div>
               </div>
            </div> */}
         </div>
      </section>
      <Footer />
    </div>
  );
}

function ContactInput({ label, placeholder, type = "text" }: { label: string, placeholder: string, type?: string }) {
   return (
      <div className="space-y-2">
         <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
         <input 
            type={type}
            placeholder={placeholder}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 outline-none focus:border-primary-600 transition-all" 
         />
      </div>
   );
}

function InfoItem({ icon, title, value, color = "text-primary-600" }: { icon: React.ReactNode, title: string, value: string, color?: string }) {
   return (
      <div className="flex items-center gap-6 group">
         <div className={`w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${color}`}>
            {icon}
         </div>
         <div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{title}</div>
            <div className="text-sm font-black text-slate-800">{value}</div>
         </div>
      </div>
   );
}

function SocialBtn({ icon, href, hoverColor }: { icon: React.ReactNode, href: string, hoverColor: string }) {
   return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 ${hoverColor} hover:bg-white hover:border-primary-100 transition-all hover:shadow-lg`}
      >
         {icon}
      </a>
   );
}
