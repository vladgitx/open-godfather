/// <reference types="@types/node" />
import { type PlayerMp } from "../player";
import type { BodyPartsEnum, KickReasonsEnum, PlayerStatesEnum, WeaponsEnum } from "@/shared/enums";
import { type CommandMp } from "../commands";
import { type VehicleMp } from "../vehicle";
import { type Vector3 } from "../vector3";
import EventEmitter from "events";
interface ServerEvents {
    init: [];
    exit: [];
}
interface PlayerEvents {
    playerConnect: [PlayerMp];
    playerDisconnect: [PlayerMp, KickReasonsEnum];
    playerCommand: [PlayerMp, string, CommandMp | undefined, () => void | Promise<void>];
    playerSpawn: [PlayerMp];
    playerFirstSpawn: [PlayerMp];
    playerText: [PlayerMp, string];
    playerStateChange: [PlayerMp, PlayerStatesEnum, PlayerStatesEnum];
    playerEnterVehicle: [PlayerMp, VehicleMp];
    playerExitVehicle: [PlayerMp, VehicleMp | undefined];
    playerStartEnterVehicle: [PlayerMp, VehicleMp, boolean];
    playerStartExitVehicle: [PlayerMp, VehicleMp];
    playerDamage: [PlayerMp, PlayerMp | undefined, number, WeaponsEnum, BodyPartsEnum];
    playerDeath: [PlayerMp, PlayerMp | undefined, WeaponsEnum];
    playerShoot: [PlayerMp, WeaponsEnum, PlayerMp | VehicleMp | undefined, Vector3];
}
interface VehicleEvents {
    vehicleCreate: [VehicleMp];
    vehicleDestroy: [VehicleMp];
}
type EventMap = ServerEvents & PlayerEvents & VehicleEvents;
declare class Dispatcher extends EventEmitter {
    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean;
    addListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this;
    on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this;
    once<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this;
    prependListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this;
    prependOnceListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this;
    removeListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this;
    off<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this;
    removeAllListeners<K extends keyof EventMap>(event?: K): this;
    listeners<K extends keyof EventMap>(event: K): Function[];
    rawListeners<K extends keyof EventMap>(event: K): Function[];
    eventNames(): (keyof EventMap)[];
    listenerCount<K extends keyof EventMap>(event: K): number;
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
}
export declare const dispatcher: Dispatcher;
export {};
