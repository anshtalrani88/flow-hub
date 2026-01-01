import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Globe, CreditCard } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const settingsSections = [
  {
    icon: User,
    title: "Profile",
    description: "Manage your account settings",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure alerts and updates",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Password and 2FA settings",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Theme and display options",
  },
  {
    icon: Globe,
    title: "Integrations",
    description: "Connect external services",
  },
  {
    icon: CreditCard,
    title: "Billing",
    description: "Plans and payment methods",
  },
];

const Settings = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your workspace preferences
          </p>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settingsSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="flyn-card border-0 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{section.title}</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold mb-4">Quick Settings</h2>
          <Card className="border">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Desktop Notifications</Label>
                  <p className="text-sm text-muted-foreground">Show browser notifications</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">AI Suggestions</Label>
                  <p className="text-sm text-muted-foreground">Enable AI-powered recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Settings;
