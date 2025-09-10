import type { Vehicle } from "@/components/vehicle"
import { dispatcher } from "@/lib/dispatcher"
import { EventBus } from "@/lib/event-bus"
import { type Vector3 } from "@/lib/vector3"
import type { PlayerState, Weapon } from "@/wrapper/game/enums.public"
import { type Player } from "../entity"
import { type Textdraw } from "@/components/textdraw"
import { type PlayerTextdraw } from "../textdraw"
import { type GameObject } from "@/components/game-object"

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PlayerEventMap = {
    stateChange: [PlayerState, PlayerState]
    enterVehicle: [Vehicle]
    exitVehicle: [Vehicle | undefined]
    editAttachedObject: [number, number, number, Vector3, Vector3, Vector3]
    cancelObjectEditMode: []
    shoot: [Weapon, Player | Vehicle | GameObject | undefined, Vector3]
    clickTextDraw: [Textdraw | undefined]
    clickPlayerTextDraw: [PlayerTextdraw]
}

dispatcher.on("playerClickPlayerTextDraw", (player, textdraw) => {
    EventBus.emit(player.events, "clickPlayerTextDraw", textdraw)
})

dispatcher.on("playerClickTextDraw", (player, textdraw) => {
    EventBus.emit(player.events, "clickTextDraw", textdraw)
})

dispatcher.on("playerShoot", (player, weapon, target, hitPosition) => {
    EventBus.emit(player.events, "shoot", weapon, target, hitPosition)
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
