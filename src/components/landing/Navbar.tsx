import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";
import { useNavigate, useLocation } from "react-router";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion } from "framer-motion";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Features", action: () => scrollToSection("features") },
    { name: "How it Works", action: () => scrollToSection("how-it-works") },
    { name: "Stats", action: () => scrollToSection("stats") },
    { name: "Whitepaper", action: () => navigate("/whitepaper") },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5 py-2" 
          : "bg-transparent border-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate("/")}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-colors overflow-hidden">
              <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <img src="/arenalogo.png" alt="ARENA-X" className="h-6 w-6 object-contain relative z-10" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground group-hover:from-primary group-hover:to-accent transition-all duration-300">
              ARENA-X
            </span>
          </div>

          {/* Desktop Navigation - Centered Pill */}
          <div className="hidden md:flex items-center gap-1 bg-secondary/5 p-1.5 rounded-full border border-border/50 backdrop-blur-md absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                onClick={link.action}
                className="rounded-full px-4 h-8 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all"
              >
                {link.name}
              </Button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
                <WalletConnect />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center gap-2">
                <WalletConnect />
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-xl border-primary/20 bg-primary/5 h-9 w-9">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="top" className="w-full border-b border-border/50 bg-background/95 backdrop-blur-xl pt-20">
                    <div className="flex flex-col gap-2 items-center">
                      {navLinks.map((link) => (
                        <SheetClose key={link.name} asChild>
                          <Button
                            variant="ghost"
                            onClick={link.action}
                            className="w-full text-lg font-medium py-6 hover:bg-primary/5"
                          >
                            {link.name}
                          </Button>
                        </SheetClose>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}