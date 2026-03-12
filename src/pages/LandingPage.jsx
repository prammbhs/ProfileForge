import React from 'react';
import Hero from '@/components/landing/Hero';
import Marquee from '@/components/landing/Marquee';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import { NeoButton } from "@/components/ui/NeoButton";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-ui-white select-none">
      <Hero />
      <Marquee />
      <Features />
      <HowItWorks />
      <Testimonials />
      
      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-12 bg-primary-yellow text-center border-t-2 border-ui-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cabinet font-extrabold text-7xl mb-12 tracking-tighter uppercase">Ready to forge <br /> your future?</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/signup">
              <NeoButton variant="primary" size="lg" className="text-2xl px-12 py-8">
                Start Free Trial
              </NeoButton>
            </Link>
            <NeoButton variant="secondary" size="lg" className="text-2xl px-12 py-8">
              Contact Sales
            </NeoButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
