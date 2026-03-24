import React, { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext"
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Key, Award, Database, BookOpen, LogOut, ChevronRight, Zap, Link2, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const pageTitles = {
  '/dashboard': 'Home',
  '/dashboard/keys': 'API Keys',
  '/dashboard/certificates': 'Certificates',
  '/dashboard/projects': 'Projects',
  '/dashboard/profiles': 'Profiles',
  '/dashboard/docs': 'Docs',
  '/dashboard/profile': 'Profile',
};

const getPageTitle = (pathname) => {
  // Try exact match first
  if (pageTitles[pathname]) return pageTitles[pathname];
  // Fallback to startsWith for nested routes
  const match = Object.keys(pageTitles).find(path => pathname.startsWith(path) && path !== '/dashboard');
  return match ? pageTitles[match] : 'Home';
};

const AppSidebarContent = ({ onMobileClose, isCollapsed, isMobile, onToggleDesktop }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL?.split('/api/v1')[0] || '';

  const getFullImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const normalizedPath = path.toString().replace(/\\/g, '/');
    return `${backendBaseUrl}/${normalizedPath}`;
  };

  const mainNav = [
    { title: "Home", icon: LayoutDashboard, url: "/dashboard" },
    { title: "API Keys", icon: Key, url: "/dashboard/keys" },
    { title: "Certificates", icon: Award, url: "/dashboard/certificates" },
    { title: "Projects", icon: Database, url: "/dashboard/projects" },
    { title: "Profiles", icon: Link2, url: "/dashboard/profiles" },
    { title: "Docs", icon: BookOpen, url: "/dashboard/docs" },
  ]

  return (
    <div className={cn(
      "flex flex-col h-full bg-ui-white border-r-2 border-ui-black flex-shrink-0 transition-all duration-300 overflow-hidden",
      isCollapsed ? "w-[4.5rem]" : "w-64"
    )}>
      {!isMobile && (
        <div className={cn(
          "h-16 border-b-2 border-ui-black flex items-center flex-shrink-0 transition-all",
          isCollapsed ? "justify-center px-0" : "px-6"
        )}>
          {isCollapsed ? (
            <button 
              onClick={onToggleDesktop} 
              className="p-1.5 neo-border-sm bg-primary-yellow shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              title="Expand Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          ) : (
            <Link to="/dashboard" className="flex items-center gap-3" onClick={onMobileClose} title="Forge Home">
              <div className="w-8 h-8 bg-ui-black flex items-center justify-center neo-border flex-shrink-0">
                <Zap className="text-primary-yellow w-5 h-5 fill-current" />
              </div>
              <span className="font-cabinet font-extrabold text-xl uppercase tracking-tighter whitespace-nowrap">
                Forge
              </span>
            </Link>
          )}
        </div>
      )}

      <div className={cn(
        "flex-1 overflow-y-auto flex flex-col gap-6",
        isCollapsed ? "p-3" : "p-4"
      )}>
        <div>
          {!isCollapsed && (
            <h3 className="font-cabinet font-extrabold text-xs uppercase tracking-widest text-ui-black/40 px-2 mb-3 whitespace-nowrap">
              Main Menu
            </h3>
          )}
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={onMobileClose}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center rounded-md transition-all font-satoshi font-bold",
                    isCollapsed ? "justify-center h-12 w-12 mx-auto" : "gap-3 h-12 px-3",
                    isActive
                      ? "bg-primary-yellow text-ui-black neo-border-sm"
                      : "text-ui-black/70 hover:bg-primary-yellow/10 hover:text-ui-black"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="whitespace-nowrap">{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className={cn(
        "border-t-2 border-ui-black bg-sage/5 flex flex-col gap-2 flex-shrink-0",
        isCollapsed ? "p-3 items-center" : "p-4"
      )}>
        <button
          onClick={logout}
          title={isCollapsed ? "Logout" : undefined}
          className={cn(
            "flex items-center font-satoshi font-bold text-ui-black/70 hover:bg-red-500/10 hover:text-red-600 transition-colors rounded-md",
            isCollapsed ? "justify-center h-12 w-12" : "gap-3 h-12 px-3 w-full text-left"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
        </button>
        
        <Link
          to="/dashboard/profile"
          onClick={onMobileClose}
          title={isCollapsed ? user?.name : undefined}
          className={cn(
            "flex items-center bg-ui-white neo-border-sm hover:translate-x-1 hover:translate-y-1 transition-transform group",
            isCollapsed ? "justify-center p-1 w-12 h-12" : "gap-3 p-2",
            isCollapsed ? "" : "shadow-[4px_4px_0px_#000]"
          )}
        >
          <div className="w-8 h-8 bg-primary-yellow neo-border-sm flex items-center justify-center font-cabinet font-extrabold flex-shrink-0 overflow-hidden text-xs">
            {user?.profile_image_url ? (
              <img src={getFullImageUrl(user?.profile_image_url)} alt="" className="w-full h-full object-cover" />
            ) : (
              user?.name?.charAt(0) || "U"
            )}
          </div>
          {!isCollapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="truncate font-cabinet font-extrabold uppercase tracking-tighter text-sm">
                  {user?.name}
                </div>
                <div className="truncate font-satoshi text-xs text-ui-black/40 italic">
                  {user?.email}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </>
          )}
        </Link>
      </div>
    </div>
  )
}

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // On mobile, default to closed. On desktop, default to what's stored or true.
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return false;
    const saved = localStorage.getItem('sidebar_open');
    return saved === null ? true : saved === 'true';
  });

  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    if (!isMobile) {
      localStorage.setItem('sidebar_open', String(newState));
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-yellow dot-pattern flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-ui-black border-t-transparent animate-spin rounded-full" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Determine effective collapse state
  // On mobile, if sidebar is not open, it's fully hidden (not collapsed to icon mode).
  // On desktop, if sidebar is not open, it's collapsed to icon mode.
  const desktopCollapsed = !sidebarOpen && !isMobile;
  const currentPageTitle = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen w-full bg-surface text-on_surface overflow-hidden">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex h-16 items-center justify-between px-4 border-b-2 border-ui-black bg-ui-white flex-shrink-0 z-20 relative">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ui-black flex items-center justify-center neo-border">
            <Zap className="text-primary-yellow w-5 h-5 fill-current" />
          </div>
          <span className="font-cabinet font-extrabold text-lg uppercase tracking-tighter">Forge</span>
        </Link>
        <button 
          onClick={toggleSidebar} 
          className="p-1.5 neo-border-sm bg-primary-yellow shadow-[2px_2px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          {sidebarOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
        </button>
      </div>

      <div className={cn(
        "h-[calc(100vh-4rem)] md:h-screen w-full transition-all duration-300 ease-in-out relative flex",
        !isMobile && (sidebarOpen ? "grid grid-cols-[16rem_1fr]" : "grid grid-cols-[4.5rem_1fr]")
      )}>
        
        {/* Sidebar Container */}
        <div className={cn(
          "h-full overflow-hidden transition-all duration-300 ease-in-out z-30",
          isMobile ? "fixed inset-y-0 left-0 mt-16 h-[calc(100vh-4rem)] bg-ui-white" : "relative",
          isMobile 
            ? (sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0")
            : "translate-x-0 cursor-default"
        )}>
          <AppSidebarContent 
            onMobileClose={closeMobileSidebar} 
            isCollapsed={desktopCollapsed} 
            isMobile={isMobile} 
            onToggleDesktop={toggleSidebar}
          />
        </div>

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-ui-black/20 z-20 mt-16 backdrop-blur-sm transition-opacity"
            onClick={closeMobileSidebar}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-surface relative z-10">
          <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b-2 border-ui-black bg-ui-white flex-shrink-0 z-20">
            <div className="flex items-center">
              {!isMobile && !desktopCollapsed && (
                <button 
                  onClick={toggleSidebar} 
                  className="mr-4 p-1.5 neo-border-sm bg-primary-yellow shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                  title="Collapse Sidebar"
                >
                  <Menu className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              )}
              <div className="flex items-center gap-2">
                <span className="font-cabinet font-extrabold text-xs md:text-sm uppercase tracking-widest text-ui-black/40">Dashboard</span>
                <span className="text-ui-black/20 font-bold">/</span>
                <span className="font-cabinet font-extrabold text-xs md:text-sm uppercase tracking-tighter">{currentPageTitle}</span>
              </div>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-1.5 neo-border-sm bg-primary-yellow shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5 text-ui-black" /> : <Moon className="w-4 h-4 md:w-5 md:h-5 text-ui-black" />}
            </button>
          </header>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
