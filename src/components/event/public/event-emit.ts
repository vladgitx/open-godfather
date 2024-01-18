import { BodyParts, KickReasons, PlayerStates, Weapons } from "../../../shared/enums"
import { WorldPosition } from "../../../shared/types"
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

    static playerDisconnect(player: Player, reason = KickReasons.Custom) {
        eventBus.emit("playerDisconnect", player, reason)
    }

    static playerCommand(player: Player, command: string, call?: () => void) {
        eventBus.emit("playerCommand", player, command, call)
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

    static playerStateChange(player: Player, newState: PlayerStates, oldState: PlayerStates) {
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

    static playerStartEnterVehicle(player: Player, vehicle: Vehicle, asPassenger: boolean) {
        eventBus.emit("playerStartEnterVehicle", player, vehicle, asPassenger)
    }

    static playerStartExitVehicle(player: Player, vehicle: Vehicle | undefined) {
        eventBus.emit("playerStartExitVehicle", player, vehicle)
    }

    static playerDamage(player: Player, issuer: Player | undefined, amount: number, weapon: Weapons, bodyPart: BodyParts) {
        eventBus.emit("playerDamage", player, issuer, amount, weapon, bodyPart)
    }

    static playerDeath(player: Player, killer: Player | undefined, weapon: Weapons) {
        eventBus.emit("playerDeath", player, killer, weapon)
    }

    static playerShoot(player: Player, weapon: Weapons, hitEntity: Player | Vehicle | undefined, hitPosition: WorldPosition) {
        eventBus.emit("playerShoot", player, weapon, hitEntity, hitPosition)
    }
}