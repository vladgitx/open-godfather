import { StreamerEntity } from "../streamer-entity"

export class Pickup extends StreamerEntity {
    constructor(id: number) {
        super(id, "pickup")
    }
}
