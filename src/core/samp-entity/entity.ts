import { Entity } from "../base-entity"
import { type EventMapInterface } from "../event-callbacks"

export class SampEntity<EventMap extends EventMapInterface = EventMapInterface> extends Entity<EventMap> {
    private _sampId: number

    constructor(sampId: number, invalidSampId: number) {
        super()

        this._sampId = sampId

        this.onCleanup(() => {
            this._sampId = invalidSampId
        })
    }

    get sampId() {
        return this._sampId
    }
}
