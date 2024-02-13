import { PlayerMp } from "../instance"
import { TDialogResponse } from "./@internal/types"

export class PlayerDialogFactory {
    static promises = new Map<number, (result: TDialogResponse) => void>()

    static async new(player: PlayerMp): Promise<TDialogResponse> {
        const existing = this.promises.get(player.id)
        if (existing) {
            existing(undefined)
        }

        return new Promise((resolve) => {
            this.promises.set(player.id, resolve)
        })
    }

    static destroy(player: PlayerMp, response: TDialogResponse) {
        const existing = this.promises.get(player.id)
        if (existing) {
            existing(response)
        }

        this.promises.delete(player.id)
    }
}
