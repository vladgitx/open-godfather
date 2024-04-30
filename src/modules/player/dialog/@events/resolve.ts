import { nativeEvents } from "@/natives"
import { playerHandler } from "../../handler"
import { dialogPromises } from "../instance"

nativeEvents.onDialogResponse((playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = playerHandler.at(playerId)

    if (player) {
        dialogPromises.resolve(player, { action: Boolean(responseParam), item: listItemParam, input: inputText })
    }
})
