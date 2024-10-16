import { type Vector3 } from "../../core/vector3"
import { TextLabel } from "./entity"
import { streamerNatives } from "@/wrapper/streamer"
import { type Player } from "../player"
import { StreamerEntityHandler } from "../../core/streamer-entity"
import { INVALID_PLAYER_ID, INVALID_VEHICLE_ID } from "@/wrapper/functions"

class TextLabelHandler extends StreamerEntityHandler<TextLabel, typeof TextLabel> {
    new(
        text: string,
        color: string,
        position: Vector3,
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
            onlyVisibleFor?.player?.sampId ?? -1,
            drawDistance,
            -1,
            priority,
        )

        if (labelId === undefined) {
            return undefined
        }

        const textLabel = TextLabelHandler.createInstance(this, labelId, text, color)

        textLabel.onCleanup(() => {
            streamerNatives.destroyDynamic3dTextLabel(labelId)
        })

        return textLabel
    }
}

export const textLabelHandler = new TextLabelHandler(TextLabel, "textLabel")
