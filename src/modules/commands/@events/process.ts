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
        const hasListeners = dispatcher.emit("playerCommand", player, commandStr, command, () => command.callback(player, ...params))

        if (!hasListeners) {
            // The command will be executed directly if no "playerCommand" event listener is defined by the developer.
            void command.callback(player, ...params)
        }
    } else {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const hasListeners = dispatcher.emit("playerCommand", player, commandStr, undefined, () => {})

        if (!hasListeners) {
            player.sendMessage("OG: Unknown command.")
        }
    }

    return 1
})
