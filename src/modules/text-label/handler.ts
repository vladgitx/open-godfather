import { CONFIG } from "@/shared/config"
import { nativeFunctions } from "@/natives"
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
        const labelId = nativeFunctions.create3DTextLabel(text, color, position.x, position.y, position.z, drawDistance, world, testLos)

        if (labelId === undefined) {
            return undefined
        }

        return textLabelFactory.new(labelId, text, color)
    }

    destroy(label: TextLabelMp) {
        nativeFunctions.delete3DTextLabel(label.id)
        textLabelFactory.destroy(label)
    }

    at(id: number) {
        return textLabelFactory.pool.get(id)
    }
}

export const textLabelHandler = new TextLabelHandler()
