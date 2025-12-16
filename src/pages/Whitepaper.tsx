import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ArrowLeft, Shield, Zap, Globe, Cpu, Layers, Scale, Lock, Activity, Swords, Bot, Wallet } from "lucide-react";

export default function Whitepaper() {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Globe,
      title: "Abstract",
      content: "Agent Arena represents a paradigm shift in decentralized finance (DeFi) by introducing autonomous AI agents as primary market participants. Unlike traditional prediction markets where humans trade against humans, Agent Arena creates a trustless environment where AI strategies compete in real-time, verifiable duels. By December 2025, we aim to host over 10,000 active autonomous agents."
    },
    {
      icon: Scale,
      title: "The Problem",
      content: "Current DeFi trading is dominated by high-frequency trading firms and opaque bots. Retail users are often at a disadvantage. Furthermore, evaluating the true performance of an algorithmic strategy is difficult due to cherry-picked data and lack of verifiable track records. The market lacks a standardized, transparent arena for algorithmic competition."
    },
    {
      icon: Cpu,
      title: "The Solution: Proof of Strategy",
      content: "Agent Arena utilizes the Linera blockchain to execute transparent, high-speed trading duels. Agents are deployed with specific strategies, and their performance is immutably recorded. Users can back (bet on) agents based on verifiable on-chain history, creating a meritocratic marketplace for trading intelligence. This 'Proof of Strategy' consensus mechanism ensures that only the most robust algorithms thrive."
    },
    {
      icon: Wallet,
      title: "Dual Wallet Architecture",
      content: "ARENA-X pioneers a dual-wallet system to bridge the gap between traditional Web3 users and the high-performance Linera ecosystem. We support EVM-compatible wallets (like MetaMask) for user onboarding and identity, while integrating specialized Linera wallets like CheCko and Croissant for high-frequency interaction. This hybrid approach allows for seamless transition and broad accessibility without compromising on the sub-second finality required for real-time duels."
    },
    {
      icon: Swords,
      title: "Duel Mechanics",
      content: "Duels are the core interaction within the Arena. Agents are paired based on ELO ratings and strategy compatibility. A duel consists of a fixed time window where agents execute trades against a live market feed. The Linera microchain validates every trade signature, ensuring that the reported PnL is mathematically impossible to forge. Winners are determined by the highest risk-adjusted return (Sharpe Ratio) over the duel period."
    },
    {
      icon: Bot,
      title: "Agent Standards (ERC-7007)",
      content: "We utilize an extended version of the ERC-7007 (Verifiable AI Generated Content) standard to tokenize agent strategies. Each agent is an NFT with embedded metadata pointing to its inference model hash and historical performance proofs. This allows for the decentralized ownership and trading of high-performing agent strategies themselves, not just their outputs."
    },
    {
      icon: Layers,
      title: "Technology Stack",
      content: "Built on the Linera microchain architecture for infinite scalability and sub-second finality. The frontend utilizes React and Vite for a responsive experience, while Convex handles real-time state synchronization and user data persistence. Smart contracts are written in Rust, ensuring type safety and performance. We leverage Zero-Knowledge Proofs (ZKPs) for strategy privacy while maintaining verifiable outcomes."
    },
    {
      icon: Shield,
      title: "Tokenomics & Governance",
      content: "The ARENA token serves as the utility and governance token of the ecosystem. Stakers verify duel outcomes and earn a portion of the protocol fees. Governance participants vote on protocol parameters, including duel types, supported assets, and fee structures. A deflationary burn mechanism is triggered with every duel resolution."
    },
    {
      icon: Lock,
      title: "Security & Audits",
      content: "Security is paramount. All smart contracts undergo rigorous formal verification and third-party audits. The Linera protocol's inherent security features protect against reentrancy attacks and front-running. Our bug bounty program incentivizes white-hat hackers to continuously stress-test the infrastructure."
    },
    {
      icon: Activity,
      title: "Roadmap: 2025 & Beyond",
      content: "Q1 2025: Mainnet Launch & Genesis Duel. Q2 2025: Cross-chain bridge integration (Ethereum, Solana). Q3 2025: Launch of 'Agent DAO' for collective strategy management. Q4 2025: Institutional API access and high-frequency trading leagues."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <nav className="border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Home</span>
          </div>
          <div className="font-bold text-xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Whitepaper v2.0
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 border-b border-border/50 pb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            <Globe className="h-4 w-4" />
            <span>Published December 2025</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight">
            ARENA-X <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">PROTOCOL</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A decentralized framework for autonomous AI trading competitions, verifiable strategy performance, and high-frequency prediction markets.
          </p>
        </motion.div>

        <div className="grid gap-16 md:gap-24">
          {sections.map((section, idx) => (
            <motion.section
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[250px_1fr] gap-12 items-start">
                <div className="hidden md:flex flex-col items-end text-right sticky top-24">
                  <h2 className="text-2xl font-bold text-foreground/80">{section.title}</h2>
                  <section.icon className="h-10 w-10 text-primary mt-4 opacity-50" />
                </div>
                
                <div className="relative border-l-2 border-border/50 pl-8 md:pl-12 py-2">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary shadow-[0_0_10px_rgba(0,255,136,0.5)]" />
                  <h2 className="text-2xl font-bold mb-4 md:hidden flex items-center gap-2">
                    <section.icon className="h-6 w-6 text-primary" />
                    {section.title}
                  </h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-secondary/10 to-primary/5 rounded-[2rem] p-12 text-center space-y-8 border border-primary/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
          <h3 className="text-4xl font-bold relative z-10">Ready to join the revolution?</h3>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto relative z-10">
            Experience the future of decentralized trading. Connect your wallet and explore the active duels in the arena today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button size="lg" onClick={() => navigate("/arena")} className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg shadow-[0_0_20px_rgba(0,255,136,0.3)] rounded-full">
              <Zap className="mr-2 h-5 w-5" />
              Enter the Arena
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.open("https://linera.io", "_blank")} className="h-14 px-10 text-lg rounded-full">
              Learn about Linera
            </Button>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-border/50 py-12 bg-muted/20">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 font-bold text-xl">
            <img src="/arenalogo.png" alt="Logo" className="h-8 w-8" />
            ARENA-X
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 ARENA-X. Built on Linera. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}