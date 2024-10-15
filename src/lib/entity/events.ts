import { type Entity } from "./entity"

export class EntityEvents<EventMap extends Record<string, unknown[]> = Record<never, never>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private callbacks = new Map<keyof EventMap, ((...args: any[]) => void)[]>()

    constructor(entity: Entity) {
        entity.onCleanup(() => {
            this.callbacks.clear()
        })
    }

    on<K extends keyof EventMap>(eventName: K, callback: (...args: EventMap[K]) => void) {
        if (!this.callbacks.has(eventName)) {
            this.callbacks.set(eventName, [])
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.callbacks.get(eventName)!.push(callback as (...args: unknown[]) => void)

        return () => {
            this.callbacks.set(
                eventName,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.callbacks.get(eventName)!.filter((cb) => cb !== callback),
            )
        }
    }

    static emit<EventMap extends Record<string, unknown[]>, K extends keyof EventMap>(
        entityEvents: EntityEvents<EventMap>,
        eventName: K,
        ...args: EventMap[K]
    ) {
        const callbacks = entityEvents.callbacks.get(eventName) ?? []

        for (const callback of callbacks) {
            try {
                callback(...args)
            } catch (error) {
                console.error(`Error while emitting "${String(eventName)}" event for entity`, error)
            }
        }
    }
}

export function emitEntityEvent<EventMap extends Record<string, unknown[]>, K extends keyof EventMap>(
    entityEvents: EntityEvents<EventMap>,
    eventName: K,
    ...args: EventMap[K]
) {
    EntityEvents.emit(entityEvents, eventName, ...args)
}
