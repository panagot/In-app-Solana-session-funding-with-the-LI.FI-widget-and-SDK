# Solstice Terminal

**In-app funding for Solana sessions:** keep users on your screen while LI.FI moves value onto Solana (fees, USDC gates, checkouts). Built for the **LI.FI × Solana Frontier** track.

---

## Overview

1. **Problem:** Solana apps need SOL or USDC on-chain, but users often hold spendable balance on Base, Ethereum, or elsewhere. Sending them to a generic bridge tab breaks the session.
2. **Approach:** Embed **LI.FI** in your UI as a short **“fund this visit”** step, then bring them back to the same surface with balances that pass your checks.
3. **LI.FI integration:** the **LiFiWidget** on **Terminal** is the live execution surface; the **LI.FI SDK** (`getChains`, `getTools`) powers the **LI.FI** tab with live index data. Quick intents use **`?intent=`** in the URL so presets are **shareable** (use **Copy shareable terminal link** in the terminal sidebar).
4. **Demo layout:** **Home** uses **Neon Drift**, a fictional surface with **preview** balances and simulated logs to show the *pattern*. **Terminal** is the **real widget** with wallet signing.

---

## LI.FI integration (at a glance)

| Capability | In this project |
|------------|-----------------|
| **Inbound to Solana** | Main flow: fund the session on Solana without leaving the host app. |
| **Cross-chain swaps** | Same **LiFiWidget** supports swaps and exits across routes LI.FI aggregates. |
| **SDK** | Live **chains + tools** stats and ecosystem chart on **Home → LI.FI** (`/?tab=lifi`). |

---

## Walk through the live app

| Step | What to do |
|------|------------|
| 1 | Open **[Live app](https://in-app-solana-session-funding-with.vercel.app/)** → **Home** → **Fund session** tab. Read the sidebar tagline and the three-step strip next to the tabs. |
| 2 | Scroll to **Neon Drift** (preview). Open **Fund session…**, optionally **Simulate success**, then **Open in terminal** (or use quick intents on **Terminal**). |
| 3 | On **Terminal**, connect a wallet in the widget, confirm pre-filled route intent, use **LI.FI Explorer** if you want to cross-check routes off-site. |
| 4 | Back on **Home**, open the **LI.FI** tab (`/?tab=lifi`) for SDK-backed index tiles and chart. |

**Widget intents in this repo:** `fundSolana`, `exitSolana`, `solSwap`, `bridgePreview`.

---

## Links

| Item | URL |
|------|-----|
| **Live demo** | [Vercel](https://in-app-solana-session-funding-with.vercel.app/) |
| **Source** | [GitHub](https://github.com/panagot/In-app-Solana-session-funding-with-the-LI.FI-widget-and-SDK) |
| **Env reference** | [.env.example](.env.example) (forks or redeploys) |

---

## Deploy configuration

Set **`VITE_LIFI_INTEGRATOR`** on the host (required for attribution). Adding **`VITE_LIFI_API_KEY`** and **RPC URLs** helps avoid empty or slow index data under load; see [rate limits](https://docs.li.fi/api-reference/rate-limits).

MIT.
