import { gameNatives } from "@/wrapper/game"
import { type Position3 } from "../../lib/vector3"
import { type Player } from "./entity"
import { EntityPool } from "@/lib/pool"

class PlayerHandler {
    readonly pool = new EntityPool<number, Player>()

    broadcast(message: string, color = "FFFFFF") {
        gameNatives.sendClientMessageToAll(color, message)
    }

    getClosest(position: Position3, range = Infinity, world?: number, interior?: number) {
        let closestPlayer: Player | undefined = undefined
        let closestDistance = range

        const players = this.pool.all

        for (const player of players) {
            if (world !== undefined && player.world !== world) {
                continue
            }

            if (interior !== undefined && player.interior !== interior) {
                continue
            }

            const distance = player.position.distance(position)

            if (distance < closestDistance) {
                closestPlayer = player
                closestDistance = distance
            }
        }

        return closestPlayer
    }

    getInRange(position: Position3, range: number, world?: number, interior?: number) {
        return this.pool.all.filter((player) => {
            if (world !== undefined && player.world !== world) {
                return false
            }

            if (interior !== undefined && player.interior !== interior) {
                return false
            }

            return player.position.distance(position) <= range
        })
    }
}

export const players = new PlayerHandler()
