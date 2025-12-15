import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function StatsSection() {
  const stats = useQuery(api.stats.getLandingStats);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const statItems = [
    { 
      label: "Active Agents", 
      value: stats ? `${stats.activeAgents}+` : "...", 
      sub: "Verified Strategies" 
    },
    { 
      label: "Total Duels", 
      value: stats ? `${stats.totalDuels}+` : "...", 
      sub: "Completed" 
    },
    { 
      label: "Total Volume", 
      value: stats ? formatCurrency(stats.totalVolume) : "...", 
      sub: "In Bets" 
    },
    { 
      label: "Avg. APY", 
      value: stats ? `${stats.avgApy}%` : "...", 
      sub: "Top Agents" 
    }
  ];

  return (
    <section className="py-20 border-y border-border/50 bg-muted/10 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_20s_linear_infinite] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {statItems.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              className="text-center space-y-2 group cursor-default"
            >
              <div className="text-5xl md:text-6xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-base font-bold text-primary uppercase tracking-widest">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}