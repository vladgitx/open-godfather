import { EntityFactory } from "../entity"
import { Player } from "./instance"

class PlayerFactory extends EntityFactory<Player> {
    new(id: number) {
        if (this.pool.has(id)) {
            return undefined
        }

        const player = new Player(id)
        this.pool.set(id, player)

        return player
    }
}

export const playerFactory = new PlayerFactory()
