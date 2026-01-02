import { useState, useEffect } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
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
  Lock,
  AlertCircle,
  Zap,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useBranding } from "@/contexts/BrandingContext";
import { usePlan, FeatureKey } from "@/contexts/PlanContext";
import { useUsage, UsageMetricKey, USAGE_THRESHOLDS } from "@/contexts/UsageContext";
import FlynLogo from "@/components/FlynLogo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Sidebar animation specs from docs
const SIDEBAR_ANIMATION = {
  expanded: 264,
  collapsed: 72,
  duration: 0.18,
  ease: [0.4, 0, 0.2, 1] as const, // cubic-bezier(0.4, 0, 0.2, 1)
};

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  badge?: number;
  featureKey?: FeatureKey;
  usageMetric?: UsageMetricKey;
}

interface NavGroup {
  label?: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

// Navigation structure with feature gates
const navGroups: NavGroup[] = [
  {
    label: "Communication",
    items: [
      { icon: Inbox, label: "Inbox", path: "/inbox", badge: 12, usageMetric: "messages.sent" },
      { icon: Phone, label: "Dialer", path: "/dialer", featureKey: "telephony.calls.live", usageMetric: "calls.minutes" },
    ],
    defaultOpen: true,
  },
  {
    label: "Modules",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
      { icon: Users, label: "CRM", path: "/dashboard/crm", featureKey: "crm.contacts" },
      { icon: Calendar, label: "Events", path: "/dashboard/events" },
      { icon: Briefcase, label: "HR", path: "/dashboard/hr" },
      { icon: Church, label: "Church", path: "/dashboard/church" },
      { icon: GraduationCap, label: "Coaches", path: "/dashboard/coaches" },
      { icon: Briefcase, label: "Freelancers", path: "/dashboard/freelancers" },
    ],
    defaultOpen: true,
  },
  {
    label: "Intelligence",
    items: [
      { icon: Bot, label: "AI Agents", path: "/ai-agents", featureKey: "ai.agent.builder", usageMetric: "ai.tokens" },
      { icon: GitBranch, label: "Automations", path: "/automations", featureKey: "automation.builder" },
    ],
    defaultOpen: true,
  },
];

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AppSidebar = ({ isCollapsed, onToggle }: AppSidebarProps) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const { branding } = useBranding();
  const { isEntitled, isSandboxMode, getRequiredPlanForFeature, currentPlan } = usePlan();
  const { getUsagePercentage, getThresholdStatus } = useUsage();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    navGroups.filter(g => g.defaultOpen).map(g => g.label || "")
  );

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => 
      prev.includes(label) 
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };

  // Get badge info for nav item
  const getBadgeInfo = (item: NavItem) => {
    // Check if feature is locked
    if (item.featureKey && !isEntitled(item.featureKey)) {
      return { type: "locked" as const, icon: Lock };
    }
    
    // Check usage threshold
    if (item.usageMetric) {
      const threshold = getThresholdStatus(item.usageMetric);
      if (threshold === "LIMIT" || threshold === "CRITICAL") {
        return { type: "warning" as const, icon: AlertCircle, threshold };
      }
    }
    
    // Regular badge
    if (item.badge) {
      return { type: "count" as const, count: item.badge };
    }
    
    return null;
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? SIDEBAR_ANIMATION.collapsed : SIDEBAR_ANIMATION.expanded }}
      transition={{ duration: SIDEBAR_ANIMATION.duration, ease: SIDEBAR_ANIMATION.ease }}
      className="h-screen bg-sidebar flex flex-col border-r border-sidebar-border fixed left-0 top-0 z-50"
    >
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.08 } }}
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
        
        {isCollapsed && (
          <FlynLogo size="sm" showText={false} />
        )}
        
        <button
          onClick={onToggle}
          className={cn(
            "p-2 rounded-lg hover:bg-sidebar-accent transition-all duration-90 text-sidebar-foreground",
            "hover:scale-105"
          )}
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.14 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {navGroups.map((group) => {
          const isExpanded = expandedGroups.includes(group.label || "");
          const hasActiveItem = group.items.some(i => location.pathname === i.path);
          
          return (
            <div key={group.label} className="mb-2">
              {/* Group header */}
              {group.label && !isCollapsed && (
                <button
                  onClick={() => toggleGroup(group.label!)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider hover:text-sidebar-foreground transition-colors"
                >
                  <span>{group.label}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                </button>
              )}
              
              {/* Group items */}
              <AnimatePresence initial={false}>
                {(isCollapsed || isExpanded || hasActiveItem) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0.8 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0.8 }}
                    transition={{ duration: 0.16 }}
                    className="space-y-0.5 overflow-hidden"
                  >
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      const badgeInfo = getBadgeInfo(item);
                      const isLocked = badgeInfo?.type === "locked";
                      
                      const NavContent = (
                        <div
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-120 group relative",
                            isActive && !isLocked
                              ? "bg-gradient-to-r from-primary/8 to-primary/4 border-l-[3px] border-primary"
                              : "hover:bg-sidebar-accent",
                            isLocked && "opacity-60"
                          )}
                        >
                          <div className={cn(
                            "relative transition-transform duration-90",
                            !isCollapsed && "group-hover:scale-105"
                          )}>
                            <Icon className={cn(
                              "h-5 w-5 flex-shrink-0",
                              isActive && !isLocked && "text-primary"
                            )} />
                            
                            {/* Lock overlay on icon */}
                            {isLocked && isCollapsed && (
                              <div className="absolute -top-1 -right-1 p-0.5 bg-sidebar rounded-full">
                                <Lock className="h-2.5 w-2.5 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          
                          <AnimatePresence mode="wait">
                            {!isCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0, transition: { delay: 0.08 } }}
                                exit={{ opacity: 0, x: -10 }}
                                className={cn(
                                  "font-medium whitespace-nowrap overflow-hidden flex-1",
                                  isActive && !isLocked && "text-primary font-semibold"
                                )}
                              >
                                {item.label}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {/* Badges */}
                          {badgeInfo && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={cn(
                                "flex items-center justify-center text-xs font-bold rounded-full",
                                isCollapsed ? "absolute -top-1 -right-1 w-5 h-5" : "ml-auto",
                                badgeInfo.type === "locked" && "bg-muted text-muted-foreground",
                                badgeInfo.type === "warning" && badgeInfo.threshold === "LIMIT" && "bg-destructive text-destructive-foreground",
                                badgeInfo.type === "warning" && badgeInfo.threshold === "CRITICAL" && "bg-amber-500 text-white",
                                badgeInfo.type === "count" && "bg-accent text-accent-foreground px-1.5 min-w-[20px]"
                              )}
                            >
                              {badgeInfo.type === "locked" && <Lock className="h-3 w-3" />}
                              {badgeInfo.type === "warning" && <AlertCircle className="h-3 w-3" />}
                              {badgeInfo.type === "count" && badgeInfo.count}
                            </motion.div>
                          )}
                        </div>
                      );
                      
                      // Wrap with tooltip in collapsed mode
                      if (isCollapsed) {
                        return (
                          <Tooltip key={item.path} delayDuration={300}>
                            <TooltipTrigger asChild>
                              <RouterNavLink to={item.path} className="block">
                                {NavContent}
                              </RouterNavLink>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex flex-col gap-1">
                              <span className="font-medium">{item.label}</span>
                              {isLocked && (
                                <span className="text-xs text-muted-foreground">
                                  Available on {getRequiredPlanForFeature(item.featureKey!)}+
                                </span>
                              )}
                              {item.usageMetric && !isLocked && (
                                <span className="text-xs text-muted-foreground">
                                  {getUsagePercentage(item.usageMetric)}% used
                                </span>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        );
                      }
                      
                      return (
                        <RouterNavLink key={item.path} to={item.path} className="block">
                          {NavContent}
                        </RouterNavLink>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border space-y-0.5">
        {/* Plan indicator */}
        {!isCollapsed && (
          <div className="px-3 py-2 mb-2 rounded-lg bg-sidebar-accent/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-sidebar-foreground/60">Current Plan</span>
              <span className="text-xs font-semibold text-primary">{currentPlan}</span>
            </div>
            {isSandboxMode() && (
              <p className="text-xs text-sidebar-foreground/40 mt-1">
                Explore Mode Active
              </p>
            )}
          </div>
        )}
        
        <RouterNavLink
          to="/settings/white-label"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            location.pathname === "/settings/white-label"
              ? "bg-gradient-to-r from-primary/8 to-primary/4 border-l-[3px] border-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Sparkles className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">White Label</span>}
        </RouterNavLink>
        
        <RouterNavLink
          to="/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            location.pathname === "/settings"
              ? "bg-gradient-to-r from-primary/8 to-primary/4 border-l-[3px] border-primary"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <Settings className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </RouterNavLink>
        
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>

        {/* Sync status (enterprise feature) */}
        {!isCollapsed && (
          <div className="px-3 py-2 flex items-center gap-2 text-xs text-sidebar-foreground/40">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Last synced 2s ago</span>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default AppSidebar;
