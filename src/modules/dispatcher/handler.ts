/* eslint-disable @typescript-eslint/no-misused-promises */

import { type PlayerMp } from "../player"
import type { BodyPartsEnum, KickReasonsEnum, PlayerStatesEnum, WeaponsEnum } from "@/shared/enums"
import { type CommandMp } from "../commands"
import { type VehicleMp } from "../vehicle"
import { type Vector3 } from "../vector3"
import EventEmitter from "events"

interface ServerEvents {
    init: []
    exit: []
}

interface PlayerEvents {
    playerConnect: [PlayerMp]
    playerDisconnect: [PlayerMp, KickReasonsEnum]
    playerCommand: [PlayerMp, string, CommandMp | undefined, () => void | Promise<void>]
    playerSpawn: [PlayerMp]
    playerFirstSpawn: [PlayerMp]
    playerText: [PlayerMp, string]
    playerStateChange: [PlayerMp, PlayerStatesEnum, PlayerStatesEnum]
    playerEnterVehicle: [PlayerMp, VehicleMp]
    playerExitVehicle: [PlayerMp, VehicleMp | undefined]
    playerStartEnterVehicle: [PlayerMp, VehicleMp, boolean]
    playerStartExitVehicle: [PlayerMp, VehicleMp]
    playerDamage: [PlayerMp, PlayerMp | undefined, number, WeaponsEnum, BodyPartsEnum]
    playerDeath: [PlayerMp, PlayerMp | undefined, WeaponsEnum]
    playerShoot: [PlayerMp, WeaponsEnum, PlayerMp | VehicleMp | undefined, Vector3]
}

interface VehicleEvents {
    vehicleCreate: [VehicleMp]
    vehicleDestroy: [VehicleMp]
}

type EventMap = ServerEvents & PlayerEvents & VehicleEvents

class Dispatcher extends EventEmitter {
    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean {
        return super.emit(event, ...(args as EventMap[K][]))
    }

    addListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.addListener(event, listener as (...args: EventMap[K][]) => void | Promise<void>)
    }

    on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.on(event, listener as (...args: EventMap[K][]) => void | Promise<void>)
    }

    once<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.once(event, listener as (...args: EventMap[K][]) => void | Promise<void>)
    }

    prependListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.prependListener(event, listener as (...args: EventMap[K][]) => void | Promise<void>)
    }

    prependOnceListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.prependOnceListener(event, listener as (...args: EventMap[K][]) => void | Promise<void>)
    }

    removeListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.removeListener(event, listener as (...args: EventMap[K][]) => void | Promise<void>)
    }

    off<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.off(event, listener as (...args: EventMap[K][]) => void | Promise<void>)
    }

    removeAllListeners<K extends keyof EventMap>(event?: K): this {
        return super.removeAllListeners(event)
    }

    listeners<K extends keyof EventMap>(event: K) {
        return super.listeners(event)
    }

    rawListeners<K extends keyof EventMap>(event: K) {
        return super.rawListeners(event)
    }

    eventNames(): (keyof EventMap)[] {
        return super.eventNames() as (keyof EventMap)[]
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

export const dispatcher = new Dispatcher()
