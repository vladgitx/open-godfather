import { PlayerStateEnum, og } from "../.."
import { Natives } from "../../scripting-api"

og.events.on("playerDisconnect", (player) => {
    player.vehicle?.occupants.delete(player.id)
})

og.events.on("playerStateChange", (player, newState, oldState) => {
    if ((newState === PlayerStateEnum.PASSENGER || newState === PlayerStateEnum.DRIVER) && oldState !== PlayerStateEnum.PASSENGER && oldState !== PlayerStateEnum.DRIVER) {
        const currentVehicle = player.vehicle
        if (currentVehicle === undefined) {
            return
        }
        player.setVariable("lastVehicleId", currentVehicle.id)
        currentVehicle.occupants.add(player.id)
        og.events.emit("playerEnterVehicle", player, currentVehicle)
    } else if ((oldState === PlayerStateEnum.PASSENGER || oldState === PlayerStateEnum.DRIVER) && newState !== PlayerStateEnum.PASSENGER && newState !== PlayerStateEnum.DRIVER) {
        const lastVehicleId = player.getVariable("lastVehicleId")
        if (lastVehicleId === undefined) {
            return
        }
        const lastVehicle = og.vehicles.at(lastVehicleId)

        lastVehicle?.occupants.delete(player.id)
        og.events.emit("playerExitVehicle", player, lastVehicle)
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
    const player = og.players.at(playerId)
    if (player === undefined) {
        return Natives.putPlayerInVehicle(playerId, vehicleId, seatId)
    }
    const oldVehicle = og.vehicles.at(oldVehicleId)
    oldVehicle?.occupants.delete(player.id)
    og.events.emit("playerExitVehicle", player, oldVehicle)

    Natives.putPlayerInVehicle(playerId, vehicleId, seatId)

    const vehicle = og.vehicles.at(vehicleId)
    if (vehicle !== undefined) {
        vehicle.occupants.add(player.id)
        og.events.emit("playerEnterVehicle", player, vehicle)
    }
    return true
}