import { CONFIG } from "@/shared/config"

export class Entity {
    private variables = new Map<string, any>()
    private cleanupCallbacks: (() => void)[] = []

    constructor(public id: number) {}

    onCleanup(callback: () => void) {
        this.cleanupCallbacks.push(callback)
    }

    setVariable(name: string, value: any) {
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
            callback()
        }
        this.cleanupCallbacks = []

        this.id = CONFIG.entity.invalidId
    }

    get exists(): boolean {
        return this.id !== CONFIG.entity.invalidId
    }
}
