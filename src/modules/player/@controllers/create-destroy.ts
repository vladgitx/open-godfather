import { eventsMp } from "../../../singletons/events"
import { PlayerMpFactory } from "../factory"

samp.on("OnPlayerConnect", (playerId) => {
	const player = PlayerMpFactory.new(playerId)
	if (player) {
		eventsMp.emit("playerConnect", player)
	}
})

samp.on("OnPlayerDisconnect", (playerId, reason) => {
	const player = PlayerMpFactory.at(playerId)
	if (player) {
		eventsMp.emit("playerDisconnect", player, reason)
		PlayerMpFactory.destroy(player)
	}
})
