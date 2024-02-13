/// <reference types="@types/node" />
import { EventEmitter } from "stream";
import { TEventMap } from "./@internal/types";
export declare class EventBus extends EventEmitter {
    emit<K extends keyof TEventMap>(event: K, ...args: TEventMap[K]): boolean;
    addListener<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this;
    on<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this;
    once<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this;
    prependListener<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this;
    prependOnceListener<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this;
    removeListener<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this;
    off<K extends keyof TEventMap>(event: K, listener: (...args: TEventMap[K]) => void): this;
    removeAllListeners<K extends keyof TEventMap>(event?: K): this;
    listeners<K extends keyof TEventMap>(event: K): Function[];
    rawListeners<K extends keyof TEventMap>(event: K): Function[];
    eventNames(): Array<keyof TEventMap>;
    listenerCount<K extends keyof TEventMap>(event: K): number;
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
}
