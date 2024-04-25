import { nativeFunctions } from "@/natives"
import { type Vector3 } from "../vector3"
import { vehicleFactory } from "./factory"
import { type Vehicle } from "./entity"
import { EntityHandler } from "../entity"

class VehicleHandler extends EntityHandler<Vehicle> {
    new(model: number, position: Vector3, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, siren = false) {
        const vehicleId = nativeFunctions.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, siren)

        if (vehicleId === undefined) {
            return undefined
        }

        return vehicleFactory.new(vehicleId, model, primaryColor, secondaryColor)
    }

    destroy(vehicle: Vehicle) {
        nativeFunctions.destroyVehicle(vehicle.id)
        vehicleFactory.destroy(vehicle)
    }

    getClosest(position: Vector3, range: number, world?: number, interior?: number) {
        const vehicles = new Map<Vehicle, number>()
        for (const vehicle of this.all) {
            if (world !== undefined && vehicle.world !== world) {
                continue
            }
            if (interior !== undefined && vehicle.interior !== interior) {
                continue
            }

            const distance = vehicle.position.distance(position)

            if (distance < range) {
                vehicles.set(vehicle, distance)
            }
        }
        return vehicles
    }
}

export const vehicleHandler = new VehicleHandler(vehicleFactory)
