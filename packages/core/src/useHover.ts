import { Ref } from '@vue/composition-api'
import { useEvent } from './useEvent'
import { useToggle } from './useToggle'

export function useHover(target: Ref<HTMLElement | null>) {
  const { on: hovering, set } = useToggle(false)

  useEvent(target, 'mouseenter', () => set(true))
  useEvent(target, 'mouseleave', () => set(false))

  return hovering
}
