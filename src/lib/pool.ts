import { EventBus } from "./event-bus"
import { type Entity } from "./entity/entity"
import { type Constructible } from "./types"

type ValidPoolKey = number | string

export class EntityPool<K extends ValidPoolKey, V> {
    private readonly map = new Map<K, V>()
    private readonly constructibles: Constructible<V>[] // Used to check if an object is an instance of V

    readonly events = new EventBus<{ add: [V]; remove: [V] }>()

    constructor(...constructibles: Constructible<V>[]) {
        this.constructibles = constructibles
    }

    static add<K extends ValidPoolKey, V>(pool: EntityPool<K, V>, key: K, value: V) {
        if (pool.map.has(key)) {
            throw new Error(`Entity with key ${key} already exists in pool`)
        }

        pool.map.set(key, value)
        EventBus.emit(pool.events, "add", value)
    }

    static remove<K extends ValidPoolKey, V>(pool: EntityPool<K, V>, key: K, value: V) {
        if (pool.map.get(key) === value) {
            EventBus.emit(pool.events, "remove", value)
            return pool.map.delete(key)
        }

        return false
    }

    get all() {
        return [...this.map.values()]
    }

    get size() {
        return this.map.size
    }

    has(key: ValidPoolKey) {
        return this.map.has(key as K)
    }

    at(key: ValidPoolKey) {
        return this.map.get(key as K)
    }

    isInstanceOf(anything: unknown): anything is V {
        return this.constructibles.some((constructible) => anything instanceof constructible)
    }
}

export function searchPoolValuesForEntityUUID<T extends Entity>(pool: EntityPool<ValidPoolKey, T>, entityUUID: string): T | undefined {
    return pool.all.find((entity) => entity.uuid === entityUUID)
}
