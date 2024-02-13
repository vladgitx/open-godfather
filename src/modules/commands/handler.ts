import { CommandMpFactory } from "./factory"

export class CommandMpHandler {
    constructor() {}

    add = CommandMpFactory.new

    get all() {
        return CommandMpFactory.all
    }
}
