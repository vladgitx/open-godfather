import { playerHandler } from "@/components/player"
import { streamerEvents } from "@/wrapper/streamer"
import { checkpointHandler } from "../handler"
import { dispatcher } from "@/core/dispatcher"
import { EventCallbacks } from "@/core/event-callbacks"

streamerEvents.onPlayerEnterDynamicCheckpoint((playerId, checkpointId) => {
    const player = playerHandler.atSampId(playerId)
    const checkpoint = checkpointHandler.atStreamerId(checkpointId)

    if (player && checkpoint) {
        dispatcher.emit("playerEnterCheckpoint", player, checkpoint)
        EventCallbacks.emit(checkpoint.events, "playerEnter", player)
    }
})

streamerEvents.onPlayerLeaveDynamicCheckpoint((playerId, checkpointId) => {
    const player = playerHandler.atSampId(playerId)
    const checkpoint = checkpointHandler.atStreamerId(checkpointId)

    if (player && checkpoint) {
        dispatcher.emit("playerLeaveCheckpoint", player, checkpoint)
        EventCallbacks.emit(checkpoint.events, "playerLeave", player)
    }
})
