import { eventsMp } from "../../../../singletons/events"
import { playersMp } from "../../../../singletons/players"
import { PlayerDialogFactory } from "../factory"

samp.on("OnDialogResponse", (playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playersMp.at(playerId)

    if (player) {
        PlayerDialogFactory.destroy(player, { button: responseParam === 1 ? "main" : "second", item: listItemParam, input: inputText })
    }
})

eventsMp.on("playerDisconnect", (player) => {
    PlayerDialogFactory.destroy(player, undefined)
})
