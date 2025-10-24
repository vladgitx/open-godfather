import { StreamerEntityHandler } from "@/lib/entity/streamer"
import { type Position3 } from "@/lib/vector3"
import { type Player } from "../player"
import { streamerNatives } from "@/wrapper/streamer"
import { EntityPool } from "@/lib/pool"
import { MapIcon } from "./entity"
import { MAP_ICON_STYLES, type MapIconStyle } from "@/wrapper/game"

class MapIconHandler extends StreamerEntityHandler<MapIcon> {
    new(
        position: Position3,
        type: number,
        style: MapIconStyle,
        color: string,
        streamDistance = 200.0,
        onlyVisibleFor?: {
            world?: number
            interior?: number
            player?: Player
        },
        priority = 0,
    ) {
        const mapIconId = streamerNatives.createDynamicMapIcon(
            position,
            type,
            color,
            onlyVisibleFor?.world ?? -1,
            onlyVisibleFor?.interior ?? -1,
            onlyVisibleFor?.player?.id ?? -1,
            streamDistance,
            MAP_ICON_STYLES[style],
            -1,
            priority,
        )

        if (mapIconId === undefined) {
            return undefined
        }

        const mapIcon = new MapIcon(mapIconId)
        EntityPool.add(this.pool, mapIconId, mapIcon)

        mapIcon.onCleanup(() => {
            streamerNatives.destroyDynamicMapIcon(mapIconId)
            EntityPool.remove(this.pool, mapIconId, mapIcon)
        })

        return mapIcon
    }
}

export const mapIcons = new MapIconHandler("mapIcon", MapIcon)
