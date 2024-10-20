import { streamerNatives, type StreamerItemType } from "@/wrapper/streamer"
import { type StreamerEntity } from "./entity"
import { type Player } from "@/components/player"
import { type Position3 } from "@/lib/vector3"
import { EntityPool } from "../pool"

export class StreamerEntityHandler<T extends StreamerEntity> {
    readonly pool = new EntityPool<number, T>()

    constructor(private type: StreamerItemType) {}

    countVisible(player: Player) {
        return streamerNatives.countVisibleItems(player.id, this.type)
    }

    count() {
        return streamerNatives.countItems(this.type)
    }

    getNearby(position: Position3, maxItems: number, range = 300, world = -1) {
        const items: T[] = []
        const itemIds = streamerNatives.getNearbyItems(position, this.type, maxItems, range, world)

        for (const itemId of itemIds) {
            const item = this.pool.at(itemId)

            if (item) {
                items.push(item)
            }
        }

        return items
    }
}
