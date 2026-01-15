import { type EnumValue } from "@/lib/types"
import { type WEAPONS } from "../game"

samp.registerEvent("OnPlayerPickUpDynamicPickup", "ii")
samp.registerEvent("OnPlayerEnterDynamicCP", "ii")
samp.registerEvent("OnPlayerLeaveDynamicCP", "ii")
samp.registerEvent("OnPlayerShootDynamicObject", "iiifff")

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
}

export const streamerCallbacks = new StreamerCallbacks()
