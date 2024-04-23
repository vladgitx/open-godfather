import { streamerNatives } from "@/natives/streamer"
import { type Vector3 } from "../vector3"
import { pickupFactory } from "./factory"
import { type Pickup } from "./instance"

class PickupHandler {
    new(model: number, position: Vector3, streamDistance = 200, world = -1, interior = -1) {
        const pickupId = streamerNatives.createDynamicPickup(model, 1, position, world, interior, -1, streamDistance, -1, 0)

        if (pickupId === undefined) {
            return undefined
        }

        return pickupFactory.new(pickupId)
    }

    destroy(pickup: Pickup) {
        streamerNatives.destroyDynamicPickup(pickup.id)
        pickupFactory.destroy(pickup)
    }

    at(id: number) {
        return pickupFactory.pool.get(id)
    }
}

export const pickupHandler = new PickupHandler()
