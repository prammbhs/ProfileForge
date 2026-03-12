import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-12 bg-primary-yellow dot-pattern border-b-2 border-ui-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center bg-ui-white neo-border px-4 py-1 rounded-full mb-6">
            <span className="font-satoshi font-bold text-sm">NEW: AI Content Assistant 2.0</span>
          </div>
          <h1 className="font-cabinet font-extrabold text-6xl lg:text-8xl leading-none tracking-tighter text-ui-black mb-8">
            Forge your <br />
            <span style={{ WebkitTextStroke: "2px black", color: "transparent" }}>Professional</span> <br />
            Edge.
          </h1>
          <p className="font-satoshi font-medium text-xl text-ui-black/80 max-w-xl mb-10 leading-relaxed">
            The only platform that combines high-performance portfolio building with 
            real-time AI insights. Built for creators who mean business.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/signup">
              <NeoButton variant="primary" size="lg" className="w-full sm:w-auto">
                Get Started Now <ArrowRight className="ml-2 w-6 h-6" />
              </NeoButton>
            </Link>
            <NeoButton variant="secondary" size="lg" className="w-full sm:w-auto">
              Watch Demo
            </NeoButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <BrowserMockup className="max-w-xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-sage p-4 neo-border">
                <h3 className="font-cabinet font-bold text-lg mb-2">Revenue</h3>
                <div className="h-20 bg-ui-white/50 animate-pulse rounded" />
              </div>
              <div className="bg-charcoal p-4 neo-border text-ui-white">
                <h3 className="font-cabinet font-bold text-lg mb-2">Growth</h3>
                <div className="text-3xl font-extrabold text-primary-yellow">+24%</div>
              </div>
              <div className="col-span-2 bg-ui-white p-4 neo-border">
                <h3 className="font-cabinet font-bold text-lg mb-4">Analytics Dashboard</h3>
                <div className="space-y-3">
                  <div className="h-4 bg-sage/30 rounded w-3/4" />
                  <div className="h-4 bg-sage/30 rounded w-1/2" />
                  <div className="h-4 bg-sage/30 rounded w-5/6" />
                </div>
              </div>
            </div>
          </BrowserMockup>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
