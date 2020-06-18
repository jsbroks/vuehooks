import { useTimeoutFn } from './useTimeoutFn'
import { useWindowEvent } from './useWindowEvent'

interface Options {
  preventDefault?: boolean
  delay?: number
}

export function useLongPress(
  callback: (e: TouchEvent | MouseEvent) => void,
  { preventDefault = true, delay = 300 }: Options = {}
) {
  const { stop, start } = useTimeoutFn(callback, delay)

  const startEvent = (event: TouchEvent | MouseEvent) => {
    if (preventDefault) event.preventDefault()
    start()
  }

  const stopEvent = (event: TouchEvent | MouseEvent) => {
    if (preventDefault) event.preventDefault()
    stop()
  }

  useWindowEvent('mousedown', startEvent)
  useWindowEvent('mouseup', stopEvent)

  useWindowEvent('touchstart', startEvent)
  useWindowEvent('touchend', stopEvent)

  return { start, stop }
}
