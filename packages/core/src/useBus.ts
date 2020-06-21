import { createGlobalState } from './createGlobalState'
import { createEmitter } from './createEmitter'

const globalEmitter = createGlobalState(() => ({
  emitter: createEmitter()
}))

export function useBus() {
  return globalEmitter().emitter
}
