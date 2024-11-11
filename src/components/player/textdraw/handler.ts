import { EntityPool } from "@/lib/pool"
import { PlayerTextdraw } from "./entity"
import { gameNatives } from "@/wrapper/game"
import { Player } from "../entity"
import { Position2 } from "@/lib/vector3"

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
}
