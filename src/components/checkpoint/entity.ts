import { type Player } from "../player"
import { StreamerEntity } from "../../core/streamer-entity"

export class Checkpoint extends StreamerEntity<{
    playerEnter: [Player]
    playerLeave: [Player]
}> {
    constructor(streamerId: number) {
        super(streamerId, "checkpoint")
    }
}
