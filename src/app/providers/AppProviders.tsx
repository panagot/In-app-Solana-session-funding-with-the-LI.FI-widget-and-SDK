import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { createNetworkConfig, SuiClientProvider, WalletProvider as SuiWalletProvider } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import { BigmiProvider } from '@bigmi/react'
import { BrowserRouter } from 'react-router-dom'
import { wagmiConfig } from './wagmiConfig'
import { bigmiConfig } from './bigmiConfig'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
})

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl('mainnet') },
})

const solanaEndpoint =
  import.meta.env.VITE_SOLANA_RPC_URL ?? clusterApiUrl(WalletAdapterNetwork.Mainnet)

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  const solanaWallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  )

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig} reconnectOnMount>
        <ConnectionProvider endpoint={solanaEndpoint}>
          <SolanaWalletProvider wallets={solanaWallets} autoConnect>
            <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
              <SuiWalletProvider autoConnect>
                <BigmiProvider config={bigmiConfig} reconnectOnMount>
                  <BrowserRouter>{children}</BrowserRouter>
                </BigmiProvider>
              </SuiWalletProvider>
            </SuiClientProvider>
          </SolanaWalletProvider>
        </ConnectionProvider>
      </WagmiProvider>
    </QueryClientProvider>
  )
}
