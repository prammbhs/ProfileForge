import React from 'react';

const Marquee = () => {
  return (
    <div className="bg-charcoal border-b-2 border-ui-black py-8 overflow-hidden">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-16">
            {['ACME CORP', 'GLOBEX INDUSTRIES', 'SOYLENT CORP', 'INITECH', 'UMBRELLA CORP', 'OXCORP'].map((brand) => (
              <span key={brand} className="font-cabinet font-extrabold text-4xl text-sage/50 uppercase tracking-tighter">
                {brand}
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
