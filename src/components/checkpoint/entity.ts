import { type Player } from "../player"
import { StreamerEntity } from "../../lib/streamer-entity"

export class Checkpoint extends StreamerEntity<{
    playerEnter: [Player]
    playerLeave: [Player]
}> {
    constructor(id: number) {
        super(id, "checkpoint")
    }
}
