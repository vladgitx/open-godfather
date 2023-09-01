import { Vehicle } from ".."
import { vehicleEvent } from "./vehicle-event"
import { vehicleNames } from "../vehicle-names"
import { Natives } from "../scripting-api"

export class Vehicles {
    static pool = new Map<number, Vehicle>()

    static at(vehicleId: number) {
        return Vehicles.pool.get(vehicleId)
    }

    static create(modelId: number, position: { x: number, y: number, z: number }, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false): Vehicle | undefined {
        const vehicleId = Natives.createVehicle(modelId, position, rotation, primaryColor, secondaryColor, respawnDelay, addSiren)
        if (vehicleId === undefined) {
            return undefined
        }
        const vehicle = new Vehicle(vehicleId, primaryColor, secondaryColor)
        Vehicles.pool.set(vehicleId, vehicle)

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