import { nativeFunctions } from "@/natives"
import { EntityFactory, EntityHandler } from "../entity"
import { Textdraw } from "./entity"

const textdrawFactory = new EntityFactory<Textdraw, typeof Textdraw>((...args) => new Textdraw(...args))

class TextdrawHandler extends EntityHandler<Textdraw> {
    new(x: number, y: number, text: string) {
        const textdrawId = nativeFunctions.textDrawCreate(x, y, text)
        return textdrawFactory.new(textdrawId, { x, y }, text)
    }

    destroy(textdraw: Textdraw) {
        nativeFunctions.textDrawDestroy(textdraw.id)
        textdrawFactory.destroy(textdraw)
    }
}

export const textdrawHandler = new TextdrawHandler(textdrawFactory)
