import { dispatcher } from "../dispatcher"
import { EventCallbacks } from "../event-callbacks"
import { KeyValueVariables } from "../variables"

let lastUsedReferenceId = 0

export class Entity<EventMap extends Record<string, unknown[]> = Record<string | symbol | number, unknown[]>> {
    private cleanupCallbacks: (() => void)[] = []
    private destroyed = false

    readonly events = new EventCallbacks<EventMap>()
    readonly variables = new KeyValueVariables()

    readonly referenceId = lastUsedReferenceId++

    constructor() {
        this.onCleanup(() => {
            EventCallbacks.clearListeners(this.events)
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
