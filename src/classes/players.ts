import { Natives } from "../scripting-api"
import { Player } from ".."
import { shadeColor } from "../utils"

export class Players {
    static pool = new Map<number, Player>()

    static at(playerId: number) {
        return Players.pool.get(playerId)
    }

    static search(nameOrId: string): Player | undefined {
        const playerId = parseInt(nameOrId)
        if (!isNaN(playerId)) {
            const player = Players.at(playerId)
            if (player !== undefined) {
                return player
            }
        }
        if (nameOrId.length < 3) {
            return undefined
        }
        for (const [playerId, player] of Players.pool) {
            if (player.name.toLowerCase().startsWith(nameOrId.toLowerCase())) {
                return player
            }
        }
        return undefined
    }

    static sendMessage(text: string, color: number = -1, position?: { x: number, y: number, z: number }, world?: number, interior?: number, range?: number, colorShader: boolean = false): boolean {
        if (position === undefined) {
            if (range !== undefined) {
                return false
            }
            if (world === undefined && interior === undefined) {
                Natives.sendClientMessageToAll(color, text)
                return true
            }
            if (world !== undefined && interior === undefined) {
                for (const [playerId, player] of Players.pool) {
                    if (player.world === world) {
                        player.sendMessage(text, color)
                    }
                }
                return true
            }
            if (world === undefined && interior !== undefined) {
                for (const [playerId, player] of Players.pool) {
                    if (player.interior === interior) {
                        player.sendMessage(text, color)
                    }
                }
                return true
            }
            for (const [playerId, player] of Players.pool) {
                if (player.world === world && player.interior === interior) {
                    player.sendMessage(text, color)
                }
            }
            return true
        }
        if (range === undefined) {
            return false
        }
        for (const [playerId, player] of Players.pool) {
            if (world !== undefined && player.world !== world) {
                continue
            }
            if (interior !== undefined && player.interior !== interior) {
                continue
            }
            const distance = player.getDistance(position)
            if (distance === undefined) {
                continue
            }

            if (!colorShader) {
                if (distance < range) {
                    player.sendMessage(text, color)
                }
            } else {
                if (distance < range / 16) {
                    player.sendMessage(text, color)
                } else if (distance < range / 8) {
                    player.sendMessage(text, shadeColor(color, -5))
                } else if (distance < range / 4) {
                    player.sendMessage(text, shadeColor(color, -15))
                } else if (distance < range / 2) {
                    player.sendMessage(text, shadeColor(color, -25))
                } else if (distance < range) {
                    player.sendMessage(text, shadeColor(color, -35))
                }
            }
        }
        return true
    }
}