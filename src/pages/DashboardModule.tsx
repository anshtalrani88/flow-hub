import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Table, BarChart3, TrendingUp, Search, Plus, Filter } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const moduleConfig: Record<string, { title: string; description: string; color: string }> = {
  crm: {
    title: "CRM",
    description: "Manage contacts, deals, and pipelines",
    color: "from-violet-500 to-purple-600",
  },
  events: {
    title: "Events",
    description: "Event management and RSVPs",
    color: "from-blue-500 to-cyan-500",
  },
  hr: {
    title: "HR",
    description: "Team and employee management",
    color: "from-emerald-500 to-teal-500",
  },
  church: {
    title: "Church",
    description: "Ministry and congregation tools",
    color: "from-amber-500 to-orange-500",
  },
  coaches: {
    title: "Coaches",
    description: "Coaching and client sessions",
    color: "from-pink-500 to-rose-500",
  },
  freelancers: {
    title: "Freelancers",
    description: "Projects and invoicing",
    color: "from-indigo-500 to-violet-500",
  },
};

const DashboardModule = () => {
  const { module } = useParams<{ module: string }>();
  const config = moduleConfig[module || "crm"] || moduleConfig.crm;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
            <p className="text-muted-foreground mt-1">{config.description}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            <Button variant="secondary">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="flyn-button-gradient">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Total Records", value: "1,234", icon: Table },
            { label: "This Week", value: "+45", icon: TrendingUp },
            { label: "Active", value: "892", icon: BarChart3 },
            { label: "Pending", value: "67", icon: Table },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="flyn-card border-0">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${config.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* NocoBase Table Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-dashed border-muted-foreground/30">
            <CardContent className="p-12 text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${config.color} mb-4`}>
                <Table className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-muted-foreground">
                NocoBase Table Space
              </h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                This area is reserved for NocoBase integration. Data tables, Kanban views, and custom forms will be embedded here.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="border-2 border-dashed border-muted-foreground/30">
            <CardContent className="p-8 text-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">Analytics Charts (NocoBase)</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-dashed border-muted-foreground/30">
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">Trend Reports (NocoBase)</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default DashboardModule;
