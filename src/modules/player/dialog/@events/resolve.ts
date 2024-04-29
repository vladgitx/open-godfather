import { nativeEvents } from "@/natives"
import { dispatcher } from "@/modules/dispatcher"
import { playerHandler } from "../../handler"
import { dialogPromises } from "../instance"

nativeEvents.onDialogResponse((playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playerHandler.at(playerId)

    if (player) {
        dialogPromises.resolve(player, { action: Boolean(responseParam), item: listItemParam, input: inputText })
    }
})

dispatcher.on("playerDisconnect", (player) => {
    dialogPromises.resolve(player, undefined)
})
