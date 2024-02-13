import { PlayerMp } from ".."
import { SampNatives } from "../../../wrapper"
import { PlayerStatesEnum, VehicleSeatsEnum } from "../../../shared/enums"
import { VehicleMp } from "../../vehicle"
import { eventsMp } from "../../../singletons/events"
import { vehiclesMp } from "../../../singletons/vehicles"

eventsMp.on("playerStateChange", (player, newState, oldState) => {
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
        eventsMp.emit("playerEnterVehicle", player, currentVehicle)
    } else if (
        (oldState === PlayerStatesEnum.Passenger || oldState === PlayerStatesEnum.Driver) &&
        newState !== PlayerStatesEnum.Passenger &&
        newState !== PlayerStatesEnum.Driver
    ) {
        const lastVehicleId = player.getVariable("internal::lastVehicleId")
        if (lastVehicleId === undefined) {
            return
        }

        player.deleteVariable("internal::lastVehicleId")
        eventsMp.emit("playerExitVehicle", player, vehiclesMp.at(lastVehicleId))
    }
})

export function putInVehicleWithEvent(player: PlayerMp, vehicle: VehicleMp, seat: VehicleSeatsEnum) {
    const oldVehicle = player.vehicle
    if (!oldVehicle || oldVehicle === vehicle) {
        return SampNatives.putPlayerInVehicle(player.id, vehicle.id, seat)
    }

    eventsMp.emit("playerExitVehicle", player, oldVehicle)

    SampNatives.putPlayerInVehicle(player.id, vehicle.id, seat)

    eventsMp.emit("playerEnterVehicle", player, vehicle)

    return true
}
