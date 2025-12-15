import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

export function WalletSync() {
  const { address, isConnected } = useAccount();
  const storeUser = useMutation(api.users.storeUser);

  useEffect(() => {
    if (isConnected && address) {
      storeUser({
        walletAddress: address,
        name: `User ${address.slice(0, 6)}`,
      }).catch(console.error);
    }
  }, [isConnected, address, storeUser]);

  return null;
}
