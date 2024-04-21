import { sampNatives } from "@/wrapper"
import { type TextLabelMp } from "../../text-label"
import { type Vector3 } from "../../vector3"
import { type VehicleMp } from "../entity"

export class VehicleTextLabels {
    private labels = new Set<TextLabelMp>()

    constructor(private vehicle: VehicleMp) {}

    attach(label: TextLabelMp, offset: Vector3) {
        if (label.attached) {
            return false
        }

        if (!sampNatives.attach3DTextLabelToVehicle(label.id, this.vehicle.id, offset.x, offset.y, offset.z)) {
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
