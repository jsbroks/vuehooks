import { ref } from '@vue/composition-api'
import { hasWindow } from './utils'
import { useWindowEvent } from './useWindowEvent'

export function useWindowSize() {
  const width = ref(Infinity)
  const height = ref(Infinity)

  const set = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  if (hasWindow()) set()
  useWindowEvent('resize', set)

  return { width, height }
}
