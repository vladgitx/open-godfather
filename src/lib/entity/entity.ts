import { dispatcher } from "../dispatcher"
import { EventCallbacks } from "../event-callbacks"
import { KeyValueVariables } from "../variables"

const INVALID_ENTITY_ID_UNDER = 0

let lastUsedInvalidEntityId = INVALID_ENTITY_ID_UNDER - 1

export class Entity<EventMap extends Record<string, unknown[]> = Record<string | symbol | number, unknown[]>> {
    private _id: number
    private cleanupCallbacks: (() => void)[] = []

    readonly events = new EventCallbacks<EventMap>()
    readonly variables = new KeyValueVariables<{ pula: string }>()

    constructor(id: number) {
        this._id = id

        this.onCleanup(() => {
            EventCallbacks.clearListeners(this.events)
            this.variables.clear()
        })
    }

    get id() {
        return this._id
    }

    onCleanup(callback: () => void) {
        this.cleanupCallbacks.push(callback)
    }

    get exists(): boolean {
        return this._id >= INVALID_ENTITY_ID_UNDER
    }

    destroy() {
        if (!this.exists) {
            return
        }

        dispatcher.emit("entityDestroy", this)

        for (const callback of this.cleanupCallbacks) {
            try {
                callback()
            } catch (error) {
                console.error("Error during entity cleanup:", error)
            }
        }

        this.cleanupCallbacks = []
        this._id = lastUsedInvalidEntityId--
    }
}
