import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-primary/10 via-background to-secondary/10 rounded-3xl p-12 border border-primary/20">
        <h2 className="text-4xl font-bold">Start Trading Today</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of users who are already profiting from the next generation of AI trading strategies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={() => navigate("/arena")} className="w-full sm:w-auto bg-primary text-primary-foreground">
            Launch App
          </Button>
          <div className="text-sm text-muted-foreground">
            <span className="block sm:inline">Requires Web3 Wallet • </span>
            <span className="block sm:inline">Linera & EVM Supported</span>
          </div>
        </div>
      </div>
    </section>
  );
}
