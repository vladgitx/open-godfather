export type EventMapInterface = Record<string | symbol | number, unknown[]>

export class EventBus<EventMap extends EventMapInterface = EventMapInterface> {
    private callbacks = new Map<keyof EventMap, Map<string | symbol, (...args: unknown[]) => void>>()

    on<K extends keyof EventMap>(eventName: K, callback: (...args: EventMap[K]) => void) {
        return this.setListener(eventName, Symbol(), callback)
    }

    setListener<K extends keyof EventMap>(eventName: K, id: string | symbol, callback: (...args: EventMap[K]) => void) {
        const keyedCallbacks = (this.callbacks.get(eventName) ?? new Map<string | symbol, (...args: unknown[]) => void>()).set(
            id,
            callback as (...args: unknown[]) => void,
        )

        this.callbacks.set(eventName, keyedCallbacks)

        return () => {
            this.callbacks.get(eventName)?.delete(id)
        }
    }

    static emit<EventMap extends EventMapInterface, K extends keyof EventMap>(
        eventBus: EventBus<EventMap>,
        eventName: K,
        ...args: EventMap[K]
    ) {
        const callbacks = eventBus.callbacks.get(eventName) ?? new Map<string | symbol, (...args: unknown[]) => void>()

        for (const [id, callback] of callbacks) {
            try {
                callback(...args)
            } catch (error) {
                console.error(`[EventBus] Error while emitting "${String(eventName)}" event with ID ${String(id)}`, error)
            }
        }
    }

    static clearListeners(eventBus: EventBus) {
        eventBus.callbacks.clear()
    }
}
