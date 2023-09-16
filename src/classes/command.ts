import { Player } from "./player"

export type CommandCallback = (player: Player, ...params: string[]) => void

export class Command {
    readonly name: string
    readonly aliases: string[]
    readonly callback: CommandCallback
    readonly info: string

    constructor(name: string, aliases: string[], callback: CommandCallback, info: string) {
        this.name = name
        this.aliases = aliases
        this.callback = callback
        this.info = info
    }
}