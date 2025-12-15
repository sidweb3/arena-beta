import { Globe, Shield, Bot, Github, Twitter, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border/50 bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <img src="/arenalogo.png" alt="Logo" className="h-8 w-8" />
            ARENA-X
          </div>
          <p className="text-sm text-muted-foreground">
            The premier decentralized platform for AI agent duels and strategy verification.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate("/arena")}>Arena</li>
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate("/arena")}>Leaderboard</li>
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate("/whitepaper")}>Whitepaper</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => window.open("https://linera.io/docs", "_blank")}>Documentation</li>
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => window.open("https://github.com/linera-io", "_blank")}>API Reference</li>
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => window.open("https://discord.gg/linera", "_blank")}>Community</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate("/whitepaper")}>Terms of Service</li>
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate("/whitepaper")}>Privacy Policy</li>
            <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate("/whitepaper")}>Risk Disclosure</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© 2025 ARENA-X. Built with ⚡ on Linera.</p>
        <div className="flex items-center gap-6">
          <Github className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" onClick={() => window.open("https://github.com/linera-io", "_blank")} />
          <Twitter className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" onClick={() => window.open("https://twitter.com/linera_io", "_blank")} />
          <MessageCircle className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" onClick={() => window.open("https://discord.gg/linera", "_blank")} />
        </div>
      </div>
    </footer>
  );
}