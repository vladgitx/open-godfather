import { Player } from "./instance"

class PlayerFactory {
    pool = new Map<number, Player>()

    new(id: number) {
        if (this.pool.has(id)) {
            return undefined
        }

        const player = new Player(id)
        this.pool.set(id, player)

        return player
    }

    destroy(player: Player) {
        this.pool.delete(player.id)
        player.exists = false
    }
}

export const playerFactory = new PlayerFactory()
