/* eslint-disable @typescript-eslint/no-misused-promises */

import { type Player } from "../components/player"
import { type Command } from "../components/command"
import { type Vehicle } from "../components/vehicle"
import { type Vector3 } from "./vector3"
import EventEmitter from "events"
import { type Pickup } from "../components/pickup"
import { type Entity } from "./base-entity"
import { type Checkpoint } from "../components/checkpoint"
import type { BodyPart, KickReason, PlayerState, Weapon } from "@/utils/enums"

interface ServerEvents {
    init: []
    exit: []
}

interface PlayerEvents {
    playerConnect: [Player]
    playerDisconnect: [Player, KickReason]
    playerCommand: [Player, string, Command | undefined, () => void | Promise<void>]
    playerSpawn: [Player]
    playerFirstSpawn: [Player]
    playerText: [Player, string]
    playerStateChange: [Player, PlayerState, PlayerState]
    playerEnterVehicle: [Player, Vehicle]
    playerExitVehicle: [Player, Vehicle | undefined]
    playerStartEnterVehicle: [Player, Vehicle, boolean]
    playerStartExitVehicle: [Player, Vehicle]
    playerDamage: [Player, Player | undefined, number, Weapon, BodyPart]
    playerDeath: [Player, Player | undefined, Weapon]
    playerShoot: [Player, Weapon, Player | Vehicle | undefined, Vector3]
    playerPickUpPickup: [Player, Pickup]
    playerChangeVehiclePaintjob: [Player, Vehicle, number | undefined]
    playerExitObjectEditMode: [Player]
    playerKeyStateChange: [Player, number, number]
    playerEnterCheckpoint: [Player, Checkpoint]
    playerLeaveCheckpoint: [Player, Checkpoint]
}

interface VehicleEvents {
    vehicleRespawn: [Vehicle]
    vehicleDeath: [Vehicle, Player | undefined]
    vehicleEngineStateChange: [Vehicle, "on" | "off"]
}

interface EntityEvents {
    entityInstantiate: [Entity]
    entityDestroy: [Entity]
    entityCleanup: [Entity]
}

interface CommandEvents {
    commandRegister: [Command]
}

type EventMap = ServerEvents & PlayerEvents & VehicleEvents & EntityEvents & CommandEvents

class Dispatcher extends EventEmitter {
    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean {
        return super.emit(event, ...args)
    }

    addListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.addListener(event, listener as (...args: unknown[]) => void | Promise<void>)
    }

    on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.on(event, listener as (...args: unknown[]) => void | Promise<void>)
    }

    once<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.once(event, listener as (...args: unknown[]) => void | Promise<void>)
    }

    prependListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.prependListener(event, listener as (...args: unknown[]) => void | Promise<void>)
    }

    prependOnceListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.prependOnceListener(event, listener as (...args: unknown[]) => void | Promise<void>)
    }

    removeListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.removeListener(event, listener as (...args: unknown[]) => void | Promise<void>)
    }

    off<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.off(event, listener as (...args: unknown[]) => void | Promise<void>)
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

class Events {
    on = dispatcher.on.bind(dispatcher)
}

export const events = new Events()
