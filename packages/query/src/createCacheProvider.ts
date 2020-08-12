import { provide } from '@vue/composition-api'
import { QueryCache, QueryCacheConfig } from './queryCache'

export default function createCacheProvider(
  config?: QueryCacheConfig & { name?: string }
) {
  const cache = new QueryCache(config)
  provide(config?.name ?? 'cache', cache)
}
