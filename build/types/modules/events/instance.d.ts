/// <reference types="@types/node" />
import { EventEmitter } from "stream";
import { EventMap } from "./@types/events";
export declare class EventBus extends EventEmitter {
    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean;
    on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void): this;
}
