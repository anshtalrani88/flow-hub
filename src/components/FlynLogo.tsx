import { cn } from "@/lib/utils";

interface FlynLogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  customText?: string;
}

const FlynLogo = ({ className, showText = true, size = "md", customText }: FlynLogoProps) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Flyn Feather Icon */}
      <svg
        viewBox="0 0 40 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={sizeClasses[size]}
      >
        <defs>
          <linearGradient id="flynGradientTop" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
          <linearGradient id="flynGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Top feather - gradient */}
        <path
          d="M18 4C18 4 38 14 36 26C35 32 30 34 26 32C20 29 16 20 16 14C16 8 18 4 18 4Z"
          fill="url(#flynGradientTop)"
        />
        {/* Bottom feather */}
        <path
          d="M12 18C12 18 34 28 32 42C31 48 26 50 22 48C14 44 10 32 10 24C10 16 12 18 12 18Z"
          fill="url(#flynGradientBottom)"
        />
      </svg>
      
      {showText && (
        <span className={cn("font-bold flyn-gradient-text", textSizes[size])}>
          {customText || "Flyn"}
        </span>
      )}
    </div>
  );
};

export default FlynLogo;
