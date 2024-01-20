import { CommandCallback } from "./@types/callback"
import { CommandMp } from "./instance"

export class CommandMpFactory {
	// command/alias -> command
	private static pool = new Map<string, CommandMp>()

	static new(name: string, aliases: string[], callback: CommandCallback) {
		if (aliases.includes(name)) {
			throw new Error(`Command ${name} cannot be an alias of itself`)
		}

		if (CommandMpFactory.at(name)) {
			throw new Error(`Command ${name} already exists`)
		}

		for (const alias of aliases) {
			if (CommandMpFactory.at(alias)) {
				throw new Error(`You're using alias ${alias} for command ${name}, but that alias already exists as another command`)
			}
		}

		for (const command of CommandMpFactory.all) {
			if (command.aliases.includes(name)) {
				throw new Error(`Command name ${name} is used as an alias for command ${command.name}`)
			}

			if (aliases.some((alias) => command.aliases.includes(alias))) {
				throw new Error(`Command ${name} shares the same aliases as command ${command.name}`)
			}
		}

		const command = new CommandMp(name, aliases, callback)
		CommandMpFactory.pool.set(name, command)

		for (const alias of aliases) {
			CommandMpFactory.pool.set(alias, command)
		}

		return command
	}

	static at(name: string) {
		return CommandMpFactory.pool.get(name)
	}

	static get all() {
		return CommandMpFactory.pool.values()
	}
}
