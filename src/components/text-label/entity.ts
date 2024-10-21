import { type Player, players } from "../player"
import { streamerNatives } from "@/wrapper/streamer"
import { vehicles, type Vehicle } from "../vehicle"
import { type Position3 } from "../../lib/vector3"
import { StreamerEntity } from "@/lib/entity/streamer"

export class TextLabel extends StreamerEntity {
    private _text: string
    private _color: string
    private attached = false

    constructor(gameId: number, text: string, color: string) {
        super(gameId, "textLabel")

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

    set color(hex: string) {
        streamerNatives.updateDynamic3dTextLabelText(this.id, hex, this._text)
        this._color = hex
    }

    get color() {
        return this._color
    }

    attachTo(entity: Player | Vehicle, offset: Position3) {
        if (this.attached) {
            return false
        }

        if (players.pool.isInstanceOf(entity)) {
            streamerNatives.setIntData("textLabel", this.id, "attachedPlayer", entity.id)
        } else if (vehicles.pool.isInstanceOf(entity)) {
            streamerNatives.setIntData("textLabel", this.id, "attachedVehicle", entity.id)
        } else {
            return false
        }

        streamerNatives.setFloatData("textLabel", this.id, "attachOffsetX", offset.x)
        streamerNatives.setFloatData("textLabel", this.id, "attachOffsetY", offset.y)
        streamerNatives.setFloatData("textLabel", this.id, "attachOffsetZ", offset.z)

        entity.onCleanup(() => {
            this.destroy()
        })

        this.attached = true

        return true
    }
}
