import { Ref, watch } from '@vue/composition-api'

/**
 * Use this over `useEventListener `if you would like the events to stop if the
 * target element is removed.
 *
 * @remarks
 * If you are unsure which to use, then `useEventListener`
 *
 * @param target element that will be watched for removal
 * @param type event string
 * @param listener function called when even occurs
 * @param options additional event listener options
 */
export function useEventListenerElement<K extends keyof HTMLElementEventMap>(
  target: Ref<HTMLElement | null>,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  watch(
    target,
    (el, __, onInvalidate) => {
      if (!el) return
      el.addEventListener(type, listener, options)

      onInvalidate(() => {
        el.removeEventListener(type, listener, options)
      })
    },
    { immediate: true }
  )
}
