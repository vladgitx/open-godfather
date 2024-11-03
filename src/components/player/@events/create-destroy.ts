import { gameCallbacks } from "@/wrapper/game"
import { dispatcher } from "@/lib/dispatcher"
import { players } from "../handler"
import { KICK_REASONS } from "@/wrapper/game/enums.public"
import { getEnumKeyByValue } from "@/lib/utils"
import { Player } from "../entity"
import { EntityPool } from "@/lib/pool"

gameCallbacks.onPlayerConnect((playerId) => {
    const player = new Player(playerId)
    EntityPool.add(players.pool, playerId, player)

    const timeoutId = setTimeout(() => {
        // For some unknown reason, the player times out if I don't delay the event call
        dispatcher.emit("playerConnect", player)
    }, 1000)

    player.onCleanup(() => {
        clearTimeout(timeoutId)
        EntityPool.remove(players.pool, playerId, player)
    })
})

gameCallbacks.onPlayerDisconnect((playerId, reason) => {
    const player = players.pool.at(playerId)

    if (player) {
        dispatcher.emit("playerDisconnect", player, getEnumKeyByValue(KICK_REASONS, reason))
        player.destroy()
    }
})
