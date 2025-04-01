import { KeyValueVariables } from "@/lib/variables"
import { dispatcher } from "../../lib/dispatcher"
import { type Player } from "../player"

export type CommandCallback = (player: Player, ...params: (string | undefined)[]) => void | Promise<void>

export class Command {
    readonly variables = new KeyValueVariables()

    constructor(
        readonly name: `/${string}`,
        readonly aliases: string[],
        readonly callback: CommandCallback,
    ) {}
}

class CommandHandler {
    private readonly namesAndAliases = new Map<string, Command>()

    add = (name: `/${string}`, aliases: string[], callback: CommandCallback) => {
        if (aliases.includes(name)) {
            throw new Error(`Command ${name} cannot have an alias with the same name`)
        }

        if (this.namesAndAliases.get(name)) {
            // It throws a TypeError at runtime if the function is not an arrow function
            throw new Error(`Duplicate command name: ${name}`)
        }

        for (const alias of aliases) {
            if (this.namesAndAliases.get(alias)) {
                throw new Error(`You can't use alias ${alias} for command ${name}, because a command with that name already exists`)
            }
        }

        for (const command of this.namesAndAliases.values()) {
            if (command.aliases.includes(name)) {
                throw new Error(`Command name ${name} is used as an alias for command ${command.name}`)
            }

            const sharedAlias = command.aliases.find((alias) => aliases.includes(alias))

            if (sharedAlias) {
                throw new Error(`Command ${name} shares alias ${sharedAlias} with command ${command.name}`)
            }
        }

        const command = new Command(name, aliases, callback)

        this.namesAndAliases.set(name, command)

        for (const alias of aliases) {
            this.namesAndAliases.set(alias, command)
        }

        dispatcher.emit("commandRegister", command)

        return command
    }

    get all() {
        return [...this.namesAndAliases.values()]
    }

    at = (name: string) => {
        return this.namesAndAliases.get(name)
    }
}

export const commands = new CommandHandler()
