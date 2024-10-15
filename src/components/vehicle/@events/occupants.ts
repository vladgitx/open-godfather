import { dispatcher } from "@/core/dispatcher"
import { type Vehicle } from "../entity"
import { type Player } from "@/components/player"

const vehicleOccupants = new WeakMap<Vehicle, Set<Player>>()

dispatcher.on("playerEnterVehicle", (player, vehicle) => {
    vehicleOccupants.set(vehicle, (vehicleOccupants.get(vehicle) ?? new Set()).add(player))
})

dispatcher.on("playerExitVehicle", (player, vehicle) => {
    vehicle && vehicleOccupants.get(vehicle)?.delete(player)
})

dispatcher.on("playerDisconnect", (player) => {
    const { vehicle } = player

    vehicle && vehicleOccupants.get(vehicle)?.delete(player)
})

export function getVehicleOccupants(vehicle: Vehicle): Player[] {
    return [...(vehicleOccupants.get(vehicle) ?? [])]
}
