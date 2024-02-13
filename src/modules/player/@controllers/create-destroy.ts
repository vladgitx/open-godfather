import { eventsMp } from "../../../singletons/events"
import { SampEvents, SampNatives } from "../../../wrapper"
import { PlayerMpFactory } from "../factory"

// TODO: find the actual issue and fix it
// Weird issue: if you kick a player in the "playerConnect" event, they get a crash/timeout
// So I'm fixing it by triggering "playerConnect" with a little bit of delay
const playerTimeoutIds = new Map<number, NodeJS.Timeout>()

SampEvents.onPlayerConnect((playerId) => {
    SampNatives.togglePlayerSpectating(playerId, true) // TODO: remove this when the issue is fixed

    const timeoutId = setTimeout(() => {
        playerTimeoutIds.delete(playerId)

        const player = PlayerMpFactory.new(playerId)

        if (player) {
            eventsMp.emit("playerConnect", player)
        }
    }, 1000)

    playerTimeoutIds.set(playerId, timeoutId)
})

SampEvents.onPlayerDisconnect((playerId, reason) => {
    clearTimeout(playerTimeoutIds.get(playerId))
    playerTimeoutIds.delete(playerId)

    const player = PlayerMpFactory.at(playerId)
    if (player) {
        eventsMp.emit("playerDisconnect", player, reason)
        PlayerMpFactory.destroy(player)
    }
})
