import { streamerNatives } from "@/natives/streamer"
import { StreamerEntity } from "../../modules/streamer-entity"

export class Pickup extends StreamerEntity {
    constructor(id: number) {
        super(id, "pickup")
    }

    set model(id: number) {
        streamerNatives.setIntData("pickup", this.id, "modelId", id)
    }

    get model() {
        return streamerNatives.getIntData("pickup", this.id, "modelId")
    }
}
