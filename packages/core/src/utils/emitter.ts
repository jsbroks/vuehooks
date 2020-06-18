// Modified from mittjs

export type EventType = string | symbol

// An event handler can take an optional event argument
// and should not return a value
export type EmitterHandler = (event?: any) => void
export type EmitterWildcardHandler = (type: EventType, event?: any) => void

// An array of all currently registered event handlers for a type
export type EventHandlerList = Array<EmitterHandler>
export type WildCardEventHandlerList = Array<EmitterWildcardHandler>

// A map of event types and their corresponding event handlers.
export type EventHandlerMap = Map<
  EventType,
  EventHandlerList | WildCardEventHandlerList
>

export interface Emitter {
  on(type: EventType, handler: EmitterHandler): void
  on(type: '*', handler: EmitterWildcardHandler): void

  off(type: EventType, handler: EmitterHandler): void
  off(type: '*', handler: EmitterWildcardHandler): void

  emit<T = any>(type: EventType, event?: T): void
  emit(type: '*', event?: any): void
}

export function emitter(all?: EventHandlerMap): Emitter {
  const map: EventHandlerMap = all || new Map()

  return {
    /**
     * Register an event handler for the given type.
     * @param type Type of event to listen for, or `"*"` for all events
     * @param handler Function to call in response to given event
     * @memberOf mitt
     */
    on(type: EventType, handler: EmitterHandler) {
      const handlers = map.get(type)
      const added = handlers && handlers.push(handler)
      if (!added) map.set(type, [handler])
    },

    /**
     * Remove an event handler for the given type.
     *
     * @param type Type of event to unregister `handler` from, or `"*"`
     * @param handler Handler function to remove
     * @memberOf mitt
     */
    off(type: EventType, handler: EmitterHandler) {
      const handlers = map.get(type)
      if (handlers) handlers.splice(handlers.indexOf(handler) >>> 0, 1)
    },

    /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing "*" handlers is not supported.
     *
     * @param type The event type to invoke
     * @param evt Any value (object is recommended and powerful), passed to each handler
     * @memberOf mitt
     */
    emit(type: EventType, evt: any) {
      ;((map.get(type) || []) as EventHandlerList)
        .slice()
        .map(handler => handler(evt))
      ;((map.get('*') || []) as WildCardEventHandlerList)
        .slice()
        .map(handler => handler(type, evt))
    }
  }
}
