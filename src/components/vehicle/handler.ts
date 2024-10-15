import { nativeFunctions } from "@/wrapper"
import { type Vector3 } from "../../core/vector3"
import { Vehicle } from "./entity"
import { EntityFactory, EntityHandler } from "../../core/entity"

const vehicleFactory = new EntityFactory<Vehicle, typeof Vehicle>(Vehicle)

class VehicleHandler extends EntityHandler<Vehicle> {
    new(model: number, position: Vector3, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, siren = false) {
        const vehicleId = nativeFunctions.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, siren)

        if (vehicleId === undefined) {
            return undefined
        }

        const vehicle = vehicleFactory.new(vehicleId, model, primaryColor, secondaryColor)

        vehicle?.onCleanup(() => {
            nativeFunctions.destroyVehicle(vehicleId)
        })

        return vehicle
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
