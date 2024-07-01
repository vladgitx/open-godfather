import { dispatcher } from "@/modules/dispatcher"
import { vehicleHandler } from "../handler"
import { playerHandler } from "@/modules/player"

samp.on("OnVehicleSpawn", (vehicleId) => {
    const vehicle = vehicleHandler.at(vehicleId)

    if (vehicle) {
        vehicle.params.reset()
        vehicle.params.windows.reset()
        
        dispatcher.emit("vehicleRespawn", vehicle)
    }
})

samp.on("OnVehicleDeath", (vehicleId, killerId) => {
    const vehicle = vehicleHandler.at(vehicleId)
    const killer = playerHandler.at(killerId)

    if (vehicle) {
        dispatcher.emit("vehicleDeath", vehicle, killer)
    }
})