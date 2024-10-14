import type { BodyPartsEnum, PlayerStatesEnum, WeaponsEnum } from "@/lib/enums"
import { type Player } from "./entity"
import { type Vehicle } from "../vehicle"
import { type Vector3 } from "@/og-export"
import { type Pickup } from "../pickup"
import { type Checkpoint } from "../checkpoint"
import { dispatcher } from "@/lib/dispatcher"

interface Events {
    stateChange: [PlayerStatesEnum, PlayerStatesEnum]
    enterVehicle: [Vehicle]
    exitVehicle: [Vehicle | undefined]
    startEnterVehicle: [Vehicle, boolean]
    startExitVehicle: [Vehicle]
    damage: [Player | undefined, number, WeaponsEnum, BodyPartsEnum]
    death: [Player | undefined, WeaponsEnum]
    shoot: [WeaponsEnum, Player | Vehicle | undefined, Vector3]
    pickUpPickup: [Pickup]
    changeVehiclePaintjob: [Vehicle, number | undefined]
    exitObjectEditMode: [Player]
    keyStateChange: [number, number]
    enterCheckpoint: [Checkpoint]
    leaveCheckpoint: [Checkpoint]
}

dispatcher.on("playerStateChange", (player, newState, oldState) => {
    PlayerEvents.emit(player, "stateChange", newState, oldState)
})

export class PlayerEvents {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private callbacks = new Map<keyof Events, ((...args: any[]) => void)[]>()

    constructor(private player: Player) {
        player.onCleanup(() => {
            this.callbacks.clear()
        })
    }

    on<T extends keyof Events>(eventName: T, callback: (...args: Events[T]) => void) {
        if (!this.callbacks.has(eventName)) {
            this.callbacks.set(eventName, [])
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.callbacks.get(eventName)!.push(callback)

        return () => {
            this.callbacks.set(
                eventName,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.callbacks.get(eventName)!.filter((cb) => cb !== callback),
            )
        }
    }

    static emit<T extends keyof Events>(player: Player, eventName: T, ...args: Events[T]) {
        const callbacks = player.events.callbacks.get(eventName) ?? []

        for (const callback of callbacks) {
            try {
                callback(...args)
            } catch (error) {
                console.error(`Error while emitting "${eventName}" event for player`, error)
            }
        }
    }
}
