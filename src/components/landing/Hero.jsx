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
            <div className="grid grid-cols-2 gap-4 p-2 bg-[#F5F5F7] dark:bg-[#1C1C1E]">
              {[
                {
                  name: "GitHub",
                  color: "bg-ui-black text-white",
                  borderColor: "border-ui-black",
                  metrics: ["followers", "public_repos", "stars_received"]
                },
                {
                  name: "LeetCode",
                  color: "bg-[#FFA116] text-ui-black",
                  borderColor: "border-[#FFA116]",
                  metrics: ["ranking", "easy_solved", "medium_solved"]
                },
                {
                  name: "Codeforces",
                  color: "bg-[#318CE7] text-white",
                  borderColor: "border-[#318CE7]",
                  metrics: ["rating", "rank", "maxRating"]
                },
                {
                  name: "Credly",
                  color: "bg-[#FF6A00] text-white",
                  borderColor: "border-[#FF6A00]",
                  metrics: ["badges_count", "verify_urls", "badge_images"]
                }
              ].map(platform => (
                <div key={platform.name} className={`${platform.color} p-4 neo-border shadow-solid hover:-translate-y-1 transition-all duration-200 cursor-default group`}>
                  <h4 className="font-cabinet font-extrabold text-xs uppercase mb-3 flex items-center justify-between">
                    <span>{platform.name} API</span>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  </h4>
                  <div className="space-y-1.5">
                    {platform.metrics.map(m => (
                      <div key={m} className="flex items-center justify-between font-mono text-[9px] opacity-90 border-b border-current/10 pb-0.5">
                        <span className="truncate">{m}</span>
                        <span className="font-black text-emerald-400 group-hover:scale-110 transition-transform">✓</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </BrowserMockup>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
