import { motion } from "framer-motion";
import { Inbox as InboxIcon, MessageSquare, Filter, Search } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Inbox = () => {
  return (
    <AppLayout>
      <div className="h-[calc(100vh-3rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Unified Inbox</h1>
            <p className="text-muted-foreground mt-1">
              All your conversations in one place
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 w-64"
              />
            </div>
            <button className="p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <Filter className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </motion.div>

        {/* Chatwoot Integration Space */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1"
        >
          <Card className="h-full border-2 border-dashed border-muted-foreground/30">
            <CardContent className="h-full flex flex-col items-center justify-center p-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl flyn-gradient-bg mb-6">
                  <InboxIcon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Chatwoot Inbox Space
                </h3>
                <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                  This area is reserved for Chatwoot integration. The unified inbox with WhatsApp, SMS, Email, 
                  and social channels will be embedded here.
                </p>
                
                {/* Channel Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                  {["WhatsApp", "SMS", "Email", "Instagram", "Facebook", "Telegram", "Web Chat"].map((channel) => (
                    <span
                      key={channel}
                      className="px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-secondary-foreground"
                    >
                      {channel}
                    </span>
                  ))}
                </div>

                {/* Mock conversation preview */}
                <div className="mt-8 max-w-md mx-auto space-y-3">
                  {[
                    { name: "Sarah Williams", message: "Hi, can you provide me with the latest...", time: "10:46 AM", unread: true },
                    { name: "John Doe", message: "Thanks for the quick response!", time: "9:30 AM", unread: false },
                    { name: "AI Agent", message: "Scheduled call with HR Team", time: "Yesterday", unread: false },
                  ].map((convo, i) => (
                    <motion.div
                      key={convo.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-xl text-left ${
                        convo.unread ? "bg-primary/5 border border-primary/20" : "bg-muted/50"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-flyn-cyan flex items-center justify-center text-white font-medium">
                        {convo.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{convo.name}</p>
                          <span className="text-xs text-muted-foreground">{convo.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{convo.message}</p>
                      </div>
                      {convo.unread && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Inbox;
