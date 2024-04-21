import { type PlayerMp } from ".."
import { sampNatives } from "@/wrapper"
import { PlayerStatesEnum, type VehicleSeatsEnum } from "@/shared/enums"
import { type VehicleMp, vehicleHandler } from "../../vehicle"
import { dispatcher } from "@/modules/dispatcher"

dispatcher.on("playerStateChange", (player, newState, oldState) => {
    if (
        (newState === PlayerStatesEnum.Passenger || newState === PlayerStatesEnum.Driver) &&
        oldState !== PlayerStatesEnum.Passenger &&
        oldState !== PlayerStatesEnum.Driver
    ) {
        const currentVehicle = player.vehicle
        if (currentVehicle === undefined) {
            return
        }

        player.setVariable("internal::lastVehicleId", currentVehicle.id)
        dispatcher.emit("playerEnterVehicle", player, currentVehicle)
    } else if (
        (oldState === PlayerStatesEnum.Passenger || oldState === PlayerStatesEnum.Driver) &&
        newState !== PlayerStatesEnum.Passenger &&
        newState !== PlayerStatesEnum.Driver
    ) {
        const lastVehicleId = player.getVariable("internal::lastVehicleId") as number | undefined

        if (lastVehicleId === undefined) {
            return
        }

        player.deleteVariable("internal::lastVehicleId")
        dispatcher.emit("playerExitVehicle", player, vehicleHandler.at(lastVehicleId))
    }
})

export function putInVehicleWithEvent(player: PlayerMp, vehicle: VehicleMp, seat: VehicleSeatsEnum) {
    const oldVehicle = player.vehicle
    if (!oldVehicle || oldVehicle === vehicle) {
        return sampNatives.putPlayerInVehicle(player.id, vehicle.id, seat)
    }

    dispatcher.emit("playerExitVehicle", player, oldVehicle)

    sampNatives.putPlayerInVehicle(player.id, vehicle.id, seat)

    dispatcher.emit("playerEnterVehicle", player, vehicle)

    return true
}
