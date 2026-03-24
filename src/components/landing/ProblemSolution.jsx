import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const ProblemSolution = () => {
  return (
    <section className="py-24 px-6 lg:px-12 bg-ui-white border-b-2 border-ui-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-cabinet font-extrabold text-5xl lg:text-6xl text-center mb-16 uppercase tracking-tighter">
          The scattered profile <span className="text-red-600">Problem</span> <br />
          And our <span className="text-green-600">Solution</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="neo-border neo-shadow-lg p-8 bg-red-50 space-y-6 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 neo-border flex items-center justify-center text-ui-white">
                <XCircle className="w-7 h-7" />
              </div>
              <h3 className="font-cabinet font-extrabold text-2xl uppercase tracking-tighter text-red-600">Problem</h3>
            </div>
            
            <h4 className="font-cabinet font-extrabold text-xl uppercase tracking-tighter mt-2">Your developer identity is scattered</h4>
            
            <ul className="space-y-4 flex-1">
              {[
                "Stats split across platforms",
                "No central portfolio",
                "Hard to showcase achievements",
                "Recruiters can’t see your full potential"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 font-satoshi font-bold text-ui-black/70">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="neo-border neo-shadow-lg p-8 bg-green-50 space-y-6 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 neo-border flex items-center justify-center text-ui-white">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="font-cabinet font-extrabold text-2xl uppercase tracking-tighter text-green-600">Solution</h3>
            </div>

            <h4 className="font-cabinet font-extrabold text-xl uppercase tracking-tighter mt-2">ProfileForge brings everything together</h4>

            <ul className="space-y-4 flex-1">
              {[
                "All coding profiles in one place",
                "Auto-fetched stats & achievements",
                "Clean, shareable developer profile",
                "Built for visibility and growth"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 font-satoshi font-bold text-ui-black/70">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
