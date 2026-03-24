import React from 'react';

const Marquee = () => {
  return (
    <div className="bg-charcoal border-b-2 border-ui-black py-8 overflow-hidden">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-16">
            {['Trusted by developers from', 'GitHub users', 'LeetCode grinders', 'Codeforces competitors', 'Students & professionals'].map((text, idx) => (
              <span key={idx} className="font-cabinet font-extrabold text-2xl text-sage/60 uppercase tracking-tighter flex items-center gap-4">
                {idx > 0 && <span className="text-primary-yellow">•</span>}
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Marquee;
