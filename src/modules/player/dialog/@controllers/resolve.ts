import { eventsMp } from "../../../../singletons/events"
import { playersMp } from "../../../../singletons/players"
import { SampEvents } from "../../../../wrapper"
import { PlayerDialogFactory } from "../factory"

SampEvents.onDialogResponse((playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playersMp.at(playerId)

    if (player) {
        PlayerDialogFactory.destroy(player, { button: responseParam ? "main" : "second", item: listItemParam, input: inputText })
    }
})

eventsMp.on("playerDisconnect", (player) => {
    PlayerDialogFactory.destroy(player, undefined)
})
