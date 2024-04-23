import { nativeEvents } from "@/natives"
import { commandFactory } from "../factory"
import { dispatcher } from "@/modules/dispatcher"
import { playerHandler } from "@/modules/player"

nativeEvents.onPlayerCommandText((playerId: number, cmdText: string) => {
    const player = playerHandler.at(playerId)

    if (!player) {
        return 1
    }

    const params = cmdText.trim().split(/\s+/)
    const commandStr = params[0].toLowerCase()

    params.shift()

    if (commandStr === "/") {
        return 1
    }

    const command = commandFactory.pool.get(commandStr)

    if (command) {
        dispatcher.emit("playerCommand", player, commandStr, command, () => command.callback(player, ...params))
    } else {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        dispatcher.emit("playerCommand", player, commandStr, undefined, () => {})
    }

    return 1
})
