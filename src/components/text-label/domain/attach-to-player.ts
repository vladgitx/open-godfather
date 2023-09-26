import SampNatives from "../../../shared/samp-natives"
import { WorldPosition } from "../../../shared/types"
import { EventOn } from "../../event"
import { Player } from "../../player"
import { delete3dTextLabel } from "../public/api"
import { TextLabel } from "../public/model"

EventOn.playerDisconnect((player) => {
    const attachedLabels = player.getVariable("internal-player::attached-labels")
    if (attachedLabels === undefined) {
        return
    }

    for (const label of attachedLabels) {
        if (label.exists) {
            delete3dTextLabel(label)
        }
    }

    player.deleteVariable("internal-player::attached-labels")
})

export function attachLabelToPlayer(label: TextLabel, player: Player, offset: WorldPosition) {
    if (SampNatives.attach3DTextLabelToPlayer(label.id, player.id, offset.x, offset.y, offset.z)) {
        let attachedLabels = player.getVariable("internal-player::attached-labels")
        if (attachedLabels === undefined) {
            attachedLabels = []
        }
        attachedLabels.push(label)
        player.setVariable("internal-player::attached-labels", attachedLabels)
    }
}