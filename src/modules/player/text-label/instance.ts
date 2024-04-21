import { SampNatives } from "@/wrapper"
import { TextLabelMp } from "../../text-label"
import { Vector3 } from "../../vector3"
import { PlayerMp } from "../instance"

export class PlayerTextLabels {
    private labels = new Set<TextLabelMp>()

    constructor(private player: PlayerMp) {}

    attach(label: TextLabelMp, offset: Vector3) {
        if (label.attached) {
            return false
        }

        if (!SampNatives.attach3DTextLabelToPlayer(label.id, this.player.id, offset.x, offset.y, offset.z)) {
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
