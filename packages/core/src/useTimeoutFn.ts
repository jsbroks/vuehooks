import { watch } from '@vue/composition-api'
import { useTimeout } from './useTimeout'

export function useTimeoutFn(fn: (...args: any[]) => any, ms: number) {
  const { ready, start, stop } = useTimeout(ms)
  watch(ready, ready => ready && fn())
  return { ready, start, stop }
}
