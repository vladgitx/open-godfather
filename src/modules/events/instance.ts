import { EventEmitter } from "stream"
import { TEventMap } from "./@internal/types"

export class EventBus extends EventEmitter {
    emit<K extends keyof TEventMap>(event: K, ...args: TEventMap[K]): boolean {
        return super.emit(event, ...(args as any[]))
    }

    addListener<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this {
        return super.addListener(event, listener as (...args: any[]) => void)
    }

    on<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this {
        return super.on(event, listener as (...args: any[]) => void)
    }

    once<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this {
        return super.once(event, listener as (...args: any[]) => void)
    }

    prependListener<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this {
        return super.prependListener(event, listener as (...args: any[]) => void)
    }

    prependOnceListener<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this {
        return super.prependOnceListener(event, listener as (...args: any[]) => void)
    }

    removeListener<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this {
        return super.removeListener(event, listener as (...args: any[]) => void)
    }

    off<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this {
        return super.off(event, listener as (...args: any[]) => void)
    }

    removeAllListeners<K extends keyof TEventMap>(event?: K): this {
        return super.removeAllListeners(event)
    }

    listeners<K extends keyof TEventMap>(event: K): Function[] {
        return super.listeners(event)
    }

    rawListeners<K extends keyof TEventMap>(event: K): Function[] {
        return super.rawListeners(event)
    }

    eventNames(): Array<keyof TEventMap> {
        return super.eventNames() as Array<keyof TEventMap>
    }

    listenerCount<K extends keyof TEventMap>(event: K): number {
        return super.listenerCount(event)
    }

    getMaxListeners(): number {
        return super.getMaxListeners()
    }

    setMaxListeners(n: number): this {
        return super.setMaxListeners(n)
    }
}
