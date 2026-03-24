import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Docs", href: "/#docs" },
    { name: "Features", href: "/#features" },
    { name: "How it Works", href: "/#how-it-works" },
    { name: "Testimonials", href: "/#testimonials" },
  ];

  const handleLogoClick = (e) => {
    if (window.location.pathname === '/' || window.location.pathname === '/#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-primary-yellow border-b-2 border-ui-black z-50 flex items-center justify-between px-6 lg:px-12">
      <Link to="/" onClick={handleLogoClick} className="flex items-center gap-3">
        <div className="w-10 h-10 bg-ui-black flex items-center justify-center neo-border">
          <Zap className="text-primary-yellow w-6 h-6 fill-current" />
        </div>
        <span className="font-cabinet font-extrabold text-2xl tracking-tighter">ProfileForge</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((item) => (
          item.href.startsWith('/#') ? (
            <a
              key={item.name}
              href={item.href}
              className="font-satoshi font-bold text-lg hover:underline decoration-ui-black decoration-2 underline-offset-4"
            >
              {item.name}
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.href}
              className="font-satoshi font-bold text-lg hover:underline decoration-ui-black decoration-2 underline-offset-4"
            >
              {item.name}
            </Link>
          )
        ))}
        <div className="flex items-center gap-4 ml-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <NeoButton variant="secondary" size="sm" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </NeoButton>
              </Link>
              <NeoButton variant="primary" size="sm" onClick={logout} className="gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </NeoButton>
            </>
          ) : (
            <>
              <Link to="/login">
                <NeoButton variant="secondary" size="sm">Log In</NeoButton>
              </Link>
              <Link to="/signup">
                <NeoButton variant="primary" size="sm">Join Now</NeoButton>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden p-2 neo-border bg-ui-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-primary-yellow border-b-2 border-ui-black p-6 md:hidden flex flex-col gap-6 items-center z-40">
          {navLinks.map((item) => (
            item.href.startsWith('/#') ? (
              <a
                key={item.name}
                href={item.href}
                className="font-satoshi font-extrabold text-2xl uppercase tracking-tighter"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="font-satoshi font-extrabold text-2xl uppercase tracking-tighter"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          ))}
          <div className="flex flex-col gap-4 w-full">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                  <NeoButton variant="secondary" size="lg" className="w-full gap-2">
                    <LayoutDashboard className="w-5 h-5" /> Dashboard
                  </NeoButton>
                </Link>
                <NeoButton variant="primary" size="lg" onClick={() => { logout(); setIsOpen(false); }} className="w-full gap-2">
                  <LogOut className="w-5 h-5" /> Logout
                </NeoButton>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <NeoButton variant="secondary" size="lg" className="w-full">Log In</NeoButton>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <NeoButton variant="primary" size="lg" className="w-full">Join Now</NeoButton>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
