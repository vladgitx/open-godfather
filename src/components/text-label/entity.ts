import { type Player, playerHandler } from "../player"
import { StreamerEntity } from "../../core/streamer-entity"
import { streamerNatives } from "@/wrapper/streamer"
import { vehicleHandler, type Vehicle } from "../vehicle"
import { type Vector3 } from "../../core/vector3"

export class TextLabel extends StreamerEntity {
    private _text: string
    private _color: string
    private attached = false

    constructor(streamerId: number, text: string, color: string) {
        super(streamerId, "textLabel")

        this._text = text
        this._color = color
    }

    updateText(text: string, color?: string) {
        color = color ?? this._color

        streamerNatives.updateDynamic3dTextLabelText(this.streamerId, color, text)

        this._text = text
        this._color = color
    }

    get text() {
        return this._text
    }

    set color(hex: string) {
        streamerNatives.updateDynamic3dTextLabelText(this.streamerId, hex, this._text)
        this._color = hex
    }

    get color() {
        return this._color
    }

    attachTo(entity: Player | Vehicle, offset: Vector3) {
        if (this.attached) {
            return false
        }

        if (playerHandler.checkEntityType(entity)) {
            streamerNatives.setIntData("textLabel", this.streamerId, "attachedPlayer", entity.sampId)
        } else if (vehicleHandler.checkEntityType(entity)) {
            streamerNatives.setIntData("textLabel", this.streamerId, "attachedVehicle", entity.sampId)
        } else {
            return false
        }

        streamerNatives.setFloatData("textLabel", this.streamerId, "attachOffsetX", offset.x)
        streamerNatives.setFloatData("textLabel", this.streamerId, "attachOffsetY", offset.y)
        streamerNatives.setFloatData("textLabel", this.streamerId, "attachOffsetZ", offset.z)

        entity.onCleanup(() => {
            this.destroy()
        })

        this.attached = true

        return true
    }
}
