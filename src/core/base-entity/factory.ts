import { dispatcher } from "../dispatcher"
import { EventCallbacks } from "../event-callbacks"
import { type Entity } from "./entity"

export class EntityFactory<T extends Entity, K extends new (...args: never[]) => T> {
    readonly pool = new Map<number, T>() // key: referenceId, value: entity
    readonly events = new EventCallbacks<{ addToPool: [T] }>()

    constructor(private constructible: K) {}

    new(...args: ConstructorParameters<K>): T | undefined {
        const entity = new this.constructible(...args)
        this.pool.set(entity.referenceId, entity)

        dispatcher.emit("entityInstantiate", entity)
        EventCallbacks.emit(this.events, "addToPool", entity)

        entity.onCleanup(() => {
            this.pool.delete(entity.referenceId)
        })

        return entity
    }

    checkInstanceOf(anything: unknown): anything is T {
        return anything instanceof this.constructible
    }
}
