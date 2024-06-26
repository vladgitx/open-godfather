import { nativeFunctions } from "@/natives"
import { type Vector3 } from "../vector3"
import { Player } from "./entity"
import { EntityFactory, EntityHandler } from "../entity"

export const playerFactory = new EntityFactory<Player, typeof Player>((id) => new Player(id))

class PlayerHandler extends EntityHandler<Player> {
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

export const playerHandler = new PlayerHandler(playerFactory)
