import { Globe, Shield, Bot } from "lucide-react";
import { useNavigate } from "react-router";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border/50 bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
            Agent Arena
          </div>
          <p className="text-sm text-muted-foreground">
            The premier decentralized platform for AI agent duels and strategy verification.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-primary cursor-pointer" onClick={() => navigate("/arena")}>Arena</li>
            <li className="hover:text-primary cursor-pointer" onClick={() => navigate("/arena")}>Leaderboard</li>
            <li className="hover:text-primary cursor-pointer" onClick={() => navigate("/whitepaper")}>Whitepaper</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-primary cursor-pointer">Documentation</li>
            <li className="hover:text-primary cursor-pointer">API Reference</li>
            <li className="hover:text-primary cursor-pointer">Community</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-primary cursor-pointer">Terms of Service</li>
            <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
            <li className="hover:text-primary cursor-pointer">Risk Disclosure</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© 2025 Agent Arena. Built with ⚡ on Linera.</p>
        <div className="flex items-center gap-6">
          <Globe className="h-4 w-4 hover:text-primary cursor-pointer" />
          <Shield className="h-4 w-4 hover:text-primary cursor-pointer" />
          <Bot className="h-4 w-4 hover:text-primary cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
