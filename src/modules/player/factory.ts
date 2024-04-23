import { PlayerMp } from "./instance"

class PlayerFactory {
    pool = new Map<number, PlayerMp>()

    new(id: number) {
        if (this.pool.has(id)) {
            return undefined
        }

        const player = new PlayerMp(id)
        this.pool.set(id, player)

        return player
    }

    destroy(player: PlayerMp) {
        this.pool.delete(player.id)
        player.exists = false
    }
}

export const playerFactory = new PlayerFactory()
