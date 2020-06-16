import { ref, computed, watch } from '@vue/composition-api'

import { useRouter } from './useRouter'

export function useQuery(key: string, defaultValue: string = '') {
  const { route, router } = useRouter()

  const query = ref(defaultValue)
  watch<any, true>(`route.query.${key}`, (val: string) => (query.value = val))

  return {
    [key]: computed({
      get: () => query.value,
      set: v => router.push({ query: { ...route.query, [key]: v } })
    })
  }
}
