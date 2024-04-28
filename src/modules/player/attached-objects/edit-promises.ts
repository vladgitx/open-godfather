import { type Vector3 } from "@/modules/vector3"
import { type Player } from "../entity"

export interface EditResult {
    offset: Vector3
    rotation: Vector3
    scale: Vector3
}

class EditPromiseFactory {
    private promises = new Map<number, (result: EditResult | undefined) => void>()

    async new(player: Player): Promise<EditResult | undefined> {
        const existing = this.promises.get(player.id)

        if (existing) {
            existing(undefined)
        }

        return new Promise((resolve) => {
            this.promises.set(player.id, resolve)
        })
    }

    destroy(player: Player, response: EditResult | undefined) {
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

export const editPromiseFactory = new EditPromiseFactory()
