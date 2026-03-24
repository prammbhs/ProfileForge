import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart2, Trophy, Rocket } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

const Hero = () => {
  return (
    <section className="pt-15 pb-20 px-6 lg:px-12 bg-primary-yellow dot-pattern border-b-2 border-ui-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center bg-ui-white neo-border px-4 py-1 rounded-full mb-6">
            <span className="font-satoshi font-bold text-sm">NEW: Developer Identity Platform</span>
          </div>
          <h1 className="font-cabinet font-extrabold text-6xl lg:text-8xl leading-none tracking-tighter text-ui-black mb-6 uppercase">
            Forge Your <br />
            <span style={{ WebkitTextStroke: "2px black", color: "transparent" }}>Developer</span> <br />
            Identity.
          </h1>
          <p className="font-satoshi font-medium text-xl text-ui-black/80 max-w-xl mb-6 leading-relaxed">
            Connect your coding profiles, track your progress, and showcase your achievements — all in one powerful dashboard.
          </p>
          
          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-2 font-satoshi font-bold text-base text-ui-black/80">
              <BarChart2 className="w-5 h-5 text-purple-600" /> Unified coding stats across platforms
            </div>
            <div className="flex items-center gap-2 font-satoshi font-bold text-base text-ui-black/80">
              <Trophy className="w-5 h-5 text-yellow-600" /> Showcase badges & certificates
            </div>
            <div className="flex items-center gap-2 font-satoshi font-bold text-base text-ui-black/80">
              <Rocket className="w-5 h-5 text-red-500" /> Build a professional dev profile in minutes
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link to="/signup">
              <NeoButton variant="primary" size="lg" className="w-full sm:w-auto uppercase tracking-tighter text-xl px-8 py-6">
                Get Started <ArrowRight className="ml-2 w-6 h-6" />
              </NeoButton>
            </Link>
            <a href="#docs" className="w-full sm:w-auto">
              <NeoButton variant="secondary" size="lg" className="w-full uppercase tracking-tighter text-xl px-8 py-6">
                View Docs
              </NeoButton>
            </a>
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
