import { useEvent } from './useEvent'

export function useWindowEvent<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  return useEvent(window, type, listener, options)
}
