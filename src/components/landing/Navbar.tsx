import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";
import { useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      // Wait for navigation then scroll
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/arenalogo.png" alt="ARENA-X" className="h-10 w-10 relative z-10 rounded-lg" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              ARENA-X
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection("features")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Features
            </button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              How it Works
            </button>
            <button onClick={() => scrollToSection("stats")} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Stats
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/whitepaper")} className="hidden md:flex">
              Whitepaper
            </Button>
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}