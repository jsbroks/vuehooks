import { inject } from '@vue/composition-api'
import { defaultCache, QueryCache } from './queryCache'

export function getQueryCache(name: string = 'cache'): QueryCache {
  return inject(name, defaultCache)
}
