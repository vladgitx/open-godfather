import { dispatcher } from "../dispatcher"
import { type Entity } from "./entity"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class EntityFactory<T extends Entity, K extends new (id: number, ...args: any[]) => T> {
    public pool = new Map<number, T>()

    constructor(private createInstance: (...args: ConstructorParameters<K>) => T) {}

    new(...args: ConstructorParameters<K>) {
        const id = args[0]

        if (this.pool.has(id)) {
            return undefined
        }

        const entity = this.createInstance(...args)
        this.pool.set(id, entity)

        dispatcher.emit("entityInstantiate", entity)

        return entity
    }

    destroy(entity: T) {
        if (!entity.exists) {
            return
        }

        dispatcher.emit("entityDestroy", entity)

        const id = entity.id // The entity.id is changed in the entity.exists setter
        entity.exists = false

        this.pool.delete(id)
    }
}
