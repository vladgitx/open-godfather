/* eslint-disable @typescript-eslint/no-misused-promises */

import { type Player } from "../components/player"
import type { BodyPartsEnum, KickReasonsEnum, PlayerStatesEnum, WeaponsEnum } from "@/lib/enums"
import { type Command } from "../components/command"
import { type Vehicle } from "../components/vehicle"
import { type Vector3 } from "./vector3"
import EventEmitter from "events"
import { type Pickup } from "../components/pickup"
import { type Entity } from "./entity"
import { type Checkpoint } from "../components/checkpoint"

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
        return super.addListener(event, listener)
    }

    on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.on(event, listener)
    }

    once<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.once(event, listener)
    }

    prependListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.prependListener(event, listener)
    }

    prependOnceListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.prependOnceListener(event, listener)
    }

    removeListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.removeListener(event, listener)
    }

    off<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.off(event, listener)
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
