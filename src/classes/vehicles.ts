import { Natives } from "../scripting-api"
import { EntityPosition, Vehicle } from ".."
import { vehicleEvent } from "./vehicle-event"

export class Vehicles {
    static pool = new Map<number, Vehicle>()

    static at(vehicleId: number) {
        return Vehicles.pool.get(vehicleId)
    }

    static new(modelId: number, position: EntityPosition, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false) {
        const vehicleId = Natives.createVehicle(modelId, position, rotation, primaryColor, secondaryColor, respawnDelay, addSiren)
        if (vehicleId === undefined) {
            return undefined
        }
        const vehicle = new Vehicle(vehicleId, primaryColor, secondaryColor)
        Vehicles.pool.set(vehicleId, vehicle)
        vehicleEvent.emit("create", vehicle)
        return vehicle
    }

    static destroy(vehicleId: number) {
        const response = Natives.destroyVehicle(vehicleId)
        if (response) {
            const vehicle = Vehicles.at(vehicleId)
            if (vehicle !== undefined) {
                vehicleEvent.emit("destroy", vehicle)
                vehicle.exists = false
            }
            Vehicles.pool.delete(vehicleId)
            return true
        }
        return false
    }
}