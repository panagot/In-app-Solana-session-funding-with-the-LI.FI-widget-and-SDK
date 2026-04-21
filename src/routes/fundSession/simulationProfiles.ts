export type SimKey = 'fast' | 'cheap' | 'balanced'

export type SimStep = { t: string; line: string }

export type SimProfile = {
  key: SimKey
  label: string
  badge: string
  intentPath: string
  headline: string
  sub: string
  routeChip: string
  steps: SimStep[]
  /** Shown in terminal after “execution” */
  receiptLines: string[]
  balancesAfter: { label: string; value: string; warn?: boolean; ok?: boolean }[]
  footnote: string
}

export const SIMULATION_PROFILES: Record<SimKey, SimProfile> = {
  fast: {
    key: 'fast',
    label: 'Fast',
    badge: 'Fewer hops',
    intentPath: '/terminal?intent=fundSolana',
    headline: 'Session funded — Base → Solana (speed)',
    sub: 'CCTP + Solana deposit in ~2 hops. Optimized for time-to-value inside the session.',
    routeChip: 'Base USDC → CCTP → Solana USDC',
    steps: [
      { t: '0.0s', line: 'LI.FI quote: 25 USDC → ~24.91 USDC min received on Solana' },
      { t: '0.4s', line: 'Route: Base USDC → Circle CCTP → Solana USDC (Jupiter dust sweep off)' },
      { t: '1.1s', line: 'Wallet: approve + deposit tx signed (Base)' },
      { t: '18s', line: 'Attestation minted — Solana receive tx confirmed' },
      { t: '22s', line: 'Session float updated — on-chain gate balance check: PASS' },
    ],
    receiptLines: [
      'status: SETTLED',
      'src_chain: Base (8453) · dst_chain: Solana',
      'tooling: LI.FI widget · integrator: solstice-terminal',
      'tx_sig_sol: 5rQs…9kVm (preview — not an on-chain tx)',
    ],
    balancesAfter: [
      { label: 'SOL', value: '0.024', ok: true },
      { label: 'Solana USDC', value: '14.28', ok: true },
      { label: 'Base USDC', value: '394.72' },
    ],
    footnote: 'Fast path prioritizes fewer hand-offs; fees may be slightly higher than “cheap”.',
  },
  cheap: {
    key: 'cheap',
    label: 'Cheap',
    badge: 'Save fees',
    intentPath: '/terminal?intent=bridgePreview',
    headline: 'Session funded — Ethereum → Solana (fee-aware)',
    sub: 'Longer finality, fewer bps paid. Good when the user is price-sensitive.',
    routeChip: 'Ethereum USDC → bridge stack → native SOL',
    steps: [
      { t: '0.0s', line: 'LI.FI quote: 0.02 ETH USDC → ~0.019 SOL min received' },
      { t: '0.6s', line: 'Route: Ethereum USDC → canonical bridge → Solana (wSOL unwrap implied)' },
      { t: '2.4s', line: 'Wallet: approve USDC + first hop (Ethereum)' },
      { t: '4m 12s', line: 'L1 confirmations complete — relay batch submitted' },
      { t: '6m 40s', line: 'Solana credit posted — swap dust to USDC for gate (Jupiter)' },
      { t: '7m 02s', line: 'Session gate satisfied with buffer SOL for fees' },
    ],
    receiptLines: [
      'status: SETTLED',
      'src_chain: Ethereum · dst_chain: Solana',
      'savings_vs_fast: ~12% fee estimate (preview)',
      'tx_sig_eth: 0x8a2…c4d1 (preview — not an on-chain tx)',
    ],
    balancesAfter: [
      { label: 'SOL', value: '0.031', ok: true },
      { label: 'Solana USDC', value: '11.05', ok: true },
      { label: 'Base USDC', value: '420.00' },
    ],
    footnote: 'Cheap path may wait longer for L1 finality; the user never leaves your surface.',
  },
  balanced: {
    key: 'balanced',
    label: 'Balanced',
    badge: 'Default',
    intentPath: '/terminal?intent=fundSolana',
    headline: 'Session funded — balanced LI.FI pick',
    sub: 'LI.FI compared 3 viable routes and chose the best overall score (fees × time × reliability).',
    routeChip: 'Base USDC → hybrid bridge + Solana USDC',
    steps: [
      { t: '0.0s', line: 'LI.FI multi-route scan: 3 quotes retained' },
      { t: '0.5s', line: 'Selected: Base USDC → LayerZero path → Solana USDC (score 0.92)' },
      { t: '1.0s', line: 'Wallet: single bundled approval where possible' },
      { t: '36s', line: 'Midpoint: funds viewable on explorer.li.fi' },
      { t: '48s', line: 'Solana USDC credited + auto top-up 0.012 SOL for fees' },
      { t: '52s', line: 'Client UI: “Continue” unlocked — Solana checks pass' },
    ],
    receiptLines: [
      'status: SETTLED',
      'route_score: 0.92 · hops: 3',
      'integrator: solstice-terminal',
      'user_visible_steps: 4 (preview)',
    ],
    balancesAfter: [
      { label: 'SOL', value: '0.022', ok: true },
      { label: 'Solana USDC', value: '12.60', ok: true },
      { label: 'Base USDC', value: '402.10' },
    ],
    footnote: 'Balanced is the best default when you serve games, media, SaaS, or mixed traffic — same widget, smarter routing.',
  },
}

export const SIM_KEYS: SimKey[] = ['fast', 'cheap', 'balanced']
