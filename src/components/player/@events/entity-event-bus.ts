import type { Vehicle } from "@/components/vehicle"
import { dispatcher } from "@/lib/dispatcher"
import { EventBus } from "@/lib/event-bus"
import { type Vector3 } from "@/lib/vector3"
import type { PlayerBone, PlayerState, Weapon } from "@/wrapper/game/enums.public"
import { type Player } from "../entity"
import { type Textdraw } from "@/components/textdraw"
import { type PlayerTextdraw } from "../textdraw"
import { type GameObject } from "@/components/game-object"

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PlayerEventMap = {
    stateChange: [newState: PlayerState, oldState: PlayerState]
    enterVehicle: [vehicle: Vehicle]
    exitVehicle: [vehicle: Vehicle | undefined]
    editAttachedObject: [index: number, model: number, bone: PlayerBone, offset: Vector3, rotation: Vector3, scale: Vector3]
    cancelObjectEditMode: []
    shoot: [weapon: Weapon, victim: Player | Vehicle | GameObject | undefined, hitCoordinates: Vector3]
    clickTextDraw: [textdraw: Textdraw | undefined]
    clickPlayerTextDraw: [textdraw: PlayerTextdraw]
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

dispatcher.on("playerEditAttachedObject", (player, index, model, bone, offset, rotation, scale) => {
    EventBus.emit(player.events, "editAttachedObject", index, model, bone, offset, rotation, scale)
})

dispatcher.on("playerCancelObjectEditMode", (player) => {
    EventBus.emit(player.events, "cancelObjectEditMode")
})
