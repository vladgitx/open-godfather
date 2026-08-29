import { type EnumValue } from "@/lib/types"
import { type WEAPONS } from "../game"

samp.registerEvent("OnPlayerPickUpDynamicPickup", "ii")
samp.registerEvent("OnPlayerEnterDynamicCP", "ii")
samp.registerEvent("OnPlayerLeaveDynamicCP", "ii")
samp.registerEvent("OnPlayerShootDynamicObject", "iiifff")
samp.registerEvent("OnPlayerEditDynamicObject", "iiiffffff")
samp.registerEvent("OnPlayerSelectDynamicObject", "iiifff")

class StreamerCallbacks {
    onPlayerPickUpDynamicPickup(callback: (playerId: number, pickupId: number) => void) {
        samp.on("OnPlayerPickUpDynamicPickup", callback)
    }

    onPlayerEnterDynamicCheckpoint(callback: (playerId: number, checkpointId: number) => void) {
        samp.on("OnPlayerEnterDynamicCP", callback)
    }

    onPlayerLeaveDynamicCheckpoint(callback: (playerId: number, checkpointId: number) => void) {
        samp.on("OnPlayerLeaveDynamicCP", callback)
    }

    onPlayerShootDynamicObject(
        callback: (
            playerId: number,
            weaponId: EnumValue<typeof WEAPONS>,
            objectId: number,
            hitX: number,
            hitY: number,
            hitZ: number,
        ) => void,
    ) {
        samp.on("OnPlayerShootDynamicObject", callback)
    }

    onPlayerEditDynamicObject(
        callback: (
            playerId: number,
            objectId: number,
            response: 0 | 1 | 2,
            x: number,
            y: number,
            z: number,
            rx: number,
            ry: number,
            rz: number,
        ) => void,
    ) {
        samp.on("OnPlayerEditDynamicObject", callback)
    }

    onPlayerSelectDynamicObject(callback: (playerId: number, objectId: number, model: number, x: number, y: number, z: number) => void) {
        samp.on("OnPlayerSelectDynamicObject", callback)
    }
}

export const streamerCallbacks = new StreamerCallbacks()
