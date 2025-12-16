import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

// Define supported wallet types
export type LineraWalletType = 'default' | 'checko' | 'croissant';

// Interface for the Linera Context
interface LineraContextType {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  walletType: LineraWalletType | null;
  connect: (type?: LineraWalletType) => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
  error: string | null;
  isMock: boolean;
}

const LineraContext = createContext<LineraContextType | undefined>(undefined);

export function LineraProvider({ children }: { children: ReactNode }) {
  // Add debug log
  React.useEffect(() => {
    console.log("LineraProvider mounted");
  }, []);

  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<LineraWalletType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);

  const connect = async (type: LineraWalletType = 'default') => {
    setIsLoading(true);
    setError(null);
    setIsMock(false);
    
    // Handle specific wallet types
    if (type === 'checko') {
      console.log("Attempting to connect to CheCko wallet...");
      if ((window as any).checko) {
        try {
          // Request accounts from CheCko
          // Note: CheCko might use a different method signature, but we'll assume standard Linera provider compatibility
          // or the specific 'linera_accounts' method if documented
          const accounts = await (window as any).checko.request({ method: 'linera_accounts' });
          
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
            setChainId("linera-mainnet"); 
            setWalletType('checko');
            setIsConnected(true);
            setIsMock(false);
            toast.success("Connected to CheCko Wallet");
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.error("CheCko connection failed:", e);
          toast.error("Failed to connect to CheCko Wallet");
        }
      } else {
        // If CheCko is not detected, we can prompt the user to install it
        // For now, we'll show the info toast
        toast.info("CheCko Wallet not detected. Opening installation guide...");
        window.open("https://github.com/respeer-ai/linera-wallet#readme", "_blank");
      }
      setIsLoading(false);
      return;
    }
    
    if (type === 'croissant') {
      console.log("Attempting to connect to Croissant wallet...");
      if ((window as any).linera) {
        try {
          // Croissant uses { type: 'CONNECT_WALLET' }
          const result = await (window as any).linera.request({ type: 'CONNECT_WALLET' });
          console.log("Croissant connection result:", result);
          
          // Attempt to extract address from result
          let address = "Croissant User";
          if (typeof result === 'string') {
            address = result;
          } else if (result && typeof result === 'object' && 'address' in result) {
            address = result.address;
          } else if (result && typeof result === 'object' && 'account' in result) {
            address = result.account;
          }

          setAccount(address);
          setChainId("linera-testnet"); 
          setWalletType('croissant');
          setIsConnected(true);
          setIsMock(false);
          toast.success("Connected to Croissant Wallet");
        } catch (e) {
          console.error("Croissant connection failed:", e);
          toast.error("Failed to connect to Croissant Wallet");
        }
      } else {
        toast.info("Croissant Wallet not detected. Opening installation guide...");
        window.open("https://github.com/Nirajsah/croissant", "_blank");
      }
      setIsLoading(false);
      return;
    }

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
          console.log("eth_requestAccounts failed, trying linera_accounts", e);
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
           setWalletType('default');
           setIsConnected(true);
           setIsMock(false);
           return;
        }
      }

      // If we get here, no provider was found.
      // Fallback to Realistic Mock Mode
      console.log("Linera wallet not found. Enabling realistic mock mode.");
      
      // Simulate connection delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate a realistic looking Linera address
      const mockAddress = "linera:" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('').slice(0, 40);
      
      setAccount(mockAddress);
      setChainId("linera-testnet-mock");
      setWalletType('default');
      setIsConnected(true);
      setIsMock(true);
      toast.info("Connected to Linera (Simulated Network)");
      
    } catch (err) {
      console.error("Failed to connect to Linera:", err);
      setError(err instanceof Error ? err.message : "Failed to connect to Linera wallet");
      setIsConnected(false);
      setIsMock(false);
      setWalletType(null);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setChainId(null);
    setWalletType(null);
    setIsConnected(false);
    setIsMock(false);
  };

  return (
    <LineraContext.Provider value={{ isConnected, account, chainId, walletType, connect, disconnect, isLoading, error, isMock }}>
      {children}
    </LineraContext.Provider>
  );
}

export function useLinera() {
  const context = useContext(LineraContext);
  if (context === undefined) {
    // Fallback to prevent crashes if used outside provider
    console.warn('useLinera used outside LineraProvider - returning fallback');
    return {
      isConnected: false,
      account: null,
      chainId: null,
      walletType: null,
      connect: async () => {},
      disconnect: () => {},
      isLoading: false,
      error: 'Context not found',
      isMock: false
    };
  }
  return context;
}