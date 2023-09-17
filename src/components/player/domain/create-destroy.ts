import SampNatives from "../../../shared/samp-natives"
import { EventEmit } from "../../event"
import { Player } from "../public/model"

export const playersPool = new Map<number, Player>()

SampNatives.on("OnPlayerConnect", (playerId: number) => {
    const player = new Player(playerId)
    playersPool.set(playerId, player)

    EventEmit.playerConnect(player)
})

SampNatives.on("OnPlayerDisconnect", (playerId: number, reason: number) => {
    const player = playersPool.get(playerId)
    if (player) {
        EventEmit.playerDisconnect(player, reason)
        
        playersPool.delete(playerId)
    }
})