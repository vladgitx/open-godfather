import { PlayerStateEnum, Players, Vehicles } from "../.."
import { Natives } from "../../scripting-api"
import { PlayerEvent, playerEvent } from "../../classes/player-event"

PlayerEvent.disconnect((player) => {
    player.vehicle?.occupants.delete(player.id)
})

PlayerEvent.stateChange((player, newState, oldState) => {
    if ((newState === PlayerStateEnum.PASSENGER || newState === PlayerStateEnum.DRIVER) && oldState !== PlayerStateEnum.PASSENGER && oldState !== PlayerStateEnum.DRIVER) {
        const currentVehicle = player.vehicle
        if (currentVehicle === undefined) {
            return
        }
        player.setVariable("lastVehicleId", currentVehicle.id)
        currentVehicle.occupants.add(player.id)
        playerEvent.emit("enterVehicle", player, currentVehicle)
    } else if ((oldState === PlayerStateEnum.PASSENGER || oldState === PlayerStateEnum.DRIVER) && newState !== PlayerStateEnum.PASSENGER && newState !== PlayerStateEnum.DRIVER) {
        const lastVehicleId = player.getVariable("lastVehicleId")
        if (lastVehicleId === undefined) {
            return
        }
        const lastVehicle = Vehicles.at(lastVehicleId)

        lastVehicle?.occupants.delete(player.id)
        playerEvent.emit("exitVehicle", player, lastVehicle)
        player.deleteVariable("lastVehicleId")
    }
})

export function godfather_putPlayerInVehicle(playerId: number, vehicleId: number, seatId: number = 0) {
    const oldVehicleId = Natives.getPlayerVehicleId(playerId)
    if (oldVehicleId === undefined || oldVehicleId === vehicleId) {
        return Natives.putPlayerInVehicle(playerId, vehicleId, seatId)
    }
    if (!Natives.isValidVehicle(vehicleId) || !Natives.isPlayerConnected(playerId)) {
        return false
    }
    const player = Players.at(playerId)
    if (player === undefined) {
        return Natives.putPlayerInVehicle(playerId, vehicleId, seatId)
    }
    const oldVehicle = Vehicles.at(oldVehicleId)
    oldVehicle?.occupants.delete(player.id)
    playerEvent.emit("exitVehicle", player, oldVehicle)

    Natives.putPlayerInVehicle(playerId, vehicleId, seatId)

    const vehicle = Vehicles.at(vehicleId)
    if (vehicle !== undefined) {
        vehicle.occupants.add(player.id)
        playerEvent.emit("enterVehicle", player, vehicle)
    }
    return true
}