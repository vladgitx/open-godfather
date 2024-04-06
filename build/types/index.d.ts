import "./modules/server/@controllers";
import "./modules/player/@controllers";
import "./modules/vehicle/@controllers";
import "./modules/commands/@controllers";
export { type ServerMp } from "./modules/server";
export { type PlayerMp } from "./modules/player";
export { type PlayerAttachedObject } from "./modules/player/attached-objects";
export { type VehicleMp } from "./modules/vehicle";
export { type Vector3 } from "./modules/vector3";
export { type CommandMp, TCommandCallback } from "./modules/commands";
export { type TextLabelMp } from "./modules/text-label";
export * from "./shared/enums";
import { Vector3 as Vector3Mp } from "./modules/vector3";
export declare namespace og {
    const events: import("./modules/events").EventBus;
    const server: import("./modules/server").ServerMp;
    const players: import("./modules/player").PlayerMpHandler;
    const vehicles: import("./modules/vehicle").VehicleMpHandler;
    const commands: import("./modules/commands").CommandMpHandler;
    const textLabels: import("./modules/text-label").TextLabelMpHandler;
    const Vector3: typeof Vector3Mp;
}
