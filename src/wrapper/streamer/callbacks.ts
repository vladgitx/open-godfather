samp.registerEvent("OnPlayerPickUpDynamicPickup", "ii")
samp.registerEvent("OnPlayerEnterDynamicCP", "ii")
samp.registerEvent("OnPlayerLeaveDynamicCP", "ii")

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
}

export const streamerCallbacks = new StreamerCallbacks()
