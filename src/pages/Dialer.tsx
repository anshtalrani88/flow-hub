import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mic, MicOff, PhoneOff, User, Clock, Hash } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Dialer = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState("00:00");

  const dialPad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  const handleDial = (digit: string) => {
    setPhoneNumber((prev) => prev + digit);
  };

  const recentCalls = [
    { name: "John Smith", number: "+1 (555) 123-4567", time: "2 min ago", type: "outgoing" },
    { name: "Sarah Williams", number: "+1 (555) 987-6543", time: "15 min ago", type: "incoming" },
    { name: "Unknown", number: "+1 (555) 456-7890", time: "1 hour ago", type: "missed" },
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground">Dialer</h1>
          <p className="text-muted-foreground mt-1">
            Make and receive calls with AI-powered insights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dial Pad */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="flyn-card border-0">
              <CardContent className="p-6">
                {/* Phone Number Display */}
                <div className="mb-6">
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="text-center text-2xl font-mono h-14"
                  />
                </div>

                {/* Dial Pad Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {dialPad.map((digit) => (
                    <button
                      key={digit}
                      onClick={() => handleDial(digit)}
                      className="h-14 rounded-xl bg-secondary hover:bg-secondary/80 text-xl font-semibold transition-all duration-150 active:scale-95"
                    >
                      {digit}
                    </button>
                  ))}
                </div>

                {/* Call Button */}
                {isInCall ? (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setIsMuted(!isMuted)}
                      variant="secondary"
                      className="flex-1 h-14"
                    >
                      {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    </Button>
                    <Button
                      onClick={() => setIsInCall(false)}
                      className="flex-1 h-14 bg-destructive hover:bg-destructive/90"
                    >
                      <PhoneOff className="h-6 w-6" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsInCall(true)}
                    className="w-full h-14 flyn-button-gradient text-lg"
                    disabled={!phoneNumber}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Call
                  </Button>
                )}

                {/* Call Status */}
                {isInCall && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 rounded-xl bg-primary/10 text-center"
                  >
                    <p className="text-sm text-muted-foreground">Call in progress</p>
                    <p className="text-2xl font-mono font-semibold mt-1">{callDuration}</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Calls & Active Call Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="flyn-card border-0 h-full">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Recent Calls</h3>
                <div className="space-y-3">
                  {recentCalls.map((call, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        call.type === "missed" 
                          ? "bg-destructive/10 text-destructive" 
                          : "bg-primary/10 text-primary"
                      }`}>
                        <User className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{call.name}</p>
                        <p className="text-sm text-muted-foreground">{call.number}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{call.time}</p>
                        <p className={`text-xs capitalize ${
                          call.type === "missed" ? "text-destructive" : "text-muted-foreground"
                        }`}>
                          {call.type}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* AI Voice Widget Placeholder */}
                <div className="mt-6 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-flyn-cyan/5 border border-primary/10">
                  <h4 className="font-semibold mb-2">AI Voice Agent</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI-powered call assistance with real-time transcription and insights
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flyn-gradient-bg flex items-center justify-center">
                      <Mic className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Albert Nguyen</p>
                      <p className="text-sm text-muted-foreground">AI Agent • Ready</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dialer;
