import { Command } from "../public/model"
import { CommandCallback } from "../public/types"

export const commandsPool = new Map<string, Command>()
export const commandCallbacks = new Map<string, CommandCallback>()