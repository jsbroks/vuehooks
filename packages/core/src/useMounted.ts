import { onMounted, onUnmounted } from '@vue/composition-api'
import { useToggle } from './useToggle'

export function useMounted() {
  const { on, set } = useToggle(false)
  onMounted(() => set(true))
  onUnmounted(() => set(false))
  return on
}
