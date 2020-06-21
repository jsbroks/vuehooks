import { ref } from '@vue/composition-api'
import { useToggle } from './useToggle'

export function useOverflow() {
  const overflowX = ref(0)
  const overflowY = ref(0)

  const { on: overflowing } = useToggle(false)

  return { overflowX, overflowY, overflowing }
}
