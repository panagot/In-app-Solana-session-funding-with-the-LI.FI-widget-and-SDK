# AI review packet (Grok · ChatGPT · DeepSeek)

Copy **everything below the line** into a new chat. Replace nothing unless your live URL differs.

---

## Context

**Product:** Solstice Terminal — a Vite + React demo for **in-app Solana session funding** using the **LI.FI widget and SDK** (Frontier / hackathon-style build).

**What it is *not*:** We are **not** claiming an ephemeral “session wallet” or account abstraction unless we add it later. The story is: **your app needs SOL/USDC on Solana for this visit; the user’s spending money may be on Base, Ethereum, etc.; you embed LI.FI so they fund without leaving your surface.**

**Live site:** https://in-app-solana-session-funding-with.vercel.app/

**Repo:** https://github.com/panagot/In-app-Solana-session-funding-with-the-LI.FI-widget-and-SDK

**Recent changes (for second-pass reviews):** Home hero + 3-step strip; tab subtitles **Pattern preview** / **Live index** + `aria-label`s; **Preview** balances (not “mock”); Terminal **continuity** via `location.state.fromFundDemo`; modal **focus trap**; 44px touch targets; **LiFiWidget** card **non-custodial** trust strip + docs link; plain-English **Neon Drift** gate copy; execution previews labeled **preview**; README **Hackathon submission** table; `index.html` **SEO/OG** copy; `vercel.json` security headers.

**Routes to know:** `/` (Home: tabs **Fund session** | **LI.FI**), `/terminal` (widget + quick intents, `?intent=fundSolana` etc.), plus `/support`, `/flows`, `/liquidity-map` as linked from the app shell.

---

## Instructions

1. Open the **live URL** (or say if you cannot browse, and ask for screenshots).
2. Treat this as a **product + UX + frontend** review for a **shipping demo**, not a whitepaper.
3. Be **specific**: name the **page**, **section**, and **repro steps** when you find an issue.
4. Prefer **actionable** outputs: exact copy rewrites (before → after), layout notes (“move X above Y”), or **P0 / P1 / P2** with effort (S/M/L).
5. Do **not** invent features we did not ship; if something is unclear, say **“unclear from the site”** instead of guessing.

---

## Deliverables (answer all sections)

### A) First 10 seconds

- What does this site **sell** in one sentence?
- Who is the **primary audience**?
- What is still **confusing** after one scroll of Home?

### B) Home (`/`)

- Is the **hero + 3 steps** honest and clear? Any redundancy or jargon left?
- Do **Fund session** vs **LI.FI** tabs make sense? One alternative IA if not.
- Any **mobile** issues (overflow, tap targets, readability)?

### C) Fund session demo (Neon Drift card)

- Does **“Preview”** read better than “Mock”? Any remaining **trust** friction?
- Is the **footer** explanation of session-native funding + LI.FI helpful or too long?
- **Modal:** focus order, Escape, tab trap — anything still broken?

### D) Terminal (`/terminal`, try `?intent=fundSolana` and `?intent=bridgePreview`)

- Does the **continuity banner** (when coming from Home/demo with handoff state) help, or feel redundant?
- When opening **only** with `?intent=` (no handoff state), is the **preset banner** enough?
- Does the page **prove** LI.FI (quotes, routes, widget) vs only **tell**? What’s still missing for a skeptical engineer?

### E) LI.FI tab (`/?tab=lifi`)

- Does it support the story or feel disconnected?
- Any **empty / error** states you’d improve?

### F) Accessibility

- List **up to 10** concrete fixes (element + issue + fix), only what you can infer from the UI or from reasonable SPA patterns.

### G) Security & production (high level)

- What would you **verify** on this stack (Vite SPA, client env vars, wallet connect, third-party widget) **without** claiming you inspected our HTTP headers unless you did?
- Call out **CSP / X-Frame-Options** tradeoffs for embedded widgets if relevant.

### H) Prioritized backlog

- **P0** (must fix before showing judges)
- **P1** (should fix)
- **P2** (nice to have)

### I) Optional extras

- **One** tweet-length pitch (≤280 characters).
- **One** paragraph for a GitHub repo **Description** field (≤350 characters).

---

## Sanity checks (please answer briefly)

1. True or false: **Default route `/` is the terminal.** (Hint: it should be **false**.)
2. True or false: **We use an ephemeral session wallet by default.** (Hint: should be **false** unless you see explicit product evidence.)

---

_End of packet — paste everything from “## Context” through the sanity checks._
