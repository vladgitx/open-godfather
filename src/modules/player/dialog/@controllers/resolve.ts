import { eventsMp } from "../../../../singletons/events"
import { playersMp } from "../../../../singletons/players"
import { PlayerDialogFactory } from "../factory"

samp.on("OnDialogResponse", (playerId, dialogId, responseParam, listItemParam, inputText) => {
	const player = playersMp.at(playerId)
	if (player) {
		const response = responseParam === 1 ? "first" : responseParam === 0 ? "second" : undefined
		const listItem = listItemParam === -1 ? undefined : listItemParam

		PlayerDialogFactory.destroy(player, { response, listItem, inputText })
	}
})

eventsMp.on("playerDisconnect", (player) => {
	PlayerDialogFactory.destroy(player)
})
