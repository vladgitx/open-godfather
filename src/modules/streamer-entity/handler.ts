import { streamerNatives, type StreamerItemType } from "@/natives/streamer"
import { type Player } from "../player"
import { type Vector3 } from "../vector3"
import { type StreamerEntity } from "./instance"

export class StreamerHandler<T extends StreamerEntity> {
    constructor(
        private type: StreamerItemType,
        private getItem: (id: number) => T | undefined,
    ) {}

    countVisible(player: Player) {
        return streamerNatives.countVisibleItems(player.id, this.type)
    }

    count() {
        return streamerNatives.countItems(this.type)
    }

    getNearby(position: Vector3, maxItems: number, range = 300, world = -1) {
        const items: T[] = []
        const itemIds = streamerNatives.getNearbyItems(position, this.type, maxItems, range, world)

        for (const itemId of itemIds) {
            const item = this.getItem(itemId)

            if (item) {
                items.push(item)
            }
        }

        return items
    }
}
