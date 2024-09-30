import { playerHandler } from "@/modules/player"
import { streamerEvents } from "@/natives/streamer"
import { checkpointHandler } from "../handler"
import { dispatcher } from "@/modules/dispatcher"
import { Checkpoint } from "../entity"

streamerEvents.onPlayerEnterDynamicCheckpoint((playerId, checkpointId) => {
    const player = playerHandler.at(playerId)
    const checkpoint = checkpointHandler.at(checkpointId)

    if (player && checkpoint) {
        dispatcher.emit("playerEnterCheckpoint", player, checkpoint)

        Checkpoint.getEnterCallbacks(checkpoint).forEach((cb) => {
            cb(player, checkpoint)
        })
    }
})

streamerEvents.onPlayerLeaveDynamicCheckpoint((playerId, checkpointId) => {
    const player = playerHandler.at(playerId)
    const checkpoint = checkpointHandler.at(checkpointId)

    if (player && checkpoint) {
        dispatcher.emit("playerLeaveCheckpoint", player, checkpoint)

        Checkpoint.getLeaveCallbacks(checkpoint).forEach((cb) => {
            cb(player, checkpoint)
        })
    }
})
