import SampNatives from "../../../shared/samp-natives"
import { EventEmit } from "../../event"
import { Player, getPlayer } from "../../player"
import { CommandResponseEnum } from "../public/enums"
import { commandCallbacks } from "./pool"

SampNatives.on("OnPlayerCommandText", (playerId: number, cmdText: string) => {
    console.log("OnPlayerCommandText")
    const player = getPlayer(playerId)
    if (player === undefined) {
        console.log("undefined player", player)
        return 1
    }

    const params = cmdText.trim().split(/\s+/)
    const command = params[0].toLowerCase()
    params.shift()

    if (command === "/") {
        console.log("undefined command", command)
        return 1
    }

    if (isSpammingCommands(player)) {
        console.log("is spamming")
        EventEmit.playerCommand(player, command, CommandResponseEnum.SPAM)
        return 1
    }

    if (!player.commands) {
        console.log("is restricted")
        EventEmit.playerCommand(player, command, CommandResponseEnum.RESTRICTED)
        return 1
    }

    const callback = commandCallbacks.get(command)
    if (callback) {
        console.log("callback found")
        EventEmit.playerCommand(player, command, CommandResponseEnum.SUCCESS)
        callback(player, ...params)
    } else {
        console.log("callback not found")
        EventEmit.playerCommand(player, command, CommandResponseEnum.NOT_FOUND)
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