import { dispatcher } from "../../lib/dispatcher"
import { type CommandCallback } from "./@types/callback"
import { Command } from "./instance"

class CommandFactory {
    pool = new Map<string, Command>()

    new = (name: string, aliases: string[], callback: CommandCallback) => {
        if (aliases.includes(name)) {
            throw new Error(`Command ${name} cannot have an alias with the same name`)
        }

        if (this.pool.get(name)) {
            // It throws a TypeError at runtime if the function is not an arrow function
            throw new Error(`Duplicate command name: ${name}`)
        }

        for (const alias of aliases) {
            if (this.pool.get(alias)) {
                throw new Error(`You can't use alias ${alias} for command ${name}, because a command with that name already exists`)
            }
        }

        for (const command of this.pool.values()) {
            if (command.aliases.includes(name)) {
                throw new Error(`Command name ${name} is used as an alias for command ${command.name}`)
            }

            const sharedAlias = command.aliases.find((alias) => aliases.includes(alias))

            if (sharedAlias) {
                throw new Error(`Command ${name} shares alias ${sharedAlias} with command ${command.name}`)
            }
        }

        const command = new Command(name, aliases, callback)
        this.pool.set(name, command)

        for (const alias of aliases) {
            this.pool.set(alias, command)
        }

        dispatcher.emit("commandRegister", command)

        return command
    }
}

export const commandFactory = new CommandFactory()
