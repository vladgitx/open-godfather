import { dispatcher } from "@/modules/dispatcher"
import { vehicleHandler } from "../handler"

samp.on("OnVehicleSpawn", (vehicleId) => {
    const vehicle = vehicleHandler.at(vehicleId)

    if (vehicle) {
        vehicle.params.reset()
        vehicle.params.windows.reset()
        
        dispatcher.emit("vehicleRespawn", vehicle)
    }
})