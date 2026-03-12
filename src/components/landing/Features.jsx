import React from 'react';
import { Shield, BarChart2, Users, Check, X } from "lucide-react";

const Features = () => {
  return (
    <>
      {/* Problem vs Solution */}
      <section id="features" className="py-24 px-6 lg:px-12 bg-ui-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Problem Card */}
          <div className="p-10 bg-slate-50 border-2 border-dashed border-ui-black/20 rounded-[3rem] opacity-70">
            <h2 className="font-cabinet font-extrabold text-4xl mb-8 uppercase tracking-tighter">The Hard Way</h2>
            <ul className="space-y-6">
              {[
                "Messy spreadsheets and lost passwords",
                "Fragmented portfolio across 5 platforms",
                "Zero insights into developer metrics",
                "Manual certificate verification pains"
              ].map(item => (
                <li key={item} className="flex gap-4 items-start text-lg font-satoshi font-medium">
                  <div className="bg-red-100 p-1 neo-border">
                    <X className="w-5 h-5 text-red-600" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="p-10 bg-primary-yellow neo-border neo-shadow-lg rounded-[3rem]">
            <h2 className="font-cabinet font-extrabold text-4xl mb-8 uppercase tracking-tighter">The Forge Way</h2>
            <ul className="space-y-6">
              {[
                "Unified dashboard for everything",
                "AI-driven portfolio generation",
                "Direct API integration for real-time stats",
                "Automated Credly & LinkedIn sync"
              ].map(item => (
                <li key={item} className="flex gap-4 items-start text-lg font-satoshi font-extrabold">
                  <div className="bg-ui-black p-1 neo-border">
                    <Check className="w-5 h-5 text-primary-yellow" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 lg:px-12 bg-primary-yellow border-y-2 border-ui-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-cabinet font-extrabold text-5xl tracking-tighter mb-4 uppercase">Powerful Features</h2>
            <p className="font-satoshi font-medium text-xl max-w-2xl mx-auto">Everything you need to showcase your professional journey without the technical debt.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Smart Portfolios", icon: Users, desc: "Auto-generate beautiful portfolios that sync with your real-time github stats." },
              { title: "Badge Engine", icon: Shield, desc: "Automatically pull and verify your certifications from Credly and other providers." },
              { title: "Deep Analytics", icon: BarChart2, desc: "Track how often your profiles are viewed and which skills are trending." }
            ].map((feature, i) => (
              <div key={i} className="group bg-ui-white p-8 neo-border neo-shadow transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                <div className="w-16 h-16 bg-sage neo-border flex items-center justify-center mb-6 transition-colors group-hover:bg-primary-yellow">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-cabinet font-extrabold text-2xl mb-4 uppercase tracking-tighter">{feature.title}</h3>
                <p className="font-satoshi font-medium text-ui-black/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
