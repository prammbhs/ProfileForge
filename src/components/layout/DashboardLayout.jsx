import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { useAuth } from "@/context/AuthContext"
import { Navigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const { user, loading } = useAuth();

  // Persist sidebar state across reloads
  const [sidebarOpen, setSidebarOpen] = React.useState(() => {
    const saved = localStorage.getItem('sidebar_open');
    return saved === null ? true : saved === 'true';
  });

  const handleSidebarChange = (open) => {
    setSidebarOpen(open);
    localStorage.setItem('sidebar_open', String(open));
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

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={handleSidebarChange}>
      <div className="flex min-h-screen w-full bg-ui-white">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-grow">
          <header className="h-16 flex items-center px-6 border-b-2 border-ui-black bg-ui-white sticky top-0 z-10">
            <SidebarTrigger className="neo-border-sm bg-primary-yellow p-1" />
            <div className="ml-6 flex items-center gap-2">
              <span className="font-cabinet font-extrabold text-sm uppercase tracking-widest text-ui-black/40">Dashboard</span>
              <span className="text-ui-black/20">/</span>
              <span className="font-cabinet font-extrabold text-sm uppercase tracking-tighter">Home</span>
            </div>
          </header>
          <main className="flex-grow p-6 lg:p-10 overflow-y-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
