import { onMounted, onUnmounted } from '@vue/composition-api'
import { useCounter } from './useCounter'

export function useInterval(interval = 1000, now = true) {
  let timer: any = null
  const { count: counter, inc } = useCounter()

  const start = () => {
    stop()
    timer = setInterval(() => inc(), interval)
  }

  const stop = () => {
    if (!timer) return
    clearInterval(timer)
    timer = null
  }

  if (now) onMounted(start)
  onUnmounted(stop)

  return { counter, start, stop }
}
