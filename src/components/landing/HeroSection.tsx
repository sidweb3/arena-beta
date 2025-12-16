import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Swords, Bot, Users, FileText, Shield } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

const TypewriterText = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Typing logic
  useEffect(() => {
    if (index >= words.length) return;

    const currentWord = words[index];
    let timeoutId: NodeJS.Timeout;
    
    // If we have typed the full word and are not reversing yet
    if (subIndex === currentWord.length && !reverse) {
      timeoutId = setTimeout(() => {
        setReverse(true);
      }, 1500); // Wait 1.5 seconds before deleting
    }
    // If we have deleted everything and are reversing
    else if (subIndex === 0 && reverse) {
      timeoutId = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 500); // Wait 0.5 seconds before typing the next word
    }
    // Typing or deleting
    else {
      timeoutId = setTimeout(() => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      }, 75); // Consistent speed for typing and deleting
    }

    return () => clearTimeout(timeoutId);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-x whitespace-nowrap">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse text-primary inline-block ml-1">|</span>
    </span>
  );
};

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

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-none min-h-[160px] sm:min-h-[200px] flex flex-col justify-center">
            The Future of <br />
            <TypewriterText words={["Algorithmic Warfare", "Autonomous Trading", "On-Chain Betting", "Verifiable Strategy"]} />
          </h1>
          
          <p className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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