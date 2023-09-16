import { Natives, SampNode } from "../scripting-api"
import { KickReasonEnum, Player, og } from ".."
import { shadeColor } from "../common/utils"

export class Players {
    private pool: Map<number, Player>

    constructor() {
        this.pool = new Map()

        SampNode.on("OnPlayerConnect", (playerId: number) => {
            const player = new Player(playerId)
            this.pool.set(playerId, player)
            const res = og.events.emit("playerConnect", player)
        })
        
        SampNode.on("OnPlayerDisconnect", (playerId: number, reasonId: KickReasonEnum) => {
            const player = this.at(playerId)
            if (player !== undefined) {
                og.events.emit("playerDisconnect", player, reasonId)
            }
            this.pool.delete(playerId)
        })
    }

    at(playerId: number): Player | undefined {
        return this.pool.get(playerId)
    }

    sendMessage(text: string, color = "FFFFFF", position?: { x: number, y: number, z: number }, world?: number, interior?: number, range?: number, colorShader: boolean = false): boolean {
        if (position === undefined) {
            if (range !== undefined) {
                return false
            }
            if (world === undefined && interior === undefined) {
                Natives.sendClientMessageToAll(color, text)
                return true
            }
            if (world !== undefined && interior === undefined) {
                for (const [playerId, player] of this.pool) {
                    if (player.world === world) {
                        player.sendMessage(text, color)
                    }
                }
                return true
            }
            if (world === undefined && interior !== undefined) {
                for (const [playerId, player] of this.pool) {
                    if (player.interior === interior) {
                        player.sendMessage(text, color)
                    }
                }
                return true
            }
            for (const [playerId, player] of this.pool) {
                if (player.world === world && player.interior === interior) {
                    player.sendMessage(text, color)
                }
            }
            return true
        }
        if (range === undefined) {
            return false
        }
        for (const [playerId, player] of this.pool) {
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

    get all(): ReadonlyMap<number, Player> {
        return this.pool
    }
}