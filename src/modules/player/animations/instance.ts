import { SampNatives } from "../../../wrapper"
import { PlayerMp } from "../instance"

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
        return SampNatives.applyAnimation(this.player.id, library, name, speed, loop, lockX, lockY, freeze, time, forceSync)
    }

    clear() {
        return SampNatives.clearAnimations(this.player.id, true)
    }

    get currentIndex() {
        return SampNatives.getPlayerAnimationIndex(this.player.id)
    }
}
