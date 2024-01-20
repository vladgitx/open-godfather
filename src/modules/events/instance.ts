import { EventEmitter } from "stream"
import { EventMap } from "./@types/events"

export class EventBus extends EventEmitter {
	emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean {
		return super.emit(event, ...(args as any[]))
	}

	on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this {
		return super.on(event, listener as (...args: any[]) => void)
	}
}
