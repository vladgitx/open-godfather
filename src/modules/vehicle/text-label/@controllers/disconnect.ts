import { eventsMp } from "../../../../singletons/events"
import { textLabelsMp } from "../../../../singletons/text-labels"

eventsMp.on("vehicleDestroy", (vehicle) => {
    for (const label of vehicle.textLabels.all) {
        textLabelsMp.destroy(label)
    }
})
