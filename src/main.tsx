import { Buffer } from 'buffer'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createConfig as createLifiSdkConfig } from '@lifi/sdk'
import './index.css'
import '@mysten/dapp-kit/dist/index.css'
import { AppProviders } from './app/providers/AppProviders'
import { App } from './App'

if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

createLifiSdkConfig({
  integrator: import.meta.env.VITE_LIFI_INTEGRATOR ?? 'SolsticeTerminal',
  apiKey: import.meta.env.VITE_LIFI_API_KEY,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
