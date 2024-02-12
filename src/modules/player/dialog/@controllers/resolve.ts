import { eventsMp } from "../../../../singletons/events"
import { playersMp } from "../../../../singletons/players"
import { PlayerDialogFactory } from "../factory"

samp.on("OnDialogResponse", (playerId, dialogId, responseParam, listItemParam, inputText) => {
	const player = playersMp.at(playerId)

	if (player) {
		const button = responseParam === 1 ? "main" : "second"
		const item = listItemParam === -1 ? undefined : listItemParam

		PlayerDialogFactory.destroy(player, { button, item, input: inputText })
	}
})

eventsMp.on("playerDisconnect", (player) => {
	PlayerDialogFactory.destroy(player, undefined)
})
