import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePlan, PlanTier, PLANS, FeatureKey } from "@/contexts/PlanContext";
import { Check, Sparkles, Zap } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  featureKey?: FeatureKey;
  requiredPlan?: PlanTier;
}

export const UpgradeModal = ({ open, onOpenChange, featureKey, requiredPlan }: UpgradeModalProps) => {
  const { currentPlan, upgradePlan, getRequiredPlanForFeature } = usePlan();
  
  const targetPlan = requiredPlan || (featureKey ? getRequiredPlanForFeature(featureKey) : "GROWTH");
  const planInfo = targetPlan ? PLANS[targetPlan] : PLANS.GROWTH;
  
  const handleUpgrade = (plan: PlanTier) => {
    upgradePlan(plan);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Upgrade to {planInfo.name}</DialogTitle>
          <DialogDescription className="text-center">
            This feature is available on {planInfo.name} and above. Upgrade to unlock full capabilities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{planInfo.name} Plan</span>
              {planInfo.price !== null ? (
                <span className="text-2xl font-bold">${planInfo.price}<span className="text-sm text-muted-foreground">/mo</span></span>
              ) : (
                <span className="text-sm text-muted-foreground">Custom pricing</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{planInfo.description}</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Live messaging enabled</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> AI automation & agents</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Advanced analytics</li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Maybe Later
            </Button>
            <Button className="flex-1 flyn-button-gradient" onClick={() => handleUpgrade(targetPlan || "GROWTH")}>
              <Zap className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            No charges beyond your plan. You're always in control.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
