import { players } from "@/components/player"
import { checkpoints } from "../handler"
import { dispatcher } from "@/lib/dispatcher"
import { EventBus } from "@/lib/event-bus"
import { streamerCallbacks } from "@/wrapper/streamer"

streamerCallbacks.onPlayerEnterDynamicCheckpoint((playerId, checkpointId) => {
    const player = players.pool.at(playerId)
    const checkpoint = checkpoints.pool.at(checkpointId)

    if (player && checkpoint) {
        dispatcher.emit("playerEnterCheckpoint", player, checkpoint)
        EventBus.emit(checkpoint.events, "playerEnter", player)
    }
})

streamerCallbacks.onPlayerLeaveDynamicCheckpoint((playerId, checkpointId) => {
    const player = players.pool.at(playerId)
    const checkpoint = checkpoints.pool.at(checkpointId)

    if (player && checkpoint) {
        dispatcher.emit("playerLeaveCheckpoint", player, checkpoint)
        EventBus.emit(checkpoint.events, "playerLeave", player)
    }
})
