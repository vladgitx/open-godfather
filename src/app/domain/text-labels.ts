import { TextLabel, create3dTextLabel, delete3dTextLabel, getLabel } from "../../components/text-label"
import { WorldPosition } from "../../shared/types"

export class TextLabels {
    at(labelId: number) {
        return getLabel(labelId)
    }

    new(text: string, color: string, position: WorldPosition, drawDistance: number, world = 0, testLOS = true) {
        return create3dTextLabel(text, color, position, drawDistance, world, testLOS)
    }

    destroy(label: TextLabel) {
        return delete3dTextLabel(label)
    }
}