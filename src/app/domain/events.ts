import { CommandResponseEnum } from "../../components/command"
import { EventOn } from "../../components/event"
import { Player } from "../../components/player"
import { Vehicle } from "../../components/vehicle"
import { KickReasonEnum, PlayerStateEnum } from "../../shared/enums"

export class OpenEvents {
    init(callback: () => void) {
        EventOn.init(callback)
    }

    exit(callback: () => void) {
        EventOn.exit(callback)
    }

    playerConnect(callback: (player: Player) => void) {
        EventOn.playerConnect(callback)
    }

    playerDisconnect(callback: (player: Player, reason: KickReasonEnum) => void) {
        EventOn.playerDisconnect(callback)
    }

    playerCommand(callback: (player: Player, command: string, response: CommandResponseEnum) => void) {
        EventOn.playerCommand(callback)
    }

    playerSpawn(callback: (player: Player) => void) {
        EventOn.playerSpawn(callback)
    }

    playerFirstSpawn(callback: (player: Player) => void) {
        EventOn.playerFirstSpawn(callback)
    }

    playerRequestClass(callback: (player: Player, classId: number) => void) {
        EventOn.playerRequestClass(callback)
    }

    playerText(callback: (player: Player, text: string) => void) {
        EventOn.playerText(callback)
    }

    playerStateChange(callback: (player: Player, newState: PlayerStateEnum, oldState: PlayerStateEnum) => void) {
        EventOn.playerStateChange(callback)
    }

    vehicleCreate(callback: (vehicle: Vehicle) => void) {
        EventOn.vehicleCreate(callback)
    }

    vehicleDestroy(callback: (vehicle: Vehicle) => void) {
        EventOn.vehicleDestroy(callback)
    }

    playerEnterVehicle(callback: (player: Player, vehicle: Vehicle) => void) {
        EventOn.playerEnterVehicle(callback)
    }

    playerExitVehicle(callback: (player: Player, vehicle: Vehicle | undefined) => void) {
        EventOn.playerExitVehicle(callback)
    }
}