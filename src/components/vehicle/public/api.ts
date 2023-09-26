import SampNatives from "../../../shared/samp-natives"
import { WorldPosition } from "../../../shared/types"
import { EventEmit } from "../../event"
import { vehiclesPool } from "../domain/pool"
import { Vehicle } from "./model"

export function getVehicle(vehicleId: number) {
    return vehiclesPool.get(vehicleId)
}

export function createVehicle(model: number, position: WorldPosition, rotation: number, primaryColor = -1, secondaryColor = -1, respawnDelay = -1, addSiren = false) {
    const vehicleId = SampNatives.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, addSiren)
    if (vehicleId === undefined) {
        return undefined
    }
    SampNatives.setVehicleParamsEx(vehicleId, false, false, false, false, false, false, false)

    const vehicle = new Vehicle(vehicleId, model, primaryColor, secondaryColor)
    vehiclesPool.set(vehicleId, vehicle)

    EventEmit.vehicleCreate(vehicle)
    return vehicle
}

export function destroyVehicle(vehicle: Vehicle) {
    if (SampNatives.destroyVehicle(vehicle.id)) {
        EventEmit.vehicleDestroy(vehicle)
    }
    vehiclesPool.delete(vehicle.id)
}

export function getAllVehicles() {
    const vehicles = new Set<Vehicle>()
    for (const [vehicleId, vehicle] of vehiclesPool) {
        vehicles.add(vehicle)
    }
    return vehicles
}

export function getVehiclesInRange(position: WorldPosition, range: number, world?: number, interior?: number) {
    const vehicles = new Map<Vehicle, number>()

    for (const [vehicleId, vehicle] of vehiclesPool) {
        const distance = vehicle.getDistance(position, world, interior)
        
        if (distance < range) {
            vehicles.set(vehicle, distance)
        }
    }
    return vehicles
}