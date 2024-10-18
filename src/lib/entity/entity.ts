import { dispatcher } from "../dispatcher"
import { EventBus, type EventMapInterface } from "../event-bus"
import { KeyValueVariables } from "../variables"

let lastUsedReferenceId = Number.MIN_SAFE_INTEGER

export class Entity<EventMap extends EventMapInterface = EventMapInterface> {
    readonly refId: number

    private cleanupCallbacks: (() => void)[] = []
    private destroyed = false

    readonly events = new EventBus<EventMap>()
    readonly variables = new KeyValueVariables()

    constructor() {
        if (lastUsedReferenceId === Number.MAX_SAFE_INTEGER) {
            // TODO: Handle the reference IDs better so this doesn't happen
            throw new Error("Maximum entity reference ID reached")
        }

        this.refId = lastUsedReferenceId++

        dispatcher.emit("entityInstantiate", this)

        this.onCleanup(() => {
            EventBus.clearListeners(this.events)
            this.variables.clear()
        })
    }

    onCleanup(callback: () => void) {
        this.cleanupCallbacks.push(callback)
    }

    get exists() {
        return !this.destroyed
    }

    destroy() {
        if (this.destroyed) {
            return
        }

        dispatcher.emit("entityDestroy", this)
        dispatcher.emit("entityCleanup", this)

        for (const callback of this.cleanupCallbacks) {
            try {
                callback()
            } catch (error) {
                console.error("Error during entity cleanup:", error)
            }
        }

        this.cleanupCallbacks = []
        this.destroyed = true
    }
}
