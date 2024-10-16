import { nativeEvents } from "@/wrapper"
import { dispatcher } from "@/core/dispatcher"
import { playerHandler } from "../handler"
import { EntityHandler } from "@/core/base-entity"

nativeEvents.onPlayerConnect((playerId) => {
    const player = EntityHandler.createInstance(playerHandler, playerId)
    dispatcher.emit("playerConnect", player)
})

nativeEvents.onPlayerDisconnect((playerId, reason) => {
    const player = playerHandler.atSampId(playerId)

    if (player) {
        dispatcher.emit("playerDisconnect", player, reason)
        player.destroy()
    }
})
