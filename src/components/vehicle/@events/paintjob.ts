import { gameCallbacks } from "@/wrapper/game"
import { vehicles } from "../handler"
import { players } from "@/components/player"
import { dispatcher } from "@/lib/dispatcher"
import { Vehicle } from "../entity"

gameCallbacks.onVehiclePaintjob((playerid, vehicleid, paintjobid) => {
    const player = players.pool.at(playerid)
    const vehicle = vehicles.pool.at(vehicleid)

    if (vehicle) {
        Vehicle.setInternalPaintjobId(vehicle, paintjobid)

        if (player) {
            dispatcher.emit("playerChangeVehiclePaintjob", player, vehicle, vehicle.paintjob)
        }
    }
})
