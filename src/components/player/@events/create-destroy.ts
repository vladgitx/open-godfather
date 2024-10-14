import { nativeEvents } from "@/natives"
import { dispatcher } from "@/lib/dispatcher"
import { playerFactory, playerHandler } from "../handler"

nativeEvents.onPlayerConnect((playerId) => {
    const player = playerFactory.new(playerId)

    if (player) {
        dispatcher.emit("playerConnect", player)
    }
})

nativeEvents.onPlayerDisconnect((playerId, reason) => {
    const player = playerHandler.at(playerId)

    if (player) {
        dispatcher.emit("playerDisconnect", player, reason)
        player.destroy()
    }
})