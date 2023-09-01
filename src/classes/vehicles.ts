import { Vehicle } from ".."
import { vehicleEvent } from "./vehicle-event"
import { vehicleNames } from "../vehicle-names"
import { Natives } from "../scripting-api"

export class Vehicles {
    static pool: Record<number, Vehicle> = {}

    static get(vehicleId: number): Vehicle | undefined {
        if (!Natives.isValidVehicle(vehicleId)) {
            return undefined
        }
        if (!Vehicles.pool[vehicleId]) {
            Vehicles.pool[vehicleId] = new Vehicle(vehicleId)
        }
        return Vehicles.pool[vehicleId]
    }

    static create(modelId: number, position: { x: number, y: number, z: number }, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false): Vehicle | undefined {
        const vehicleId = Natives.createVehicle(modelId, position, rotation, primaryColor, secondaryColor, respawnDelay, addSiren)
        if (vehicleId === undefined) {
            return undefined
        }
        if (Vehicles.pool[vehicleId]) {
            delete Vehicles.pool[vehicleId]
        }
        Vehicles.pool[vehicleId] = new Vehicle(vehicleId, primaryColor, secondaryColor)
        const vehicle = Vehicles.pool[vehicleId]

        vehicleEvent.emit("create", vehicle)
        return vehicle
    }

    static searchModel(nameOrId: string): number | undefined {
        const modelId = parseInt(nameOrId)
        if (!isNaN(modelId)) {
            if (modelId >= 400 && modelId <= 611) {
                return modelId
            }
        }
        if (nameOrId.length < 3) {
            return undefined
        }
        for (let i = 0; i < vehicleNames.length; i++) {
            const name = vehicleNames[i]

            if (name.toLowerCase().startsWith(nameOrId.toLowerCase())) {
                return i + 400
            }
        }
        return undefined
    }

    static getModelName(modelId: number | undefined) {
        if (modelId === undefined || modelId < 400 || modelId > 611) {
            return "invalid_name"
        }
        return vehicleNames[modelId - 400]
    }
}