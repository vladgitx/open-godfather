import { type PlayerMp } from "../instance"
import type { DialogResponse } from "./@types/response"

class PlayerDialogFactory {
    private promises = new Map<number, (result: DialogResponse | undefined) => void>()

    async new(player: PlayerMp): Promise<DialogResponse | undefined> {
        const existing = this.promises.get(player.id)

        if (existing) {
            existing(undefined)
        }

        return new Promise((resolve) => {
            this.promises.set(player.id, resolve)
        })
    }

    destroy(player: PlayerMp, response: DialogResponse | undefined) {
        const existing = this.promises.get(player.id)

        if (existing) {
            existing(response)
        }

        this.promises.delete(player.id)
    }
}

export const playerDialogFactory = new PlayerDialogFactory()
