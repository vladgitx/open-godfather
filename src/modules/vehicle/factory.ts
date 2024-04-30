import { dispatcher } from "../dispatcher"
import { EntityFactory } from "../entity"
import { Vehicle } from "./entity"

class VehicleFactory extends EntityFactory<Vehicle> {
    new(vehicleId: number, model: number, primaryColor: number, secondaryColor: number) {
        if (this.pool.get(vehicleId)) {
            return undefined
        }

        const vehicle = new Vehicle(vehicleId, model, primaryColor, secondaryColor)
        this.pool.set(vehicleId, vehicle)

        dispatcher.emit("entityInstantiate", vehicle)

        return vehicle
    }
}

export const vehicleFactory = new VehicleFactory()
