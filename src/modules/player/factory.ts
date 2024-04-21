import { PlayerMp } from "./instance"

class PlayerFactory {
    private pool = new Map<number, PlayerMp>()

    new(id: number) {
        if (this.at(id)) {
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

    at(id: number) {
        return this.pool.get(id)
    }

    get all() {
        return this.pool.values()
    }
}

export const playerFactory = new PlayerFactory()
