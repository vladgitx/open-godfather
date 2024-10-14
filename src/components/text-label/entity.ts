import { type Player, playerHandler } from "../player"
import { StreamerEntity } from "../../modules/streamer-entity"
import { streamerNatives } from "@/natives/streamer"
import { vehicleHandler, type Vehicle } from "../vehicle"
import { type Vector3 } from "../../modules/vector3"
import { textLabelHandler } from "./handler"

export class TextLabel extends StreamerEntity {
    private _text: string
    private _color: string
    private attached = false

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

    set color(hex: string) {
        streamerNatives.updateDynamic3dTextLabelText(this.id, hex, this._text)
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
            streamerNatives.setIntData("textLabel", this.id, "attachedPlayer", entity.id)
        } else if (vehicleHandler.checkEntityType(entity)) {
            streamerNatives.setIntData("textLabel", this.id, "attachedVehicle", entity.id)
        } else {
            return false
        }

        streamerNatives.setFloatData("textLabel", this.id, "attachOffsetX", offset.x)
        streamerNatives.setFloatData("textLabel", this.id, "attachOffsetY", offset.y)
        streamerNatives.setFloatData("textLabel", this.id, "attachOffsetZ", offset.z)

        entity.onCleanup(() => {
            textLabelHandler.destroy(this)
        })

        this.attached = true
        return true
    }
}
