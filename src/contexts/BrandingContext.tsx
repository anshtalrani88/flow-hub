import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface BrandingSettings {
  // Logo
  logoUrl: string | null;
  logoText: string;
  faviconUrl: string | null;
  
  // Colors (HSL format: "hue saturation% lightness%")
  primaryColor: string;
  accentColor: string;
  sidebarBgColor: string;
  
  // Typography
  fontFamily: string;
  
  // Custom domain
  customDomain: string;
  
  // App name
  appName: string;
  
  // Feature visibility
  showPoweredBy: boolean;
  
  // Email branding
  emailFromName: string;
  emailFooterText: string;
}

const defaultBranding: BrandingSettings = {
  logoUrl: null,
  logoText: "Flyn",
  faviconUrl: null,
  primaryColor: "252 85% 60%",
  accentColor: "187 85% 53%",
  sidebarBgColor: "257 75% 10%",
  fontFamily: "Inter",
  customDomain: "",
  appName: "Flyn",
  showPoweredBy: true,
  emailFromName: "Flyn",
  emailFooterText: "Powered by Flyn AI",
};

interface BrandingContextType {
  branding: BrandingSettings;
  updateBranding: (updates: Partial<BrandingSettings>) => void;
  resetBranding: () => void;
  isCustomized: boolean;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider = ({ children }: { children: ReactNode }) => {
  const [branding, setBranding] = useState<BrandingSettings>(() => {
    const stored = localStorage.getItem("flyn_branding");
    return stored ? { ...defaultBranding, ...JSON.parse(stored) } : defaultBranding;
  });

  const isCustomized = JSON.stringify(branding) !== JSON.stringify(defaultBranding);

  // Apply CSS variables when branding changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Primary color
    root.style.setProperty("--primary", branding.primaryColor);
    root.style.setProperty("--flyn-purple", branding.primaryColor);
    root.style.setProperty("--ring", branding.primaryColor);
    root.style.setProperty("--sidebar-primary", branding.primaryColor);
    
    // Accent color
    root.style.setProperty("--accent", branding.accentColor);
    root.style.setProperty("--flyn-cyan", branding.accentColor);
    
    // Sidebar background
    root.style.setProperty("--sidebar-background", branding.sidebarBgColor);
    
    // Gradient update
    const [primaryH] = branding.primaryColor.split(" ");
    const [accentH] = branding.accentColor.split(" ");
    root.style.setProperty(
      "--flyn-gradient",
      `linear-gradient(135deg, hsl(${branding.primaryColor}) 0%, hsl(${branding.accentColor}) 100%)`
    );
    
    // Font
    root.style.setProperty("--font-family", branding.fontFamily);
    document.body.style.fontFamily = `'${branding.fontFamily}', system-ui, sans-serif`;
    
    // Favicon
    if (branding.faviconUrl) {
      const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
      if (favicon) {
        favicon.href = branding.faviconUrl;
      }
    }
    
    // App title
    document.title = branding.appName;
  }, [branding]);

  const updateBranding = (updates: Partial<BrandingSettings>) => {
    setBranding((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("flyn_branding", JSON.stringify(updated));
      return updated;
    });
  };

  const resetBranding = () => {
    setBranding(defaultBranding);
    localStorage.removeItem("flyn_branding");
  };

  return (
    <BrandingContext.Provider value={{ branding, updateBranding, resetBranding, isCustomized }}>
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error("useBranding must be used within BrandingProvider");
  }
  return context;
};
