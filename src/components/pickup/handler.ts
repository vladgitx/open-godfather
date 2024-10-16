import { streamerNatives } from "@/wrapper/streamer"
import { type Vector3 } from "../../core/vector3"
import { Pickup } from "./entity"
import { StreamerEntityHandler } from "../../core/streamer-entity"
import { type Player } from "../player"

class PickupHandler extends StreamerEntityHandler<Pickup, typeof Pickup> {
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
            onlyVisibleFor?.player?.sampId ?? -1,
            streamDistance,
            -1,
            priority,
        )

        if (pickupId === undefined) {
            return undefined
        }

        const pickup = PickupHandler.createInstance(this, pickupId)

        pickup.onCleanup(() => {
            streamerNatives.destroyDynamicPickup(pickupId)
        })

        return pickup
    }
}

export const pickupHandler = new PickupHandler(Pickup, "pickup")
