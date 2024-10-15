import { type EntityFactory } from "./factory"
import { type Entity } from "./entity"

export class EntityHandler<T extends Entity> {
    constructor(private factory: EntityFactory<T, new (...args: never[]) => T>) {}

    get all() {
        return [...this.factory.pool.values()]
    }

    atReferenceId(referenceId: number) {
        return this.factory.pool.get(referenceId)
    }

    checkEntityType(entity: Entity): entity is T {
        return this.atReferenceId(entity.referenceId) === entity
    }

    checkInstanceOf(anything: unknown): anything is T {
        return this.factory.checkInstanceOf(anything)
    }
}
