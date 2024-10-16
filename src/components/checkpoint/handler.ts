import { streamerNatives } from "@/wrapper/streamer"
import { type Player } from "../player"
import { StreamerEntityHandler } from "../../core/streamer-entity"
import { type Vector3 } from "../../core/vector3"
import { Checkpoint } from "./entity"

class CheckpointHandler extends StreamerEntityHandler<Checkpoint, typeof Checkpoint> {
    new(
        position: Vector3,
        size = 3.0,
        streamDistance = 200,
        onlyVisibleFor?: {
            world?: number
            interior?: number
            player?: Player
        },
        priority = 0,
    ) {
        const checkpointId = streamerNatives.createDynamicCheckpoint(
            position,
            size,
            onlyVisibleFor?.world ?? -1,
            onlyVisibleFor?.interior ?? -1,
            onlyVisibleFor?.player?.sampId ?? -1,
            streamDistance,
            -1,
            priority,
        )

        if (checkpointId === undefined) {
            return undefined
        }

        const checkpoint = CheckpointHandler.createInstance(this, checkpointId)

        checkpoint.onCleanup(() => {
            streamerNatives.destroyDynamicCheckpoint(checkpointId)
        })

        return checkpoint
    }

    toggleFor(player: Player, checkpoint: Checkpoint, toggle: boolean) {
        streamerNatives.togglePlayerDynamicCheckpoint(player.sampId, checkpoint.streamerId, toggle)
    }

    toggleAllFor(player: Player, toggle: boolean) {
        streamerNatives.togglePlayerAllDynamicCheckpoints(player.sampId, toggle)
    }

    isPlayerIn(player: Player, checkpoint: Checkpoint) {
        return streamerNatives.isPlayerInDynamicCheckpoint(player.sampId, checkpoint.streamerId)
    }

    getVisibleForPlayer(player: Player) {
        const id = streamerNatives.getPlayerVisibleDynamicCheckpoint(player.sampId)

        if (id === undefined) {
            return undefined
        }

        return this.atStreamerId(id)
    }
}

export const checkpointHandler = new CheckpointHandler(Checkpoint, "checkpoint")
