// src/pages/Arena.tsx
await sendFileEdit("src/pages/Arena.tsx", `import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { WalletConnect } from "@/components/WalletConnect";
import { AgentCard } from "@/components/AgentCard";
import { DuelCard } from "@/components/DuelCard";
import { CreateDuelDialog } from "@/components/CreateDuelDialog";
import { PlaceBetDialog } from "@/components/PlaceBetDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router";
import { Swords, Bot, Trophy } from "lucide-react";
import { useAccount } from "wagmi";
import type { Doc } from "@/convex/_generated/dataModel";
import { useLinera } from "@/contexts/LineraContext";

export default function Arena() {
  console.log("Arena page loading..."); // Debug log
  const navigate = useNavigate();
  const { isConnected: isWagmiConnected } = useAccount();
  const { isConnected: isLineraConnected } = useLinera();
  const isConnected = isWagmiConnected || isLineraConnected;
  const [activeTab, setActiveTab] = useState("active");
  const [selectedDuel, setSelectedDuel] = useState<Doc<"duels"> | null>(null);
  const [isBetDialogOpen, setIsBetDialogOpen] = useState(false);

  const agents = useQuery(api.agents.listAgents);
  const activeDuels = useQuery(api.duels.listActiveDuels);
  const waitingDuels = useQuery(api.duels.listWaitingDuels);

  const handlePlaceBet = (duel: Doc<"duels">) => {
    setSelectedDuel(duel);
    setIsBetDialogOpen(true);
  };

  // Always return a single root element, and conditionally render children
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-primary/5">
      {!isConnected ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Swords className="h-16 w-16 text-primary mx-auto" />
            <h2 className="text-2xl font-bold">Connect Wallet to Enter Arena</h2>
            <p className="text-muted-foreground">You need to connect your wallet to participate</p>
            <WalletConnect />
          </div>
        </div>
      ) : (
        <>
          {/* Navigation */}
          <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
                  <img src="./logo.svg" alt="Agent Arena" className="h-10 w-10" />
                  <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    Agent Arena
                  </span>
                </div>
                <WalletConnect />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Arena</h1>
                <p className="text-muted-foreground">Watch live duels and place your bets</p>
              </div>
              <CreateDuelDialog />
            </div>

            {/* Duels Section */}
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="active" className="gap-2">
                    <Swords className="h-4 w-4" />
                    Active Duels
                  </TabsTrigger>
                  <TabsTrigger value="waiting" className="gap-2">
                    <Trophy className="h-4 w-4" />
                    Waiting
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeDuels === undefined ? (
                      <div className="col-span-full text-center py-12 text-muted-foreground">
                        Loading duels...
                      </div>
                    ) : activeDuels.length === 0 ? (
                      <div className="col-span-full text-center py-12 text-muted-foreground">
                        No active duels right now
                      </div>
                    ) : (
                      activeDuels.map((duel) => (
                        <DuelCard
                          key={duel._id}
                          duel={duel}
                          onViewDetails={() => console.log("View details", duel._id)}
                          onPlaceBet={() => handlePlaceBet(duel)}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="waiting" className="mt-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {waitingDuels === undefined ? (
                      <div className="col-span-full text-center py-12 text-muted-foreground">
                        Loading duels...
                      </div>
                    ) : waitingDuels.length === 0 ? (
                      <div className="col-span-full text-center py-12 text-muted-foreground">
                        No waiting duels
                      </div>
                    ) : (
                      waitingDuels.map((duel) => (
                        <DuelCard
                          key={duel._id}
                          duel={duel}
                          onViewDetails={() => console.log("View details", duel._id)}
                        />
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Agents Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">Available Agents</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents === undefined ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    Loading agents...
                  </div>
                ) : agents.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No agents available
                  </div>
                ) : (
                  agents.map((agent) => (
                    <AgentCard
                      key={agent._id}
                      agent={agent}
                      onClick={() => console.log("Agent clicked", agent._id)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {selectedDuel && (
            <PlaceBetDialog
              open={isBetDialogOpen}
              onOpenChange={setIsBetDialogOpen}
              duel={selectedDuel}
            />
          )}
        </>
      )}
    </div>
  );
}
`)
await sendFileEdit("src/contexts/LineraContext.tsx", `import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface for the Linera Context
interface LineraContextType {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
  error: string | null;
}

const LineraContext = createContext<LineraContextType | undefined>(undefined);

export function LineraProvider({ children }: { children: ReactNode }) {
  // Add debug log to confirm provider is mounted (Vly: forcing rebuild)
  React.useEffect(() => {
    console.log("LineraProvider mounted (Vly: fixed useLinera error fallback)");
  }, []);

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Initializing Linera connection...");
      
      // Check for injected Linera provider
      if (typeof window !== 'undefined' && (window as any).linera) {
        const provider = (window as any).linera;
        console.log("Found Linera provider");
        
        let accounts;
        try {
          // Try standard request first
          accounts = await provider.request({ method: 'eth_requestAccounts' });
        } catch (e) {
          console.log("eth_requestAccounts failed, trying linera_accounts");
          try {
             // Fallback to specific linera method if exists
             accounts = await provider.request({ method: 'linera_accounts' });
          } catch (e2) {
             console.error("Failed to request accounts", e2);
             // Don't throw yet, might be a different API
          }
        }

        if (accounts && accounts.length > 0) {
           setAccount(accounts[0]);
           setChainId("linera-mainnet"); // or fetch from provider
           setIsConnected(true);
           return;
        }
      }

      // Fallback to mock if no provider found (for dev/demo)
      // Simulating connection for UI feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for now
      const mockAccount = "linera:" + Math.random().toString(36).substring(7);
      setAccount(mockAccount);
      setChainId("linera-testnet");
      setIsConnected(true);
      
    } catch (err) {
      console.error("Failed to connect to Linera:", err);
      setError(err instanceof Error ? err.message : "Failed to connect to Linera wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setChainId(null);
    setIsConnected(false);
  };

  return (
    <LineraContext.Provider value={{ isConnected, account, chainId, connect, disconnect, isLoading, error }}>
      {children}
    </LineraContext.Provider>
  );
}

export function useLinera() {
  const context = useContext(LineraContext);
  if (context === undefined) {
    // Fallback to prevent crashes if used outside provider
    console.warn('useLinera used outside LineraProvider - returning fallback (Vly: this is the fallback)');
    return {
      isConnected: false,
      account: null,
      chainId: null,
      connect: async () => {},
      disconnect: () => {},
      isLoading: false,
      error: 'Context not found'
    };
  }
  return context;
}
`)
await sendFileEdit("src/main.tsx", `import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './lib/wagmi'
import "./index.css";
import "./types/global.d.ts";
import { WalletSync } from "@/components/WalletSync";
import Arena from "./pages/Arena.tsx";
import { LineraProvider } from "@/contexts/LineraContext";

const queryClient = new QueryClient()

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
// Arena is imported directly to avoid lazy loading issues
// const Arena = lazy(() => import("./pages/Arena.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VlyToolbar />
    <InstrumentationProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConvexAuthProvider client={convex}>
            <LineraProvider>
              <BrowserRouter>
                <WalletSync />
                <RouteSyncer />
                <Suspense fallback={<RouteLoading />}>
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/arena" element={<Arena />} />
                    <Route path="/auth" element={<AuthPage redirectAfterAuth="/arena" />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
              <Toaster />
            </LineraProvider>
          </ConvexAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </InstrumentationProvider>
  </StrictMode>,
);
`)
