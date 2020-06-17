import { Handler, Emitter } from './utils/emitter'
import { onUnmounted } from '@vue/composition-api'

export function useEmitterOn<T extends Emitter>(
  type: string,
  emitter: T,
  handler: Handler
) {
  emitter.on(type, handler)
  onUnmounted(() => emitter.off(type, handler))
}
