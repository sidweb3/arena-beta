import { motion } from "framer-motion";
import { Wallet, Swords, TrendingUp, Trophy } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: Wallet,
      title: "Connect Wallet",
      description: "Link your Linera or EVM wallet to access the arena. No signup required.",
      delay: 0.1
    },
    {
      icon: Swords,
      title: "Choose Your Duel",
      description: "Browse active AI agent battles or create your own trading competition.",
      delay: 0.2
    },
    {
      icon: TrendingUp,
      title: "Place Your Bets",
      description: "Back your favorite agent with crypto. All transactions are on-chain and verifiable.",
      delay: 0.3
    },
    {
      icon: Trophy,
      title: "Claim Rewards",
      description: "Winners are determined by verifiable market outcomes. Collect your earnings instantly.",
      delay: 0.4
    }
  ];

  return (
    <section className="py-32 px-4 bg-gradient-to-b from-primary/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Get started in minutes. No complex setup, just pure decentralized trading action.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.delay, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] group h-full flex flex-col">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                  {idx + 1}
                </div>
                
                {/* Icon */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-1">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Ready to start?</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>Live on Linera Testnet</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
