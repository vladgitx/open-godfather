import { Entity } from "@/lib/entity"
import { type CommandCallback } from "./handler"

export class Command extends Entity {
    constructor(
        id: number,
        readonly name: string,
        readonly aliases: string[],
        readonly callback: CommandCallback,
    ) {
        super(id)
    }
}
