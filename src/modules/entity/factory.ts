import { type Entity } from "./entity"

export abstract class EntityFactory<T extends Entity> {
    pool = new Map<number, T>()

    abstract new(id: number, ...args: never): T | undefined

    destroy(entity: T) {
        if (entity.exists) {
            const id = entity.id // The entity.id is changed in the entity.exists setter
            entity.exists = false

            this.pool.delete(id)
        }
    }
}
