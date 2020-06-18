import { emitter, EventHandlerMap } from './utils/emitter'

export function createEmitter(map?: EventHandlerMap) {
  return emitter(map)
}
