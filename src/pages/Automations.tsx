import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Node,
  Edge,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion } from "framer-motion";
import { Send, Clock, GitBranch, Bot, CheckCircle, Zap, Plus } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Custom Node Components
const TriggerNode = ({ data }: { data: { label: string } }) => (
  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg min-w-[150px]">
    <Handle type="source" position={Position.Bottom} className="!bg-white !w-3 !h-3" />
    <div className="flex items-center gap-2">
      <Zap className="h-4 w-4" />
      <span className="font-medium text-sm">{data.label}</span>
    </div>
  </div>
);

const ActionNode = ({ data }: { data: { label: string } }) => (
  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg min-w-[150px]">
    <Handle type="target" position={Position.Top} className="!bg-white !w-3 !h-3" />
    <Handle type="source" position={Position.Bottom} className="!bg-white !w-3 !h-3" />
    <div className="flex items-center gap-2">
      <Send className="h-4 w-4" />
      <span className="font-medium text-sm">{data.label}</span>
    </div>
  </div>
);

const WaitNode = ({ data }: { data: { label: string } }) => (
  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg min-w-[150px]">
    <Handle type="target" position={Position.Top} className="!bg-white !w-3 !h-3" />
    <Handle type="source" position={Position.Bottom} className="!bg-white !w-3 !h-3" />
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4" />
      <span className="font-medium text-sm">{data.label}</span>
    </div>
  </div>
);

const DecisionNode = ({ data }: { data: { label: string } }) => (
  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg min-w-[150px]">
    <Handle type="target" position={Position.Top} className="!bg-white !w-3 !h-3" />
    <Handle type="source" position={Position.Bottom} id="yes" className="!bg-white !w-3 !h-3 !left-[30%]" />
    <Handle type="source" position={Position.Bottom} id="no" className="!bg-white !w-3 !h-3 !left-[70%]" />
    <div className="flex items-center gap-2">
      <GitBranch className="h-4 w-4" />
      <span className="font-medium text-sm">{data.label}</span>
    </div>
  </div>
);

const AIDecisionNode = ({ data }: { data: { label: string } }) => (
  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg min-w-[150px]">
    <Handle type="target" position={Position.Top} className="!bg-white !w-3 !h-3" />
    <Handle type="source" position={Position.Bottom} className="!bg-white !w-3 !h-3" />
    <div className="flex items-center gap-2">
      <Bot className="h-4 w-4" />
      <span className="font-medium text-sm">{data.label}</span>
    </div>
  </div>
);

const ApprovalNode = ({ data }: { data: { label: string } }) => (
  <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg min-w-[150px]">
    <Handle type="target" position={Position.Top} className="!bg-white !w-3 !h-3" />
    <Handle type="source" position={Position.Bottom} className="!bg-white !w-3 !h-3" />
    <div className="flex items-center gap-2">
      <CheckCircle className="h-4 w-4" />
      <span className="font-medium text-sm">{data.label}</span>
    </div>
  </div>
);

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  wait: WaitNode,
  decision: DecisionNode,
  aiDecision: AIDecisionNode,
  approval: ApprovalNode,
};

const initialNodes: Node[] = [
  { id: "1", type: "trigger", position: { x: 250, y: 50 }, data: { label: "New Lead" } },
  { id: "2", type: "action", position: { x: 250, y: 150 }, data: { label: "Send Email" } },
  { id: "3", type: "wait", position: { x: 250, y: 250 }, data: { label: "Wait for Reply" } },
  { id: "4", type: "decision", position: { x: 250, y: 350 }, data: { label: "Replied?" } },
  { id: "5", type: "action", position: { x: 100, y: 450 }, data: { label: "Send Follow-up" } },
  { id: "6", type: "aiDecision", position: { x: 400, y: 450 }, data: { label: "AI Qualify Lead" } },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-5", source: "4", target: "5", sourceHandle: "yes", label: "No" },
  { id: "e4-6", source: "4", target: "6", sourceHandle: "no", label: "Yes" },
];

const nodeBlockTypes = [
  { type: "trigger", icon: Zap, label: "Trigger", color: "from-emerald-500 to-teal-500" },
  { type: "action", icon: Send, label: "Action", color: "from-violet-500 to-purple-600" },
  { type: "wait", icon: Clock, label: "Wait", color: "from-blue-500 to-cyan-500" },
  { type: "decision", icon: GitBranch, label: "Decision", color: "from-amber-500 to-orange-500" },
  { type: "aiDecision", icon: Bot, label: "AI Decision", color: "from-pink-500 to-rose-500" },
  { type: "approval", icon: CheckCircle, label: "Approval", color: "from-indigo-500 to-violet-500" },
];

const Automations = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <AppLayout>
      <div className="h-[calc(100vh-3rem)] flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Workflow Builder</h1>
            <p className="text-muted-foreground mt-1">
              Build powerful automations with visual blocks
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary">Save Draft</Button>
            <Button className="flyn-button-gradient">Publish</Button>
          </div>
        </motion.div>

        {/* Builder Area */}
        <div className="flex-1 flex gap-4">
          {/* Node Palette */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-48 flex-shrink-0"
          >
            <Card className="h-full border">
              <CardContent className="p-3">
                <p className="text-sm font-medium text-muted-foreground mb-3">Blocks</p>
                <div className="space-y-2">
                  {nodeBlockTypes.map((block) => {
                    const Icon = block.icon;
                    return (
                      <div
                        key={block.type}
                        className={`flex items-center gap-2 p-2.5 rounded-lg bg-gradient-to-r ${block.color} text-white cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow`}
                        draggable
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{block.label}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Flow Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="flex-1 rounded-xl overflow-hidden border bg-card"
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              className="bg-muted/30"
            >
              <Background color="hsl(var(--muted-foreground))" gap={20} size={1} />
              <Controls className="!bg-card !border !shadow-lg !rounded-lg" />
              <MiniMap
                className="!bg-card !border !rounded-lg"
                nodeColor={(node) => {
                  switch (node.type) {
                    case "trigger":
                      return "#10b981";
                    case "action":
                      return "#8b5cf6";
                    case "wait":
                      return "#3b82f6";
                    case "decision":
                      return "#f59e0b";
                    case "aiDecision":
                      return "#ec4899";
                    case "approval":
                      return "#6366f1";
                    default:
                      return "#6b7280";
                  }
                }}
              />
            </ReactFlow>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Automations;
