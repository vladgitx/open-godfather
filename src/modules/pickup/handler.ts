import { streamerNatives } from "@/natives/streamer"
import { type Vector3 } from "../vector3"
import { pickupFactory } from "./factory"
import { type Pickup } from "./entity"
import { StreamerHandler } from "../streamer-entity"
import { type Player } from "../player"

class PickupHandler extends StreamerHandler<Pickup> {
    new(
        model: number,
        position: Vector3,
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

        return pickupFactory.new(pickupId)
    }

    destroy(pickup: Pickup) {
        streamerNatives.destroyDynamicPickup(pickup.id)
        pickupFactory.destroy(pickup)
    }
}

export const pickupHandler = new PickupHandler("pickup", pickupFactory)
