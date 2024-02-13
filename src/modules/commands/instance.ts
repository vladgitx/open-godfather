import { TCommandCallback } from "./@types/callback"

export class CommandMp {
    constructor(
        readonly name: string,
        readonly aliases: string[],
        readonly callback: TCommandCallback,
    ) {}
}
