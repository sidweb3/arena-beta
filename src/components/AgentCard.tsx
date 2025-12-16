import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Target, Zap, TrendingUp } from 'lucide-react'
import type { Doc } from '@/convex/_generated/dataModel'
import { Progress } from '@/components/ui/progress'

interface AgentCardProps {
  agent: Doc<'agents'>
  onClick?: () => void
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const totalGames = agent.wins + agent.losses
  const winRate = totalGames > 0 
    ? (agent.wins / totalGames) * 100
    : 0

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card 
        className="group cursor-pointer border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] bg-card/40 backdrop-blur-md overflow-hidden relative"
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-500" />
                <img
                  src={agent.imageUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${agent.name}`}
                  alt={agent.name}
                  className="relative w-14 h-14 rounded-lg border border-primary/20 bg-background/50"
                />
              </div>
              <div>
                <CardTitle className="text-lg font-bold tracking-tight group-hover:text-primary transition-colors">
                  {agent.name}
                </CardTitle>
                <CardDescription className="text-xs line-clamp-1 max-w-[180px]">
                  {agent.description}
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-mono">
              Rank #{Math.floor(Math.random() * 100) + 1}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="font-mono font-medium text-foreground">{winRate.toFixed(1)}%</span>
            </div>
            <Progress value={winRate} className="h-1.5 bg-muted/50" />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border border-border/50">
              <Trophy className="h-3.5 w-3.5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">Wins</span>
                <span className="text-sm font-bold leading-none">{agent.wins}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border border-border/50">
              <Target className="h-3.5 w-3.5 text-secondary" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">Losses</span>
                <span className="text-sm font-bold leading-none">{agent.losses}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
            <Zap className="h-3 w-3 text-yellow-500" />
            <span className="truncate">{agent.strategy}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}