import { nativeFunctions } from "@/natives"
import { CONFIG } from "@/shared/config"
import { playerFactory } from "./factory"
import { type Vector3 } from "../vector3"
import { type PlayerMp } from "."

class PlayerHandler {
    broadcast(message: string, color = CONFIG.message.color) {
        nativeFunctions.sendClientMessageToAll(color, message)
    }

    getClosest(position: Vector3, range: number, world?: number, interior?: number) {
        const players = new Map<PlayerMp, number>()
        for (const player of this.all) {
            if (world !== undefined && player.world !== world) {
                continue
            }
            if (interior !== undefined && player.interior !== interior) {
                continue
            }

            const distance = player.position.distance(position)

            if (distance < range) {
                players.set(player, distance)
            }
        }
        return players
    }

    get all() {
        return playerFactory.pool.values()
    }

    at(id: number) {
        return playerFactory.pool.get(id)
    }
}

export const playerHandler = new PlayerHandler()
