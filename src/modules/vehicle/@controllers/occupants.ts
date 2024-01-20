import { eventsMp } from "../../../singletons/events"

eventsMp.on("playerEnterVehicle", (player, vehicle) => {
	vehicle.occupants.add(player)
})

eventsMp.on("playerExitVehicle", (player, vehicle) => {
	vehicle?.occupants.delete(player)
})

eventsMp.on("playerDisconnect", (player) => {
	player.vehicle?.occupants.delete(player)
})
