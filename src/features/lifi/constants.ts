import { ChainId } from '@lifi/sdk'

/** Canonical LI.FI chain id for Solana mainnet */
export const SOLANA_CHAIN_ID = ChainId.SOL

/** LI.FI native SOL sentinel (system program id as token address) */
export const SOL_NATIVE = '11111111111111111111111111111111'

export const WSOL_MINT = 'So11111111111111111111111111111111111111112'

/** Native USDC on Solana (SPL) */
export const SOLANA_USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'

export const BASE_USDC = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'

export const ARBITRUM_USDC = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'

export const INTEGRATOR =
  import.meta.env.VITE_LIFI_INTEGRATOR ?? 'SolsticeTerminal'
