import { type Entity } from "./entity"

export class EntityPromises<T extends Entity, K> {
    private toRejectOnCleanup = new WeakSet<T>()
    private promises = new Map<string, { resolve: (result: K) => void; reject: (reason: Error) => void }>() // key: entity.uuid, value: promise

    async new(entity: T): Promise<K> {
        this.promises
            .get(entity.uuid)
            ?.reject(
                new Error(
                    "Promise was overridden by another promise of the same type! e.g. a new dialog was opened before the previous one was closed.",
                ),
            )

        if (!this.toRejectOnCleanup.has(entity)) {
            entity.onCleanup(() => {
                this.reject(entity, new Error("Entity was destroyed"))
            })

            this.toRejectOnCleanup.add(entity)
        }

        return new Promise((resolve, reject) => {
            this.promises.set(entity.uuid, { resolve, reject })
        })
    }

    resolve(entity: T, response: K) {
        const existing = this.promises.get(entity.uuid)

        if (existing) {
            // @dockfries
            // bug: does not trigger resolve of promise
            // fix: it only works if you put it in an event loop
            setTimeout(() => {
                existing.resolve(response)
            })
        }

        this.promises.delete(entity.uuid)
    }

    reject(entity: T, reason: Error) {
        this.promises.get(entity.uuid)?.reject(reason)
        this.promises.delete(entity.uuid)
    }
}
