import { StreamerEntity } from "@/lib/entity/streamer"

export class MapIcon extends StreamerEntity {
    constructor(gameId: number) {
        super(gameId, "mapIcon")
    }
}
