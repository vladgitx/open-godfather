import { dispatcher } from "../dispatcher"
import { EventBus, type EventMapInterface } from "../event-bus"
import { KeyValueVariables } from "../variables"

let lastUsedReferenceId = BigInt(1)

export class Entity<EventMap extends EventMapInterface = EventMapInterface> {
    readonly refId = lastUsedReferenceId++

    private cleanupCallbacks: (() => void)[] = []
    private destroyed = false
    private isDestroying = false

    readonly events = new EventBus<EventMap>()
    readonly variables = new KeyValueVariables()

    constructor() {
        dispatcher.emit("entityInstantiate", this)

        this.onCleanup(() => {
            EventBus.clearListeners(this.events)
            this.variables.clear()
        })
    }

    get exists() {
        return !this.destroyed
    }

    /**
     * Executes a callback function with the current entity as the context.
     *
     * @param callback - The callback function to execute
     */
    execute(callback: (entity: this) => void) {
        try {
            callback(this)
        } catch (error) {
            console.error("Error during entity execute method:", error)
        }

        return this
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

    destroy() {
        if (this.destroyed || this.isDestroying) {
            return
        }

        this.isDestroying = true

        dispatcher.emit("entityPreDestroy", this)
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
