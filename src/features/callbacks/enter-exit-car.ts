import { PlayerStateEnum, Players, Vehicle, Vehicles } from "../.."
import { Natives } from "../../scripting-api"
import { PlayerEvent, playerEvent } from "../../classes/player-event"

const playerLastVehicle = new Map<number, Vehicle>()

PlayerEvent.postDisconnect((player) => {
    playerLastVehicle.delete(player.id)
    player.vehicle?.occupants.delete(player)
})

PlayerEvent.stateChange((player, newState, oldState) => {
    if (newState === PlayerStateEnum.PASSENGER || newState === PlayerStateEnum.DRIVER) {
        const vehicle = player.vehicle

        if (playerLastVehicle.get(player.id) != vehicle) {
            if (vehicle !== undefined) {
                playerLastVehicle.set(player.id, vehicle)
                vehicle.occupants.add(player)

                playerEvent.emit("enterVehicle", player, vehicle)
            }
        }
    } else if (oldState === PlayerStateEnum.PASSENGER || oldState === PlayerStateEnum.DRIVER) {
        const vehicle = player.vehicle

        if (playerLastVehicle.get(player.id) != vehicle) {
            const lastVehicle = playerLastVehicle.get(player.id)

            if (lastVehicle !== undefined) {
                lastVehicle.occupants.delete(player)
                playerEvent.emit("exitVehicle", player, lastVehicle.isValid ? lastVehicle : undefined)
            }
            playerLastVehicle.delete(player.id)
        }
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
        return false
    }
    const oldVehicle = Vehicles.at(oldVehicleId)
    if (oldVehicle !== undefined) {
        oldVehicle.occupants.delete(player)
        playerEvent.emit("exitVehicle", player, oldVehicle)
    }
    Natives.putPlayerInVehicle(playerId, vehicleId, seatId)

    const vehicle = Vehicles.at(vehicleId)
    if (vehicle !== undefined) {
        vehicle.occupants.add(player)
        playerEvent.emit("enterVehicle", player, vehicle)
    }
    return true
}