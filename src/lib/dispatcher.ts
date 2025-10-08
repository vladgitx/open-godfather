/* eslint-disable @typescript-eslint/no-misused-promises */

import { type Player } from "../components/player"
import { type Command } from "../components/command"
import { type Vehicle } from "../components/vehicle"
import { type Vector3 } from "./vector3"
import EventEmitter from "events"
import { type Pickup } from "../components/pickup"
import { type Entity } from "./entity"
import { type Checkpoint } from "../components/checkpoint"
import type { BodyPart, CameraMode, KickReason, PlayerBone, PlayerState, Weapon } from "@/wrapper/game"
import { type Textdraw } from "@/components/textdraw"
import { type PlayerTextdraw } from "@/components/player/textdraw"
import { type GameObject } from "@/components/game-object"

interface ServerEvents {
    init: []
    exit: []
}

interface PlayerEvents {
    playerConnect: [player: Player]
    playerDisconnect: [player: Player, reason: KickReason]
    playerUpdate: [player: Player]
    playerCommand: [player: Player, commandText: string, command: Command | undefined, callCommand: () => void | Promise<void>]
    playerSpawn: [player: Player]
    playerFirstSpawn: [player: Player]
    playerText: [player: Player, text: string]
    playerStateChange: [player: Player, newState: PlayerState, oldState: PlayerState]
    playerEnterVehicle: [player: Player, vehicle: Vehicle]
    playerExitVehicle: [player: Player, vehicle: Vehicle | undefined]
    playerStartEnterVehicle: [player: Player, vehicle: Vehicle, asPassenger: boolean]
    playerStartExitVehicle: [player: Player, vehicle: Vehicle]
    playerDamage: [player: Player, issuer: Player | undefined, damageAmount: number, weapon: Weapon, bodyPart: BodyPart]
    playerDeath: [player: Player, killer: Player | undefined, weapon: Weapon]
    playerShoot: [player: Player, weapon: Weapon, victim: Player | Vehicle | GameObject | undefined, hitCoordinates: Vector3]
    playerPickUpPickup: [player: Player, pickup: Pickup]
    playerChangeVehiclePaintjob: [player: Player, vehicle: Vehicle, paintjobId: number | undefined]
    playerEditAttachedObject: [
        player: Player,
        index: number,
        model: number,
        bone: PlayerBone,
        offset: Vector3,
        rotation: Vector3,
        scale: Vector3,
    ]
    playerCancelObjectEditMode: [player: Player]
    playerKeyStateChange: [player: Player, newKeys: number, oldKeys: number]
    playerEnterCheckpoint: [player: Player, checkpoint: Checkpoint]
    playerLeaveCheckpoint: [player: Player, checkpoint: Checkpoint]
    playerClickTextDraw: [player: Player, textdraw: Textdraw | undefined]
    playerClickPlayerTextDraw: [player: Player, textdraw: PlayerTextdraw]
    playerWeaponChange: [player: Player, newWeapon: Weapon, oldWeapon: Weapon]
    playerCameraModeChange: [player: Player, newMode: CameraMode, oldMode: CameraMode]
}

interface VehicleEvents {
    vehicleRespawn: [vehicle: Vehicle]
    vehicleDeath: [vehicle: Vehicle, reporter: Player | undefined]
    vehicleEngineStateChange: [vehicle: Vehicle, newState: "on" | "off"]
}

interface EntityEvents {
    entityInstantiate: [entity: Entity]
    entityPreDestroy: [entity: Entity]
    entityDestroy: [entity: Entity]
    entityCleanup: [entity: Entity]
}

interface CommandEvents {
    commandRegister: [command: Command]
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
