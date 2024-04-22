import { nativeEvents } from "@/wrapper"
import { playerDialogFactory } from "../factory"
import { dispatcher } from "@/modules/dispatcher"
import { playerHandler } from "../../handler"

nativeEvents.onDialogResponse((playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playerHandler.at(playerId)

    if (player) {
        playerDialogFactory.destroy(player, { action: responseParam, item: listItemParam, input: inputText })
    }
})

dispatcher.on("playerDisconnect", (player) => {
    playerDialogFactory.destroy(player, undefined)
})