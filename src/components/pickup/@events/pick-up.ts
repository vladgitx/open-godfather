import { playerHandler } from "@/components/player"
import { streamerEvents } from "@/wrapper/streamer"
import { pickupHandler } from "../handler"
import { dispatcher } from "@/core/dispatcher"

streamerEvents.onPlayerPickUpDynamicPickup((playerId, pickupId) => {
    const player = playerHandler.atSampId(playerId)
    const pickup = pickupHandler.atStreamerId(pickupId)

    if (player && pickup) {
        dispatcher.emit("playerPickUpPickup", player, pickup)
    }
})
