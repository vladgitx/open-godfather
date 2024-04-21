/// <reference types="@types/node" />
import { PlayerMp } from "../player";
import { BodyPartsEnum, KickReasonsEnum, PlayerStatesEnum, WeaponsEnum } from "@/shared/enums";
import { CommandMp } from "../commands";
import { VehicleMp } from "../vehicle";
import { Vector3 } from "../vector3";
import EventEmitter from "events";
type ServerEvents = {
    init: [];
    exit: [];
};
type PlayerEvents = {
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
};
type VehicleEvents = {
    vehicleCreate: [VehicleMp];
    vehicleDestroy: [VehicleMp];
};
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
    eventNames(): Array<keyof EventMap>;
    listenerCount<K extends keyof EventMap>(event: K): number;
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
}
export declare const dispatcher: Dispatcher;
export {};
