import { type EntityFactory, EntityHandler } from "../base-entity"
import { type SampEntity } from "./entity"

export class SampEntityHandler<T extends SampEntity> extends EntityHandler<T> {
    private sampIdToReferenceId = new Map<number, number>()

    constructor(factory: EntityFactory<T, new (...args: never[]) => T>) {
        super(factory)

        factory.events.on("addToPool", (entity) => {
            this.sampIdToReferenceId.set(entity.sampId, entity.referenceId)

            entity.onCleanup(() => {
                this.sampIdToReferenceId.get(entity.sampId) === entity.referenceId && this.sampIdToReferenceId.delete(entity.sampId)
            })
        })
    }

    atSampId(sampId: number) {
        const referenceId = this.sampIdToReferenceId.get(sampId)
        return referenceId !== undefined ? this.atReferenceId(referenceId) : undefined
    }
}
