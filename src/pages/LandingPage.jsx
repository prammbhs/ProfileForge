import React from 'react';
import Hero from '@/components/landing/Hero';
import Marquee from '@/components/landing/Marquee';
import ProblemSolution from '@/components/landing/ProblemSolution';
import Features from '@/components/landing/Features';
import LivePreview from '@/components/landing/LivePreview';
import HowItWorks from '@/components/landing/HowItWorks';
import UseCases from '@/components/landing/UseCases';
import Testimonials from '@/components/landing/Testimonials';
import ApiDocsContent from '@/components/docs/ApiDocsContent';
import { NeoButton } from "@/components/ui/NeoButton";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-ui-white select-none">
      <Hero />
      <Marquee />
      <ProblemSolution />
      <Features />
      <LivePreview />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      
      {/* Docs Section */}
      <section id="docs" className="bg-ui-white border-t-2 border-ui-black pt-16">
        <ApiDocsContent />
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 lg:px-12 bg-primary-yellow text-center border-t-2 border-ui-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-cabinet font-extrabold text-6xl mb-6 tracking-tighter uppercase">Stop juggling profiles. <br /> Start building your identity.</h2>
          <p className="font-satoshi font-bold text-xl text-ui-black/70 mb-10 max-w-xl mx-auto">Join developers who are taking control of their coding journey.</p>
          <div className="flex justify-center">
            <Link to="/signup">
              <NeoButton variant="primary" size="lg" className="text-2xl px-12 py-8 bg-ui-black text-ui-white hover:bg-neutral-900">
                Create Your Profile Now
              </NeoButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
