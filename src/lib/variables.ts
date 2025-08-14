export class KeyValueVariables<T extends Record<string, unknown> = Record<string, unknown>> {
    private variables = new Map<keyof T, unknown>()

    set<K extends keyof T>(name: K, value: T[K]): void
    set<K extends keyof T | string>(name: K, value: K extends keyof T ? T[K] : unknown): void
    set<K extends keyof T>(name: K | string, value: unknown) {
        this.variables.set(name, value)
    }

    get<K extends keyof T>(name: K): T[K] | undefined
    get(name: string): unknown
    get<K extends keyof T>(name: K): T[K] | undefined {
        return this.variables.get(name) as T[K] | undefined
    }

    has(name: keyof T): boolean
    has(name: string): boolean
    has(name: keyof T): boolean {
        return this.variables.has(name)
    }

    delete(name: keyof T): boolean
    delete(name: string): boolean
    delete(name: keyof T): boolean {
        return this.variables.delete(name)
    }

    clear() {
        this.variables.clear()
    }

    entries() {
        return this.variables.entries()
    }
}
