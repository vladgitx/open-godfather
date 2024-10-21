import { streamerNatives } from "@/wrapper/streamer"
import { type Player } from "../player"
import { type Position3 } from "../../lib/vector3"
import { Checkpoint } from "./entity"
import { StreamerEntityHandler } from "@/lib/entity/streamer"
import { EntityPool } from "@/lib/pool"

class CheckpointHandler extends StreamerEntityHandler<Checkpoint> {
    new(
        position: Position3,
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
            onlyVisibleFor?.player?.id ?? -1,
            streamDistance,
            -1,
            priority,
        )

        if (checkpointId === undefined) {
            return undefined
        }

        const checkpoint = new Checkpoint(checkpointId)
        EntityPool.add(this.pool, checkpointId, checkpoint)

        checkpoint.onCleanup(() => {
            streamerNatives.destroyDynamicCheckpoint(checkpointId)
            EntityPool.remove(this.pool, checkpointId, checkpoint)
        })

        return checkpoint
    }

    toggleFor(player: Player, checkpoint: Checkpoint, toggle: boolean) {
        streamerNatives.togglePlayerDynamicCheckpoint(player.id, checkpoint.id, toggle)
    }

    toggleAllFor(player: Player, toggle: boolean) {
        streamerNatives.togglePlayerAllDynamicCheckpoints(player.id, toggle)
    }

    isPlayerIn(player: Player, checkpoint: Checkpoint) {
        return streamerNatives.isPlayerInDynamicCheckpoint(player.id, checkpoint.id)
    }

    getVisibleForPlayer(player: Player) {
        const id = streamerNatives.getPlayerVisibleDynamicCheckpoint(player.id)

        if (id === undefined) {
            return undefined
        }

        return this.pool.at(id)
    }
}

export const checkpoints = new CheckpointHandler("checkpoint", Checkpoint)
