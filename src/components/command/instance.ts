import { type CommandCallback } from "./@types/callback"

export class Command {
    constructor(
        readonly name: string,
        readonly aliases: string[],
        readonly callback: CommandCallback,
    ) {}
}
