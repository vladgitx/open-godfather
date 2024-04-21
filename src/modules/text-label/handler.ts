import { CONFIG } from "@/shared/config"
import { SampNatives } from "@/wrapper"
import { Vector3 } from "../vector3"
import { textLabelFactory } from "./factory"
import { TextLabelMp } from "./instance"

class TextLabelHandler {
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

        return textLabelFactory.new(labelId, text, color)
    }

    destroy(label: TextLabelMp) {
        SampNatives.delete3DTextLabel(label.id)
        return textLabelFactory.destroy(label)
    }

    at = textLabelFactory.at
}

export const textLabelHandler = new TextLabelHandler()