import { gameNatives } from "@/wrapper/game"
import { type Position3 } from "../../lib/vector3"
import { Player } from "./entity"
import { EntityPool } from "@/lib/entity"

class PlayerHandler {
    readonly pool = new EntityPool<Player>(Player)

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
}

export const players = new PlayerHandler()
