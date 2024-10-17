import { type Player } from ".."
import { nativeFunctions } from "@/wrapper"
import { type Vehicle, vehicleHandler } from "../../vehicle"
import { dispatcher } from "@/core/dispatcher"
import { VEHICLE_SEATS, type VehicleSeat } from "@/utils/enums"

const lastVehicleReferenceId = new WeakMap<Player, number>()

dispatcher.on("playerStateChange", (player, newState, oldState) => {
    if (
        // Check if a player is in a vehicle and was not in a vehicle before
        (newState === "passenger" || newState === "driver") &&
        oldState !== "passenger" &&
        oldState !== "driver"
    ) {
        const currentVehicle = player.vehicle

        if (!currentVehicle) {
            return
        }

        lastVehicleReferenceId.set(player, currentVehicle.referenceId)
        dispatcher.emit("playerEnterVehicle", player, currentVehicle)
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
        dispatcher.emit("playerExitVehicle", player, vehicleHandler.atReferenceId(lastVehicleRefId))
    }
})

export function putInVehicleWithEvent(player: Player, vehicle: Vehicle, seat: VehicleSeat) {
    const oldVehicle = player.vehicle

    if (!oldVehicle || oldVehicle === vehicle) {
        return nativeFunctions.putPlayerInVehicle(player.sampId, vehicle.sampId, VEHICLE_SEATS[seat])
    }

    dispatcher.emit("playerExitVehicle", player, oldVehicle)

    nativeFunctions.putPlayerInVehicle(player.sampId, vehicle.sampId, VEHICLE_SEATS[seat])

    dispatcher.emit("playerEnterVehicle", player, vehicle)

    return true
}
