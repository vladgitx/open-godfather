import { streamerNatives } from "@/wrapper/streamer"
import { type Vector3 } from "../../lib/vector3"
import { GameObject } from "./entity"
import { type Player } from "../player"
import { StreamerEntityHandler } from "@/lib/entity/streamer"
import { EntityPool } from "@/lib/entity"

class GameObjectHandler extends StreamerEntityHandler<GameObject, typeof GameObject> {
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

        const object = new GameObject(objectId)
        EntityPool.add(this.pool, objectId, object)

        object.onCleanup(() => {
            streamerNatives.destroyDynamicObject(objectId)
        })

        return object
    }
}

export const gameObjects = new GameObjectHandler(GameObject, "object")
