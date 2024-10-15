import { streamerNatives } from "@/wrapper/streamer"
import { EntityFactory } from "../../core/entity"
import { type Player } from "../player"
import { StreamerHandler } from "../../core/streamer-entity"
import { type Vector3 } from "../../core/vector3"
import { Checkpoint } from "./entity"

const checkpointFactory = new EntityFactory<Checkpoint, typeof Checkpoint>(Checkpoint)

class CheckpointHandler extends StreamerHandler<Checkpoint> {
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
            onlyVisibleFor?.player?.id ?? -1,
            streamDistance,
            -1,
            priority,
        )

        if (checkpointId === undefined) {
            return undefined
        }

        const checkpoint = checkpointFactory.new(checkpointId)

        checkpoint?.onCleanup(() => {
            streamerNatives.destroyDynamicCheckpoint(checkpointId)
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

        return checkpointFactory.pool.get(id)
    }
}

export const checkpointHandler = new CheckpointHandler("checkpoint", checkpointFactory)
