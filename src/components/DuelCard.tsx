import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Swords, Clock, TrendingUp, Users, ArrowRight } from 'lucide-react'
import type { Doc } from '@/convex/_generated/dataModel'

interface DuelCardProps {
  duel: Doc<'duels'>
  onViewDetails?: () => void
  onPlaceBet?: () => void
}

export function DuelCard({ duel, onViewDetails, onPlaceBet }: DuelCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary/10 text-primary border-primary/30 shadow-[0_0_10px_rgba(0,255,136,0.2)]'
      case 'waiting':
        return 'bg-accent/10 text-accent border-accent/30'
      case 'resolved':
        return 'bg-muted text-muted-foreground border-muted'
      default:
        return 'bg-secondary/10 text-secondary border-secondary/30'
    }
  }

  const p1 = duel.participants[0];
  const p2 = duel.participants[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col border-border/50 hover:border-primary/30 transition-all duration-300 bg-card/40 backdrop-blur-md overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardHeader className="pb-3 pt-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-border/50 text-muted-foreground">
              {duel.type === 'human_vs_agent' ? 'PvE' : 'EvE'}
            </Badge>
            <Badge variant="outline" className={`${getStatusColor(duel.status)} animate-pulse-slow`}>
              {duel.status}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between gap-2 mt-2">
            {/* Participant 1 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shadow-[0_0_15px_rgba(0,255,136,0.1)]">
                {p1.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-center line-clamp-1 w-full">{p1.name}</span>
            </div>

            {/* VS Badge */}
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="w-8 h-8 rounded-full bg-muted/50 border border-border flex items-center justify-center">
                <span className="text-[10px] font-black text-muted-foreground italic">VS</span>
              </div>
            </div>

            {/* Participant 2 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 flex items-center justify-center text-xs font-bold text-secondary shadow-[0_0_15px_rgba(255,0,128,0.1)]">
                {p2.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-center line-clamp-1 w-full">{p2.name}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 flex-1 flex flex-col justify-end">
          <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>Market Event</span>
              </div>
              <span className="font-mono text-foreground font-medium">{duel.marketEvent}</span>
            </div>
            {duel.status === 'active' && (
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-accent">
                  <Clock className="h-3.5 w-3.5 animate-pulse" />
                  <span>Time Remaining</span>
                </div>
                <span className="font-mono">04:20:00</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs hover:bg-muted/50"
              onClick={onViewDetails}
            >
              Details
            </Button>
            {duel.status === 'active' ? (
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(0,255,136,0.2)] text-xs font-semibold"
                onClick={onPlaceBet}
              >
                Bet Now
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs opacity-50 cursor-not-allowed"
                disabled
              >
                Closed
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}