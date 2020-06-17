import { onMounted, onUnmounted } from '@vue/composition-api'
import useToggle from './useToggle'
import { hasWindow } from './utils'

export function useMediaQuery(query: string) {
  let mediaQuery!: MediaQueryList

  // try to fetch initial value (avoid SSR issues)
  if (hasWindow()) mediaQuery = window.matchMedia(query)

  const { on: matches, set } = useToggle(
    mediaQuery ? mediaQuery.matches : false
  )
  const mediaEvent = (event: MediaQueryListEvent) => set(event.matches)

  onMounted(() => {
    if (!mediaQuery) mediaQuery = window.matchMedia(query)
    set(mediaQuery.matches)
    mediaQuery.addListener(mediaEvent)
  })

  onUnmounted(() => {
    mediaQuery.removeListener(mediaEvent)
  })

  return matches
}
