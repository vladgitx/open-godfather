import { gameNatives } from "@/wrapper/game"
import { type Position3 } from "../../lib/vector3"
import { Vehicle } from "./entity"
import { EntityPool } from "@/lib/pool"

// Getting some weird issues from the native GetVehicleSpawnInfo, so storing it separately
// In my case, Streamer_GetNearbyItems will return pickups that exceed the range I set in the parameters, leading to bugs
export const vehicleSpawnInfo = new Map<Vehicle, { position: Position3; rotation: number; world: number; interior: number }>()

class VehicleHandler {
    readonly pool = new EntityPool<number, Vehicle>(Vehicle)

    new(
        model: number,
        position: Position3,
        rotation: number,
        world: number,
        interior: number,
        primaryColor = -1,
        secondaryColor = -1,
        respawnDelay = -1,
        siren = false,
    ) {
        const vehicleId = gameNatives.createVehicle(model, position, rotation, primaryColor, secondaryColor, respawnDelay, siren)

        if (vehicleId === undefined) {
            return undefined
        }

        const vehicle = new Vehicle(vehicleId, model, primaryColor, secondaryColor)
        EntityPool.add(this.pool, vehicleId, vehicle)

        vehicle.interior = interior
        vehicle.world = world

        vehicleSpawnInfo.set(vehicle, { position, rotation, world, interior })

        vehicle.onCleanup(() => {
            gameNatives.destroyVehicle(vehicleId)
            EntityPool.remove(this.pool, vehicleId, vehicle)
            vehicleSpawnInfo.delete(vehicle)
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

    getInRange(position: Position3, range: number, world?: number, interior?: number) {
        return this.pool.all.filter((vehicle) => {
            if (world !== undefined && vehicle.world !== world) {
                return false
            }

            if (interior !== undefined && vehicle.interior !== interior) {
                return false
            }

            return vehicle.position.distance(position) <= range
        })
    }
}

export const vehicles = new VehicleHandler()
