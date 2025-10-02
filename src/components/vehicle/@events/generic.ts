import { dispatcher } from "@/lib/dispatcher"
import { vehicles, vehicleSpawnInfo } from "../handler"
import { players } from "@/components/player"
import { gameCallbacks } from "@/wrapper/game"

// "OnVehicleSpawn" is a misleading name because it's called only when the vehicle RESPAWNS
gameCallbacks.onVehicleSpawn((vehicleId) => {
    const vehicle = vehicles.pool.at(vehicleId)

    if (vehicle) {
        vehicle.params.reset()
        vehicle.params.windows.reset()

        const { world, interior } = vehicleSpawnInfo.get(vehicle) ?? { world: 0, interior: 0 }

        vehicle.world = world
        vehicle.interior = interior

        dispatcher.emit("vehicleRespawn", vehicle)
    }
})

gameCallbacks.onVehicleDeath((vehicleId, closestPlayerId) => {
    const vehicle = vehicles.pool.at(vehicleId)
    const closestPlayer = players.pool.at(closestPlayerId)

    if (vehicle) {
        dispatcher.emit("vehicleDeath", vehicle, closestPlayer)
    }
})
