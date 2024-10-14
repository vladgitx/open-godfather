import { dispatcher } from "@/lib/dispatcher"

dispatcher.on("playerEnterVehicle", (player, vehicle) => {
    vehicle.occupants.add(player)
})

dispatcher.on("playerExitVehicle", (player, vehicle) => {
    vehicle?.occupants.delete(player)
})

dispatcher.on("playerDisconnect", (player) => {
    player.vehicle?.occupants.delete(player)
})
