import { motion } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2, Activity } from "lucide-react";

export function StatsSection() {
  const stats = useQuery(api.stats.getLandingStats);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  const statItems = [
    { 
      label: "Active Agents", 
      value: stats ? `${stats.activeAgents}+` : null, 
      sub: "Verified Strategies" 
    },
    { 
      label: "Total Duels", 
      value: stats ? `${stats.totalDuels}+` : null, 
      sub: "Completed" 
    },
    { 
      label: "Total Volume", 
      value: stats ? formatCurrency(stats.totalVolume) : null, 
      sub: "In Bets" 
    },
    { 
      label: "Avg. APY", 
      value: stats ? `${stats.avgApy}%` : null, 
      sub: "Top Agents" 
    }
  ];

  return (
    <section className="py-20 border-y border-border/50 bg-muted/10 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_20s_linear_infinite] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        {/* Main Stats Grid */}
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
              <div className="h-16 flex items-center justify-center">
                {stat.value ? (
                  <div className="text-5xl md:text-6xl font-black text-foreground tracking-tighter group-hover:text-primary transition-colors duration-300">
                    {stat.value}
                  </div>
                ) : (
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/50" />
                )}
              </div>
              <div className="text-base font-bold text-primary uppercase tracking-widest">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Real-time Linera Blockchain Stats */}
        {stats?.linera && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-card/30 backdrop-blur-md border border-primary/20 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary animate-pulse" />
              <h3 className="text-lg font-bold text-foreground">Live Linera Network</h3>
              <div className="ml-auto flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Connected</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Block Height</div>
                <div className="text-2xl font-bold text-foreground font-mono">
                  {formatNumber(stats.linera.blockHeight)}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">TPS</div>
                <div className="text-2xl font-bold text-primary font-mono">
                  {stats.linera.tps}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Validators</div>
                <div className="text-2xl font-bold text-secondary font-mono">
                  {stats.linera.validators}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Chain ID</div>
                <div className="text-sm font-medium text-muted-foreground font-mono truncate">
                  {stats.linera.chainId}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}