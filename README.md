# Solstice Terminal

> **In-app funding for Solana sessions.** Keep users on your screen while LI.FI routes value onto Solana for fees, USDC paywalls, and checkouts. Built for the **LI.FI × Solana Frontier** track.

[![Live demo](https://img.shields.io/badge/demo-live-22c55e?style=flat-square&logo=vercel&logoColor=white)](https://in-app-solana-session-funding-with.vercel.app/)
[![Mainnet](https://img.shields.io/badge/network-mainnet-0ea5e9?style=flat-square)](https://in-app-solana-session-funding-with.vercel.app/terminal)
[![Non-custodial](https://img.shields.io/badge/wallets-non--custodial-475569?style=flat-square)](#)
[![License: MIT](https://img.shields.io/badge/license-MIT-94a3b8?style=flat-square)](#license)

---

## TL;DR

Solana apps need SOL or USDC on-chain, but users often hold spendable balance on Base, Ethereum, or elsewhere. Sending them to a generic bridge tab breaks the session. Embed **LI.FI** for a short *"fund this visit"* step and they land back on the same surface with balances that meet your checks.

The same pattern fits **games, video products, memberships, creator tools,** and any Solana-first web app.

---

## What's wired up

| Surface | Lives on | What it proves |
|---|---|---|
| **Live LiFiWidget** | `/terminal` | Real `LiFiWidget` with wallet signing, Solana-first **quick intents**, shareable `?intent=` URLs, copy-link in the sidebar. |
| **LI.FI SDK** | `/?tab=lifi` | `getChains` + `getTools` calls power live index stats and an ecosystem chart, the same calls you would use for production telemetry. |
| **Fund-session preview** | `/` (Home) | **Neon Drift**, a fictional surface with preview balances and simulated execution logs, showing where the pattern fits next to a gate or paywall. |

> **Non-custodial by design.** LI.FI surfaces routes; the user's wallet always signs.

---

## Verify in 60 seconds

**Open these deep links to see each integration surface:**

- Live widget, pre-filled Solana intent: <https://in-app-solana-session-funding-with.vercel.app/terminal?intent=fundSolana>
- Live SDK index (chains, tools, ecosystem chart): <https://in-app-solana-session-funding-with.vercel.app/?tab=lifi>
- Fund-session preview pattern (Neon Drift): <https://in-app-solana-session-funding-with.vercel.app/>

**Where to look in source:**

| What | File |
|---|---|
| `LiFiWidget` config + integrator | [`src/features/lifi/LiFiTerminal.tsx`](src/features/lifi/LiFiTerminal.tsx) |
| Quick intents and route presets | [`src/features/lifi/widgetBaseConfig.ts`](src/features/lifi/widgetBaseConfig.ts) |
| LI.FI SDK calls (`getChains`, `getTools`) | [`src/features/lifi/useLifiStats.ts`](src/features/lifi/useLifiStats.ts) |
| SDK consumed in UI (stats + chart) | [`src/routes/OverviewPanel.tsx`](src/routes/OverviewPanel.tsx) |
| Fund-session preview surface | [`src/routes/FundSessionDemo.tsx`](src/routes/FundSessionDemo.tsx) |

**Widget intents in this repo:** `fundSolana`, `exitSolana`, `solSwap`, `bridgePreview` (see the `/terminal` sidebar).

---

## Walk through the live app

1. Open **[Home](https://in-app-solana-session-funding-with.vercel.app/) → Fund session**. Read the hero, the segmented tabs, and the three-step strip.
2. Scroll to **Neon Drift** (preview). Open **Fund session…**, optionally **Simulate success**, then **Open in terminal**.
3. On **Terminal**, connect a wallet, confirm the pre-filled intent in the widget, optionally cross-check on **LI.FI Explorer**.
4. Back on **Home**, open the **LI.FI** tab ([`/?tab=lifi`](https://in-app-solana-session-funding-with.vercel.app/?tab=lifi)) for SDK-backed index tiles and the ecosystem chart.

---

## Stack

`React 19` · `Vite` · `TypeScript` · `Tailwind CSS` · [`@lifi/widget`](https://www.npmjs.com/package/@lifi/widget) · [`@lifi/sdk`](https://www.npmjs.com/package/@lifi/sdk) · `TanStack Query` · `Recharts` · `lucide-react` · `framer-motion` · `Vercel`

---

## Links

| Item | URL |
|---|---|
| **Live demo** | <https://in-app-solana-session-funding-with.vercel.app/> |
| **Source** | <https://github.com/panagot/In-app-Solana-session-funding-with-the-LI.FI-widget-and-SDK> |
| **LI.FI docs** | <https://docs.li.fi> |
| **LI.FI Solana overview** | <https://docs.li.fi/introduction/lifi-architecture/solana-overview> |
| **Env reference** | [.env.example](.env.example) (forks or redeploys) |

---

## Deploy configuration

Set **`VITE_LIFI_INTEGRATOR`** on the host (required for attribution).

Adding **`VITE_LIFI_API_KEY`** and Solana **RPC URLs** helps avoid empty or slow index data under load. See [LI.FI rate limits](https://docs.li.fi/api-reference/rate-limits) and [`.env.example`](.env.example) for the full reference.

---

## License

MIT.
