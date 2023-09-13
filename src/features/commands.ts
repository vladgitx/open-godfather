import {
    Player,
    Players,
} from ".."
import { playerEvent } from "../classes/player-event"
import { SampNode } from "../scripting-api"

type CommandCallback = (player: Player, ...params: string[]) => void
const commandsInternal = new Map<string, CommandCallback>()

export enum CommandResponseEnum {
    NOT_FOUND = 0,
    SUCCESS = 1,
}

export function addCommand(commands: string | string[], callback: CommandCallback) {
    const commandList = Array.isArray(commands) ? commands : [commands]
    const validCommands: string[] = []

    for (const command of commandList) {
        if (commandsInternal.has(command)) {
            console.error(`[error] command "${command}" was not created because it's already defined.`)
        } else {
            commandsInternal.set(command, callback) 
            validCommands.push(command)
        }
    }
    return validCommands
}

SampNode.on("OnPlayerCommandText", (playerId: number, cmdText: string) => {
    const player = Players.at(playerId)
    if (player === undefined) {
        return 1
    }
    const params = cmdText.trim().split(/\s+/)
    const command = params[0].toLowerCase()
    params.shift()

    if (command === "/") {
        return 1
    }
    const handler = commandsInternal.get(command)
    
    if (handler !== undefined) {
        playerEvent.emit("commandPerformed", player, command, CommandResponseEnum.SUCCESS)
        handler(player, ...params)
    } else {
        playerEvent.emit("commandPerformed", player, command, CommandResponseEnum.NOT_FOUND)
    }
    return 1
})