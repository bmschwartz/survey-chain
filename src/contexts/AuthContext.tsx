import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { createConfig, http, State, WagmiProvider } from 'wagmi';
import { avalanche, avalancheFuji } from 'wagmi/chains';

// Create wagmiConfig
const chains = [avalanche, avalancheFuji] as const;

export const wagmiConfig = createConfig({
  chains,
  transports: {
    [avalanche.id]: http(),
    [avalancheFuji.id]: http(),
  },
});

// Setup queryClient
const queryClient = new QueryClient();

export default function AuthProvider({ children, initialState }: { children: ReactNode; initialState?: State }) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
