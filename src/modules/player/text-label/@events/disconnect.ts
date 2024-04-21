import { dispatcher } from "@/modules/dispatcher"
import { textLabelsMp } from "@/singletons/text-labels"

dispatcher.on("playerDisconnect", (player) => {
    for (const label of player.textLabels.all) {
        textLabelsMp.destroy(label)
    }
})
