import { type StreamerItemType, streamerNatives } from "@/natives/streamer"
import { Entity } from "../entity"
import { Vector3 } from "../vector3"

export class StreamerEntity extends Entity {
    constructor(
        id: number,
        private type: StreamerItemType,
    ) {
        super(id)
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

    set model(id: number) {
        streamerNatives.setIntData(this.type, this.id, "modelId", id)
    }

    get model() {
        return streamerNatives.getIntData(this.type, this.id, "modelId")
    }

    set position(position: Vector3) {
        streamerNatives.setFloatData(this.type, this.id, "x", position.x)
        streamerNatives.setFloatData(this.type, this.id, "y", position.y)
        streamerNatives.setFloatData(this.type, this.id, "z", position.z)
    }

    get position() {
        const x = streamerNatives.getFloatData(this.type, this.id, "x")
        const y = streamerNatives.getFloatData(this.type, this.id, "y")
        const z = streamerNatives.getFloatData(this.type, this.id, "z")

        return new Vector3(x, y, z)
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

    set streamDistance(distance: number) {
        streamerNatives.setFloatData(this.type, this.id, "streamDistance", distance)
    }

    get streamDistance() {
        return streamerNatives.getFloatData(this.type, this.id, "streamDistance")
    }
}
