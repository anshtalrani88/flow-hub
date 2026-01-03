import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  Image, 
  Type, 
  Globe, 
  Mail, 
  RotateCcw, 
  Eye,
  Upload,
  Check,
  Sparkles
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBranding } from "@/contexts/BrandingContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const colorPresets = [
  { name: "Flyn Purple", primary: "252 85% 60%", accent: "187 85% 53%", sidebar: "257 75% 10%" },
  { name: "Ocean Blue", primary: "210 100% 50%", accent: "180 100% 40%", sidebar: "210 60% 12%" },
  { name: "Forest Green", primary: "142 70% 45%", accent: "160 60% 50%", sidebar: "142 40% 10%" },
  { name: "Sunset Orange", primary: "25 95% 55%", accent: "45 100% 50%", sidebar: "20 50% 10%" },
  { name: "Rose Pink", primary: "340 80% 55%", accent: "320 70% 60%", sidebar: "340 40% 10%" },
  { name: "Midnight", primary: "240 50% 50%", accent: "260 60% 55%", sidebar: "240 40% 8%" },
  { name: "Coral Reef", primary: "16 85% 60%", accent: "175 70% 45%", sidebar: "16 40% 10%" },
  { name: "Electric", primary: "270 90% 60%", accent: "50 100% 55%", sidebar: "270 50% 8%" },
  { name: "Mono Dark", primary: "0 0% 40%", accent: "0 0% 60%", sidebar: "0 0% 6%" },
  { name: "Emerald", primary: "160 85% 40%", accent: "140 70% 50%", sidebar: "160 50% 8%" },
  { name: "Crimson", primary: "0 80% 55%", accent: "15 85% 60%", sidebar: "0 50% 8%" },
  { name: "Royal", primary: "260 80% 55%", accent: "280 70% 60%", sidebar: "260 50% 8%" },
];

const fontOptions = [
  "Inter",
  "Roboto", 
  "Open Sans",
  "Lato",
  "Poppins",
  "Montserrat",
  "Source Sans Pro",
  "Nunito",
];

const WhiteLabel = () => {
  const { branding, updateBranding, resetBranding, isCustomized } = useBranding();
  const [previewMode, setPreviewMode] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateBranding({ logoUrl: event.target?.result as string });
        toast.success("Logo uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateBranding({ faviconUrl: event.target?.result as string });
        toast.success("Favicon uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    resetBranding();
    toast.success("Branding reset to defaults");
  };


  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="h-7 w-7 text-primary" />
              White Label
            </h1>
            <p className="text-muted-foreground mt-1">
              Customize branding to match your organization
            </p>
          </div>
          <div className="flex gap-2">
            {isCustomized && (
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
            <Button 
              variant={previewMode ? "default" : "outline"}
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? "Exit Preview" : "Preview"}
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="branding" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="domain">Domain</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          {/* Branding Tab */}
          <TabsContent value="branding" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Logo Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Logo
                  </CardTitle>
                  <CardDescription>
                    Upload your organization's logo (PNG, SVG recommended)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    {branding.logoUrl ? (
                      <img 
                        src={branding.logoUrl} 
                        alt="Logo preview" 
                        className="max-h-16 mx-auto object-contain"
                      />
                    ) : (
                      <div className="text-muted-foreground">
                        <Upload className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Click to upload logo</p>
                      </div>
                    )}
                  </div>
                  <input 
                    ref={logoInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleLogoUpload}
                  />
                  {branding.logoUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => updateBranding({ logoUrl: null })}
                    >
                      Remove Logo
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Logo Text & App Name */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    App Identity
                  </CardTitle>
                  <CardDescription>
                    Configure your app's name and text branding
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>App Name</Label>
                    <Input 
                      value={branding.appName}
                      onChange={(e) => updateBranding({ appName: e.target.value })}
                      placeholder="My Business"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Logo Text (when no logo image)</Label>
                    <Input 
                      value={branding.logoText}
                      onChange={(e) => updateBranding({ logoText: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <select
                      value={branding.fontFamily}
                      onChange={(e) => updateBranding({ fontFamily: e.target.value })}
                      className="w-full p-2 border rounded-lg bg-background"
                    >
                      {fontOptions.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Favicon */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Favicon
                  </CardTitle>
                  <CardDescription>
                    Browser tab icon (32x32 or 64x64 recommended)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div 
                    className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => faviconInputRef.current?.click()}
                  >
                    {branding.faviconUrl ? (
                      <img 
                        src={branding.faviconUrl} 
                        alt="Favicon preview" 
                        className="h-8 w-8 mx-auto object-contain"
                      />
                    ) : (
                      <div className="text-muted-foreground">
                        <Upload className="h-6 w-6 mx-auto mb-2" />
                        <p className="text-sm">Upload favicon</p>
                      </div>
                    )}
                  </div>
                  <input 
                    ref={faviconInputRef}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFaviconUpload}
                  />
                </CardContent>
              </Card>

              {/* Powered By Toggle */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Visibility</CardTitle>
                  <CardDescription>
                    Control branding visibility options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Show "Powered by Flyn"</Label>
                      <p className="text-sm text-muted-foreground">
                        Display attribution in footer
                      </p>
                    </div>
                    <Switch 
                      checked={branding.showPoweredBy}
                      onCheckedChange={(checked) => updateBranding({ showPoweredBy: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Themes
                </CardTitle>
                <CardDescription>
                  Select a color theme for your branded experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {colorPresets.map((preset) => {
                    const isSelected = branding.primaryColor === preset.primary && 
                                       branding.accentColor === preset.accent;
                    return (
                      <button
                        key={preset.name}
                        onClick={() => updateBranding({ 
                          primaryColor: preset.primary, 
                          accentColor: preset.accent,
                          sidebarBgColor: preset.sidebar
                        })}
                        className={cn(
                          "p-3 rounded-xl border-2 transition-all text-left group",
                          isSelected 
                            ? "border-primary ring-2 ring-primary/20 bg-primary/5" 
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        )}
                      >
                        <div className="flex gap-1.5 mb-2">
                          <div 
                            className="h-8 w-8 rounded-lg shadow-sm"
                            style={{ background: `hsl(${preset.primary})` }}
                          />
                          <div 
                            className="h-8 w-8 rounded-lg shadow-sm"
                            style={{ background: `hsl(${preset.accent})` }}
                          />
                          <div 
                            className="h-8 w-8 rounded-lg shadow-sm"
                            style={{ background: `hsl(${preset.sidebar})` }}
                          />
                        </div>
                        <p className="text-sm font-medium truncate flex items-center gap-1.5">
                          {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
                          {preset.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Button className="w-full">Primary Button</Button>
                    <Button variant="outline" className="w-full">Secondary Button</Button>
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-sm font-medium text-primary">Highlighted Card</p>
                    </div>
                  </div>
                  <div 
                    className="p-4 rounded-lg text-white"
                    style={{ background: `hsl(${branding.sidebarBgColor})` }}
                  >
                    <p className="text-sm font-medium mb-2">Sidebar Preview</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10">
                        <div className="h-4 w-4 rounded bg-white/30" />
                        <span className="text-sm">Dashboard</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg">
                        <div className="h-4 w-4 rounded bg-white/30" />
                        <span className="text-sm opacity-70">Inbox</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domain Tab */}
          <TabsContent value="domain" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Custom Domain
                </CardTitle>
                <CardDescription>
                  Configure your custom domain for white-label access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Custom Domain</Label>
                  <Input 
                    value={branding.customDomain}
                    onChange={(e) => updateBranding({ customDomain: e.target.value })}
                    placeholder="app.yourdomain.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    Point your domain's CNAME record to our servers to activate
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h4 className="font-medium mb-2">DNS Configuration</h4>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-mono">CNAME</span>
                    </div>
                    <div className="flex justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Name</span>
                      <span className="font-mono">app</span>
                    </div>
                    <div className="flex justify-between p-2 bg-background rounded">
                      <span className="text-muted-foreground">Value</span>
                      <span className="font-mono">custom.flyn.app</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-sm text-amber-700">
                    Custom domains are available on Growth plan and above
                  </span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Branding
                </CardTitle>
                <CardDescription>
                  Customize emails sent from your workspace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>From Name</Label>
                  <Input 
                    value={branding.emailFromName}
                    onChange={(e) => updateBranding({ emailFromName: e.target.value })}
                    placeholder="Your Company"
                  />
                  <p className="text-xs text-muted-foreground">
                    Appears as the sender name in recipient's inbox
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Email Footer Text</Label>
                  <Input 
                    value={branding.emailFooterText}
                    onChange={(e) => updateBranding({ emailFooterText: e.target.value })}
                    placeholder="Powered by Your Company"
                  />
                </div>

                {/* Email Preview */}
                <div className="p-4 rounded-lg border bg-white dark:bg-gray-900">
                  <p className="text-sm font-medium mb-3">Email Preview</p>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="p-4 bg-muted/30 border-b flex items-center gap-3">
                      {branding.logoUrl ? (
                        <img src={branding.logoUrl} alt="Logo" className="h-6" />
                      ) : (
                        <span className="font-bold text-primary">{branding.logoText}</span>
                      )}
                    </div>
                    <div className="p-4 text-sm">
                      <p className="text-muted-foreground mb-2">Hello,</p>
                      <p className="text-muted-foreground mb-4">
                        This is a preview of how your branded emails will look.
                      </p>
                      <Button size="sm">Call to Action</Button>
                    </div>
                    <div className="p-3 bg-muted/30 border-t text-center text-xs text-muted-foreground">
                      {branding.emailFooterText}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save indicator */}
        {isCustomized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg"
          >
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">Changes saved automatically</span>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default WhiteLabel;
