import { type Vector3 } from "../vector3"
import { textLabelFactory } from "./factory"
import { type TextLabel } from "./instance"
import { streamerNatives } from "@/natives/streamer"
import { type Player } from "../player"
import { StreamerHandler } from "../streamer-entity"

const DEFAULT_DRAW_DISTANCE = 20

class TextLabelHandler extends StreamerHandler<TextLabel> {
    new(
        text: string,
        color: string,
        position: Vector3,
        drawDistance = DEFAULT_DRAW_DISTANCE,
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
            -1,
            -1,
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

        return textLabelFactory.new(labelId, text, color)
    }

    destroy(label: TextLabel) {
        streamerNatives.destroyDynamic3dTextLabel(label.id)
        textLabelFactory.destroy(label)
    }
}

export const textLabelHandler = new TextLabelHandler("textLabel", textLabelFactory)
