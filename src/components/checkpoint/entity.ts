import { StreamerEntity } from "@/lib/entity/streamer"
import { type Player } from "../player"

export class Checkpoint extends StreamerEntity<{
    playerEnter: [Player]
    playerLeave: [Player]
}> {
    constructor(gameId: number) {
        super(gameId, "checkpoint")
    }
}
