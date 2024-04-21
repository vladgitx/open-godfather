import { SampNatives } from "@/wrapper"
import { CONFIG } from "@/shared/config"
import { playerFactory } from "./factory"
import { Vector3 } from "../vector3"
import { PlayerMp } from "."

class PlayerHandler {
    at(id: number) {
        return playerFactory.at(id)
    }

    broadcast(message: string, color = CONFIG.message.color) {
        SampNatives.sendClientMessageToAll(color, message)
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
        return playerFactory.all
    }
}

export const playerHandler = new PlayerHandler()