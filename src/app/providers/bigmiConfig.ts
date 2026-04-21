import { createConfig, phantom, unisat, xverse } from '@bigmi/client'
import { bitcoin, createClient, http } from '@bigmi/core'
import type { Config } from '@bigmi/client'

export const bigmiConfig = createConfig({
  chains: [bitcoin],
  connectors: [phantom(), unisat(), xverse()],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
}) as Config
