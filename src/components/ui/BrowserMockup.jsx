import React from 'react';
import { cn } from "@/lib/utils";

const BrowserMockup = ({ className, children, ...props }) => {
  return (
    <div className={cn("bg-ui-white neo-border neo-shadow-xl rounded-2xl overflow-hidden", className)} {...props}>
      {/* Browser Header */}
      <div className="bg-ui-black h-8 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      {/* Browser Content */}
      <div className="p-6 bg-ui-white min-h-[300px]">
        {children}
      </div>
    </div>
  );
};

export { BrowserMockup };
