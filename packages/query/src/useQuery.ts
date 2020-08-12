import { getQueryArgs } from './getQuery'
import { QueryConfig, QueryFunction } from './query'
import { QueryKey } from './queryKey'
import { QueryResult } from './types'
import { useBaseQuery } from './useBaseQuery'

export function useQuery<TResult, TError>(
  key: QueryKey,
  config?: QueryConfig<TResult, TError>
): QueryResult<TResult, TError>

export function useQuery<TResult, TError>(
  key: QueryKey,
  queryFn: QueryFunction<TResult>
): QueryResult<TResult, TError>

export function useQuery<TResult, TError>(
  ...args: any[]
): QueryResult<TResult, TError> {
  const [queryKey, config] = getQueryArgs<TResult, TError>(args)
  return useBaseQuery(queryKey, config)
}
