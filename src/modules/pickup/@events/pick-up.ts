import { playerHandler } from "@/modules/player"
import { streamerEvents } from "@/natives/streamer"
import { pickupHandler } from "../handler"
import { dispatcher } from "@/modules/dispatcher"

streamerEvents.onPlayerPickUpDynamicPickup((playerId, pickupId) => {
    const player = playerHandler.at(playerId)
    const pickup = pickupHandler.at(pickupId)

    if (player && pickup) {
        dispatcher.emit("playerPickUpPickup", player, pickup)
    }
})
