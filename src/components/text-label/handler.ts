import { type Position3 } from "../../lib/vector3"
import { TextLabel } from "./entity"
import { type Player } from "../player"
import { StreamerEntityHandler } from "@/lib/entity/streamer"
import { EntityPool } from "@/lib/entity"
import { streamerNatives } from "@/wrapper/streamer"
import { INVALID_PLAYER_ID, INVALID_VEHICLE_ID } from "@/wrapper/game"

class TextLabelHandler extends StreamerEntityHandler<TextLabel, typeof TextLabel> {
    new(
        text: string,
        color: string,
        position: Position3,
        drawDistance = 20,
        onlyVisibleFor?: {
            world?: number
            interior?: number
            player?: Player
        },
        testLos = true,
        priority = 0,
    ) {
        const labelId = streamerNatives.createDynamic3dTextLabel(
            text,
            color,
            position,
            drawDistance,
            INVALID_PLAYER_ID,
            INVALID_VEHICLE_ID,
            testLos ? 1 : 0,
            onlyVisibleFor?.world ?? -1,
            onlyVisibleFor?.interior ?? -1,
            onlyVisibleFor?.player?.id ?? -1,
            drawDistance,
            -1,
            priority,
        )

        if (labelId === undefined) {
            return undefined
        }

        const textLabel = new TextLabel(labelId, text, color)
        EntityPool.add(this.pool, labelId, textLabel)

        textLabel.onCleanup(() => {
            streamerNatives.destroyDynamic3dTextLabel(labelId)
        })

        return textLabel
    }
}

export const textLabels = new TextLabelHandler(TextLabel, "textLabel")
