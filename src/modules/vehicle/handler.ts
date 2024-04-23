import { CONFIG } from "@/shared/config"
import { nativeFunctions } from "@/natives"
import { type Vector3 } from "../vector3"
import { vehicleFactory } from "./factory"
import { type VehicleMp } from "./entity"

class VehicleHandler {
    new(
        model: number,
        position: Vector3,
        rotation: number,
        primaryColor = CONFIG.vehicle.primaryColor,
        secondaryColor = CONFIG.vehicle.secondaryColor,
        respawnDelay = CONFIG.vehicle.respawnDelay,
        siren = CONFIG.vehicle.siren,
    ) {
        const vehicleId = nativeFunctions.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, siren)
        if (vehicleId === undefined) {
            return undefined
        }

        return vehicleFactory.new(vehicleId, model, primaryColor, secondaryColor)
    }

    destroy(vehicle: VehicleMp) {
        nativeFunctions.destroyVehicle(vehicle.id)
        vehicleFactory.destroy(vehicle)
    }

    at(id: number) {
        return vehicleFactory.at(id)
    }

    getClosest(position: Vector3, range: number, world?: number, interior?: number) {
        const vehicles = new Map<VehicleMp, number>()
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

    get all() {
        return vehicleFactory.all
    }
}

export const vehicleHandler = new VehicleHandler()
