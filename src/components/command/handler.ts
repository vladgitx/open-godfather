import { commandFactory } from "./factory"

class CommandHandler {
    add = commandFactory.new
    all = commandFactory.pool.values()
}

export const commandHandler = new CommandHandler()
