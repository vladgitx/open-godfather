import { dispatcher } from "../dispatcher"
import { EntityEvents } from "./events"

const INVALID_ENTITY_ID_UNDER = 0

let lastUsedInvalidEntityId = INVALID_ENTITY_ID_UNDER - 1

export class Entity<EventMap extends Record<string, unknown[]> = Record<string | symbol | number, unknown[]>> {
    private _id: number
    private variables = new Map<string, unknown>()
    private cleanupCallbacks: (() => void)[] = []

    readonly events = new EntityEvents<EventMap>(this)

    constructor(id: number) {
        this._id = id
    }

    get id() {
        return this._id
    }

    onCleanup(callback: () => void) {
        this.cleanupCallbacks.push(callback)
    }

    setVariable(name: string, value: unknown) {
        this.variables.set(name, value)
    }

    getVariable(name: string) {
        return this.variables.get(name)
    }

    deleteVariable(name: string) {
        return this.variables.delete(name)
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
