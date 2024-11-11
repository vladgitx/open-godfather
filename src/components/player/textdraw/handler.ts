import { EntityPool } from "@/lib/pool"
import { PlayerTextdraw } from "./entity"
import { gameCallbacks, gameNatives } from "@/wrapper/game"
import { type Player } from "../entity"
import { type Position2 } from "@/lib/vector3"
import { EntityPromises } from "@/lib/entity"
import { players } from "../handler"
import { type Textdraw, textdraws } from "@/components/textdraw"

const selectPromises = new EntityPromises<Player, PlayerTextdraw | Textdraw | undefined>()

gameCallbacks.onPlayerClickPlayerTextDraw((playerId, clickedId) => {
    const player = players.pool.at(playerId)

    if (player) {
        selectPromises.resolve(player, player.textdraws.pool.at(clickedId))
    }
})

gameCallbacks.onPlayerClickTextDraw((playerId, clickedId) => {
    const player = players.pool.at(playerId)

    if (player) {
        selectPromises.resolve(player, textdraws.pool.at(clickedId))
    }
})

export class PlayerTextdrawHandler {
    readonly pool = new EntityPool<number, PlayerTextdraw>(PlayerTextdraw)

    constructor(private readonly player: Player) {}

    new(position: Position2, text: string) {
        const textdrawId = gameNatives.createPlayerTextDraw(this.player.id, position.x, position.y, text)

        const textdraw = new PlayerTextdraw(this.player, textdrawId, text, position)
        EntityPool.add(this.pool, textdrawId, textdraw)

        textdraw.onCleanup(() => {
            gameNatives.playerTextDrawDestroy(this.player.id, textdrawId)
            EntityPool.remove(this.pool, textdrawId, textdraw)
        })

        return textdraw
    }

    enterSelectMode(hoverColor: string) {
        gameNatives.selectTextDraw(this.player.id, hoverColor)
        return selectPromises.new(this.player)
    }

    exitSelectMode() {
        gameNatives.cancelSelectTextDraw(this.player.id)
        // This calls onPlayerClickTextDraw so no need to resolve the promise here
    }
}
