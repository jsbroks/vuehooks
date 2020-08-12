import { computed, onMounted, onUnmounted, ref } from '@vue/composition-api'
import { QueryConfig, QueryStatus, SubscriptionHandler } from './query'
import { QueryKey } from './queryKey'
import { QueryResult } from './types'
import { getQueryCache } from './getQueryCache'

export function useBaseQuery<TResult, TError = unknown>(
  key: QueryKey,
  config: QueryConfig<TResult, TError> = {}
): QueryResult<TResult, TError> {
  const cache = getQueryCache()

  const query = cache.query<TResult, TError>(key, config)
  const data = ref<TResult>()
  const error = ref<TError>()
  const status = ref(query.state.status)

  const handler: SubscriptionHandler<TResult, TError> = state => {
    data.value = state.data
    error.value = state.error
    status.value = status.value
  }

  onMounted(() => query.subscribe(handler))
  onUnmounted(() => query.unsubscribe(handler))

  query.fetch()

  const isLoading = computed(() => status.value === QueryStatus.Loading)
  const isError = computed(() => status.value === QueryStatus.Error)
  const isSuccess = computed(() => status.value === QueryStatus.Success)

  return {
    data,
    error,
    status,
    isError,
    isLoading,
    isSuccess,
    query
  }
}
