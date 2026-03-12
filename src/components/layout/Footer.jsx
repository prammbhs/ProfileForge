import React from 'react';
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-ui-white py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-primary-yellow flex items-center justify-center neo-border">
              <Zap className="text-ui-black w-5 h-5 fill-current" />
            </div>
            <span className="font-cabinet font-extrabold text-xl tracking-tighter uppercase">ProfileForge</span>
          </div>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 bg-[#272727] border-2 border-[#373737] hover:bg-primary-yellow hover:border-ui-black transition-colors cursor-pointer" />
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-cabinet font-extrabold text-lg mb-6 uppercase tracking-tighter">Product</h4>
          <ul className="space-y-4 text-sage/60 font-satoshi font-medium">
            {['Features', 'Templates', 'Integrations', 'Pricing'].map(l => <li key={l} className="hover:text-ui-white cursor-pointer">{l}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-cabinet font-extrabold text-lg mb-6 uppercase tracking-tighter">Company</h4>
          <ul className="space-y-4 text-sage/60 font-satoshi font-medium">
            {['About', 'Careers', 'Blog', 'Legal'].map(l => <li key={l} className="hover:text-ui-white cursor-pointer">{l}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-cabinet font-extrabold text-lg mb-6 uppercase tracking-tighter">Legal</h4>
          <ul className="space-y-4 text-sage/60 font-satoshi font-medium">
            {['Privacy', 'Terms', 'Security', 'Contact'].map(l => <li key={l} className="hover:text-ui-white cursor-pointer">{l}</li>)}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#272727] text-sage/40 text-center font-satoshi font-medium">
        © {new Date().getFullYear()} ProfileForge Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
