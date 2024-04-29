import { type Entity } from "./entity"

export class EntityPromises<T extends Entity, K> {
    private promises = new Map<number, (result: K | undefined) => void>()

    async new(entity: T): Promise<K | undefined> {
        const existing = this.promises.get(entity.id)

        if (existing) {
            existing(undefined)
        }

        return new Promise((resolve) => {
            this.promises.set(entity.id, resolve)
        })
    }

    resolve(entity: T, response: K | undefined) {
        const existing = this.promises.get(entity.id)

        if (existing) {
            // @dockfries
            // bug: does not trigger resolve of promise
            // fix: it only works if you put it in an event loop
            setTimeout(() => {
                existing(response)
            })
        }

        this.promises.delete(entity.id)
    }
}
