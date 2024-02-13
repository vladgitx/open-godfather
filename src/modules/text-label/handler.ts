import { CONFIG } from "../../shared/config"
import { SampNatives } from "../../wrapper"
import { Vector3 } from "../vector3"
import { TextLabelMpFactory } from "./factory"
import { TextLabelMp } from "./instance"

export class TextLabelMpHandler {
    constructor() {}

    new(
        text: string,
        color: string,
        position: Vector3,
        drawDistance = CONFIG.textLabel.distance,
        world = CONFIG.textLabel.world,
        testLos = CONFIG.textLabel.testLos,
    ) {
        const labelId = SampNatives.create3DTextLabel(text, color, position.x, position.y, position.z, drawDistance, world, testLos)
        if (labelId === undefined) {
            return undefined
        }

        return TextLabelMpFactory.new(labelId, text, color)
    }

    destroy(label: TextLabelMp) {
        SampNatives.delete3DTextLabel(label.id)
        return TextLabelMpFactory.destroy(label)
    }

    at = TextLabelMpFactory.at
}
