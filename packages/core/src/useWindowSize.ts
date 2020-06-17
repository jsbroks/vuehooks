import { ref } from '@vue/composition-api'
import { hasWindow } from './utils'
import { useEventListener } from './useEventListener'

export function hasWindowSize() {
  const width = ref(Infinity)
  const height = ref(Infinity)

  const set = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  if (hasWindow()) set()
  useEventListener('resize', set)

  return { width, height }
}
