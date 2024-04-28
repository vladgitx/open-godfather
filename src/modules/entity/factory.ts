import { type Entity } from "./entity"

export abstract class EntityFactory<T extends Entity> {
    pool = new Map<number, T>()

    abstract new(id: number, ...args: never): T | undefined

    destroy(entity: T) {
        if (entity.exists) {
            this.pool.delete(entity.id)
            entity.exists = false
        }
    }
}
