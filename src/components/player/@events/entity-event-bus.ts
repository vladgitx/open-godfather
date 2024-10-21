import type { Vehicle } from "@/components/vehicle"
import { dispatcher } from "@/lib/dispatcher"
import { EventBus } from "@/lib/event-bus"
import { type Vector3 } from "@/lib/vector3"
import type { PlayerState, Weapon } from "@/wrapper/game/enums.public"
import { type Player } from "../entity"

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PlayerEventMap = {
    stateChange: [PlayerState, PlayerState]
    enterVehicle: [Vehicle]
    exitVehicle: [Vehicle | undefined]
    editAttachedObject: [number, number, number, Vector3, Vector3, Vector3]
    cancelObjectEditMode: []
    playerShoot: [Weapon, Player | Vehicle | undefined, Vector3]
}

dispatcher.on("playerShoot", (player, weapon, target, hitPosition) => {
    EventBus.emit(player.events, "playerShoot", weapon, target, hitPosition)
})

dispatcher.on("playerStateChange", (player, newState, oldState) => {
    EventBus.emit(player.events, "stateChange", newState, oldState)
})

dispatcher.on("playerEnterVehicle", (player, vehicle) => {
    EventBus.emit(player.events, "enterVehicle", vehicle)
})

dispatcher.on("playerExitVehicle", (player, vehicle) => {
    EventBus.emit(player.events, "exitVehicle", vehicle)
})

dispatcher.on("playerEditAttachedObject", (player, model, bone, slot, offset, rotation, scale) => {
    EventBus.emit(player.events, "editAttachedObject", model, bone, slot, offset, rotation, scale)
})

dispatcher.on("playerCancelObjectEditMode", (player) => {
    EventBus.emit(player.events, "cancelObjectEditMode")
})
