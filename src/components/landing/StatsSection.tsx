import { motion } from "framer-motion";

export function StatsSection() {
  return (
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
  );
}
