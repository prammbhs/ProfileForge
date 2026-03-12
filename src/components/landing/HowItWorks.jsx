import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 lg:px-12 bg-charcoal text-ui-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-cabinet font-extrabold text-5xl mb-20 text-center tracking-tighter uppercase">How It Works</h2>
        <div className="relative">
          <div className="absolute top-12 left-0 right-0 h-1 bg-[#272727] hidden md:block" />
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { title: "Connect Sources", color: "border-sage shadow-[0_0_15px_#b7c6c2]", desc: "Link your GitHub, LinkedIn, and Credly accounts in one click." },
              { title: "Forge Identity", color: "border-primary-yellow shadow-[0_0_15px_#ffe17c]", desc: "Our AI organizes your data into a cohesive professional narrative." },
              { title: "Deploy & Grow", color: "border-ui-white shadow-[0_0_15px_#ffffff]", desc: "Share your live profile and track engagement with built-in analytics." }
            ].map((step, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className={`w-24 h-24 rounded-full bg-charcoal border-4 ${step.color} mx-auto mb-8 flex items-center justify-center font-cabinet font-extrabold text-3xl`}>
                  {i + 1}
                </div>
                <h3 className="font-cabinet font-extrabold text-2xl mb-4 tracking-tighter uppercase">{step.title}</h3>
                <p className="font-satoshi font-medium text-sage/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
