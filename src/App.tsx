import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './routes/HomePage'
import { TerminalPage } from './routes/TerminalPage'
import { LiquidityMap } from './routes/LiquidityMap'
import { Flows } from './routes/Flows'
import { Support } from './routes/Support'

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/overview" element={<Navigate to={{ pathname: '/', search: 'tab=lifi' }} replace />} />
        <Route path="/terminal" element={<TerminalPage />} />
        <Route path="/liquidity-map" element={<LiquidityMap />} />
        <Route path="/flows" element={<Flows />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
