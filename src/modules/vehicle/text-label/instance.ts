import { SampNatives } from "../../natives"
import { TextLabelMp } from "../../text-label"
import { Vector3 } from "../../vector3"
import { VehicleMp } from "../instance"

export class VehicleTextLabels {
	private labels = new Set<TextLabelMp>()

	constructor(private vehicle: VehicleMp) {}

	attach(label: TextLabelMp, offset: Vector3) {
		if (label.attached) {
			return false
		}

		if (!SampNatives.attach3DTextLabelToVehicle(label.id, this.vehicle.id, offset.x, offset.y, offset.z)) {
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
