import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Trophy } from 'lucide-react';

const UseCases = () => {
  const personas = [
    {
      title: "Students",
      icon: GraduationCap,
      desc: "Build a strong profile for internships and placements. Showcase all your profiles in a single click to recruiters.",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      title: "Developers",
      icon: Code,
      desc: "Track progress and showcase skills professionally. Automate your portfolio updates without breaking a sweat.",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      title: "Competitive Programmers",
      icon: Trophy,
      desc: "Display rankings, ratings, and achievements in one place. Flex your LeetCode and Codeforces grids proudly.",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600"
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12 bg-charcoal text-ui-white border-b-2 border-ui-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-cabinet font-extrabold text-5xl lg:text-6xl text-center mb-16 uppercase tracking-tighter">
          Tailored For <span className="text-primary-yellow">You</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((pes, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 border-2 border-ui-white/20 hover:border-primary-yellow transition-colors flex flex-col space-y-4"
            >
              <div className={`w-14 h-14 ${pes.bgColor} flex items-center justify-center neo-border ml-0`}>
                <pes.icon className={`w-8 h-8 ${pes.textColor}`} />
              </div>

              <h3 className="font-cabinet font-extrabold text-2xl uppercase tracking-tighter text-primary-yellow">
                {pes.title}
              </h3>

              <p className="font-satoshi font-medium text-sage/80 flex-1">
                {pes.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
