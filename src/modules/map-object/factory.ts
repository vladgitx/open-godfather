import { EntityFactory } from "../entity"
import { MapObject } from "./entity"

class MapObjectFactory extends EntityFactory<MapObject> {
    new(id: number) {
        if (this.pool.has(id)) {
            return undefined
        }

        const object = new MapObject(id)
        this.pool.set(id, object)

        return object
    }
}

export const objectFactory = new MapObjectFactory()
