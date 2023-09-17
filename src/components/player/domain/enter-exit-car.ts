import { PlayerStateEnum } from "../../../shared/enums"
import SampNatives from "../../../shared/samp-natives"
import { EventEmit, EventOn } from "../../event"
import { getVehicle } from "../../vehicle"
import { getPlayer } from "../public/api"

EventOn.playerStateChange((player, newState, oldState) => {
    if ((newState === PlayerStateEnum.PASSENGER || newState === PlayerStateEnum.DRIVER) && oldState !== PlayerStateEnum.PASSENGER && oldState !== PlayerStateEnum.DRIVER) {

        const currentVehicle = player.vehicle
        if (currentVehicle === undefined) {
            return
        }

        player.setVariable("internal::lastVehicleId", currentVehicle.id)
        EventEmit.playerEnterVehicle(player, currentVehicle)
        
    } else if ((oldState === PlayerStateEnum.PASSENGER || oldState === PlayerStateEnum.DRIVER) && newState !== PlayerStateEnum.PASSENGER && newState !== PlayerStateEnum.DRIVER) {

        const lastVehicleId = player.getVariable("internal::lastVehicleId")
        if (lastVehicleId === undefined) {
            return
        }

        EventEmit.playerExitVehicle(player, getVehicle(lastVehicleId))
        player.deleteVariable("internal::lastVehicleId")
    }
})

export function putInVehicleWithEvent(playerId: number, vehicleId: number, seatId: number = 0) {
    const oldVehicleId = SampNatives.getPlayerVehicleId(playerId)
    if (oldVehicleId === undefined || oldVehicleId === vehicleId) {
        return SampNatives.putPlayerInVehicle(playerId, vehicleId, seatId)
    }

    if (!SampNatives.isValidVehicle(vehicleId) || !SampNatives.isPlayerConnected(playerId)) {
        return false
    }
    
    const player = getPlayer(playerId)
    if (player === undefined) {
        return SampNatives.putPlayerInVehicle(playerId, vehicleId, seatId)
    }

    const oldVehicle = getVehicle(oldVehicleId)
    EventEmit.playerExitVehicle(player, oldVehicle)

    SampNatives.putPlayerInVehicle(playerId, vehicleId, seatId)

    const vehicle = getVehicle(vehicleId)
    if (vehicle !== undefined) {
        EventEmit.playerEnterVehicle(player, vehicle)
    }

    return true
}