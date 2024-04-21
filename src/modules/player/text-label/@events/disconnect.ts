import { dispatcher } from "@/modules/dispatcher"
import { textLabelHandler } from "@/modules/text-label"

dispatcher.on("playerDisconnect", (player) => {
    for (const label of player.textLabels.all) {
        textLabelHandler.destroy(label)
    }
})
