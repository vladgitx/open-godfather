import { eventsMp } from "../../../singletons/events"
import { playersMp } from "../../../singletons/players"
import { CommandMpFactory } from "../factory"

samp.on("OnPlayerCommandText", (playerId: number, cmdText: string) => {
    const player = playersMp.at(playerId)
    if (!player) {
        return 1
    }

    const params = cmdText.trim().split(/\s+/)
    const commandStr = params[0].toLowerCase()

    params.shift()

    if (commandStr === "/") {
        return 1
    }

    const command = CommandMpFactory.at(commandStr)
    if (command) {
        eventsMp.emit("playerCommand", player, commandStr, command, () => command.callback(player, ...params))
    } else {
        eventsMp.emit("playerCommand", player, commandStr, undefined, () => {})
    }

    return 1
})
