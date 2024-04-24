import { type TextLabel } from "../../text-label"
import { type Vector3 } from "../../vector3"
import { type Player } from "../instance"
import { streamerNatives } from "@/natives/streamer"

export class PlayerTextLabels {
    private labels = new Set<TextLabel>()

    constructor(private player: Player) {}

    attach(label: TextLabel, offset: Vector3) {
        if (label.attached) {
            return false
        }

        streamerNatives.setIntData("textLabel", label.id, "attachedPlayer", this.player.id)
        streamerNatives.setFloatData("textLabel", label.id, "attachOffsetX", offset.x)
        streamerNatives.setFloatData("textLabel", label.id, "attachOffsetY", offset.y)
        streamerNatives.setFloatData("textLabel", label.id, "attachOffsetZ", offset.z)

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
