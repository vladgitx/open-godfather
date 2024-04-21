import { dispatcher } from "@/modules/dispatcher"
import { textLabelHandler } from "@/modules/text-label"

dispatcher.on("vehicleDestroy", (vehicle) => {
    for (const label of vehicle.textLabels.all) {
        textLabelHandler.destroy(label)
    }
})
