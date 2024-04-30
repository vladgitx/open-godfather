import { streamerNatives } from "@/natives/streamer"
import { StreamerHandler } from "../streamer-entity"
import { type Vector3 } from "../vector3"
import { MapObject } from "./entity"
import { type Player } from "../player"
import { EntityFactory } from "../entity"

const objectFactory = new EntityFactory<MapObject, typeof MapObject>((id) => new MapObject(id))

class MapObjectHandler extends StreamerHandler<MapObject> {
    new(
        model: number,
        position: Vector3,
        rotation: Vector3,
        streamDistance = 200,
        onlyVisibleFor?: {
            world?: number
            interior?: number
            player?: Player
        },
        priority = 0,
    ) {
        const objectId = streamerNatives.createDynamicObject(
            model,
            position,
            rotation,
            onlyVisibleFor?.world ?? -1,
            onlyVisibleFor?.interior ?? -1,
            onlyVisibleFor?.player?.id ?? -1,
            streamDistance,
            streamDistance,
            -1,
            priority,
        )

        if (objectId === undefined) {
            return undefined
        }

        return objectFactory.new(objectId)
    }

    destroy(object: MapObject) {
        streamerNatives.destroyDynamicObject(object.id)
        objectFactory.destroy(object)
    }
}

export const objectHandler = new MapObjectHandler("object", objectFactory)
