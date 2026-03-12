import React from 'react';
import { cn } from "@/lib/utils";

const NeoButton = React.forwardRef(({ className, variant = "primary", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-cabinet font-extrabold transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 neo-border cursor-pointer";
  
  const variants = {
    primary: "bg-ui-black text-ui-white neo-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none",
    secondary: "bg-ui-white text-ui-black neo-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
    sage: "bg-sage text-ui-black neo-shadow hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
  };

  const sizes = {
    default: "h-12 px-8 py-2 text-lg",
    sm: "h-9 px-4 py-1 text-sm",
    lg: "h-14 px-10 py-3 text-xl",
    icon: "h-10 w-10",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

NeoButton.displayName = "NeoButton";

export { NeoButton };
