import { CommandCallback } from "./@types/callback"
import { CommandMp } from "./instance"

class CommandFactory {
    private pool = new Map<string, CommandMp>()

    new(name: string, aliases: string[], callback: CommandCallback) {
        if (aliases.includes(name)) {
            throw new Error(`Command ${name} cannot be an alias of itself`)
        }

        if (this.at(name)) {
            throw new Error(`Command ${name} already exists`)
        }

        for (const alias of aliases) {
            if (this.at(alias)) {
                throw new Error(`You're using alias ${alias} for command ${name}, but that alias already exists as another command`)
            }
        }

        for (const command of this.all) {
            if (command.aliases.includes(name)) {
                throw new Error(`Command name ${name} is used as an alias for command ${command.name}`)
            }

            if (aliases.some((alias) => command.aliases.includes(alias))) {
                throw new Error(`Command ${name} shares the same aliases as command ${command.name}`)
            }
        }

        const command = new CommandMp(name, aliases, callback)
        this.pool.set(name, command)

        for (const alias of aliases) {
            this.pool.set(alias, command)
        }

        return command
    }

    at(name: string) {
        return this.pool.get(name)
    }

    get all() {
        return this.pool.values()
    }
}

export const commandFactory = new CommandFactory()
