import { commandFactory } from "./factory"

class CommandHandler {
    add = commandFactory.new
    all = commandFactory.all
}

export const commandHandler = new CommandHandler()
