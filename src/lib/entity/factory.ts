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

        entity.onCleanup(() => {
            this.pool.delete(id)
        })

        dispatcher.emit("entityInstantiate", entity)

        return entity
    }

    checkInstanceOf(anything: unknown): anything is T {
        return anything instanceof this.constructible
    }
}
