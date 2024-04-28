import { nativeEvents } from "@/natives"
import { vehicleHandler } from "../handler"
import { playerHandler } from "@/modules/player"
import { dispatcher } from "@/modules/dispatcher"

nativeEvents.onVehiclePaintjob((playerid, vehicleid, paintjobid) => {
    const player = playerHandler.at(playerid)
    const vehicle = vehicleHandler.at(vehicleid)

    if (vehicle) {
        vehicle.setVariable("vehicle::internal::paintjobId", paintjobid)

        if (player) {
            dispatcher.emit("playerChangeVehiclePaintjob", player, vehicle, vehicle.paintjob)
        }
    }
})
