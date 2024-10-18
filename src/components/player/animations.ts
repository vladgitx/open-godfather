import { gameNatives } from "@/wrapper/game"
import { type Player } from "./entity"

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
        gameNatives.applyAnimation(this.player.id, library, name, speed, loop, lockX, lockY, freeze, time, forceSync)
    }

    clear() {
        gameNatives.clearAnimations(this.player.id, true)
    }

    get currentIndex() {
        return gameNatives.getPlayerAnimationIndex(this.player.id)
    }
}
