import { gameNatives } from "@/wrapper/game"
import { Textdraw } from "./entity"
import { EntityPool } from "@/lib/entity"

class TextdrawHandler {
    readonly pool = new EntityPool<Textdraw>(Textdraw)

    new(x: number, y: number, text: string) {
        const textdrawId = gameNatives.textDrawCreate(x, y, text)

        const textdraw = new Textdraw(textdrawId, { x, y }, text)
        EntityPool.add(this.pool, textdrawId, textdraw)

        textdraw.onCleanup(() => {
            gameNatives.textDrawDestroy(textdrawId)
        })

        return textdraw
    }
}

export const textdraws = new TextdrawHandler()
