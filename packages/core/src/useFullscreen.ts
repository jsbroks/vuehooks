import { Ref, ref } from '@vue/composition-api'
import { useToggle } from './useToggle'

export function useFullscreen(target: Ref<HTMLElement> = ref(document.body)) {
  const { on: isFullscreen, set } = useToggle(false)
  const exit = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    set(false)
  }

  const enter = () => {
    exit()
    if (!target.value) return
    target.value.requestFullscreen().then(() => set(true))
  }

  return { isFullscreen, enter, exit }
}
