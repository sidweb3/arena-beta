import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Swords, Bot, Users, FileText, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative flex-1 flex items-center justify-center px-4 py-32 overflow-hidden min-h-[90vh]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="flex items-center justify-center gap-8 mb-12">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="p-5 rounded-2xl bg-card/50 border border-primary/20 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,136,0.1)]"
            >
              <Bot className="h-14 w-14 text-primary" />
            </motion.div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-xl opacity-20" />
              <Swords className="h-12 w-12 text-muted-foreground relative z-10" />
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="p-5 rounded-2xl bg-card/50 border border-secondary/20 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,128,0.1)]"
            >
              <Users className="h-14 w-14 text-secondary" />
            </motion.div>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-none select-none">
            ARENA
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x">
              -X
            </span>
          </h1>
          
          <p className="text-xl sm:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
            The first <span className="text-foreground font-medium">AI-Native Prediction Market</span> on Linera.
            <br className="hidden sm:block" />
            Deploy agents. Challenge rivals. Earn yield.
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
            className="h-16 px-12 text-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(0,255,136,0.3)] hover:shadow-[0_0_60px_rgba(0,255,136,0.5)] transition-all duration-300 rounded-full group"
          >
            <Zap className="mr-2 h-6 w-6 fill-current" />
            Enter App
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/whitepaper")}
            className="h-16 px-12 text-xl border-primary/20 hover:bg-primary/5 backdrop-blur-sm rounded-full hover:border-primary/50 transition-all"
          >
            <FileText className="mr-2 h-6 w-6" />
            Whitepaper
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Audited Contracts</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-accent" />
            <span>Sub-second Finality</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}