import { type Entity } from "./entity"
import { EventCallbacks } from "../event-callbacks"

export type Constructible<T> = new (...args: never[]) => T

export class EntityHandler<T extends Entity, C extends Constructible<T>> {
    private pool = new Map<number, T>() // key: referenceId, value: entity
    readonly events = new EventCallbacks<{ addToPool: [T] }>()

    constructor(private constructible: C) {}

    static createInstance<T extends Entity, C extends Constructible<T>>(
        entityHandler: EntityHandler<T, C>,
        ...args: ConstructorParameters<C>
    ): T {
        const entity = new entityHandler.constructible(...args)
        entityHandler.pool.set(entity.referenceId, entity)

        EventCallbacks.emit(entityHandler.events, "addToPool", entity)

        entity.onCleanup(() => {
            entityHandler.pool.delete(entity.referenceId)
        })

        return entity
    }

    get all() {
        return [...this.pool.values()]
    }

    atReferenceId(referenceId: number) {
        return this.pool.get(referenceId)
    }

    checkEntityType(entity: Entity): entity is T {
        return this.atReferenceId(entity.referenceId) === entity
    }

    checkInstanceOf(anything: unknown): anything is T {
        return anything instanceof this.constructible
    }
}
