import { type Constructible } from "@/lib/types"
import { EventBus } from "../event-bus"
import { type Entity } from "./entity"

type EntityPoolKey = number | string | bigint

export class EntityPool<T extends Entity> {
    private map = new Map<EntityPoolKey, T>()
    readonly events = new EventBus<{ add: [T] }>()

    constructor(private entityConstructor: Constructible<T>) {}

    static add<T extends Entity>(pool: EntityPool<T>, key: EntityPoolKey, entity: T) {
        if (pool.map.has(key)) {
            throw new Error(`Entity with key ${key} already exists in pool`)
        }

        pool.map.set(key, entity)
        EventBus.emit(pool.events, "add", entity)

        entity.onCleanup(() => {
            pool.map.get(key) === entity && pool.map.delete(key)
        })
    }

    get all() {
        return [...this.map.values()]
    }

    get size() {
        return this.map.size
    }

    has(key: EntityPoolKey) {
        return this.map.has(key)
    }

    at(key: EntityPoolKey) {
        return this.map.get(key)
    }

    atRefId(referenceId: bigint) {
        const entities = this.map.values()

        for (const entity of entities) {
            if (entity.refId === referenceId) {
                return entity
            }
        }

        return undefined
    }

    isInstanceOfEntity(anything: unknown): anything is T {
        return anything instanceof this.entityConstructor
    }
}
