import { playersMp } from "@/singletons/players"
import { SampEvents } from "@/wrapper"
import { PlayerDialogFactory } from "../factory"
import { dispatcher } from "@/modules/dispatcher"

SampEvents.onDialogResponse((playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playersMp.at(playerId)

    if (player) {
        PlayerDialogFactory.destroy(player, { button: responseParam ? "main" : "second", item: listItemParam, input: inputText })
    }
})

dispatcher.on("playerDisconnect", (player) => {
    PlayerDialogFactory.destroy(player, undefined)
})
