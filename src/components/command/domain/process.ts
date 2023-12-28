import SampNatives from "../../../shared/samp-natives"
import { EventEmit } from "../../event"
import { Player, getPlayer } from "../../player"
import { commandCallbacks } from "./pool"

SampNatives.on("OnPlayerCommandText", (playerId: number, cmdText: string) => {
    const player = getPlayer(playerId)
    if (player === undefined) {
        return 1
    }

    const params = cmdText.trim().split(/\s+/)
    const command = params[0].toLowerCase()
    params.shift()

    if (command === "/") {
        return 1
    }

    const callback = commandCallbacks.get(command)
    if (callback) {
        EventEmit.playerCommand(player, command, () => callback(player, ...params))
    } else {
        EventEmit.playerCommand(player, command)
    }

    return 1
})