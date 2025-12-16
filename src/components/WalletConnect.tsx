import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut, Loader2, Zap, Info, ChevronDown, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useLinera, LineraWalletType } from '@/contexts/LineraContext'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    isMock: isLineraMock,
    walletType
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

  const handleLineraConnect = async (type: LineraWalletType = 'default') => {
    try {
      await connectLinera(type)
      if (type === 'default') {
        // Success toast is handled in context for default/mock
      }
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
    <div className="relative flex items-center">
      <div className="flex items-center gap-2">
        {isConnected ? (
          <div key="connected" className="flex items-center gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary/10 border border-primary/20 text-sm font-mono">
              <span className="text-xs text-muted-foreground uppercase hidden sm:inline">{isLineraConnected ? 'Linera' : 'EVM'}</span>
              {isLineraConnected && isLineraMock && (
                <Badge variant="secondary" className="h-4 px-1 text-[10px]">MOCK</Badge>
              )}
              {isLineraConnected && walletType === 'checko' && (
                <Badge variant="default" className="h-4 px-1 text-[10px] bg-blue-600 hover:bg-blue-700">CheCko</Badge>
              )}
              {isLineraConnected && walletType === 'croissant' && (
                <Badge variant="default" className="h-4 px-1 text-[10px] bg-orange-500 hover:bg-orange-600">Croissant</Badge>
              )}
              <span className="w-px h-3 bg-primary/20 hidden sm:block" />
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
                  setTimeout(() => handleLineraConnect('checko'), 100);
                }
              }}
              className="h-8 px-3 text-xs border-primary/30 hover:bg-primary/5 hidden sm:flex"
            >
              Switch
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleDisconnect}
              className="h-8 w-8 border-destructive/50 hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div key="disconnected" className="flex gap-2">
            <div className="relative">
              <Button
                onClick={() => handleLineraConnect('checko')}
                disabled={isLineraLoading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,255,136,0.3)] border border-primary/50 h-9"
              >
                {isLineraLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ShieldCheck className="mr-2 h-4 w-4" />
                )}
                <span className="hidden sm:inline">Connect </span>CheCko
              </Button>
              <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] px-1.5 py-0 h-5 shadow-md animate-pulse pointer-events-none">
                Rec
              </Badge>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isLineraLoading}
                  className="border-primary/20 hover:bg-primary/5 h-9 px-2 sm:px-4"
                >
                  <Zap className="sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Other</span>
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleLineraConnect('default')} className="cursor-pointer">
                  <Zap className="mr-2 h-4 w-4" />
                  <span>Linera Default</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLineraConnect('croissant')} className="cursor-pointer">
                  <span className="mr-2 h-4 w-4 flex items-center justify-center font-bold text-xs border rounded-full">🥐</span>
                  <span>Croissant</span>
                </DropdownMenuItem>
                <div className="h-px bg-border my-1" />
                <DropdownMenuItem onClick={handleConnect} disabled={isPending} className="cursor-pointer">
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wallet className="mr-2 h-4 w-4" />
                  )}
                  <span>EVM Wallet</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      
      {/* Helper Notes - Absolute Positioned */}
      {!isConnected && (
        <div className="absolute top-full right-0 mt-3 w-max flex flex-col gap-1 text-right pointer-events-none z-50">
          <div className="text-[10px] text-muted-foreground opacity-90 flex items-center gap-1 justify-end bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 shadow-lg">
            <Info className="h-3 w-3 text-primary" />
            <span>CheCko Wallet Recommended for Linera</span>
          </div>
        </div>
      )}
      
      {isConnected && isLineraMock && (
        <div className="absolute top-full right-0 mt-2 w-max pointer-events-none z-50">
          <div className="text-[9px] text-blue-400 flex items-center gap-1 bg-background/95 backdrop-blur-md px-2 py-1 rounded-md border border-blue-500/20 shadow-sm">
            <Info className="h-3 w-3" />
            <span>Mock mode active</span>
          </div>
        </div>
      )}
    </div>
  )
}