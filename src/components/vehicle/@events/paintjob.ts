import { nativeEvents } from "@/natives"
import { vehicleHandler } from "../handler"
import { playerHandler } from "@/components/player"
import { dispatcher } from "@/modules/dispatcher"
import { vehicleInternalPaintjobId } from "../entity"

nativeEvents.onVehiclePaintjob((playerid, vehicleid, paintjobid) => {
    const player = playerHandler.at(playerid)
    const vehicle = vehicleHandler.at(vehicleid)

    if (vehicle) {
        vehicleInternalPaintjobId.set(vehicle, paintjobid)

        if (player) {
            dispatcher.emit("playerChangeVehiclePaintjob", player, vehicle, vehicle.paintjob)
        }
    }
})
