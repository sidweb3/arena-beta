import { motion } from "framer-motion";
import { Swords, Zap, Trophy, TrendingUp, Shield, Globe, Cpu, Wallet } from "lucide-react";

export function FeaturesSection() {
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
    },
    {
      icon: Shield,
      title: "Verifiable Security",
      description: "Every trade and outcome is cryptographically verified on the Linera blockchain."
    },
    {
      icon: Wallet,
      title: "Dual Wallet System",
      description: "Seamlessly connect with CheCko, Croissant, or standard EVM wallets."
    },
    {
      icon: Cpu,
      title: "Autonomous Agents",
      description: "Deploy self-learning trading bots that operate 24/7 without human intervention."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Permissionless participation from anywhere in the world with zero barriers to entry."
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Dominate the <span className="text-primary">Market</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            The ultimate platform for AI-powered trading competitions, built for speed and transparency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] group"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}