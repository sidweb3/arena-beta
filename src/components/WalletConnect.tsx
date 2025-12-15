import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut, Loader2, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useLinera } from '@/contexts/LineraContext'
import { Badge } from '@/components/ui/badge'

export function WalletConnect() {
  const { address, isConnected: isWagmiConnected } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()
  
  // Linera hook
  const { 
    isConnected: isLineraConnected, 
    account: lineraAccount, 
    connect: connectLinera, 
    disconnect: disconnectLinera,
    isLoading: isLineraLoading,
    isMock: isLineraMock
  } = useLinera()

  // Mount state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to connect wallet')
    }
  }, [error])

  const handleConnect = async () => {
    try {
      // Try injected connector first (MetaMask, etc.)
      const injectedConnector = connectors.find(c => c.type === 'injected')
      if (injectedConnector) {
        connect({ connector: injectedConnector })
      } else {
        // Fallback to first available connector
        const connector = connectors[0]
        if (connector) {
          connect({ connector })
        } else {
          toast.error('No wallet connector available')
        }
      }
    } catch (error) {
      toast.error('Failed to connect wallet')
      console.error(error)
    }
  }

  const handleLineraConnect = async () => {
    try {
      await connectLinera()
      toast.success('Connected to Linera')
    } catch (e) {
      toast.error('Failed to connect to Linera')
    }
  }

  const handleDisconnect = () => {
    if (isWagmiConnected) disconnect()
    if (isLineraConnected) disconnectLinera()
    toast.success('Wallet disconnected')
  }

  if (!mounted) {
    return <div className="min-h-[40px] w-[140px] bg-muted/10 rounded-md animate-pulse" />
  }

  const isConnected = (isWagmiConnected && address) || (isLineraConnected && lineraAccount);

  return (
    <div className="relative flex items-center gap-2 min-h-[40px]">
      {isConnected ? (
        <div key="connected" className="flex items-center gap-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-sm font-mono">
            <span className="text-xs text-muted-foreground uppercase">{isLineraConnected ? 'Linera' : 'EVM'}</span>
            {isLineraConnected && isLineraMock && (
              <Badge variant="secondary" className="h-4 px-1 text-[10px]">MOCK</Badge>
            )}
            <span className="w-px h-3 bg-primary/20" />
            {(isLineraConnected ? lineraAccount : address)?.slice(0, 6)}...{(isLineraConnected ? lineraAccount : address)?.slice(-4)}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleDisconnect();
              // Trigger connection to the other wallet type
              if (isLineraConnected) {
                setTimeout(() => handleConnect(), 100);
              } else {
                setTimeout(() => handleLineraConnect(), 100);
              }
            }}
            className="h-8 px-3 text-xs border-primary/30 hover:bg-primary/5"
          >
            Switch to {isLineraConnected ? 'EVM' : 'Linera'}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDisconnect}
            className="border-destructive/50 hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div key="disconnected" className="flex gap-2">
          <Button
            onClick={handleLineraConnect}
            disabled={isLineraLoading}
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            {isLineraLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Zap className="mr-2 h-4 w-4" />
            )}
            Connect Linera
          </Button>
          
          <Button
            onClick={handleConnect}
            disabled={isPending}
            variant="outline"
            className="border-primary/50 hover:bg-primary/10"
          >
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wallet className="mr-2 h-4 w-4" />
            )}
            Connect EVM
          </Button>
        </div>
      )}
      {/* Helper Note */}
      {!isConnected && (
        <div className="absolute -bottom-6 left-0 right-0 text-[10px] text-center text-muted-foreground opacity-70">
          Supports Linera & EVM Wallets
        </div>
      )}
    </div>
  )
}