import "./modules/server/@controllers"
import "./modules/player/@controllers"
import "./modules/vehicle/@controllers"
import "./modules/commands/@controllers"

export { type ServerMp } from "./modules/server"
export { type PlayerMp } from "./modules/player"
export { type PlayerAttachedObject } from "./modules/player/attached-objects"
export { type VehicleMp } from "./modules/vehicle"
export { type Vector3 } from "./modules/vector3"
export { type CommandMp, TCommandCallback } from "./modules/commands"
export { type TextLabelMp } from "./modules/text-label"

export * from "./shared/enums"

import { eventsMp } from "./singletons/events"
import { serverMp } from "./singletons/server"
import { playersMp } from "./singletons/players"
import { vehiclesMp } from "./singletons/vehicles"
import { commandsMp } from "./singletons/commands"
import { textLabelsMp } from "./singletons/text-labels"
import { Vector3 as Vector3Mp } from "./modules/vector3"

export namespace og {
    export const events = eventsMp
    export const server = serverMp
    export const players = playersMp
    export const vehicles = vehiclesMp
    export const commands = commandsMp
    export const textLabels = textLabelsMp
    export const Vector3 = Vector3Mp
}
