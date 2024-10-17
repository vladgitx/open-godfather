import type { Vehicle } from "@/components/vehicle"
import type { Player } from "../entity"
import type { Pickup } from "@/components/pickup"
import type { Checkpoint } from "@/components/checkpoint"
import { dispatcher } from "@/core/dispatcher"
import { EventCallbacks } from "@/core/event-callbacks"
import { type Vector3 } from "@/core/vector3"
import type { BodyPart, PlayerState, Weapon } from "@/utils/enums"

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PlayerEventMap = {
    stateChange: [PlayerState, PlayerState]
    enterVehicle: [Vehicle]
    exitVehicle: [Vehicle | undefined]
    startEnterVehicle: [Vehicle, boolean]
    startExitVehicle: [Vehicle]
    damage: [Player | undefined, number, Weapon, BodyPart]
    death: [Player | undefined, Weapon]
    shoot: [Weapon, Player | Vehicle | undefined, Vector3]
    pickUpPickup: [Pickup]
    changeVehiclePaintjob: [Vehicle, number | undefined]
    exitObjectEditMode: [Player]
    keyStateChange: [number, number]
    enterCheckpoint: [Checkpoint]
    leaveCheckpoint: [Checkpoint]
}

dispatcher.on("playerStateChange", (player, newState, oldState) => {
    EventCallbacks.emit(player.events, "stateChange", newState, oldState)
})

dispatcher.on("playerEnterVehicle", (player, vehicle) => {
    EventCallbacks.emit(player.events, "enterVehicle", vehicle)
})

dispatcher.on("playerExitVehicle", (player, vehicle) => {
    EventCallbacks.emit(player.events, "exitVehicle", vehicle)
})
