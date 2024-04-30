import { type Vector3 } from "../vector3"
import { TextLabel } from "./entity"
import { streamerNatives } from "@/natives/streamer"
import { type Player } from "../player"
import { StreamerHandler } from "../streamer-entity"
import { EntityFactory } from "../entity"

const textLabelFactory = new EntityFactory<TextLabel, typeof TextLabel>((id, text, color) => new TextLabel(id, text, color))

class TextLabelHandler extends StreamerHandler<TextLabel> {
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
