import {
    CommandCallback,
    addCommand,
    getAllCommands,
    getCommand
} from "../../components/command"

export class OpenCommands {
    at(name: string) {
        return getCommand(name)
    }

    add(name: string, aliases: string[], callback: CommandCallback, info = "") {
        return addCommand(name, aliases, callback, info)
    }

    get all() {
        return getAllCommands()
    }
}