"use client";
import React from 'react';
import { Shield, Users, Award, Heart, CheckCircle2, Stethoscope, Building2 } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 bg-slate-900 overflow-hidden text-white">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary-600 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-[100px]"></div>
         </div>

         <div className="max-w-7xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 mb-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400">International Socio-Religious Movement</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
               Sunni Dawate Islami <br />
               <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-emerald-300">Health Care</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-4xl mx-auto leading-relaxed">
               Propagating true Islamic beliefs under the guidance of Ahle Sunnah Wa Jama'ah. We aim to light the beacon of love and clinical excellence through the blessed Sunnahs of the Beloved Messenger ﷺ.
            </p>
         </div>
      </section>

      {/* Core Mission */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <ValueCard 
                  icon={<Shield className="w-8 h-8" />}
                  title="True Beliefs"
                  desc="Propagation of authentic Islamic teachings and the sect of Ahle Sunnah Wa Jama'ah in every aspect of life."
               />
               <ValueCard 
                  icon={<Heart className="w-8 h-8" />}
                  title="Sunnah of Healing"
                  desc="Encouraging the blessed Sunnahs of the Beloved Messenger ﷺ as a foundation for holistic clinical care."
               />
               <ValueCard 
                  icon={<Users className="w-8 h-8" />}
                  title="Global Impact"
                  desc="An international, non-political movement dedicated to purely socio-religious and medical upliftment."
               />
            </div>
         </div>
      </section>

      {/* Our History Section (As per screenshot) */}
      <section className="py-32 px-6 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
            {/* Left side: Photo with Offset Frame */}
            <div className="flex-1 relative order-2 lg:order-1">
               <div className="absolute -inset-6 border-8 border-slate-900/5 rounded-[4rem] translate-x-8 translate-y-8 -z-10 animate-pulse"></div>
               <div className="absolute -inset-2 border-2 border-primary-100 rounded-[3.5rem] -z-10"></div>
               <div className="rounded-[3rem] overflow-hidden shadow-2xl relative">
                  <img 
                     src="/history.png" 
                     alt="Sunni Dawate Islami Assembly" 
                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent"></div>
               </div>
            </div>
            
            {/* Right side: Text and Titles */}
            <div className="flex-1 space-y-10 order-1 lg:order-2">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Our History</span>
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                     About <br /> 
                     <span className="text-primary-600 italic font-serif">Sunni Dawate</span> <br /> 
                     Islami
                  </h2>
               </div>
               
               <div className="w-32 h-1.5 bg-primary-600 rounded-full"></div>
               
               <div className="space-y-6">
                  <p className="text-slate-600 text-xl font-medium leading-relaxed">
                     Sunni Dawate Islami is an international, non-political and purely socio-religious movement. 
                     It promotes the propagation of the true beliefs of Islam under the teaching of the true sect 
                     of Ahle Sunnah Wa Jama'ah.
                  </p>
                  <p className="text-slate-500 text-lg leading-relaxed">
                     Through encouraging the blessed Sunnahs of the Beloved Messenger ﷺ, 
                     it aims to light the beacon of love. Our movement spans across the globe, uniting millions 
                     under the banner of faith, service, and clinical excellence.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-8 pt-6">
                  <StatItem label="Global Presence" value="50+ Countries" />
                  <StatItem label="Years of Service" value="30+ Years" />
               </div>

               <div className="pt-10 flex items-center gap-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Handles:</span>
                  <div className="flex gap-4">
                    <a href="https://www.facebook.com/SDIchannel/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1877F2] transition-colors">
                      <FacebookIcon className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/sdichannel/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#E4405F] transition-colors">
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a href="https://twitter.com/sdichannel" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-black transition-colors">
                      <TwitterIcon className="w-5 h-5" />
                    </a>
                    <a href="https://www.youtube.com/user/sdichannel" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#FF0000] transition-colors">
                      <YoutubeIcon className="w-5 h-5" />
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=%2B919699072072&text&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#25D366] transition-colors">
                      <WhatsAppIcon className="w-5 h-5" />
                    </a>
                    <a href="https://sunnidawateislami.net/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-600 transition-colors">
                      <GlobeIcon className="w-5 h-5" />
                    </a>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Impact Sectors Section */}
      <section className="py-32 px-6 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600 rounded-full blur-[150px]"></div>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl mb-20 space-y-4">
               <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-400">Our Reach</h2>
               <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Diverse Sectors <br /> of Service
               </h3>
               <p className="text-slate-400 text-lg">
                  Beyond healthcare, Sunni Dawate Islami is dedicated to the holistic upliftment of society through various wings.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <SectorCard 
                  icon={<Shield className="w-6 h-6" />}
                  title="Religious"
                  desc="Propagation of Ahle Sunnah Wa Jama'ah beliefs globally."
                  color="bg-emerald-500"
               />
               <SectorCard 
                  icon={<Stethoscope className="w-6 h-6" />}
                  title="Medical"
                  desc="Providing world-class Sunnah-based clinical care through SDI Health Care."
                  color="bg-primary-500"
               />
               <SectorCard 
                  icon={<Building2 className="w-6 h-6" />}
                  title="Educational"
                  desc="Intellectual Wing (IW) and Career EXPOs for professional guidance."
                  color="bg-amber-500"
               />
               <SectorCard 
                  icon={<Users className="w-6 h-6" />}
                  title="Social Welfare"
                  desc="Helping the needy and socio-economical guidance initiatives."
                  color="bg-indigo-500"
               />
            </div>
         </div>
      </section>

      {/* Founder's Guidance Section */}
      <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
         <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full blur-[120px] opacity-60"></div>
         
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <div className="flex-1">
               <div className="relative group">
                  <div className="aspect-[4/5] bg-slate-100 rounded-[5rem] overflow-hidden shadow-2xl border-8 border-white relative z-10">
                     <img 
                        src="/founder.png" 
                        alt="Hafiz-o-Qari Maulana Muhammed Shakir Noorie" 
                        className="w-full h-full object-co transition-all duration-1000" 
                     />
                  </div>
                  <div className="absolute inset-0 border-2 border-primary-200 rounded-[5.5rem] translate-x-6 translate-y-6 -z-0"></div>

                  <div className="absolute -bottom-10 -right-10 bg-slate-900 p-8 rounded-[3rem] shadow-2xl text-white z-20">
                     <div className="flex flex-col items-center text-center">
                        <Award className="w-8 h-8 text-primary-400 mb-2" />
                        <div className="text-2xl font-black leading-tight">Daaiye Kabeer</div>
                        <div className="text-[10px] font-bold text-primary-400 uppercase tracking-[0.3em] mt-2">The Visionary Founder</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 space-y-10">
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-600">Founder's Guidance</span>
                  </div>
                  <h2 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                     Maulana Muhammed <br />
                     <span className="text-primary-600">Shakir Noorie</span>
                  </h2>
               </div>

               <div className="space-y-6 text-slate-500 font-medium leading-relaxed text-lg">
                  <p>
                     Under the blessed guidance of our founder, <span className="font-bold text-slate-900">Hafiz-o-Qari Maulana Muhammed Shakir Noorie</span>, Sunni Dawate Islami has evolved from a local initiative into a global beacon of faith, education, and humanitarian service.
                  </p>
                  <p>
                     Born in the historic town of <span className="font-bold text-slate-900">Junagadh, Gujarat</span>, Maulana Sahab's journey began with the memorization of the Holy Quran (Hifz) and progressed through the deep study of Islamic sciences and Ulooms. His spiritual growth was nurtured in the company of the pious friends of Allah, leading him to be recognized with prestigious titles like <span className="text-slate-900 font-bold">“Daaiye Kabeer”</span> and <span className="text-slate-900 font-bold">“Ataa e Huzoor Mufti e Azam e Hind”</span>.
                  </p>
                  <p>
                     His vision for <span className="font-bold text-slate-900">SDI Health Care</span> is deeply rooted in the Sunnah—believing that true healing comes when world-class clinical standards are blended with authentic spiritual values. He continues to mentor millions across 50+ countries, guiding them towards a life of balance, service, and devotion.
                  </p>
               </div>

               <div className="pt-10 flex flex-wrap gap-6 items-center">
                  <Link href="/contact" className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-primary-600 transition-all inline-block shadow-2xl shadow-slate-900/20">
                     Explore Our Mission
                  </Link>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect:</span>
                    <div className="flex flex-wrap gap-3">
                      <a href="https://whatsapp.com/channel/0029Va4FaoGDjiOkWZ5PCn3Y" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:border-[#25D366] transition-all">
                        <WhatsAppIcon className="w-4 h-4" />
                      </a>
                      <a href="https://www.facebook.com/MaulanaShakir/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:border-[#1877F2] transition-all">
                        <FacebookIcon className="w-4 h-4" />
                      </a>
                      <a href="https://www.instagram.com/maulanashakir/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#E4405F] hover:text-white hover:bg-[#E4405F] hover:border-[#E4405F] transition-all">
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                      <a href="https://x.com/maulanashakir" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-black hover:border-black transition-all">
                        <TwitterIcon className="w-4 h-4" />
                      </a>
                      <a href="https://www.youtube.com/playlist?list=PLNngVRDXb8awh_DpvmbjbkWHKE7JPYJzM" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#FF0000] hover:border-[#FF0000] transition-all">
                        <YoutubeIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <Footer />
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
   return (
      <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-primary-200 hover:bg-white hover:shadow-xl hover:shadow-primary-600/5 transition-all group">
         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 mb-8 shadow-sm group-hover:scale-110 transition-transform">
            {icon}
         </div>
         <h3 className="text-xl font-black text-slate-900 mb-4">{title}</h3>
         <p className="text-slate-500 font-medium text-sm leading-relaxed">{desc}</p>
      </div>
   );
}

function SectorCard({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) {
   return (
      <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
         <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
            {icon}
         </div>
         <h4 className="text-xl font-bold mb-3">{title}</h4>
         <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
   );
}

function StatItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="space-y-1">
         <div className="text-3xl font-black text-primary-600">{value}</div>
         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</div>
      </div>
   );
}

function ListItem({ text }: { text: string }) {
   return (
      <li className="flex items-center gap-3 text-sm font-bold text-slate-700">
         <CheckCircle2 className="w-5 h-5 text-primary-600" /> {text}
      </li>
   );
}


// Custom SVG Icons to avoid lucide-react version issues
function FacebookIcon({ className }: { className?: string }) {
   return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
         <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
   );
}

function InstagramIcon({ className }: { className?: string }) {
   return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
         <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
   );
}

function TwitterIcon({ className }: { className?: string }) {
   return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
   );
}

function YoutubeIcon({ className }: { className?: string }) {
   return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
         <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z" />
      </svg>
   );
}

function WhatsAppIcon({ className }: { className?: string }) {
   return (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
         <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.98zm11.387-5.464c-.301-.15-1.779-.878-2.055-.978-.275-.1-.475-.15-.675.15-.2.3-.775.978-.95 1.178-.175.2-.35.225-.651.075-.3-.15-1.265-.467-2.41-1.487-.893-.797-1.495-1.782-1.67-2.083-.175-.301-.019-.464.131-.613.135-.134.301-.351.451-.526.15-.175.2-.301.3-.501.1-.2.05-.375-.025-.526-.075-.15-.675-1.628-.925-2.228-.243-.584-.489-.505-.675-.514-.175-.008-.375-.01-.575-.01s-.525.075-.8.376c-.275.301-1.051 1.028-1.051 2.506s1.076 2.906 1.226 3.106c.15.2 2.117 3.232 5.128 4.531.716.31 1.275.495 1.71.634.72.229 1.374.197 1.891.12.576-.086 1.779-.727 2.03-1.428.25-.701.25-1.302.175-1.428-.075-.126-.275-.226-.576-.376z" />
      </svg>
   );
}

function GlobeIcon({ className }: { className?: string }) {
   return (
      <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
         <circle cx="12" cy="12" r="10" />
         <line x1="2" y1="12" x2="22" y2="12" />
         <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
   );
}
