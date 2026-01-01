import { motion } from "framer-motion";
import { Bot, Plus, MessageSquare, Phone, Mail, Sparkles } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const agents = [
  {
    id: 1,
    name: "Olivia Fisher",
    role: "AI Marketing Agent",
    avatar: "OF",
    skills: ["Marketing Automation", "Lead Generation"],
    channels: ["Email", "WhatsApp"],
    status: "active",
  },
  {
    id: 2,
    name: "Albert Nguyen",
    role: "AI Sales Agent",
    avatar: "AN",
    skills: ["Sales Outreach", "Follow-ups"],
    channels: ["Voice", "SMS"],
    status: "active",
  },
  {
    id: 3,
    name: "Sarah AI",
    role: "AI Support Agent",
    avatar: "SA",
    skills: ["Customer Support", "FAQ Handling"],
    channels: ["Web Chat", "Email"],
    status: "idle",
  },
];

const AIAgents = () => {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Agents</h1>
            <p className="text-muted-foreground mt-1">
              Configure and manage your AI workforce
            </p>
          </div>
          <Button className="flyn-button-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </Button>
        </motion.div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="flyn-card border-0 overflow-hidden">
                <CardContent className="p-6">
                  {/* Avatar & Status */}
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full flyn-gradient-bg flex items-center justify-center text-white text-2xl font-bold">
                        {agent.avatar}
                      </div>
                      <div
                        className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-card ${
                          agent.status === "active" ? "bg-emerald-500" : "bg-muted-foreground"
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-lg mt-3">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.role}</p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {agent.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-secondary text-xs font-medium text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Channels */}
                  <div className="flex justify-center gap-2 mb-4">
                    {agent.channels.map((channel) => {
                      const Icon = channel === "Voice" ? Phone 
                        : channel === "Email" ? Mail 
                        : MessageSquare;
                      return (
                        <div
                          key={channel}
                          className="p-2 rounded-lg bg-muted"
                          title={channel}
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Action Button */}
                  <Button variant="secondary" className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    View Agent
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Add New Agent Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="border-2 border-dashed border-muted-foreground/30 h-full min-h-[300px] cursor-pointer hover:border-primary/50 transition-colors">
              <CardContent className="h-full flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-muted-foreground">Create New Agent</p>
                <p className="text-sm text-muted-foreground/60 text-center mt-1">
                  Build a custom AI agent for your needs
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIAgents;
