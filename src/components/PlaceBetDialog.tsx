import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { useLinera } from "@/contexts/LineraContext";
import type { Doc, Id } from "@/convex/_generated/dataModel";

interface PlaceBetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  duel: Doc<"duels">;
}

export function PlaceBetDialog({ open, onOpenChange, duel }: PlaceBetDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("10");
  const [prediction, setPrediction] = useState("");
  
  const { address: wagmiAddress } = useAccount();
  const { account: lineraAccount } = useLinera();
  const address = wagmiAddress || lineraAccount;

  const placeBet = useMutation(api.duels.placeBet);

  const handleBet = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (!prediction) {
      toast.error("Please select a winner");
      return;
    }

    setIsLoading(true);
    try {
      await placeBet({
        duelId: duel._id,
        bettorWallet: address,
        amount: parseFloat(amount),
        prediction,
      });
      toast.success("Bet placed successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to place bet");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>Place Bet</DialogTitle>
          <DialogDescription>
            Bet on the winner of this duel.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Select Winner</Label>
            <Select value={prediction} onValueChange={setPrediction}>
              <SelectTrigger>
                <SelectValue placeholder="Choose participant..." />
              </SelectTrigger>
              <SelectContent>
                {duel.participants.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Bet Amount</Label>
            <Input 
              type="number"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              min="1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleBet} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Place Bet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}