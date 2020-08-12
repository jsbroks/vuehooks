import { Ref, ref } from '@vue/composition-api'
import { useEvent } from './useEvent'
import { getXY } from './useMouse'

export function useMouseInElement(target: Ref<HTMLElement | null>) {
  const x = ref(0)
  const y = ref(0)

  const elementX = ref(0)
  const elementY = ref(0)
  const elementPositionX = ref(0)
  const elementPositionY = ref(0)
  const elementWidth = ref(0)
  const elementHeight = ref(0)
  const isInside = ref(false)

  const move = (event: MouseEvent | TouchEvent) => {
    const el: HTMLElement = target.value!
    const { left, top, width, height } = el.getBoundingClientRect()

    const [newX, newY] = getXY(event)

    x.value = newX
    y.value = newY

    elementPositionX.value = left + window.pageXOffset
    elementPositionY.value = top + window.pageYOffset
    elementHeight.value = height
    elementWidth.value = width
  }

  useEvent(target, 'mousemove', move)
  useEvent(target, 'touchmove', move)

  return {
    x,
    y,
    elementX,
    elementY,
    elementPositionX,
    elementPositionY,
    elementWidth,
    elementHeight,
    isInside
  }
}
