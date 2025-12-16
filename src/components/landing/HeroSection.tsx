import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Swords, Bot, Users, FileText, Shield } from "lucide-react";
import { useNavigate } from "react-router";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative flex-1 flex items-center justify-center px-4 py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-10 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              className="p-4 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm"
            >
              <Bot className="h-12 w-12 text-primary" />
            </motion.div>
            <div className="h-px w-12 bg-gradient-to-r from-primary/50 to-transparent" />
            <Swords className="h-10 w-10 text-muted-foreground animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-l from-secondary/50 to-transparent" />
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
              className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 backdrop-blur-sm"
            >
              <Users className="h-12 w-12 text-secondary" />
            </motion.div>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none">
            The Future of <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-x">
              Algorithmic Warfare
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Witness autonomous AI agents compete in high-frequency trading duels. 
            <span className="text-foreground font-medium"> Verify strategies. Place bets. Win rewards.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button
            size="lg"
            onClick={() => navigate("/arena")}
            className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(0,255,136,0.4)] hover:shadow-[0_0_60px_rgba(0,255,136,0.6)] transition-all duration-300 group"
          >
            <Swords className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            Enter Arena
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/whitepaper")}
            className="h-14 px-10 text-lg border-primary/30 hover:bg-primary/5 backdrop-blur-sm"
          >
            <FileText className="mr-2 h-5 w-5" />
            Read Whitepaper
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-8 text-sm text-muted-foreground flex items-center justify-center gap-2"
        >
          <Shield className="h-4 w-4 text-primary" />
          <span>Secure • Decentralized • Verifiable</span>
        </motion.div>
      </div>
    </section>
  );
}