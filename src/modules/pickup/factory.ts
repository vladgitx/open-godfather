import { Pickup } from "./instance"

class PickupFactory {
    pool = new Map<number, Pickup>()

    new(id: number) {
        if (this.pool.get(id)) {
            return undefined
        }

        const pickup = new Pickup(id)
        this.pool.set(id, pickup)

        return pickup
    }

    destroy(pickup: Pickup) {
        this.pool.delete(pickup.id)
        pickup.exists = false
    }
}

export const pickupFactory = new PickupFactory()
