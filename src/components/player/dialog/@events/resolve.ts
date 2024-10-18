import { gameCallbacks } from "@/wrapper/game"
import { players } from "../../handler"
import { dialogPromises } from "../instance"

gameCallbacks.onDialogResponse((playerId, dialogId, responseParam, listItemParam, inputText) => {
    const player = players.pool.at(playerId)

    if (player) {
        const action = Boolean(responseParam)

        if (action) {
            dialogPromises.resolve(player, { action, item: listItemParam, input: inputText })
        } else {
            dialogPromises.resolve(player, { action })
        }
    }
})
