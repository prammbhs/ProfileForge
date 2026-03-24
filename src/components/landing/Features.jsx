import React from 'react';
import { Globe, BarChart2, Award, FileText, FolderGit2 } from "lucide-react";

// Feature 1: Profile Aggregation
// Feature 2: Coding Stats Dashboard
// Feature 3: Badges & Achievements
// Feature 4: Certificate Management
// Feature 5: Project Showcase

const Features = () => {
  const featuresList = [
    {
      title: "Profile Aggregation",
      desc: "Connect GitHub, LeetCode, and Codeforces instantly. No manual updates needed.",
      icon: Globe
    },
    {
      title: "Coding Stats Dashboard",
      desc: "Track solved problems, ratings, streaks, and activity trends all inside one feed.",
      icon: BarChart2
    },
    {
      title: "Badges & Achievements",
      desc: "Automatically collect and display contest rankings, milestones, and platform badges.",
      icon: Award
    },
    {
      title: "Certificate Management",
      desc: "Upload and organize your course certificates, achievements, and hackathon wins.",
      icon: FileText
    },
    {
      title: "Project Showcase",
      desc: "Highlight your best work: add GitHub projects, showcase tech stack, share live demos.",
      icon: FolderGit2
    }
  ];

  return (
    <section id="features" className="py-24 px-6 lg:px-12 bg-primary-yellow border-t-2 border-ui-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-cabinet font-extrabold text-5xl lg:text-6xl tracking-tighter mb-4 uppercase">
            Everything you need <br /> to showcase your growth
          </h2>
          <p className="font-satoshi font-bold text-xl max-w-2xl mx-auto text-ui-black/70">
            Automated, beautifully integrated, and built for modern developers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, i) => (
            <div 
              key={i} 
              className="group bg-ui-white p-8 neo-border neo-shadow transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none flex flex-col"
            >
              <div className="w-16 h-16 bg-sage neo-border flex items-center justify-center mb-6 transition-colors group-hover:bg-primary-yellow">
                <feature.icon className="w-8 h-8 text-ui-black" />
              </div>
              <h3 className="font-cabinet font-extrabold text-2xl mb-3 uppercase tracking-tighter">
                {feature.title}
              </h3>
              <p className="font-satoshi font-medium text-ui-black/70 leading-relaxed flex-1">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
