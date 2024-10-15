import { KeyValueVariables } from "@/core/variables"
import { type CommandCallback } from "./handler"

export class Command {
    readonly variables = new KeyValueVariables()

    constructor(
        readonly name: string,
        readonly aliases: string[],
        readonly callback: CommandCallback,
    ) {}
}
