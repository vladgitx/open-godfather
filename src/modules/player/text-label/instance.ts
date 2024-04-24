import { nativeFunctions } from "@/natives"
import { type TextLabel } from "../../text-label"
import { type Vector3 } from "../../vector3"
import { type Player } from "../instance"

export class PlayerTextLabels {
    private labels = new Set<TextLabel>()

    constructor(private player: Player) {}

    attach(label: TextLabel, offset: Vector3) {
        if (label.attached) {
            return false
        }

        if (!nativeFunctions.attach3DTextLabelToPlayer(label.id, this.player.id, offset.x, offset.y, offset.z)) {
            return false
        }

        this.labels.add(label)
        label.attached = true

        return true
    }

    get all() {
        for (const label of this.labels) {
            if (!label.exists) {
                this.labels.delete(label)
            }
        }
        return this.labels
    }
}
