import { dispatcher } from "../dispatcher"
import { EventBus, type EventMapInterface } from "../event-bus"
import { KeyValueVariables } from "../variables"

let lastUsedReferenceId = BigInt(1)

export class Entity<EventMap extends EventMapInterface = EventMapInterface> {
    readonly refId = lastUsedReferenceId++

    private cleanupCallbacks: (() => void)[] = []
    private destroyed = false

    readonly events = new EventBus<EventMap>()
    readonly variables = new KeyValueVariables()

    constructor() {
        dispatcher.emit("entityInstantiate", this)

        this.onCleanup(() => {
            EventBus.clearListeners(this.events)
            this.variables.clear()
        })
    }

    onCleanup(callback: () => void) {
        this.cleanupCallbacks.push(callback)

        return () => {
            const index = this.cleanupCallbacks.indexOf(callback)

            if (index !== -1) {
                this.cleanupCallbacks.splice(index, 1)
            }
        }
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
