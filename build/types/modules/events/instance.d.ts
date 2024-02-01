/// <reference types="@types/node" />
import { EventEmitter } from "stream";
import { EventMap } from "./@types/events";
export declare class EventBus extends EventEmitter {
    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean;
    addListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this;
    on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this;
    once<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this;
    prependListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this;
    prependOnceListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this;
    removeListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this;
    off<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this;
    removeAllListeners<K extends keyof EventMap>(event?: K): this;
    listeners<K extends keyof EventMap>(event: K): Function[];
    rawListeners<K extends keyof EventMap>(event: K): Function[];
    eventNames(): Array<keyof EventMap>;
    listenerCount<K extends keyof EventMap>(event: K): number;
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
}
