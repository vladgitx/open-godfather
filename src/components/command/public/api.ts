import { commandCallbacks, commandsPool } from "../domain/pool"
import { Command } from "./model"
import { CommandCallback } from "./types"

export function addCommand(name: string, aliases: string[], callback: CommandCallback, info = "") {
    if (aliases.includes(name)) {
        throw new Error(`Command "${name}" can't have an alias with the same name!`)
    }
    if (getCommand(name)) {
        throw new Error(`Command "${name}" already exists!`)
    }
    for (const alias of aliases) {
        if (getCommand(alias)) {
            throw new Error(`Alias "${alias}" of command "${name}" already exists!`)
        }
    }

    for (const alias of aliases) {
        commandCallbacks.set(alias, callback)
    }
    commandCallbacks.set(name, callback)

    const command = new Command(name, aliases, callback, info)
    commandsPool.set(name, command)

    return command
}

export function getCommand(name: string) {
    const command = commandsPool.get(name)
    if (command) {
        return command
    }
    for (const [nameKey, command] of commandsPool) {
        if (command.aliases.includes(name)) {
            return command
        }
    }
    return undefined
}

export function getAllCommands() {
    const commands = new Set<Command>()
    for (const [name, command] of commandsPool) {
        commands.add(command)
    }
    return commands
}