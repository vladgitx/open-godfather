import { streamerNatives, type StreamerItemType } from "@/wrapper/streamer"
import { type Player } from "../../components/player"
import { type Vector3 } from "../vector3"
import { type StreamerEntity } from "./entity"
import { type Constructible, EntityHandler } from "../base-entity"

export class StreamerEntityHandler<T extends StreamerEntity, C extends Constructible<T>> extends EntityHandler<T, C> {
    private streamerIdToReferenceId = new Map<number, number>()

    constructor(
        constructible: C,
        private type: StreamerItemType,
    ) {
        super(constructible)

        this.events.on("addToPool", (entity) => {
            this.streamerIdToReferenceId.set(entity.streamerId, entity.referenceId)

            entity.onCleanup(() => {
                this.streamerIdToReferenceId.get(entity.streamerId) === entity.referenceId &&
                    this.streamerIdToReferenceId.delete(entity.streamerId)
            })
        })
    }

    atStreamerId(streamerId: number) {
        const referenceId = this.streamerIdToReferenceId.get(streamerId)

        return referenceId !== undefined ? this.atReferenceId(referenceId) : undefined
    }

    countVisible(player: Player) {
        return streamerNatives.countVisibleItems(player.sampId, this.type)
    }

    count() {
        return streamerNatives.countItems(this.type)
    }

    getNearby(position: Vector3, maxItems: number, range = 300, world = -1) {
        const items: T[] = []
        const itemIds = streamerNatives.getNearbyItems(position, this.type, maxItems, range, world)

        for (const itemId of itemIds) {
            const item = this.atStreamerId(itemId)

            if (item) {
                items.push(item)
            }
        }

        return items
    }
}
