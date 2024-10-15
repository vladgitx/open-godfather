import { playerHandler } from "@/components/player"
import { streamerEvents } from "@/natives/streamer"
import { checkpointHandler } from "../handler"
import { dispatcher } from "@/lib/dispatcher"
import { EventCallbacks } from "@/lib/event-callbacks"

streamerEvents.onPlayerEnterDynamicCheckpoint((playerId, checkpointId) => {
    const player = playerHandler.at(playerId)
    const checkpoint = checkpointHandler.at(checkpointId)

    if (player && checkpoint) {
        dispatcher.emit("playerEnterCheckpoint", player, checkpoint)
        EventCallbacks.emit(checkpoint.events, "playerEnter", player)
    }
})

streamerEvents.onPlayerLeaveDynamicCheckpoint((playerId, checkpointId) => {
    const player = playerHandler.at(playerId)
    const checkpoint = checkpointHandler.at(checkpointId)

    if (player && checkpoint) {
        dispatcher.emit("playerLeaveCheckpoint", player, checkpoint)
        EventCallbacks.emit(checkpoint.events, "playerLeave", player)
    }
})
