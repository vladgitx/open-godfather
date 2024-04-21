import { PlayerMp } from "../player"
import { BodyPartsEnum, KickReasonsEnum, PlayerStatesEnum, WeaponsEnum } from "@/shared/enums"
import { CommandMp } from "../commands"
import { VehicleMp } from "../vehicle"
import { Vector3 } from "../vector3"
import EventEmitter from "events"

type ServerEvents = {
    init: []
    exit: []
}

type PlayerEvents = {
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

type VehicleEvents = {
    vehicleCreate: [VehicleMp]
    vehicleDestroy: [VehicleMp]
}

type EventMap = ServerEvents & PlayerEvents & VehicleEvents

class Dispatcher extends EventEmitter {
    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]): boolean {
        return super.emit(event, ...(args as any[]))
    }

    addListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.addListener(event, listener as (...args: any[]) => void | Promise<void>)
    }

    on<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.on(event, listener as (...args: any[]) => void | Promise<void>)
    }

    once<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.once(event, listener as (...args: any[]) => void | Promise<void>)
    }

    prependListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.prependListener(event, listener as (...args: any[]) => void | Promise<void>)
    }

    prependOnceListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.prependOnceListener(event, listener as (...args: any[]) => void | Promise<void>)
    }

    removeListener<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.removeListener(event, listener as (...args: any[]) => void | Promise<void>)
    }

    off<K extends keyof EventMap>(event: K, listener: (...args: EventMap[K]) => void | Promise<void>): this {
        return super.off(event, listener as (...args: any[]) => void | Promise<void>)
    }

    removeAllListeners<K extends keyof EventMap>(event?: K): this {
        return super.removeAllListeners(event)
    }

    listeners<K extends keyof EventMap>(event: K): Function[] {
        return super.listeners(event)
    }

    rawListeners<K extends keyof EventMap>(event: K): Function[] {
        return super.rawListeners(event)
    }

    eventNames(): Array<keyof EventMap> {
        return super.eventNames() as Array<keyof EventMap>
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
