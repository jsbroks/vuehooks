import { Query, QueryConfig } from './query'

import {
  defaultQueryKeySerializerFn,
  QueryKey,
  QueryKeySerializerFunction
} from './queryKey'

export interface QueryCacheConfig {
  queryKeySerializerFn: QueryKeySerializerFunction
}

export type QueryHashMap = { [hash: string]: Query<any, any> }

export class QueryCache {
  queries: QueryHashMap
  config: QueryCacheConfig

  constructor(config?: QueryCacheConfig) {
    this.config = config ?? {
      queryKeySerializerFn: defaultQueryKeySerializerFn
    }
    this.queries = {}
  }

  query<TResult, TError>(
    userQueryKey: QueryKey,
    queryConfig: QueryConfig<TResult, TError> = {}
  ) {
    let query
    const [queryHash, queryKey] = this.config.queryKeySerializerFn(userQueryKey)
    const cachedQuery = this.queries[queryHash]

    if (cachedQuery) query = cachedQuery as Query<TResult, TError>

    if (!query) {
      query = new Query<TResult, TError>({
        queryKey,
        queryHash,
        config: queryConfig
      })

      this.queries[queryHash] = query
    }

    return query
  }

  getQuery<TResult, TError = unknown>(
    key: QueryKey
  ): Query<TResult, TError> | undefined {
    const [queryHash] = this.config.queryKeySerializerFn(key)
    return this.queries[queryHash]
  }

  getQueries<TResult = unknown, TError = unknown>(): Query<TResult, TError>[] {
    return Object.values(this.queries)
  }
}

export default function makeCache(): QueryCache {
  return new QueryCache()
}

export const defaultCache = makeCache()
