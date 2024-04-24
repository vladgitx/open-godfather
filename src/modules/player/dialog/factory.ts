import { type Player } from "../instance"
import type { DialogResponse } from "./@types/response"

class PlayerDialogFactory {
    private promises = new Map<number, (result: DialogResponse | undefined) => void>()

    async new(player: Player): Promise<DialogResponse | undefined> {
        const existing = this.promises.get(player.id)

        if (existing) {
            existing(undefined)
        }

        return new Promise((resolve) => {
            this.promises.set(player.id, resolve)
        })
    }

    destroy(player: Player, response: DialogResponse | undefined) {
        const existing = this.promises.get(player.id)

        if (existing) {
            // @dockfries
            // bug: does not trigger resolve of promise
            // fix: it only works if you put it in an event loop
            setTimeout(() => {
                existing(response)
            })
        }

        this.promises.delete(player.id)
    }
}

export const playerDialogFactory = new PlayerDialogFactory()
