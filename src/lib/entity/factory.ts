import { dispatcher } from "../dispatcher"
import { type Entity } from "./entity"

export class EntityFactory<T extends Entity, K extends new (...args: [...ConstructorParameters<typeof Entity>, ...never[]]) => T> {
    readonly pool = new Map<number, T>()

    constructor(private constructible: K) {}

    new(...args: ConstructorParameters<K>): T | undefined {
        const [id, ...restArgs] = args

        if (this.pool.has(id)) {
            return undefined
        }

        const entity = new this.constructible(id, ...restArgs)

        this.pool.set(id, entity)

        dispatcher.emit("entityInstantiate", entity)

        return entity
    }

    destroy(entity: T): void {
        if (!entity.exists) {
            return
        }

        dispatcher.emit("entityDestroy", entity)

        const id = entity.id // The entity.id is changed in the entity.exists setter
        entity.exists = false

        this.pool.delete(id)
    }

    instanceOf(anything: unknown): anything is T {
        return anything instanceof this.constructible
    }
}
