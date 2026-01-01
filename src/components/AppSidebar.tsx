import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  Phone,
  LayoutDashboard,
  Users,
  Calendar,
  Church,
  Briefcase,
  GraduationCap,
  Bot,
  GitBranch,
  Settings,
  ChevronLeft,
  LogOut,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useBranding } from "@/contexts/BrandingContext";
import FlynLogo from "@/components/FlynLogo";

const navItems = [
  { icon: Inbox, label: "Inbox", path: "/inbox", badge: 12 },
  { icon: Phone, label: "Dialer", path: "/dialer" },
  { divider: true },
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "CRM", path: "/dashboard/crm" },
  { icon: Calendar, label: "Events", path: "/dashboard/events" },
  { icon: Briefcase, label: "HR", path: "/dashboard/hr" },
  { icon: Church, label: "Church", path: "/dashboard/church" },
  { icon: GraduationCap, label: "Coaches", path: "/dashboard/coaches" },
  { icon: Briefcase, label: "Freelancers", path: "/dashboard/freelancers" },
  { divider: true },
  { icon: Bot, label: "AI Agents", path: "/ai-agents" },
  { icon: GitBranch, label: "Automations", path: "/automations" },
];

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AppSidebar = ({ isCollapsed, onToggle }: AppSidebarProps) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { branding } = useBranding();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 256 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-screen bg-sidebar flex flex-col border-r border-sidebar-border fixed left-0 top-0 z-50"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              {branding.logoUrl ? (
                <img src={branding.logoUrl} alt={branding.appName} className="h-8 object-contain" />
              ) : (
                <FlynLogo size="md" showText={true} customText={branding.logoText} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item, index) => {
          if (item.divider) {
            return (
              <div
                key={`divider-${index}`}
                className="my-3 border-t border-sidebar-border"
              />
            );
          }

          const Icon = item.icon!;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path!}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Badge */}
              {item.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn(
                    "absolute flex items-center justify-center text-xs font-bold rounded-full bg-flyn-cyan text-white",
                    isCollapsed
                      ? "w-5 h-5 -top-1 -right-1"
                      : "ml-auto px-2 py-0.5 relative"
                  )}
                >
                  {item.badge}
                </motion.span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border space-y-1">
        <NavLink
          to="/settings/white-label"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            location.pathname === "/settings/white-label"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Sparkles className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">White Label</span>}
        </NavLink>
        <NavLink
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            location.pathname === "/settings"
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Settings className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </NavLink>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>

        {/* User info */}
        {!isCollapsed && user && (
          <div className="px-3 py-2 mt-2">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user.name}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {user.email}
            </p>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
