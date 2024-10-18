import { Entity } from "../entity"
import { type EventMapInterface } from "../../event-bus"

export class GameEntity<EventMap extends EventMapInterface = EventMapInterface> extends Entity<EventMap> {
    private _gameId: number

    constructor(gameId: number, invalidGameId: number) {
        super()

        this._gameId = gameId

        this.onCleanup(() => {
            this._gameId = invalidGameId
        })
    }

    get id() {
        return this._gameId
    }
}
