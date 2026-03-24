import React from 'react';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6 lg:px-12 bg-sage">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-cabinet font-extrabold text-5xl mb-16 text-center tracking-tighter uppercase">What Builders Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah J.", 
              role: "Students", 
              text: "Finally, a place where all my coding progress is visible in one dashboard." 
            },
            { 
              name: "Michael K.", 
              role: "Placement Lead", 
              text: "This makes my portfolio 10x stronger for placements and interviews." 
            },
            { 
              name: "Elena R.", 
              role: "Competitive Coder", 
              text: "Super clean and actually useful — not just another generic portfolio tracker." 
            }
          ].map((t, i) => (
            <div key={i} className="bg-ui-white p-8 neo-border rounded-br-[3xl] rounded-tl-[3xl]">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(s => (
                  <div key={s} className="w-5 h-5 bg-[#ffbc2e] neo-border" />
                ))}
              </div>
              <p className="font-satoshi font-bold italic mb-6 text-lg">"{t.text}"</p>
              <div>
                <div className="font-cabinet font-extrabold text-xl uppercase tracking-tighter">{t.name}</div>
                <div className="font-satoshi font-medium text-ui-black/60 uppercase text-sm tracking-widest">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
