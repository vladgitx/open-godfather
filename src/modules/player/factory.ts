import { PlayerMp } from "./instance"

export class PlayerMpFactory {
	private static pool = new Map<number, PlayerMp>()

	static new(id: number) {
		if (this.at(id)) {
			return undefined
		}

		const player = new PlayerMp(id)
		this.pool.set(id, player)

		return player
	}

	static destroy(player: PlayerMp) {
		const deleted = this.pool.delete(player.id)
		player.exists = false
		return deleted
	}

	static at(id: number) {
		return this.pool.get(id)
	}

	static get all() {
		return this.pool.values()
	}
}
