import { StreamerEntity } from "../streamer-entity"
import { streamerNatives } from "@/natives/streamer"

export class TextLabel extends StreamerEntity {
    private _text: string
    private _color: string
    public attached = false

    constructor(id: number, text: string, color: string) {
        super(id, "textLabel")

        this._text = text
        this._color = color
    }

    updateText(text: string, color?: string) {
        color = color ?? this._color

        streamerNatives.updateDynamic3dTextLabelText(this.id, color, text)

        this._text = text
        this._color = color
    }

    get text() {
        return this._text
    }
}
