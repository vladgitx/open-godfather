import { gameCallbacks } from "@/wrapper/game"
import { dispatcher } from "@/lib/dispatcher"
import { players } from "../handler"
import { KICK_REASONS } from "@/wrapper/game/enums.public"
import { getEnumKeyByValue } from "@/lib/utils"
import { Player } from "../entity"
import { EntityPool } from "@/lib/entity"

gameCallbacks.onPlayerConnect((playerId) => {
    const player = new Player(playerId)
    EntityPool.add_new(players.pool, playerId, player)

    player.onCleanup(() => {
        EntityPool.remove(players.pool, playerId, player)
    })

    dispatcher.emit("playerConnect", player)
})

gameCallbacks.onPlayerDisconnect((playerId, reason) => {
    const player = players.pool.at(playerId)

    if (player) {
        dispatcher.emit("playerDisconnect", player, getEnumKeyByValue(KICK_REASONS, reason))
        player.destroy()
    }
})
