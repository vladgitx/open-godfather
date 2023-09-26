import { CommandResponses } from "../../components/command"
import { EventOn } from "../../components/event"
import { Player } from "../../components/player"
import { Vehicle } from "../../components/vehicle"
import { BodyParts, KickReasons, PlayerStates, Weapons } from "../../shared/enums"

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

    playerDisconnect(callback: (player: Player, reason: KickReasons) => void) {
        EventOn.playerDisconnect(callback)
    }

    playerCommand(callback: (player: Player, command: string, response: CommandResponses) => void) {
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

    playerStateChange(callback: (player: Player, newState: PlayerStates, oldState: PlayerStates) => void) {
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

    playerStartEnterVehicle(callback: (player: Player, vehicle: Vehicle, asPassenger: boolean) => void) {
        EventOn.playerStartEnterVehicle(callback)
    }

    playerStartExitVehicle(callback: (player: Player, vehicle: Vehicle) => void) {
        EventOn.playerStartExitVehicle(callback)
    }

    playerDamage(callback: (player: Player, issuer: Player | undefined, amount: number, weapon: Weapons, bodyPart: BodyParts) => void) {
        EventOn.playerDamage(callback)
    }

    playerDeath(callback: (player: Player, killer: Player | undefined, weapon: Weapons) => void) {
        EventOn.playerDeath(callback)
    }
}