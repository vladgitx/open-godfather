import { streamerNatives } from "@/wrapper/streamer"
import { StreamerEntity } from "../../core/streamer-entity"

export class Pickup extends StreamerEntity {
    constructor(streamerId: number) {
        super(streamerId, "pickup")
    }

    set model(id: number) {
        streamerNatives.setIntData("pickup", this.streamerId, "modelId", id)
    }

    get model() {
        return streamerNatives.getIntData("pickup", this.streamerId, "modelId")
    }
}
