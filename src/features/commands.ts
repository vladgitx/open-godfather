import {
    Player,
    Players,
} from ".."
import { playerEvent } from "../classes/player-event"
import { SampNode } from "../scripting-api"

type CommandCallback = (player: Player, commandUsed: string, ...params: string[]) => void
const definedCommands: Record<string, CommandCallback> = {}

export enum CommandResponseEnum {
    NOT_FOUND = 0,
    SUCCESS = 1,
}

export function addCommand(commands: string | string[], callback: CommandCallback) {
    const commandList = Array.isArray(commands) ? commands : [commands]
    for (const command of commandList) {
        if (definedCommands[command]) {
            console.error(`ERROR: ${command} command was not created because a command with the same name already exists.`)
            continue
        }
        definedCommands[command] = callback
    }
}

SampNode.on("OnPlayerCommandText", (playerId: number, cmdText: string) => {
    const player = Players.get(playerId)
    if (player === undefined) {
        return 1
    }
    const params = cmdText.trim().split(/\s+/)
    const command = params[0].toLowerCase()
    params.shift()

    if (command === "/") {
        return 1
    }
    const handler = definedCommands[command]
    
    if (handler) {
        playerEvent.emit("commandPerformed", player, command, CommandResponseEnum.SUCCESS)
        handler(player, command, ...params)
    } else {
        playerEvent.emit("commandPerformed", player, command, CommandResponseEnum.NOT_FOUND)
    }
    return 1
})