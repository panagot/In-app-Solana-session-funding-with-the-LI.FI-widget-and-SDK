import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getChains, getTools, ChainType } from '@lifi/sdk'

export function useLifiStats() {
  const chainsQuery = useQuery({
    queryKey: ['lifi', 'chains'],
    queryFn: () => getChains(),
    staleTime: 5 * 60_000,
    retry: 2,
    placeholderData: keepPreviousData,
  })

  const toolsQuery = useQuery({
    queryKey: ['lifi', 'tools'],
    queryFn: () => getTools(),
    staleTime: 5 * 60_000,
    retry: 2,
    placeholderData: keepPreviousData,
  })

  const chainSummary = summarizeChains(chainsQuery.data)
  const toolSummary = summarizeTools(toolsQuery.data)

  return {
    chainsQuery,
    toolsQuery,
    chainSummary,
    toolSummary,
  }
}

function summarizeChains(chains: Awaited<ReturnType<typeof getChains>> | undefined) {
  if (!chains?.length) {
    return {
      total: 0,
      evm: 0,
      svm: 0,
      utxo: 0,
      mvm: 0,
    }
  }
  let evm = 0
  let svm = 0
  let utxo = 0
  let mvm = 0
  for (const c of chains) {
    if (c.chainType === ChainType.EVM) evm++
    else if (c.chainType === ChainType.SVM) svm++
    else if (c.chainType === ChainType.UTXO) utxo++
    else if (c.chainType === ChainType.MVM) mvm++
  }
  return { total: chains.length, evm, svm, utxo, mvm }
}

function summarizeTools(tools: Awaited<ReturnType<typeof getTools>> | undefined) {
  if (!tools) {
    return { bridges: 0, exchanges: 0 }
  }
  return {
    bridges: tools.bridges?.length ?? 0,
    exchanges: tools.exchanges?.length ?? 0,
  }
}
