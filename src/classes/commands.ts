import { og } from ".."
import { CommandResponseEnum } from "../common/enums"
import { SampNode } from "../scripting-api"
import { Command, CommandCallback } from "./command"

SampNode.on("OnPlayerCommandText", (playerId: number, cmdText: string) => {
    const player = og.players.at(playerId)
    if (player === undefined) {
        return 1
    }

    const params = cmdText.trim().split(/\s+/)
    const command = params[0].toLowerCase()
    params.shift()

    if (command === "/") {
        return 1
    }

    if (!player.commands) {
        og.events.emit("playerPerformCommand", player, command, CommandResponseEnum.RESTRICTED)
        return 1
    }

    const callback = og.commands.getCallback(command)
    if (callback) {
        og.events.emit("playerPerformCommand", player, command, CommandResponseEnum.SUCCESS)
        callback(player, ...params)
    } else {
        og.events.emit("playerPerformCommand", player, command, CommandResponseEnum.NOT_FOUND)
    }

    return 1
})

export class Commands {
    private pool: Map<string, Command>
    private callbacks: Map<string, CommandCallback>

    constructor() {
        this.pool = new Map()
        this.callbacks = new Map()
    }

    at(name: string) {
        const command = this.pool.get(name)
        if (command) {
            return command
        }
        for (const [nameKey, command] of this.pool) {
            if (command.aliases.includes(name)) {
                return command
            }
        }
        return undefined
    }

    add(name: string, aliases: string[], callback: CommandCallback, info = "") {
        if (aliases.includes(name)) {
            throw new Error(`Command "${name}" can't have an alias with the same name!`)
        }
        if (this.at(name)) {
            throw new Error(`Command "${name}" already exists!`)
        }
        for (const alias of aliases) {
            if (this.at(alias)) {
                throw new Error(`Alias "${alias}" of command "${name}" already exists!`)
            }
        }

        for (const alias of aliases) {
            this.callbacks.set(alias, callback)
        }
        this.callbacks.set(name, callback)

        const command = new Command(name, aliases, callback, info)
        this.pool.set(name, command)

        return command
    }

    getCallback(commandName: string) {
        return this.callbacks.get(commandName)
    }

    get all(): ReadonlyMap<string, Command> {
        return this.pool
    }
}