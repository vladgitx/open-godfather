import { dispatcher } from "@/modules/dispatcher"
import { textLabelsMp } from "@/singletons/text-labels"

dispatcher.on("vehicleDestroy", (vehicle) => {
    for (const label of vehicle.textLabels.all) {
        textLabelsMp.destroy(label)
    }
})
