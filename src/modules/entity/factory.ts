import { type Entity } from "./instance"

export abstract class EntityFactory<T extends Entity> {
    pool = new Map<number, T>()

    abstract new(id: number, ...args: any): T | undefined

    destroy(entity: T) {
        this.pool.delete(entity.id)
        entity.exists = false
    }
}