import { createConfig, http } from 'wagmi';
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
