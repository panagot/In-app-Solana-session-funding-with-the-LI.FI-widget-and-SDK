# Solstice Terminal

## Proposal

Let people stay inside your product while you move liquidity onto Solana in the same session—so they can keep playing, watching, browsing, or checking out—without leaving for a bridge site or another tab.

"Session-native funding" with LI.FI: when your experience needs Solana-native balances (fees, USDC for a gate, in-app purchases, etc.) but the user's spending money sits on another chain (often an L2 like Base, or Ethereum, etc.), you embed LI.FI in your UI. You surface a short "fund this session" flow next to the moment of need; LI.FI handles quotes, route selection, and execution; the user returns to the same surface with balances that satisfy your rules.

Solana-first **liquidity terminal** for the LI.FI Frontier / Colosseum track. **Home** opens with **Fund session**
first: a reusable “top up this visit on Solana” pattern illustrated with the fictional **Neon Drift** surface—the
same flow applies to games, video or live experiences, membership web apps, creator tools, and other products where
users need on-chain float without leaving your UI. The **LI.FI** tab holds live index stats, charts, and narrative.
**Navigation is sidebar-only** on desktop (plus a slim mobile bar: menu · title · Docs); all in-app routes live in the
left rail — no duplicate top link row.

## Quick start

```bash
cp .env.example .env
# On Windows, if postinstall scripts fail (optional native hooks), use:
npm install --ignore-scripts

# Vite 8 / Rolldown may require an explicit protobuf subpath:
# (@protobufjs/aspromise is already listed in package.json)
npm run dev
```

Open the URL Vite prints (often `http://localhost:5173`; another process may bump the port).

## Environment

See [.env.example](.env.example). At minimum set `VITE_LIFI_INTEGRATOR`. For reliable Solana
simulation and balances in the widget, add `VITE_SOLANA_RPC_URL` and major EVM RPC URLs.

## 60-second judge script

1. **Home → Fund session** — use **Fund session…**, pick a path; you should land on `/terminal?intent=…`
   with the matching quick intent. Old `/demo.html` links redirect to `/`.
2. **Home → LI.FI tab** (or `/?tab=lifi`, or `/overview`) — confirm live stat tiles populate (chains +
   tools from LI.FI APIs) and the ecosystem chart renders.
3. **Execution terminal** — try **Fund Solana** or `/terminal?intent=bridgePreview`; connect a wallet
   when prompted and confirm the widget pre-fills the expected chains and tokens.
4. **Reset to widget defaults** — clears the preset and removes `?intent=` from the URL while keeping
   the light shell and your integrator string.
5. **Liquidity map** — review the SVG architecture and Solana identifier callouts (`chainId`,
   native SOL sentinel, wSOL mint).
6. **Integration** (under Product in the sidebar) — confirm integrator string and links to official LI.FI documentation.
7. **Risk & support** — skim operational risks and outbound support links.

Supported `intent` values: `fundSolana`, `exitSolana`, `solSwap`, `bridgePreview`.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS
- LI.FI Widget + SDK · Wagmi v2 · Solana wallet adapter · Mysten dapp-kit · Bigmi (Bitcoin)

## Deploy (Vercel)

1. Connect the repository to Vercel.
2. Add the same environment variables as in `.env.example`.
3. Framework preset: Vite. Output: `dist`.
4. SPA routing is handled by [vercel.json](vercel.json) (explicit app routes only so `/demo.html`,
   `/assets/*`, and other static files are not rewritten to the SPA shell).

## License

MIT — demo code for hackathon submission.
