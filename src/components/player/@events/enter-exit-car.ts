import { type Player } from ".."
import { gameNatives } from "@/wrapper/game"
import { type Vehicle, vehicles } from "../../vehicle"
import { dispatcher } from "@/lib/dispatcher"
import { VEHICLE_SEATS, type VehicleSeat } from "@/wrapper/game/enums.public"
import { searchPoolValuesForEntityUUID } from "@/lib/pool"

const lastVehicleUUID = new WeakMap<Player, string>()

dispatcher.on("playerStateChange", (player, newState, oldState) => {
    if (
        // Check if a player is in a vehicle and was not in a vehicle before
        (newState === "passenger" || newState === "driver") &&
        oldState !== "passenger" &&
        oldState !== "driver"
    ) {
        const { vehicle } = player

        if (!vehicle) {
            return
        }

        lastVehicleUUID.set(player, vehicle.uuid)
        dispatcher.emit("playerEnterVehicle", player, vehicle)
    } else if (
        // Check if a player is not in a vehicle and was in a vehicle before
        (oldState === "passenger" || oldState === "driver") &&
        newState !== "passenger" &&
        newState !== "driver"
    ) {
        const uuid = lastVehicleUUID.get(player)

        if (uuid === undefined) {
            return
        }

        lastVehicleUUID.delete(player)
        dispatcher.emit("playerExitVehicle", player, searchPoolValuesForEntityUUID(vehicles.pool, uuid))
    }
})

export function putInVehicleWithEvent(player: Player, vehicle: Vehicle, seat: VehicleSeat) {
    const oldVehicle = player.vehicle

    if (!oldVehicle || oldVehicle === vehicle) {
        return gameNatives.putPlayerInVehicle(player.id, vehicle.id, VEHICLE_SEATS[seat])
    }

    dispatcher.emit("playerExitVehicle", player, oldVehicle)

    gameNatives.putPlayerInVehicle(player.id, vehicle.id, VEHICLE_SEATS[seat])

    dispatcher.emit("playerEnterVehicle", player, vehicle)

    return true
}
