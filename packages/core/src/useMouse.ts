import { ref } from '@vue/composition-api'
import { useEventListener } from './useEventListener'

interface Options {
  initial?: { x: number; y: number }
}

export const getXY = (event: MouseEvent | TouchEvent): [number, number] => {
  let x: number, y: number

  const isTouchEvent = event instanceof TouchEvent

  if (isTouchEvent) {
    event = event as TouchEvent
    x = event.touches[0].clientX
    y = event.touches[0].clientY

    return [x, y]
  }

  event = event as MouseEvent
  return [event.pageX, event.pageY]
}

export function useMouse({ initial = { x: 0, y: 0 } }: Options = {}) {
  const x = ref(initial.x)
  const y = ref(initial.y)

  const set = (event: TouchEvent | MouseEvent) => {
    const [newX, newY] = getXY(event)
    x.value = newX
    y.value = newY
  }

  useEventListener('mousemove', set)
  useEventListener('touchmove', set)

  return { x, y }
}
