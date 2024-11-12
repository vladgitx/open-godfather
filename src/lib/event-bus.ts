export type EventMapInterface = Record<string | symbol | number, unknown[]>

export class EventBus<EventMap extends EventMapInterface = EventMapInterface> {
    private callbacks = new Map<keyof EventMap, ((...args: unknown[]) => void)[]>()

    on<K extends keyof EventMap>(eventName: K, callback: (...args: EventMap[K]) => void) {
        if (!this.callbacks.has(eventName)) {
            this.callbacks.set(eventName, [])
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.callbacks.get(eventName)!.push(callback as (...args: unknown[]) => void)

        return () => {
            this.callbacks.set(
                eventName,
                (this.callbacks.get(eventName) ?? []).filter((cb) => cb !== callback),
            )
        }
    }

    static emit<EventMap extends EventMapInterface, K extends keyof EventMap>(
        eventBus: EventBus<EventMap>,
        eventName: K,
        ...args: EventMap[K]
    ) {
        const callbacks = eventBus.callbacks.get(eventName) ?? []

        for (const callback of callbacks) {
            try {
                callback(...args)
            } catch (error) {
                console.error(`Error while emitting "${String(eventName)}" event for entity`, error)
            }
        }
    }

    static clearListeners(eventBus: EventBus) {
        eventBus.callbacks.clear()
    }
}
