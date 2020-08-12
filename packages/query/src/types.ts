import { ComputedRef, Ref } from '@vue/composition-api'
import { Query, QueryStatus } from './query'

/**
 * Query Results
 */

export interface BaseQueryResult<TResult, TError = unknown> {
  status: Ref<QueryStatus>

  isLoading: ComputedRef<boolean>
  isSuccess: ComputedRef<boolean>
  isError: ComputedRef<boolean>

  staleTime?: number
  cacheTime?: number

  failureCount?: number
  updatedAt?: Date
  query: Query<TResult, TError>

  // refetch: () => Promise<void>
  // clear: () => void
}

export interface QueryResult<TResult, TError = unknown>
  extends BaseQueryResult<TResult, TError> {
  data: Ref<TResult | undefined>
  error: Ref<TError | undefined>
}
