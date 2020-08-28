import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import { hasWindow, timestamp } from './utils'

export function useNow() {
  const now = ref(timestamp())
  // const useRaf = refreshMs === 0

  let stopped = false
  // const interval = useInterval

  const update = () =>
    requestAnimationFrame(() => {
      now.value = timestamp()
      if (!stopped) update()
    })

  const stop = () => (stopped = true)
  const start = () => {
    if (!stopped) return
    stopped = false
    update()
  }

  if (hasWindow()) start()
  else onMounted(start)

  onUnmounted(() => stop())

  return now
}
