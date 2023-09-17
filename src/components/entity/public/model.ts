export class Entity {
    readonly id: number
    private pool: Map<number, any>
    private variables: Map<string, any>

    constructor(id: number, pool: Map<number, any>) {
        this.id = id
        this.pool = pool
        this.variables = new Map()
    }

    get exists() {
        return this.pool.get(this.id) === this
    }

    setTimeout(callback: () => void, delay: number) {
        return setTimeout(() => {
            if (this.exists) {
                callback()
            }
        }, delay)
    }

    setInterval(callback: () => void, delay: number) {
        const intervalId = setInterval(() => {
            if (this.exists) {
                callback()
            } else {
                clearInterval(intervalId)
            }
        }, delay)
        return intervalId
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
}