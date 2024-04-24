import { type CommandCallback } from "./@types/callback"
import { Command } from "./instance"

class CommandFactory {
    pool = new Map<string, Command>()

    new = (name: string, aliases: string[], callback: CommandCallback) => {
        if (aliases.includes(name)) {
            throw new Error(`Command ${name} cannot be an alias of itself`)
        }

        if (this.pool.get(name)) {
            // It throws a TypeError at runtime if the function is not an arrow function
            throw new Error(`Command ${name} already exists`)
        }

        for (const alias of aliases) {
            if (this.pool.get(alias)) {
                throw new Error(`You're using alias ${alias} for command ${name}, but that alias already exists as another command`)
            }
        }

        for (const command of this.pool.values()) {
            if (command.aliases.includes(name)) {
                throw new Error(`Command name ${name} is used as an alias for command ${command.name}`)
            }

            if (aliases.some((alias) => command.aliases.includes(alias))) {
                throw new Error(`Command ${name} shares the same aliases as command ${command.name}`)
            }
        }

        const command = new Command(name, aliases, callback)
        this.pool.set(name, command)

        for (const alias of aliases) {
            this.pool.set(alias, command)
        }

        return command
    }
}

export const commandFactory = new CommandFactory()
