import { StreamerEntity } from "@/lib/entity/streamer"
import { streamerNatives } from "@/wrapper/streamer"

export class Pickup extends StreamerEntity {
    constructor(gameId: number) {
        super(gameId, "pickup")
    }

    set model(id: number) {
        streamerNatives.setIntData("pickup", this.id, "modelId", id)
    }

    get model() {
        return streamerNatives.getIntData("pickup", this.id, "modelId")
    }
}
