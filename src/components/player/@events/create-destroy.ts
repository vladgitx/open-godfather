import { gameCallbacks } from "@/wrapper/game"
import { dispatcher } from "@/lib/dispatcher"
import { players } from "../handler"
import { KICK_REASONS } from "@/wrapper/game/enums.public"
import { getEnumKeyByValue } from "@/lib/utils"
import { Player } from "../entity"
import { EntityPool } from "@/lib/pool"

const connectionTimeoutId = new Map<number, NodeJS.Timeout>()

gameCallbacks.onPlayerConnect((playerId) => {
    const existingTimeoutId = connectionTimeoutId.get(playerId)

    if (existingTimeoutId) {
        clearTimeout(existingTimeoutId)
        connectionTimeoutId.delete(playerId)
    }

    const timeoutId = setTimeout(() => {
        clearTimeout(timeoutId)
        connectionTimeoutId.delete(playerId)

        const player = new Player(playerId)
        EntityPool.add(players.pool, playerId, player)

        player.spectating = true

        player.onCleanup(() => {
            EntityPool.remove(players.pool, playerId, player)
        })

        dispatcher.emit("playerConnect", player)
    }, 1)

    connectionTimeoutId.set(playerId, timeoutId)
})

gameCallbacks.onPlayerDisconnect((playerId, reason) => {
    const existingTimeoutId = connectionTimeoutId.get(playerId)

    if (existingTimeoutId) {
        clearTimeout(existingTimeoutId)
        connectionTimeoutId.delete(playerId)
    }

    const player = players.pool.at(playerId)

    if (player) {
        dispatcher.emit("playerDisconnect", player, getEnumKeyByValue(KICK_REASONS, reason))
        player.destroy()
    }
})
