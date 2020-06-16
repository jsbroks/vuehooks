import { useEventListener } from '.'
import { useTimeoutFn } from './useTimeoutFn'

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

  useEventListener('mousedown', startEvent)
  useEventListener('mouseup', stopEvent)

  useEventListener('touchstart', startEvent)
  useEventListener('touchend', stopEvent)

  return { start, stop }
}
