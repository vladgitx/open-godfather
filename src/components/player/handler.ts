import { nativeFunctions } from "@/wrapper"
import { type Vector3 } from "../../core/vector3"
import { Player } from "./entity"
import { SampEntityHandler } from "@/core/samp-entity"

class PlayerHandler extends SampEntityHandler<Player, typeof Player> {
    broadcast(message: string, color = "FFFFFF") {
        nativeFunctions.sendClientMessageToAll(color, message)
    }

    getClosest(position: Vector3, range: number, world?: number, interior?: number) {
        const closestPlayers = new Map<Player, number>()
        const onlinePlayers = this.all

        for (const player of onlinePlayers) {
            if (world !== undefined && player.world !== world) {
                continue
            }

            if (interior !== undefined && player.interior !== interior) {
                continue
            }

            const distance = player.position.distance(position)

            if (distance < range) {
                closestPlayers.set(player, distance)
            }
        }
        return closestPlayers
    }
}

export const playerHandler = new PlayerHandler(Player)
