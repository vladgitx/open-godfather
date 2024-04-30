const INVALID_ENTITY_ID = -1

export class Entity {
    private _id: number
    private variables = new Map<string, unknown>()
    private cleanupCallbacks: (() => void)[] = []

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

    set exists(value: false) {
        for (const callback of this.cleanupCallbacks) {
            try {
                callback()
            } catch (error) {
                console.error("Error during entity cleanup:", error)
            }
        }

        this.cleanupCallbacks = []

        this._id = INVALID_ENTITY_ID
    }

    get exists(): boolean {
        return this._id !== INVALID_ENTITY_ID
    }
}
