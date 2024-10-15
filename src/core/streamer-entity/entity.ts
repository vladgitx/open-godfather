import { INVALID_STREAMER_ID, type StreamerItemType, streamerNatives } from "@/wrapper/streamer"
import { Entity } from "../base-entity"
import { type Vector3 } from "../vector3"
import { type EventMapInterface } from "../event-callbacks"

export class StreamerEntity<EventMap extends EventMapInterface = EventMapInterface> extends Entity<EventMap> {
    private _streamerId: number

    constructor(
        streamerId: number,
        private type: StreamerItemType,
    ) {
        super()

        this._streamerId = streamerId

        this.onCleanup(() => {
            this._streamerId = INVALID_STREAMER_ID
        })
    }

    get streamerId() {
        return this._streamerId
    }

    set drawDistance(distance: number) {
        streamerNatives.setFloatData(this.type, this.streamerId, "streamDistance", distance)
    }

    get drawDistance() {
        return streamerNatives.getFloatData(this.type, this.streamerId, "streamDistance")
    }

    set interior(id: number) {
        streamerNatives.setIntData(this.type, this.streamerId, "interiorId", id)
    }

    get interior() {
        return streamerNatives.getIntData(this.type, this.streamerId, "interiorId")
    }

    set position(position: Vector3) {
        streamerNatives.setItemPos(this.type, this.streamerId, position)
    }

    get position() {
        return streamerNatives.getItemPos(this.type, this.streamerId)
    }

    set world(id: number) {
        streamerNatives.setIntData(this.type, this.streamerId, "worldId", id)
    }

    get world() {
        return streamerNatives.getIntData(this.type, this.streamerId, "worldId")
    }

    set priority(priority: number) {
        streamerNatives.setIntData(this.type, this.streamerId, "priority", priority)
    }

    get priority() {
        return streamerNatives.getIntData(this.type, this.streamerId, "priority")
    }

    set rotation(angle: number) {
        streamerNatives.setFloatData(this.type, this.streamerId, "rotation", angle)
    }

    get rotation() {
        return streamerNatives.getFloatData(this.type, this.streamerId, "rotation")
    }

    set streamDistance(distance: number) {
        streamerNatives.setFloatData(this.type, this.streamerId, "streamDistance", distance)
    }

    get streamDistance() {
        return streamerNatives.getFloatData(this.type, this.streamerId, "streamDistance")
    }
}
