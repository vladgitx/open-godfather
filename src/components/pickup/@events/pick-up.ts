import { players } from "@/components/player"
import { pickups } from "../handler"
import { dispatcher } from "@/lib/dispatcher"
import { streamerCallbacks } from "@/wrapper/streamer"

streamerCallbacks.onPlayerPickUpDynamicPickup((playerId, pickupId) => {
    const player = players.pool.at(playerId)
    const pickup = pickups.pool.at(pickupId)

    if (player && pickup) {
        dispatcher.emit("playerPickUpPickup", player, pickup)
    }
})
