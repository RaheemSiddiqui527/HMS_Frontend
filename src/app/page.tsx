import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustedBySection } from '../components/landing/TrustedBySection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { PricingSection } from '../components/landing/PricingSection';
import { FAQSection } from '../components/landing/FAQSection';
import { CTASection } from '../components/landing/CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary-200">
      <Navbar />
      <HeroSection />
      <TrustedBySection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* <PricingSection /> */}
      {/* <FAQSection /> */}
      {/* <CTASection /> */}
      <Footer />
    </div>
  );
}
