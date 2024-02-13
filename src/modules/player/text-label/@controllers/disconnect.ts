import { eventsMp } from "../../../../singletons/events"
import { textLabelsMp } from "../../../../singletons/text-labels"

eventsMp.on("playerDisconnect", (player) => {
    for (const label of player.textLabels.all) {
        textLabelsMp.destroy(label)
    }
})
