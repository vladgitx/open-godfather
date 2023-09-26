import SampNatives from "../../../shared/samp-natives"
import { WorldPosition } from "../../../shared/types"
import { EventOn } from "../../event"
import { Vehicle } from "../../vehicle"
import { delete3dTextLabel } from "../public/api"
import { TextLabel } from "../public/model"

EventOn.vehicleDestroy((vehicle) => {
    const attachedLabels = vehicle.getVariable("internal-vehicle::attached-labels")
    if (attachedLabels === undefined) {
        return
    }

    for (const label of attachedLabels) {
        if (label.exists) {
            delete3dTextLabel(label)
        }
    }

    vehicle.deleteVariable("internal-vehicle::attached-labels")
})

export function attachLabelToVehicle(label: TextLabel, vehicle: Vehicle, offset: WorldPosition) {
    if (SampNatives.attach3DTextLabelToVehicle(label.id, vehicle.id, offset.x, offset.y, offset.z)) {
        let attachedLabels = vehicle.getVariable("internal-vehicle::attached-labels")
        if (attachedLabels === undefined) {
            attachedLabels = []
        }
        attachedLabels.push(label)
        vehicle.setVariable("internal-vehicle::attached-labels", attachedLabels)
    }
}