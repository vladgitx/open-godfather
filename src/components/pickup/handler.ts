import { streamerNatives } from "@/wrapper/streamer"
import { type Position3 } from "../../lib/vector3"
import { Pickup } from "./entity"
import { type Player } from "../player"
import { StreamerEntityHandler } from "@/lib/entity/streamer"
import { EntityPool } from "@/lib/pool"

class PickupHandler extends StreamerEntityHandler<Pickup> {
    new(
        model: number,
        position: Position3,
        streamDistance = 200,
        onlyVisibleFor?: {
            world?: number
            interior?: number
            player?: Player
        },
        priority = 0,
    ) {
        const pickupId = streamerNatives.createDynamicPickup(
            model,
            1,
            position,
            onlyVisibleFor?.world ?? -1,
            onlyVisibleFor?.interior ?? -1,
            onlyVisibleFor?.player?.id ?? -1,
            streamDistance,
            -1,
            priority,
        )

        if (pickupId === undefined) {
            return undefined
        }

        const pickup = new Pickup(pickupId)
        EntityPool.add(this.pool, pickupId, pickup)

        pickup.onCleanup(() => {
            streamerNatives.destroyDynamicPickup(pickupId)
            EntityPool.remove(this.pool, pickupId, pickup)
        })

        return pickup
    }
}

export const pickups = new PickupHandler("pickup", Pickup)
