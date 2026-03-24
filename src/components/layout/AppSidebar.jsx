import * as React from "react"
import {
  LayoutDashboard,
  Key,
  Award,
  Database,
  BookOpen,
  Settings,
  LogOut,
  ChevronRight,
  Zap,
  Link2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const { state, isMobile, setOpenMobile } = useSidebar()
  const backendBaseUrl = import.meta.env.VITE_BACKEND_URL.split('/api/v1')[0];

  const getFullImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const normalizedPath = path.toString().replace(/\\/g, '/');
    return `${backendBaseUrl}/${normalizedPath}`;
  };

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
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
    <Sidebar collapsible="icon" className="neo-border-r bg-ui-white">
      <SidebarHeader className="p-4 border-b-2 border-ui-black">
        <Link to="/dashboard" className="flex items-center gap-3" onClick={handleLinkClick}>
          <div className="w-10 h-10 bg-ui-black flex items-center justify-center neo-border">
            <Zap className="text-primary-yellow w-6 h-6 fill-current" />
          </div>
          {state === "expanded" && (
            <span className="font-cabinet font-extrabold text-xl uppercase tracking-tighter">
              Forge
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-2 gap-4">
        <SidebarGroup>
          <SidebarGroupLabel className="font-cabinet font-extrabold text-xs uppercase tracking-widest text-ui-black/40 px-4 mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "h-12 px-4 font-satoshi font-bold transition-all",
                      location.pathname === item.url 
                        ? "bg-primary-yellow text-ui-black neo-border-sm" 
                        : "hover:bg-primary-yellow/10"
                    )}
                  >
                    <Link to={item.url} onClick={handleLinkClick}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2 border-t-2 border-ui-black bg-sage/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="h-12 px-3 font-satoshi font-bold hover:bg-red-500/10 hover:text-red-600 transition-colors"
              onClick={logout}
              tooltip="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground neo-border-sm bg-ui-white mt-2"
              tooltip={user?.name}
            >
              <Link to="/dashboard/profile" className="flex items-center gap-3" onClick={handleLinkClick}>
                <div className="w-8 h-8 bg-primary-yellow neo-border-sm text-[10px] flex items-center justify-center font-cabinet font-extrabold flex-shrink-0 overflow-hidden">
                  {user?.profile_image_url ? (
                    <img src={getFullImageUrl(user.profile_image_url)} alt="" className="w-full h-full object-cover" />
                  ) : (
                    user?.name?.charAt(0) || "U"
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight overflow-hidden">
                  <span className="truncate font-cabinet font-extrabold uppercase tracking-tighter">
                    {user?.name}
                  </span>
                  <span className="truncate font-satoshi text-xs text-ui-black/40 italic">
                    {user?.email}
                  </span>
                </div>
                <ChevronRight className="ml-auto w-4 h-4 opacity-40" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

