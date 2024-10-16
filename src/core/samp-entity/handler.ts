import { type Constructible } from "@/utils/types"
import { EntityHandler } from "../base-entity"
import { type SampEntity } from "./entity"

export class SampEntityHandler<T extends SampEntity, C extends Constructible<T>> extends EntityHandler<T, C> {
    private sampIdToReferenceId = new Map<number, number>()

    constructor(constructible: C) {
        super(constructible)

        this.events.on("addToPool", (entity) => {
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
