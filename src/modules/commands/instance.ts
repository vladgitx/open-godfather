import { type CommandCallback } from "./@types/callback"

export class CommandMp {
    constructor(
        readonly name: string,
        readonly aliases: string[],
        readonly callback: CommandCallback,
    ) {}
}
