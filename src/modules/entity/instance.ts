const INVALID_ENTITY_ID = -1

export class Entity {
    private variables = new Map<string, unknown>()
    private cleanupCallbacks: (() => void)[] = []

    constructor(public id: number) {}

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

        this.id = INVALID_ENTITY_ID
    }

    get exists(): boolean {
        return this.id !== INVALID_ENTITY_ID
    }
}
