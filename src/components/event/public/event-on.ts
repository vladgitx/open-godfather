import { KickReasonEnum, PlayerStateEnum } from "../../../shared/enums"
import { CommandResponseEnum } from "../../command"
import { Player } from "../../player"
import { Vehicle } from "../../vehicle/public/model"
import { eventBus } from "../domain/event-bus"

export class EventOn {
    static init(callback: () => void) {
        eventBus.on("init", callback)
    }

    static exit(callback: () => void) {
        eventBus.on("exit", callback)
    }

    static playerConnect(callback: (player: Player) => void) {
        eventBus.on("playerConnect", callback)
    }

    static playerDisconnect(callback: (player: Player, reason: KickReasonEnum) => void) {
        eventBus.on("playerDisconnect", callback)
    }

    static playerCommand(callback: (player: Player, command: string, response: CommandResponseEnum) => void) {
        eventBus.on("playerCommand", callback)
    }

    static playerSpawn(callback: (player: Player) => void) {
        eventBus.on("playerSpawn", callback)
    }

    static playerFirstSpawn(callback: (player: Player) => void) {
        eventBus.on("playerFirstSpawn", callback)
    }

    static playerRequestClass(callback: (player: Player, classId: number) => void) {
        eventBus.on("playerRequestClass", callback)
    }

    static playerText(callback: (player: Player, text: string) => void) {
        eventBus.on("playerText", callback)
    }

    static playerStateChange(callback: (player: Player, newState: PlayerStateEnum, oldState: PlayerStateEnum) => void) {
        eventBus.on("playerStateChange", callback)
    }

    static vehicleCreate(callback: (vehicle: Vehicle) => void) {
        eventBus.on("vehicleCreate", callback)
    }

    static vehicleDestroy(callback: (vehicle: Vehicle) => void) {
        eventBus.on("vehicleDestroy", callback)
    }

    static playerEnterVehicle(callback: (player: Player, vehicle: Vehicle) => void) {
        eventBus.on("playerEnterVehicle", callback)
    }

    static playerExitVehicle(callback: (player: Player, vehicle: Vehicle | undefined) => void) {
        eventBus.on("playerExitVehicle", callback)
    }
}