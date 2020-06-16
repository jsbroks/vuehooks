import { watch } from '@vue/composition-api'
import { useTimeout } from './useTimeout'

export function useTimeoutFn(
  fn: (...args: any[]) => any,
  ms: number,
  ...args: any[]
) {
  const { ready, start, stop } = useTimeout(ms)
  watch(ready, ready => ready && fn(...args))
  return { ready, start, stop }
}
