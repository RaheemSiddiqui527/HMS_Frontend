import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustedBySection } from '../components/landing/TrustedBySection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { MeetOurDoctorsSection } from '../components/landing/MeetOurDoctorsSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { EmergencyBanner } from '../components/landing/EmergencyBanner';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary-200">
      <EmergencyBanner />
      <Navbar />
      <HeroSection />
      <MeetOurDoctorsSection />
      <TrustedBySection />
      <FeaturesSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}
