import { RefElement, MaybeRef } from './utils/typings'
import { ref, watch, onUnmounted, Ref } from '@vue/composition-api'
import {
  Emitter,
  EmitterHandler,
  EmitterWildcardHandler
} from './utils/emitter'
import { noop } from './utils/operations'

export function useEvent<K extends keyof WindowEventMap>(
  target: Window,
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): () => void

export function useEvent<K extends keyof DocumentEventMap>(
  target: Document,
  type: K,
  listener: (this: Document, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): () => void

export function useEvent(
  target: MaybeRef<EventTarget>,
  type: string,
  listener: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void

export function useEvent<K extends keyof DocumentEventMap>(
  element: RefElement | Ref<any>,
  type: K,
  listener: (this: Element, ev: DocumentEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions,
  target?: Document
): () => void

export function useEvent(
  emitter: Emitter,
  type: string,
  listener: EmitterHandler | EmitterWildcardHandler
): () => void

export function useEvent(
  target: any,
  type: string,
  listener: EmitterHandler | EventListener,
  options?: boolean | AddEventListenerOptions
): () => void {
  let remove = noop

  if (target.on && target.off) {
    const emitter = target as Emitter
    emitter.on(type, listener)

    remove = () => emitter.off(type, listener)
    onUnmounted(remove)
  } else {
    const eventTarget = ref(target as MaybeRef<EventTarget | null>)

    remove = () => {
      if (!eventTarget.value) return
      eventTarget.value.removeEventListener(type, listener, options)
    }

    watch(
      eventTarget,
      (n, _, onCleanUp) => {
        if (!n) return
        n.addEventListener(type, listener, options)
        onCleanUp(() => n.removeEventListener(type, listener, options))
      },
      { immediate: true }
    )
  }

  return remove
}
