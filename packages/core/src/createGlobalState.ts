import { reactive } from '@vue/composition-api'

export function createGlobalState<T extends object>(state: () => T) {
  const global = reactive(state())
  return () => global
}
