import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Globe, Cpu, ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router";

export function WhyUsSection() {
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

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
  );
}
