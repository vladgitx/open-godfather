import { nativeFunctions } from "@/wrapper"
import { type Player } from "../entity"

export class PlayerAnimations {
    constructor(private player: Player) {}

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
        nativeFunctions.applyAnimation(this.player.id, library, name, speed, loop, lockX, lockY, freeze, time, forceSync)
    }

    clear() {
        nativeFunctions.clearAnimations(this.player.id, true)
    }

    get currentIndex() {
        return nativeFunctions.getPlayerAnimationIndex(this.player.id)
    }
}
