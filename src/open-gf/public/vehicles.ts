import {
    Vehicle,
    createVehicle,
    destroyVehicle,
    getAllVehicles,
    getVehicle,
    getVehiclesInRange
} from "../../components/vehicle"
import { WorldPosition } from "../../shared/types"

export class OpenVehicles {
    at(vehicleId: number) {
        return getVehicle(vehicleId)
    }

    new(model: number, position: WorldPosition, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false) {
        return createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, addSiren)
    }

    destroy(vehicle: Vehicle) {
        return destroyVehicle(vehicle)
    }

    getInRange(position: WorldPosition, range: number, world?: number, interior?: number) {
        return getVehiclesInRange(position, range, world, interior)
    }

    get all() {
        return getAllVehicles()
    }
}