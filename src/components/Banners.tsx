import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/contexts/PlanContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Sandbox mode banner - shown when in explore mode
export const SandboxBanner = () => {
  const { isSandboxMode, isTrialActive, trialEndsAt, currentPlan } = usePlan();
  const [dismissed, setDismissed] = useState(false);
  
  if (dismissed || (!isSandboxMode() && !isTrialActive())) return null;
  
  const daysLeft = trialEndsAt 
    ? Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "relative overflow-hidden",
        isSandboxMode() 
          ? "bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10" 
          : "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-orange-500/10"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-1.5 rounded-full",
            isSandboxMode() ? "bg-primary/10" : "bg-amber-500/10"
          )}>
            {isSandboxMode() ? (
              <Sparkles className="h-4 w-4 text-primary" />
            ) : (
              <Info className="h-4 w-4 text-amber-500" />
            )}
          </div>
          <p className="text-sm">
            {isSandboxMode() ? (
              <>
                <span className="font-medium">Explore Mode</span>
                <span className="text-muted-foreground ml-1">
                  — All actions are simulated. No costs incurred.
                </span>
              </>
            ) : (
              <>
                <span className="font-medium">Trial Active</span>
                <span className="text-muted-foreground ml-1">
                  — {daysLeft} days remaining. Upgrade to continue live operations.
                </span>
              </>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant={isSandboxMode() ? "default" : "outline"}
            className={isSandboxMode() ? "flyn-button-gradient" : ""}
            asChild
          >
            <a href="/settings?tab=billing">
              {isSandboxMode() ? "Upgrade to Go Live" : "Choose Plan"}
            </a>
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-7 w-7"
            onClick={() => setDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Occasion/celebration banner from notification system
export const OccasionBanner = () => {
  const { activeBanner, dismissBanner } = useNotifications();
  
  if (!activeBanner) return null;
  
  const { template } = activeBanner;
  
  const getBannerGradient = () => {
    switch (template.level) {
      case "success": return "from-emerald-500/10 via-emerald-500/5 to-teal-500/10";
      case "warning": return "from-amber-500/10 via-amber-500/5 to-orange-500/10";
      case "error": return "from-destructive/10 via-destructive/5 to-red-500/10";
      default: return "from-primary/10 via-primary/5 to-accent/10";
    }
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn("relative overflow-hidden bg-gradient-to-r", getBannerGradient())}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-sm font-medium">{template.title}</p>
            <p className="text-xs text-muted-foreground">{template.message}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {template.cta && (
            <Button size="sm" variant="outline" asChild>
              <a href={template.cta.action}>{template.cta.label}</a>
            </Button>
          )}
          {template.dismissable !== false && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-7 w-7"
              onClick={dismissBanner}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
