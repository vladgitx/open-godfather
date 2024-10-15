import { nativeEvents } from "@/wrapper"
import { vehicleHandler } from "../handler"
import { playerHandler } from "@/components/player"
import { dispatcher } from "@/core/dispatcher"
import { vehicleInternalPaintjobId } from "../entity"

nativeEvents.onVehiclePaintjob((playerid, vehicleid, paintjobid) => {
    const player = playerHandler.atSampId(playerid)
    const vehicle = vehicleHandler.atSampId(vehicleid)

    if (vehicle) {
        vehicleInternalPaintjobId.set(vehicle, paintjobid)

        if (player) {
            dispatcher.emit("playerChangeVehiclePaintjob", player, vehicle, vehicle.paintjob)
        }
    }
})
