import { Ref } from '@vue/composition-api'
import { useEventListenerElement } from './useEventListenerElement'
import useToggle from './useToggle'

export function useHover(target: Ref<HTMLElement | null>) {
  const { on: hovering, set } = useToggle(false)

  useEventListenerElement(target, 'mouseenter', () => set(true))
  useEventListenerElement(target, 'mouseleave', () => set(false))

  return hovering
}
