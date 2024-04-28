/* eslint-disable @typescript-eslint/no-misused-promises */

import { type Player } from "../player"
import type { BodyPartsEnum, KickReasonsEnum, PlayerStatesEnum, WeaponsEnum } from "@/common/enums"
import { type Command } from "../command"
import { type Vehicle } from "../vehicle"
import { type Vector3 } from "../vector3"
import EventEmitter from "events"
import { type Pickup } from "../pickup"

interface ServerEvents {
    init: []
    exit: []
}

interface PlayerEvents {
    playerConnect: [Player]
    playerDisconnect: [Player, KickReasonsEnum]
    playerCommand: [Player, string, Command | undefined, () => void | Promise<void>]
    playerSpawn: [Player]
    playerFirstSpawn: [Player]
    playerText: [Player, string]
    playerStateChange: [Player, PlayerStatesEnum, PlayerStatesEnum]
    playerEnterVehicle: [Player, Vehicle]
    playerExitVehicle: [Player, Vehicle | undefined]
    playerStartEnterVehicle: [Player, Vehicle, boolean]
    playerStartExitVehicle: [Player, Vehicle]
    playerDamage: [Player, Player | undefined, number, WeaponsEnum, BodyPartsEnum]
    playerDeath: [Player, Player | undefined, WeaponsEnum]
    playerShoot: [Player, WeaponsEnum, Player | Vehicle | undefined, Vector3]
    playerPickUpPickup: [Player, Pickup]
    playerChangeVehiclePaintjob: [Player, Vehicle, number | undefined]
}

interface VehicleEvents {
    vehicleCreate: [Vehicle]
    vehicleDestroy: [Vehicle]
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
