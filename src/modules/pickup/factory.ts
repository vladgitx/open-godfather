import { dispatcher } from "../dispatcher"
import { EntityFactory } from "../entity"
import { Pickup } from "./entity"

class PickupFactory extends EntityFactory<Pickup> {
    new(id: number) {
        if (this.pool.has(id)) {
            return undefined
        }

        const pickup = new Pickup(id)
        this.pool.set(id, pickup)

        dispatcher.emit("entityInstantiate", pickup)

        return pickup
    }
}

export const pickupFactory = new PickupFactory()
