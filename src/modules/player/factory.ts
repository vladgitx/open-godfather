import { PlayerMp } from "./instance"

// TODO: create player on connect and destroy on disconnect
export class PlayerMpFactory {
	private pool = new Map<number, PlayerMp>()

	constructor() {}

	new(id: number) {
		if (this.at(id)) {
			return undefined
		}

		const player = new PlayerMp(id)
		this.pool.set(id, player)

		return player
	}

	destroy(player: PlayerMp) {
		return this.pool.delete(player.id)
	}

	at(id: number) {
		return this.pool.get(id)
	}
}
