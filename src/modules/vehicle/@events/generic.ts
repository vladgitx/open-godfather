import { dispatcher } from "@/modules/dispatcher"
import { vehicleHandler } from "../handler"
import { playerHandler } from "@/modules/player"

// "OnVehicleSpawn" is a misleading name because it's called only when the vehicle RESPAWNS
samp.on("OnVehicleSpawn", (vehicleId) => {
    const vehicle = vehicleHandler.at(vehicleId)

    if (vehicle) {
        vehicle.params.reset()
        vehicle.params.windows.reset()

        dispatcher.emit("vehicleRespawn", vehicle)
    }
})

samp.on("OnVehicleDeath", (vehicleId, closestPlayerId) => {
    const vehicle = vehicleHandler.at(vehicleId)
    const closestPlayer = playerHandler.at(closestPlayerId)

    if (vehicle) {
        dispatcher.emit("vehicleDeath", vehicle, closestPlayer)
    }
})
