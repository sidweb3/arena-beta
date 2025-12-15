import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WalletConnect } from "@/components/WalletConnect";
import { Swords, Zap, Trophy, TrendingUp, Bot, Users, Shield, Globe, Cpu, ArrowRight, FileText } from "lucide-react";
import { useNavigate } from "react-router";
import { useAccount } from "wagmi";
import { useRef } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const features = [
    {
      icon: Swords,
      title: "AI Trading Duels",
      description: "Watch AI agents battle in real-time trading competitions with verifiable on-chain execution."
    },
    {
      icon: Zap,
      title: "Instant Betting",
      description: "Place bets on your favorite agents and strategies with sub-second finality on Linera."
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description: "Track top performing agents and winning strategies on our global immutable leaderboard."
    },
    {
      icon: TrendingUp,
      title: "Live Markets",
      description: "Real market events drive the competition outcomes, oracle-verified for absolute truth."
    }
  ];

  const whyUs = [
    {
      icon: Shield,
      title: "Trustless Execution",
      description: "Every duel and bet is executed via smart contracts on the Linera blockchain. No central authority controls the outcome."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Participate from anywhere in the world. Our decentralized infrastructure ensures 100% uptime and censorship resistance."
    },
    {
      icon: Cpu,
      title: "Advanced AI Agents",
      description: "Our platform hosts the most sophisticated trading algorithms, constantly evolving to beat the market and each other."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav
        className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-50"
      >
>>>>>>> REPLACE
<<<<<<< SEARCH
      </motion.nav>
=======
      </nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src="./logo.svg" alt="Agent Arena" className="h-10 w-10 relative z-10" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Agent Arena
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/whitepaper")} className="hidden md:flex">
                Whitepaper
              </Button>
              <WalletConnect />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
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

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Active Agents", value: "12+", sub: "Verified Strategies" },
              { label: "Total Duels", value: "500+", sub: "Completed" },
              { label: "Total Volume", value: "$2.4M", sub: "In Bets" },
              { label: "Avg. APY", value: "142%", sub: "Top Agents" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center space-y-1"
              >
                <div className="text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm font-medium text-primary">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Dominate the Market
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              The ultimate platform for AI-powered trading competitions, built for speed and transparency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] group"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section ref={targetRef} className="py-32 px-4 bg-gradient-to-b from-background to-primary/5 relative overflow-hidden">
        <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  Why Choose <br />
                  <span className="text-primary">Agent Arena?</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  We are redefining the landscape of decentralized finance with cutting-edge technology and unwavering commitment to transparency.
                </p>
              </div>

              <div className="space-y-8">
                {whyUs.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20">
                        <item.icon className="h-6 w-6 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button variant="link" onClick={() => navigate("/whitepaper")} className="text-primary text-lg p-0 h-auto group">
                Read the full technical specification <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full animate-pulse" />
              <div className="relative bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <div className="font-mono text-sm text-muted-foreground">Latest Block</div>
                    <div className="font-mono text-sm text-primary">#18,245,902</div>
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-background/50">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <div className="flex-1 space-y-1">
                          <div className="h-2 w-24 bg-muted rounded" />
                          <div className="h-2 w-16 bg-muted/50 rounded" />
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">0.5s ago</div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      <Zap className="h-3 w-3" />
                      Live Network Activity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
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
    </div>
  );
}