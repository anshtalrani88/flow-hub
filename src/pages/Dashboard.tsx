import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Inbox,
  Phone,
  Users,
  Calendar,
  Church,
  Briefcase,
  GraduationCap,
  Bot,
  GitBranch,
  TrendingUp,
  MessageSquare,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { usePlan } from "@/contexts/PlanContext";
import { useUsage } from "@/contexts/UsageContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { UsageMeter } from "@/components/UsageMeter";

const statsData = [
  { label: "Active Conversations", value: "128", icon: MessageSquare, trend: "+12%" },
  { label: "Calls Today", value: "47", icon: Phone, trend: "+8%" },
  { label: "Automations Run", value: "234", icon: Zap, trend: "+23%" },
  { label: "Response Time", value: "2.4m", icon: Clock, trend: "-15%" },
];

const moduleCards = [
  {
    icon: Users,
    title: "CRM",
    description: "Contacts, deals & pipelines",
    path: "/dashboard/crm",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Event management & RSVPs",
    path: "/dashboard/events",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Briefcase,
    title: "HR",
    description: "Team & employee management",
    path: "/dashboard/hr",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Church,
    title: "Church",
    description: "Ministry & congregation tools",
    path: "/dashboard/church",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: GraduationCap,
    title: "Coaches",
    description: "Coaching & client sessions",
    path: "/dashboard/coaches",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    description: "Projects & invoicing",
    path: "/dashboard/freelancers",
    color: "from-indigo-500 to-violet-500",
  },
];

const quickActions = [
  { icon: Inbox, label: "Open Inbox", path: "/inbox", primary: true },
  { icon: Phone, label: "Start Call", path: "/dialer", primary: true },
  { icon: Bot, label: "AI Agents", path: "/ai-agents" },
  { icon: GitBranch, label: "Automations", path: "/automations" },
];

const Dashboard = () => {
  const { isSandboxMode, currentPlan } = usePlan();
  const { notify } = useNotifications();
  
  // Trigger welcome notification on first visit
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("flyn_welcome_shown");
    if (!hasSeenWelcome) {
      notify("account.created");
      localStorage.setItem("flyn_welcome_shown", "true");
    }
  }, [notify]);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              {isSandboxMode() 
                ? "Explore the platform — all actions are simulated." 
                : "Welcome back! Here's your business at a glance."}
            </p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.path}
                to={action.path}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                  action.primary
                    ? "flyn-button-gradient"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Icon className="h-4 w-4" />
                {action.label}
              </Link>
            );
          })}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.trend.startsWith("+") || stat.trend.startsWith("-");
            const trendColor = stat.trend.startsWith("+") 
              ? "text-emerald-600" 
              : stat.trend.startsWith("-") && stat.label === "Response Time"
              ? "text-emerald-600"
              : "text-red-500";

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card className="flyn-card border-0">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 mt-3 text-sm ${trendColor}`}>
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">{stat.trend}</span>
                      <span className="text-muted-foreground">vs last week</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Module Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4">Your Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleCards.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                >
                  <Link to={module.path}>
                    <Card className="flyn-card border-0 group cursor-pointer overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${module.color} text-white shadow-lg`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {module.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {module.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Usage Overview (only for paid plans) */}
        {!isSandboxMode() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <h2 className="text-xl font-semibold mb-4">Usage This Month</h2>
            <Card className="flyn-card border-0">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <UsageMeter metricKey="messages.sent" />
                  <UsageMeter metricKey="calls.minutes" />
                  <UsageMeter metricKey="ai.tokens" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Placeholder for NocoBase Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-2 border-dashed border-muted-foreground/30">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-muted-foreground">
                NocoBase Dashboard Space
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                This area is reserved for NocoBase integration. Analytics, tables, and custom views will be embedded here.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
