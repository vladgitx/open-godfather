import { gameNatives } from "@/wrapper/game"
import { type Position3 } from "../../lib/vector3"
import { Vehicle } from "./entity"
import { EntityPool } from "@/lib/entity"

class VehicleHandler {
    readonly pool = new EntityPool<Vehicle>(Vehicle)

    new(model: number, position: Position3, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, siren = false) {
        const vehicleId = gameNatives.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, siren)

        if (vehicleId === undefined) {
            return undefined
        }

        const vehicle = new Vehicle(vehicleId, model, primaryColor, secondaryColor)
        EntityPool.add(this.pool, vehicleId, vehicle)

        vehicle.onCleanup(() => {
            gameNatives.destroyVehicle(vehicleId)
        })

        return vehicle
    }

    getClosest(position: Position3, range = Infinity, world?: number, interior?: number) {
        let closestVehicle: Vehicle | undefined = undefined
        let closestDistance = range

        const vehicles = this.pool.all

        for (const vehicle of vehicles) {
            if (world !== undefined && vehicle.world !== world) {
                continue
            }

            if (interior !== undefined && vehicle.interior !== interior) {
                continue
            }

            const distance = vehicle.position.distance(position)

            if (distance < closestDistance) {
                closestVehicle = vehicle
                closestDistance = distance
            }
        }

        return closestVehicle
    }
}

export const vehicles = new VehicleHandler()
