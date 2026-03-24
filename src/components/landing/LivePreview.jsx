import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code2, Flame, Trophy, CheckCircle2, Star } from 'lucide-react';

const LivePreview = () => {
  return (
    <section id="preview" className="py-24 px-6 lg:px-12 bg-ui-white border-b-2 border-ui-black dot-pattern">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-cabinet font-extrabold text-5xl lg:text-6xl uppercase tracking-tighter mb-4">
            Live <span className="bg-primary-yellow px-4 neo-border-sm rotate-1 inline-block">Preview</span>
          </h2>
          <p className="font-satoshi font-bold text-xl text-ui-black/60 max-w-2xl mx-auto">
            What your unified developer identity looks like to the world.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* 📊 1. Coding Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="neo-border neo-shadow bg-ui-white p-6 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-ui-black/10">
              <div className="p-2 bg-purple-100 neo-border-sm">
                <Code2 className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-cabinet font-extrabold text-2xl uppercase tracking-tighter">Coding Stats</h3>
            </div>

            <div className="space-y-4 flex-1">
              <div className="p-4 bg-ui-black text-ui-white neo-border-sm flex justify-between items-center">
                <span className="font-satoshi font-bold text-sm text-ui-white/70">Total Solved</span>
                <span className="font-cabinet font-extrabold text-3xl text-primary-yellow">1,248</span>
              </div>
              
              <div className="p-4 bg-primary-yellow/10 neo-border-sm flex justify-between items-center">
                <span className="font-satoshi font-bold text-sm">Contest Rating</span>
                <span className="font-cabinet font-extrabold text-2xl">1942</span>
              </div>

              <div className="p-4 bg-red-50 neo-border-sm flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-500 fill-current" />
                  <span className="font-satoshi font-bold text-sm">Daily Streak</span>
                </div>
                <span className="font-cabinet font-extrabold text-2xl text-red-500">45 Days</span>
              </div>
            </div>
          </motion.div>

          {/* 🏆 2. Badges Grid Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="neo-border neo-shadow bg-ui-white p-6 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-ui-black/10">
              <div className="p-2 bg-yellow-100 neo-border-sm">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-cabinet font-extrabold text-2xl uppercase tracking-tighter">Badges</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {[
                { label: "Knight", icon: Trophy, color: "bg-purple-500", platform: "LeetCode" },
                { label: "50 Days", icon: Flame, color: "bg-orange-500", platform: "LeetCode" },
                { label: "Master", icon: Star, color: "bg-red-500", platform: "Codeforces" },
                { label: "1K Solved", icon: CheckCircle2, color: "bg-green-500", platform: "Stats" }
              ].map((badge, i) => (
                <div key={i} className="neo-border-sm p-3 flex flex-col items-center text-center bg-slate-50 hover:bg-primary-yellow/10 transition-colors">
                  <div className={`w-12 h-12 ${badge.color} text-ui-white rounded-full flex items-center justify-center mb-2 neo-border-sm`}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <div className="font-cabinet font-extrabold text-xs uppercase tracking-tighter leading-tight">{badge.label}</div>
                  <div className="text-[9px] font-satoshi font-bold text-ui-black/40 mt-0.5">{badge.platform}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 📜 3. Certificates Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="neo-border neo-shadow bg-ui-white p-6 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-ui-black/10">
              <div className="p-2 bg-green-100 neo-border-sm">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-cabinet font-extrabold text-2xl uppercase tracking-tighter">Certificates</h3>
            </div>

            <div className="space-y-4 flex-1">
              {[
                { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "Jan 2026" },
                { title: "Meta Front-End Developer", issuer: "Coursera / Meta", date: "Nov 2025" }
              ].map((cert, i) => (
                <div key={i} className="p-4 bg-sage/5 neo-border-sm border-l-4 border-l-ui-black hover:bg-sage/10 transition-colors">
                  <h4 className="font-cabinet font-extrabold text-sm uppercase tracking-tighter mb-1">{cert.title}</h4>
                  <div className="flex justify-between items-center">
                    <span className="font-satoshi font-bold text-[10px] text-ui-black/50">{cert.issuer}</span>
                    <span className="font-cabinet font-extrabold text-[9px] bg-ui-black text-ui-white px-1.5 py-0.5 uppercase">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LivePreview;
