import { ref, computed, watch } from '@vue/composition-api'

import { useRouter } from './useRouter'

export function useParam(key: string, defaultValue = '') {
  const { route, router } = useRouter()

  const param = ref(defaultValue)
  watch<any, true>(`route.params.${key}`, (val: string) => (param.value = val))

  return {
    [key]: computed({
      get: () => param.value,
      set: v => router.push({ query: { ...route.query, [key]: v } })
    })
  }
}
