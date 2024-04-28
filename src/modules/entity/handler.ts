import { type EntityFactory } from "./factory"
import { type Entity } from "./entity"

export class EntityHandler<T extends Entity> {
    constructor(private factory: EntityFactory<T>) {}

    get all() {
        return this.factory.pool.values()
    }

    at(id: number) {
        return this.factory.pool.get(id)
    }

    checkEntityType(entity: Entity): entity is T {
        return this.at(entity.id) === entity
    }
}
