/// <reference types="vite/client" />

declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_LIFI_INTEGRATOR: string
    readonly VITE_LIFI_API_KEY: string
    readonly VITE_SOLANA_RPC_URL: string
    readonly VITE_ETHEREUM_RPC_URL: string
    readonly VITE_ARBITRUM_RPC_URL: string
    readonly VITE_BASE_RPC_URL: string
    readonly VITE_OPTIMISM_RPC_URL: string
    readonly VITE_POLYGON_RPC_URL: string
  }
}

declare global {
  interface Window {
    Buffer: typeof import('buffer').Buffer
  }
}

export {}
