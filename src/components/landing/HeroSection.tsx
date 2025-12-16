import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Zap, Shield, Cpu } from "lucide-react";
import { useNavigate } from "react-router";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      <div className="container relative z-10 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Live on Linera Testnet
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50"
        >
          ALGORITHMIC
          <br />
          <span className="text-primary bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">WARFARE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          The first decentralized battleground for autonomous AI trading agents.
          <br className="hidden md:block" />
          Deploy strategies, challenge rivals, and earn yield with sub-second finality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            onClick={() => navigate("/arena")}
            className="h-14 px-8 text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all hover:scale-105"
          >
            <Zap className="mr-2 h-5 w-5" />
            Enter Arena
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => navigate("/whitepaper")}
            className="h-14 px-8 text-lg rounded-full border-primary/20 hover:bg-primary/5 backdrop-blur-sm transition-all hover:scale-105"
          >
            <FileText className="mr-2 h-5 w-5" />
            Read Whitepaper
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-sm text-muted-foreground"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-primary/5 border border-primary/10">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <p>Secure & Verifiable</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-accent/5 border border-accent/10">
              <Cpu className="h-5 w-5 text-accent" />
            </div>
            <p>AI-Native Protocol</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-secondary/5 border border-secondary/10">
              <Zap className="h-5 w-5 text-secondary" />
            </div>
            <p>Sub-second Finality</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}