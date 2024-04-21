import { CONFIG } from "@/shared/config"
import { sampNatives } from "@/wrapper"
import { type Vector3 } from "../vector3"
import { textLabelFactory } from "./factory"
import { type TextLabelMp } from "./instance"

class TextLabelHandler {
    new(
        text: string,
        color: string,
        position: Vector3,
        drawDistance = CONFIG.textLabel.distance,
        world = CONFIG.textLabel.world,
        testLos = CONFIG.textLabel.testLos,
    ) {
        const labelId = sampNatives.create3DTextLabel(text, color, position.x, position.y, position.z, drawDistance, world, testLos)

        if (labelId === undefined) {
            return undefined
        }

        return textLabelFactory.new(labelId, text, color)
    }

    destroy(label: TextLabelMp) {
        sampNatives.delete3DTextLabel(label.id)
        textLabelFactory.destroy(label)
    }

    at(id: number) {
        return textLabelFactory.at(id)
    }
}

export const textLabelHandler = new TextLabelHandler()
