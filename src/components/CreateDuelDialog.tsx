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
import { Plus, Loader2, Swords, Bot, User } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useLinera } from "@/contexts/LineraContext";
import { useLineraContract } from "@/hooks/useLineraContract";
import { LINERA_APP_ID } from "@/lib/linera";

export function CreateDuelDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState<"human_vs_agent" | "agent_vs_agent">("human_vs_agent");
  const [selectedAgent1, setSelectedAgent1] = useState("");
  const [selectedAgent2, setSelectedAgent2] = useState("");
  const [marketEvent, setMarketEvent] = useState("BTC > 65000");

  const { address: wagmiAddress } = useAccount();
  const { account: lineraAccount } = useLinera();
  const address = wagmiAddress || lineraAccount;

  const { mutate: lineraMutate } = useLineraContract(LINERA_APP_ID);
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

      if (lineraAccount) {
        await lineraMutate({
          CreateDuel: {
            type,
            participants: participants.map(p => ({
              id: p.id,
              name: p.name,
              is_agent: p.type === 'agent'
            })),
            market_event: marketEvent,
          }
        });
        
        await createDuel({
          type,
          participants,
          marketEvent,
        });
      } else {
        await createDuel({
          type,
          participants,
          marketEvent,
        });
      }

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
        <Button className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,136,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,255,136,0.5)]">
          <Plus className="mr-2 h-4 w-4" />
          Create Duel
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-xl border-border shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Swords className="h-5 w-5 text-primary" />
            Create New Duel
          </DialogTitle>
          <DialogDescription>
            Configure the parameters for the trading battle.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label>Duel Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`cursor-pointer rounded-lg border-2 p-4 flex flex-col items-center gap-2 transition-all ${type === 'human_vs_agent' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                onClick={() => setType('human_vs_agent')}
              >
                <User className="h-6 w-6" />
                <span className="text-sm font-medium">Human vs Agent</span>
              </div>
              <div 
                className={`cursor-pointer rounded-lg border-2 p-4 flex flex-col items-center gap-2 transition-all ${type === 'agent_vs_agent' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                onClick={() => setType('agent_vs_agent')}
              >
                <Bot className="h-6 w-6" />
                <span className="text-sm font-medium">Agent vs Agent</span>
              </div>
            </div>
          </div>

          {type === "human_vs_agent" ? (
            <div className="grid gap-2">
              <Label>Select Opponent</Label>
              <Select value={selectedAgent1} onValueChange={setSelectedAgent1}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose an agent..." />
                </SelectTrigger>
                <SelectContent>
                  {agents?.map((agent) => (
                    <SelectItem key={agent._id} value={agent._id}>
                      <div className="flex items-center gap-2">
                        <img 
                          src={agent.imageUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${agent.name}`} 
                          className="w-6 h-6 rounded bg-muted"
                        />
                        <span>{agent.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {agent.wins}W / {agent.losses}L
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Agent 1</Label>
                <Select value={selectedAgent1} onValueChange={setSelectedAgent1}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
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
                    <SelectValue placeholder="Select..." />
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
            </div>
          )}

          <div className="grid gap-2">
            <Label>Market Event Condition</Label>
            <Input 
              value={marketEvent} 
              onChange={(e) => setMarketEvent(e.target.value)}
              placeholder="e.g. BTC > 65000"
              className="h-11 font-mono text-sm"
            />
            <p className="text-[10px] text-muted-foreground">
              The condition that determines the winner when resolved by the oracle.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleCreate} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Duel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}