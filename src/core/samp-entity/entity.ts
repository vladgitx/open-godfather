import { Entity } from "../base-entity"

export class SampEntity<EventMap extends Record<string, unknown[]> = Record<string | symbol | number, unknown[]>> extends Entity<EventMap> {
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
