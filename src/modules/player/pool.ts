import { SampNatives } from "../../wrapper"
import { CONFIG } from "../../shared/config"
import { PlayerMpFactory } from "./factory"
import { Vector3 } from "../vector3"
import { PlayerMp } from "."

export class PlayersMp {
	at(id: number) {
		return PlayerMpFactory.at(id)
	}

	broadcast(message: string, color = CONFIG.message.color) {
		SampNatives.sendClientMessageToAll(color, message)
	}

	getClosest(position: Vector3, range: number, world?: number, interior?: number) {
		const players = new Map<PlayerMp, number>()
		for (const player of this.all) {
			const distance = player.getDistance(position, world, interior)

			if (distance < range) {
				players.set(player, distance)
			}
		}
		return players
	}

	get all() {
		return PlayerMpFactory.all
	}
}
