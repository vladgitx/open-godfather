import { type Vector3 } from "../../lib/vector3"
import { TextLabel } from "./entity"
import { streamerNatives } from "@/natives/streamer"
import { type Player } from "../player"
import { StreamerHandler } from "../../lib/streamer-entity"
import { EntityFactory } from "../../lib/entity"
import { INVALID_PLAYER_ID, INVALID_VEHICLE_ID } from "@/natives/functions"

const textLabelFactory = new EntityFactory<TextLabel, typeof TextLabel>(TextLabel)

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

        const textLabel = textLabelFactory.new(labelId, text, color)

        textLabel?.onCleanup(() => {
            streamerNatives.destroyDynamic3dTextLabel(labelId)
        })

        return textLabel
    }
}

export const textLabelHandler = new TextLabelHandler("textLabel", textLabelFactory)
