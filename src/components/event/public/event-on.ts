import { BodyParts, KickReasons, PlayerStates, Weapons } from "../../../shared/enums"
import { CommandResponses } from "../../command"
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

    static playerDisconnect(callback: (player: Player, reason: KickReasons) => void) {
        eventBus.on("playerDisconnect", callback)
    }

    static playerCommand(callback: (player: Player, command: string, response: CommandResponses) => void) {
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

    static playerStateChange(callback: (player: Player, newState: PlayerStates, oldState: PlayerStates) => void) {
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

    static playerStartEnterVehicle(callback: (player: Player, vehicle: Vehicle, asPassenger: boolean) => void) {
        eventBus.on("playerStartEnterVehicle", callback)
    }

    static playerStartExitVehicle(callback: (player: Player, vehicle: Vehicle) => void) {
        eventBus.on("playerStartExitVehicle", callback)
    }

    static playerDamage(callback: (player: Player, issuer: Player | undefined, amount: number, weapon: Weapons, bodyPart: BodyParts) => void) {
        eventBus.on("playerDamage", callback)
    }

    static playerDeath(callback: (player: Player, killer: Player | undefined, weapon: Weapons) => void) {
        eventBus.on("playerDeath", callback)
    }
}