import SampNatives from "../../../shared/samp-natives"
import { WorldPosition } from "../../../shared/types"
import { labelsPool } from "../domain/pool"
import { TextLabel } from "./model"

export function create3dTextLabel(text: string, color: string, position: WorldPosition, drawDistance: number, world = 0, testLOS = true) {
    const labelId = SampNatives.create3DTextLabel(text, color, position.x, position.y, position.z, drawDistance, world, testLOS)
    if (labelId === undefined) {
        return undefined
    }

    const label = new TextLabel(labelId, text, color)
    labelsPool.set(labelId, label)

    return label
}

export function delete3dTextLabel(label: TextLabel) {
    SampNatives.delete3DTextLabel(label.id)
    labelsPool.delete(label.id)
}

export function getLabel(labelId: number) {
    return labelsPool.get(labelId)
}