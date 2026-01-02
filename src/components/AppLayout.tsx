import { useState, ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppSidebar from "@/components/AppSidebar";
import { NotificationBell } from "@/components/NotificationBell";
import { SandboxBanner, OccasionBanner } from "@/components/Banners";
import { UsageMeter } from "@/components/UsageMeter";
import { usePlan } from "@/contexts/PlanContext";
import { useBranding } from "@/contexts/BrandingContext";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { currentPlan, isSandboxMode, getPlanInfo } = usePlan();
  const { branding } = useBranding();
  const { user, logout } = useAuth();
  
  const planInfo = getPlanInfo(currentPlan);

  // Auto-collapse on mobile (< 1100px per sidebar spec)
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1100;
      setIsMobile(mobile);
      if (mobile) setSidebarCollapsed(true);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Global Banners */}
      <AnimatePresence mode="sync">
        <SandboxBanner key="sandbox" />
        <OccasionBanner key="occasion" />
      </AnimatePresence>
      
      <div className="flex flex-1">
        <AppSidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <motion.div
          initial={false}
          animate={{ marginLeft: sidebarCollapsed ? 72 : 264 }}
          transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 flex flex-col min-h-screen"
        >
          {/* Top Header Bar */}
          <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 flex items-center justify-between px-4 gap-4">
            {/* Left side - Mobile menu + breadcrumb area */}
            <div className="flex items-center gap-3">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              
              {/* Plan badge */}
              <Badge 
                variant={isSandboxMode() ? "secondary" : "default"}
                className={cn(
                  "text-xs font-medium",
                  !isSandboxMode() && "bg-gradient-to-r from-primary to-accent text-white"
                )}
              >
                {isSandboxMode() ? "Explore Mode" : planInfo.name}
              </Badge>
            </div>
            
            {/* Right side - Usage, Notifications, User */}
            <div className="flex items-center gap-2">
              {/* Usage quick view */}
              {!isSandboxMode() && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="hidden sm:inline text-xs">Usage</span>
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72" align="end">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">This Month's Usage</h4>
                      <div className="space-y-3">
                        <UsageMeter metricKey="messages.sent" compact />
                        <UsageMeter metricKey="calls.minutes" compact />
                        <UsageMeter metricKey="ai.tokens" compact />
                      </div>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a href="/settings?tab=billing">View All Usage</a>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              
              {/* Notifications */}
              <NotificationBell />
              
              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden md:inline text-sm font-medium">
                      {user?.name}
                    </span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/settings">Settings</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/settings/white-label">White Label</a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default AppLayout;
