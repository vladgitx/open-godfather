import { streamerNatives } from "@/wrapper/streamer"
import { type Position3 } from "../../lib/vector3"
import { GameObject } from "./entity"
import { type Player } from "../player"
import { StreamerEntityHandler } from "@/lib/entity/streamer"
import { EntityPool } from "@/lib/pool"

class GameObjectHandler extends StreamerEntityHandler<GameObject> {
    new(
        model: number,
        position: Position3,
        rotation: Position3,
        streamDistance = 300.0,
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
            EntityPool.remove(this.pool, objectId, object)
        })

        return object
    }

    newFromId(id: number) {
        if (this.pool.has(id)) {
            return this.pool.at(id)
        }

        if (!streamerNatives.isValidDynamicObject(id)) {
            return undefined
        }

        const object = new GameObject(id)
        EntityPool.add(this.pool, id, object)

        object.onCleanup(() => {
            streamerNatives.destroyDynamicObject(id)
            EntityPool.remove(this.pool, id, object)
        })

        return object
    }
}

export const gameObjects = new GameObjectHandler("object", GameObject)
