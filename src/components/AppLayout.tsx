import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import AppSidebar from "@/components/AppSidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 72 : 256 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="min-h-screen"
      >
        <div className="p-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default AppLayout;
