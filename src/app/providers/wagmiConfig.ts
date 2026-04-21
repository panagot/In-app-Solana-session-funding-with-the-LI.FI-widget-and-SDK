import { http, createConfig } from 'wagmi'
import {
  mainnet,
  arbitrum,
  optimism,
  base,
  polygon,
  avalanche,
  bsc,
  scroll,
  linea,
  zkSync,
} from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

const chains = [
  mainnet,
  arbitrum,
  optimism,
  base,
  polygon,
  avalanche,
  bsc,
  scroll,
  linea,
  zkSync,
] as const

function transportFor(chainId: number) {
  const envMap: Record<number, string | undefined> = {
    [mainnet.id]: import.meta.env.VITE_ETHEREUM_RPC_URL,
    [arbitrum.id]: import.meta.env.VITE_ARBITRUM_RPC_URL,
    [base.id]: import.meta.env.VITE_BASE_RPC_URL,
    [optimism.id]: import.meta.env.VITE_OPTIMISM_RPC_URL,
    [polygon.id]: import.meta.env.VITE_POLYGON_RPC_URL,
  }
  const url = envMap[chainId]
  return url ? http(url) : http()
}

export const wagmiConfig = createConfig({
  chains,
  connectors: [injected()],
  transports: {
    [mainnet.id]: transportFor(mainnet.id),
    [arbitrum.id]: transportFor(arbitrum.id),
    [optimism.id]: transportFor(optimism.id),
    [base.id]: transportFor(base.id),
    [polygon.id]: transportFor(polygon.id),
    [avalanche.id]: http(),
    [bsc.id]: http(),
    [scroll.id]: http(),
    [linea.id]: http(),
    [zkSync.id]: http(),
  },
})
