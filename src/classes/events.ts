import { EventEmitter } from "stream"

export class Events {
    #events: EventEmitter

    constructor() {
        this.#events = new EventEmitter()
    }

    emit(eventName: string | symbol, ...args: any[]): boolean {
        return this.#events.emit(eventName, ...args)
    }

    on(eventName: string | symbol, listener: (...args: any[]) => void): EventEmitter {
        return this.#events.on(eventName, listener)
    }

    once(eventName: string | symbol, listener: (...args: any[]) => void): EventEmitter {
        return this.#events.once(eventName, listener)
    }

    off(eventName: string | symbol, listener: (...args: any[]) => void): EventEmitter {
        return this.#events.off(eventName, listener)
    }
}