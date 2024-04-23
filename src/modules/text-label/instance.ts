import { Entity } from "../entity"
import { nativeFunctions } from "@/natives"

export class TextLabelMp extends Entity {
    private _text: string
    private _color: string
    public attached = false

    constructor(id: number, text: string, color: string) {
        super(id)

        this._text = text
        this._color = color
    }

    set text(text: string) {
        if (nativeFunctions.update3DTextLabelText(this.id, this._color, text)) {
            this._text = text
        }
    }

    get text() {
        return this._text
    }
}
