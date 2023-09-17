import { EventOn } from "../../event"
import { Player } from "../../player"
import { Vehicle } from "../public/model"

EventOn.playerEnterVehicle((player, vehicle) => {
    const occupants = vehicle.getVariable("internal::occupants")
    if (!occupants) {
        vehicle.setVariable("internal::occupants", new Set<number>([player.id]))
    } else {
        vehicle.setVariable("internal::occupants", occupants.add(player.id))
    }
})

EventOn.playerExitVehicle((player, vehicle) => {
    if (vehicle) {
        removeVehicleOccupant(player)
    }
})

EventOn.playerDisconnect((player) => {
    removeVehicleOccupant(player)
})

function removeVehicleOccupant(player: Player) {
    const vehicle = player.vehicle
    if (!vehicle) {
        return
    }

    const occupants = vehicle.getVariable("internal::occupants")
    if (!occupants) {
        return
    }

    occupants.delete(player.id)
    vehicle.setVariable("internal::occupants", occupants)
}

export function getVehicleOccupants(vehicle: Vehicle) {
    const occupants = vehicle.getVariable("internal::occupants")
    if (!occupants) {
        return new Set<number>()
    }
    return new Set<number>(occupants)
}