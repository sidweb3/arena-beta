import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export function CreateDuelDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"human_vs_agent" | "agent_vs_agent">("human_vs_agent");
  const [selectedAgent1, setSelectedAgent1] = useState("");
  const [selectedAgent2, setSelectedAgent2] = useState("");
  const [marketEvent, setMarketEvent] = useState("BTC > 65000");

  const { address } = useAccount();
  const agents = useQuery(api.agents.listAgents);
  const createDuel = useMutation(api.duels.createDuel);

  const handleCreate = async () => {
    if (!agents) return;
    setIsLoading(true);

    try {
      const participants = [];

      if (type === "human_vs_agent") {
        if (!address) throw new Error("Wallet not connected");
        if (!selectedAgent1) throw new Error("Please select an agent");
        
        const agent = agents.find(a => a._id === selectedAgent1);
        if (!agent) throw new Error("Agent not found");

        participants.push({
          id: address,
          type: "human" as const,
          name: `User ${address.slice(0, 6)}`,
        });
        participants.push({
          id: agent._id,
          type: "agent" as const,
          name: agent.name,
        });
      } else {
        if (!selectedAgent1 || !selectedAgent2) throw new Error("Please select two agents");
        if (selectedAgent1 === selectedAgent2) throw new Error("Please select different agents");

        const agent1 = agents.find(a => a._id === selectedAgent1);
        const agent2 = agents.find(a => a._id === selectedAgent2);
        
        if (!agent1 || !agent2) throw new Error("Agents not found");

        participants.push({
          id: agent1._id,
          type: "agent" as const,
          name: agent1.name,
        });
        participants.push({
          id: agent2._id,
          type: "agent" as const,
          name: agent2.name,
        });
      }

      await createDuel({
        type,
        participants,
        marketEvent,
      });

      toast.success("Duel created successfully!");
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create duel");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,136,0.3)]">
          <Plus className="mr-2 h-4 w-4" />
          Create Duel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Create New Duel</DialogTitle>
          <DialogDescription>
            Set up a new trading battle between agents or challenge one yourself.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Duel Type</Label>
            <Select value={type} onValueChange={(v: any) => setType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human_vs_agent">Human vs Agent</SelectItem>
                <SelectItem value="agent_vs_agent">Agent vs Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "human_vs_agent" ? (
            <div className="grid gap-2">
              <Label>Select Opponent</Label>
              <Select value={selectedAgent1} onValueChange={setSelectedAgent1}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an agent..." />
                </SelectTrigger>
                <SelectContent>
                  {agents?.map((agent) => (
                    <SelectItem key={agent._id} value={agent._id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <>
              <div className="grid gap-2">
                <Label>Agent 1</Label>
                <Select value={selectedAgent1} onValueChange={setSelectedAgent1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose first agent..." />
                  </SelectTrigger>
                  <SelectContent>
                    {agents?.map((agent) => (
                      <SelectItem key={agent._id} value={agent._id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Agent 2</Label>
                <Select value={selectedAgent2} onValueChange={setSelectedAgent2}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose second agent..." />
                  </SelectTrigger>
                  <SelectContent>
                    {agents?.map((agent) => (
                      <SelectItem key={agent._id} value={agent._id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="grid gap-2">
            <Label>Market Event Condition</Label>
            <Input 
              value={marketEvent} 
              onChange={(e) => setMarketEvent(e.target.value)}
              placeholder="e.g. BTC > 65000"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Duel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
