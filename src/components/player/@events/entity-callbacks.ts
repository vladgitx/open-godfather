import type { Vehicle } from "@/components/vehicle"
import type { BodyPartsEnum, PlayerStatesEnum, WeaponsEnum } from "@/lib/enums"
import type { Player } from "../entity"
import type { Vector3 } from "@/og-export"
import type { Pickup } from "@/components/pickup"
import type { Checkpoint } from "@/components/checkpoint"
import { emitEntityEvent } from "@/lib/entity"
import { dispatcher } from "@/lib/dispatcher"

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PlayerEventMap = {
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
    emitEntityEvent(player.events, "stateChange", newState, oldState)
})

dispatcher.on("playerEnterVehicle", (player, vehicle) => {
    emitEntityEvent(player.events, "enterVehicle", vehicle)
})

dispatcher.on("playerExitVehicle", (player, vehicle) => {
    emitEntityEvent(player.events, "exitVehicle", vehicle)
})
