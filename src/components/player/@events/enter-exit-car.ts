import { type Player } from ".."
import { gameNatives } from "@/wrapper/game"
import { type Vehicle, vehicles } from "../../vehicle"
import { dispatcher } from "@/lib/dispatcher"
import { VEHICLE_SEATS, type VehicleSeat } from "@/wrapper/game/enums.public"

const lastVehicleReferenceId = new WeakMap<Player, bigint>()

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

        lastVehicleReferenceId.set(player, vehicle.refId)
        dispatcher.emit("playerEnterVehicle", player, vehicle)
    } else if (
        // Check if a player is not in a vehicle and was in a vehicle before
        (oldState === "passenger" || oldState === "driver") &&
        newState !== "passenger" &&
        newState !== "driver"
    ) {
        const lastVehicleRefId = lastVehicleReferenceId.get(player)

        if (lastVehicleRefId === undefined) {
            return
        }

        lastVehicleReferenceId.delete(player)
        dispatcher.emit("playerExitVehicle", player, vehicles.pool.atRefId(lastVehicleRefId))
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
