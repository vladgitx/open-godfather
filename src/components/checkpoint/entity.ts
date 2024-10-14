import { type Player } from "../player"
import { StreamerEntity } from "../../modules/streamer-entity"

export class Checkpoint extends StreamerEntity {
    private playerEnterCallbacks: ((player: Player, checkpoint: Checkpoint) => void)[] = []
    private playerLeaveCallbacks: ((player: Player, checkpoint: Checkpoint) => void)[] = []

    constructor(id: number) {
        super(id, "checkpoint")

        this.onCleanup(() => {
            this.playerEnterCallbacks = []
            this.playerLeaveCallbacks = []
        })
    }

    static getEnterCallbacks(checkpoint: Checkpoint) {
        return checkpoint.playerEnterCallbacks
    }

    static getLeaveCallbacks(checkpoint: Checkpoint) {
        return checkpoint.playerLeaveCallbacks
    }

    onPlayerEnter(callback: (player: Player, checkpoint: Checkpoint) => void) {
        this.playerEnterCallbacks.push(callback)

        return () => {
            this.playerEnterCallbacks = this.playerEnterCallbacks.filter((cb) => cb !== callback)
        }
    }

    onPlayerLeave(callback: (player: Player, checkpoint: Checkpoint) => void) {
        this.playerLeaveCallbacks.push(callback)

        return () => {
            this.playerLeaveCallbacks = this.playerLeaveCallbacks.filter((cb) => cb !== callback)
        }
    }
}
