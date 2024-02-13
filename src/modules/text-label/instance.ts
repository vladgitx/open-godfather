import { Entity } from "../entity"
import { SampNatives } from "../../wrapper"

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
        if (SampNatives.update3DTextLabelText(this.id, this._color, text)) {
            this._text = text
        }
    }

    get text() {
        return this._text
    }
}
