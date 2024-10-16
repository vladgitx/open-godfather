import { nativeFunctions } from "@/wrapper"
import { Textdraw } from "./entity"
import { SampEntityHandler } from "@/core/samp-entity"

class TextdrawHandler extends SampEntityHandler<Textdraw, typeof Textdraw> {
    new(x: number, y: number, text: string) {
        const textdrawId = nativeFunctions.textDrawCreate(x, y, text)
        const textdraw = TextdrawHandler.createInstance(this, textdrawId, { x, y }, text)

        textdraw?.onCleanup(() => {
            nativeFunctions.textDrawDestroy(textdrawId)
        })

        return textdraw
    }
}

export const textdrawHandler = new TextdrawHandler(Textdraw)
