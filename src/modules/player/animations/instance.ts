import { sampNatives } from "@/wrapper"
import { type PlayerMp } from "../instance"

export class PlayerAnimations {
    constructor(private player: PlayerMp) {}

    set(
        library: string,
        name: string,
        speed: number,
        loop: boolean,
        lockX: boolean,
        lockY: boolean,
        freeze: boolean,
        time: number,
        forceSync = true,
    ) {
        sampNatives.applyAnimation(this.player.id, library, name, speed, loop, lockX, lockY, freeze, time, forceSync)
    }

    clear() {
        sampNatives.clearAnimations(this.player.id, true)
    }

    get currentIndex() {
        return sampNatives.getPlayerAnimationIndex(this.player.id)
    }
}
