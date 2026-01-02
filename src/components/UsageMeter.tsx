import { useUsageMeter, UsageMetricKey, USAGE_THRESHOLDS } from "@/contexts/UsageContext";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface UsageMeterProps {
  metricKey: UsageMetricKey;
  label?: string;
  showValue?: boolean;
  compact?: boolean;
}

const METRIC_LABELS: Record<UsageMetricKey, string> = {
  "messages.sent": "Messages",
  "calls.minutes": "Call Minutes",
  "ai.tokens": "AI Tokens",
  "webchat.sessions": "Webchat Sessions",
  "storage.gb": "Storage (GB)",
  "whatsapp.conversations": "WhatsApp Conversations",
};

export const UsageMeter = ({ metricKey, label, showValue = true, compact = false }: UsageMeterProps) => {
  const { usage, percentage, threshold } = useUsageMeter(metricKey);
  
  const displayLabel = label || METRIC_LABELS[metricKey];
  
  const getThresholdColor = () => {
    switch (threshold) {
      case "LIMIT": return "bg-destructive";
      case "CRITICAL": return "bg-red-500";
      case "WARNING": return "bg-amber-500";
      default: return "bg-primary";
    }
  };

  if (compact) {
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">{displayLabel}</span>
          <span className={cn(
            "font-medium",
            threshold === "LIMIT" && "text-destructive",
            threshold === "CRITICAL" && "text-red-500",
            threshold === "WARNING" && "text-amber-500"
          )}>
            {percentage}%
          </span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all", getThresholdColor())}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{displayLabel}</span>
        {showValue && (
          <span className="text-sm text-muted-foreground">
            {usage.used.toLocaleString()} / {usage.limit.toLocaleString()}
          </span>
        )}
      </div>
      <Progress 
        value={Math.min(percentage, 100)} 
        className={cn(
          "h-2",
          threshold === "LIMIT" && "[&>div]:bg-destructive",
          threshold === "CRITICAL" && "[&>div]:bg-red-500",
          threshold === "WARNING" && "[&>div]:bg-amber-500"
        )}
      />
      {threshold && (
        <p className={cn(
          "text-xs",
          threshold === "LIMIT" && "text-destructive",
          threshold === "CRITICAL" && "text-red-500",
          threshold === "WARNING" && "text-amber-500",
          threshold === "INFO" && "text-muted-foreground"
        )}>
          {threshold === "LIMIT" && "Limit reached — actions paused"}
          {threshold === "CRITICAL" && "Approaching limit — consider upgrading"}
          {threshold === "WARNING" && "80% used — no action required yet"}
          {threshold === "INFO" && "50% used — running normally"}
        </p>
      )}
    </div>
  );
};
