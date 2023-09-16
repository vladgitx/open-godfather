import { Natives } from "../scripting-api"
import { WorldPosition, Vehicle, og } from ".."

export class Vehicles {
    private pool: Map<number, Vehicle>

    constructor() {
        this.pool = new Map()
    }

    at(vehicleId: number) {
        return this.pool.get(vehicleId)
    }

    new(modelId: number, position: WorldPosition, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false) {
        const vehicleId = Natives.createVehicle(modelId, position, rotation, primaryColor, secondaryColor, respawnDelay, addSiren)
        if (vehicleId === undefined) {
            return undefined
        }
        const vehicle = new Vehicle(vehicleId, modelId, primaryColor, secondaryColor)
        this.pool.set(vehicleId, vehicle)
        og.events.emit("vehicleCreate", vehicle)
        return vehicle
    }

    destroy(vehicleId: number) {
        const response = Natives.destroyVehicle(vehicleId)
        if (response) {
            const vehicle = this.at(vehicleId)
            if (vehicle !== undefined) {
                og.events.emit("vehicleDestroy", vehicle)
            }
            this.pool.delete(vehicleId)
            return true
        }
        return false
    }

    get all(): ReadonlyMap<number, Vehicle> {
        return this.pool
    }
}