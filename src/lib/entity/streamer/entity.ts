import { INVALID_STREAMER_ID, streamerNatives, type StreamerItemType } from "@/wrapper/streamer"
import { Vector3, type Position3 } from "../../vector3"
import { GameEntity } from "../game"
import { type EventMapInterface } from "@/lib/event-bus"

export class StreamerEntity<EventMap extends EventMapInterface<EventMap> = EventMapInterface> extends GameEntity<EventMap> {
    constructor(
        gameId: number,
        private type: StreamerItemType,
    ) {
        super(gameId, INVALID_STREAMER_ID)
    }

    set drawDistance(distance: number) {
        streamerNatives.setFloatData(this.type, this.id, "streamDistance", distance)
    }

    get drawDistance() {
        return streamerNatives.getFloatData(this.type, this.id, "streamDistance")
    }

    set interior(id: number) {
        streamerNatives.setIntData(this.type, this.id, "interiorId", id)
    }

    get interior() {
        return streamerNatives.getIntData(this.type, this.id, "interiorId")
    }

    set position(position: Position3) {
        streamerNatives.setItemPos(this.type, this.id, position)
    }

    get position(): Vector3 {
        return streamerNatives.getItemPos(this.type, this.id)
    }

    set world(id: number) {
        streamerNatives.setIntData(this.type, this.id, "worldId", id)
    }

    get world() {
        return streamerNatives.getIntData(this.type, this.id, "worldId")
    }

    set priority(priority: number) {
        streamerNatives.setIntData(this.type, this.id, "priority", priority)
    }

    get priority() {
        return streamerNatives.getIntData(this.type, this.id, "priority")
    }

    set rotation(angle: number) {
        streamerNatives.setFloatData(this.type, this.id, "rotation", angle)
    }

    get rotation() {
        return streamerNatives.getFloatData(this.type, this.id, "rotation")
    }

    set rotation3d(rotation: Position3) {
        streamerNatives.setFloatData(this.type, this.id, "rotX", rotation.x)
        streamerNatives.setFloatData(this.type, this.id, "rotY", rotation.y)
        streamerNatives.setFloatData(this.type, this.id, "rotZ", rotation.z)
    }

    get rotation3d(): Vector3 {
        const x = streamerNatives.getFloatData(this.type, this.id, "rotX")
        const y = streamerNatives.getFloatData(this.type, this.id, "rotY")
        const z = streamerNatives.getFloatData(this.type, this.id, "rotZ")

        return new Vector3(x, y, z)
    }

    set streamDistance(distance: number) {
        streamerNatives.setFloatData(this.type, this.id, "streamDistance", distance)
    }

    get streamDistance() {
        return streamerNatives.getFloatData(this.type, this.id, "streamDistance")
    }
}
