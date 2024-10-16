import { dispatcher } from "@/core/dispatcher"
import { vehicleHandler } from "../handler"
import { playerHandler } from "@/components/player"
import { nativeEvents } from "@/wrapper"

// "OnVehicleSpawn" is a misleading name because it's called only when the vehicle RESPAWNS
nativeEvents.onVehicleSpawn((vehicleId) => {
    const vehicle = vehicleHandler.atSampId(vehicleId)

    if (vehicle) {
        vehicle.params.reset()
        vehicle.params.windows.reset()

        dispatcher.emit("vehicleRespawn", vehicle)
    }
})

nativeEvents.onVehicleDeath((vehicleId, closestPlayerId) => {
    const vehicle = vehicleHandler.atSampId(vehicleId)
    const closestPlayer = playerHandler.atSampId(closestPlayerId)

    if (vehicle) {
        dispatcher.emit("vehicleDeath", vehicle, closestPlayer)
    }
})
