import { EventEmitter } from "stream"
import { EventMap } from "./@types/events"

export class EventBus extends EventEmitter {
    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean {
        return super.emit(event, ...(args as any[]))
    }

    addListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this {
        return super.addListener(event, listener as (...args: any[]) => void)
    }

    on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this {
        return super.on(event, listener as (...args: any[]) => void)
    }

    once<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this {
        return super.once(event, listener as (...args: any[]) => void)
    }

    prependListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this {
        return super.prependListener(event, listener as (...args: any[]) => void)
    }

    prependOnceListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this {
        return super.prependOnceListener(event, listener as (...args: any[]) => void)
    }

    removeListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this {
        return super.removeListener(event, listener as (...args: any[]) => void)
    }

    off<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this {
        return super.off(event, listener as (...args: any[]) => void)
    }

    removeAllListeners<K extends keyof EventMap>(event?: K): this {
        return super.removeAllListeners(event)
    }

    listeners<K extends keyof EventMap>(event: K): Function[] {
        return super.listeners(event)
    }

    rawListeners<K extends keyof EventMap>(event: K): Function[] {
        return super.rawListeners(event)
    }

    eventNames(): Array<keyof EventMap> {
        return super.eventNames() as Array<keyof EventMap>
    }

    listenerCount<K extends keyof EventMap>(event: K): number {
        return super.listenerCount(event)
    }

    getMaxListeners(): number {
        return super.getMaxListeners()
    }

    setMaxListeners(n: number): this {
        return super.setMaxListeners(n)
    }
}
