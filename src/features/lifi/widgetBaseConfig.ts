import type { WidgetConfig } from '@lifi/widget'
import { createTheme } from '@lifi/widget'
import { ChainId, ChainType } from '@lifi/sdk'
import {
  ARBITRUM_USDC,
  BASE_USDC,
  SOLANA_CHAIN_ID,
  SOLANA_USDC,
  SOL_NATIVE,
  WSOL_MINT,
} from './constants'

function rpcUrls() {
  const sol = import.meta.env.VITE_SOLANA_RPC_URL
  const eth = import.meta.env.VITE_ETHEREUM_RPC_URL
  const arb = import.meta.env.VITE_ARBITRUM_RPC_URL
  const bas = import.meta.env.VITE_BASE_RPC_URL
  const opt = import.meta.env.VITE_OPTIMISM_RPC_URL
  const pol = import.meta.env.VITE_POLYGON_RPC_URL

  return {
    ...(sol ? { [ChainId.SOL]: [sol] } : {}),
    ...(eth ? { [ChainId.ETH]: [eth] } : {}),
    ...(arb ? { [ChainId.ARB]: [arb] } : {}),
    ...(bas ? { [ChainId.BAS]: [bas] } : {}),
    ...(opt ? { [ChainId.OPT]: [opt] } : {}),
    ...(pol ? { [ChainId.POL]: [pol] } : {}),
  }
}

const terminalWidgetTheme = createTheme({
  container: {
    borderRadius: 12,
    border: '1px solid rgba(0, 0, 0, 0.08)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
    maxWidth: '100%',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#0071e3' },
        secondary: { main: '#6e6e73' },
        background: { default: '#fbfbfd', paper: '#ffffff' },
      },
    },
  },
})

export function getBaseWidgetConfig(): Omit<WidgetConfig, 'integrator'> {
  return {
    apiKey: import.meta.env.VITE_LIFI_API_KEY,
    variant: 'wide',
    appearance: 'light',
    theme: terminalWidgetTheme,
    buildUrl: true,
    chains: {
      types: {
        allow: [ChainType.EVM, ChainType.SVM, ChainType.UTXO, ChainType.MVM],
      },
    },
    sdkConfig: {
      rpcUrls: rpcUrls(),
    },
  }
}

export type QuickIntentId =
  | 'fundSolana'
  | 'exitSolana'
  | 'solSwap'
  | 'bridgePreview'

export const QUICK_INTENT_IDS: QuickIntentId[] = [
  'fundSolana',
  'exitSolana',
  'solSwap',
  'bridgePreview',
]

export function parseQuickIntentParam(value: string | null | undefined): QuickIntentId | null {
  if (!value) return null
  return QUICK_INTENT_IDS.includes(value as QuickIntentId) ? (value as QuickIntentId) : null
}

export function getPresetForIntent(id: QuickIntentId): Partial<WidgetConfig> {
  switch (id) {
    case 'fundSolana':
      return {
        fromChain: ChainId.BAS,
        toChain: SOLANA_CHAIN_ID,
        fromToken: BASE_USDC,
        toToken: SOLANA_USDC,
        fromAmount: 25,
        formUpdateKey: String(Date.now()),
      }
    case 'exitSolana':
      return {
        fromChain: SOLANA_CHAIN_ID,
        toChain: ChainId.ARB,
        fromToken: SOLANA_USDC,
        toToken: ARBITRUM_USDC,
        fromAmount: 25,
        formUpdateKey: String(Date.now()),
      }
    case 'solSwap':
      return {
        fromChain: SOLANA_CHAIN_ID,
        toChain: SOLANA_CHAIN_ID,
        fromToken: SOLANA_USDC,
        toToken: WSOL_MINT,
        fromAmount: 10,
        formUpdateKey: String(Date.now()),
      }
    case 'bridgePreview':
      return {
        fromChain: ChainId.ETH,
        toChain: SOLANA_CHAIN_ID,
        fromToken: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        toToken: SOL_NATIVE,
        fromAmount: 0.02,
        formUpdateKey: String(Date.now()),
      }
    default:
      return { formUpdateKey: String(Date.now()) }
  }
}
