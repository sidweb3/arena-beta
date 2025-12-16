import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";
import { useNavigate } from "react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <button 
        onClick={() => scrollToSection("features")} 
        className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-2 text-left' : ''}`}
      >
        Features
      </button>
      <button 
        onClick={() => scrollToSection("how-it-works")} 
        className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-2 text-left' : ''}`}
      >
        How it Works
      </button>
      <button 
        onClick={() => scrollToSection("stats")} 
        className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-2 text-left' : ''}`}
      >
        Stats
      </button>
      <button 
        onClick={() => { navigate("/whitepaper"); setIsOpen(false); }} 
        className={`text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${mobile ? 'text-lg py-2 text-left' : 'hidden'}`}
      >
        Whitepaper
      </button>
    </>
  );

  return (
    <nav className="border-b border-border/40 backdrop-blur-xl bg-background/60 sticky top-0 z-50 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img src="/arenalogo.png" alt="ARENA-X" className="h-9 w-9 relative z-10 rounded-lg shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-accent transition-all duration-300">
              ARENA-X
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/whitepaper")} 
              className="hidden md:flex text-muted-foreground hover:text-foreground hover:bg-primary/10"
            >
              Whitepaper
            </Button>
            
            <WalletConnect />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-border/50 bg-background/95 backdrop-blur-xl">
                  <div className="flex flex-col gap-6 mt-8">
                    <NavLinks mobile />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}