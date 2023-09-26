import SampNatives from "../../../shared/samp-natives"
import { EventEmit } from "../../event"
import { Player, getPlayer } from "../../player"
import { CommandResponses } from "../public/enums"
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

    if (isSpammingCommands(player)) {
        EventEmit.playerCommand(player, command, CommandResponses.Spam)
        return 1
    }

    if (!player.commands) {
        EventEmit.playerCommand(player, command, CommandResponses.Restricted)
        return 1
    }

    const callback = commandCallbacks.get(command)
    if (callback) {
        EventEmit.playerCommand(player, command, CommandResponses.Success)
        callback(player, ...params)
    } else {
        EventEmit.playerCommand(player, command, CommandResponses.NotFound)
    }

    return 1
})

function isSpammingCommands(player: Player) {
    const now = Date.now()
    if (now - (player.getVariable("internal::lastCmdDate") || 0) < 1000) {
        player.setVariable("internal::lastCmdDate", now)
        return true
    }
    player.setVariable("internal::lastCmdDate", now)
    return false
}