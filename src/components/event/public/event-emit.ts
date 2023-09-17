import { KickReasonEnum, PlayerStateEnum } from "../../../shared/enums"
import { CommandResponseEnum } from "../../command"
import { Player } from "../../player"
import { Vehicle } from "../../vehicle/public/model"
import { eventBus } from "../domain/event-bus"

export class EventEmit {
    static init() {
        eventBus.emit("init")
    }

    static exit() {
        eventBus.emit("exit")
    }

    static playerConnect(player: Player) {
        eventBus.emit("playerConnect", player)
    }

    static playerDisconnect(player: Player, reason = KickReasonEnum.CUSTOM) {
        eventBus.emit("playerDisconnect", player, reason)
    }

    static playerCommand(player: Player, command: string, response: CommandResponseEnum) {
        eventBus.emit("playerCommand", player, command, response)
    }

    static playerSpawn(player: Player) {
        eventBus.emit("playerSpawn", player)
    }

    static playerFirstSpawn(player: Player) {
        eventBus.emit("playerFirstSpawn", player)
    }

    static playerRequestClass(player: Player, classId: number) {
        eventBus.emit("playerRequestClass", player, classId)
    }

    static playerText(player: Player, text: string) {
        eventBus.emit("playerText", player, text)
    }

    static playerStateChange(player: Player, newState: PlayerStateEnum, oldState: PlayerStateEnum) {
        eventBus.emit("playerStateChange", player, newState, oldState)
    }

    static vehicleCreate(vehicle: Vehicle) {
        eventBus.emit("vehicleCreate", vehicle)
    }

    static vehicleDestroy(vehicle: Vehicle) {
        eventBus.emit("vehicleDestroy", vehicle)
    }

    static playerEnterVehicle(player: Player, vehicle: Vehicle) {
        eventBus.emit("playerEnterVehicle", player, vehicle)
    }

    static playerExitVehicle(player: Player, vehicle: Vehicle | undefined) {
        eventBus.emit("playerExitVehicle", player, vehicle)
    }
}