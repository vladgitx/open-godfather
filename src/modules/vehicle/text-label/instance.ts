import { nativeFunctions } from "@/natives"
import { type TextLabel } from "../../text-label"
import { type Vector3 } from "../../vector3"
import { type Vehicle } from "../entity"

export class VehicleTextLabels {
    private labels = new Set<TextLabel>()

    constructor(private vehicle: Vehicle) {}

    attach(label: TextLabel, offset: Vector3) {
        if (label.attached) {
            return false
        }

        if (!nativeFunctions.attach3DTextLabelToVehicle(label.id, this.vehicle.id, offset.x, offset.y, offset.z)) {
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
