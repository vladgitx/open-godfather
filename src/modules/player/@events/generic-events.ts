import { nativeEvents, sampNatives } from "@/wrapper"
import { CONFIG } from "@/shared/config"
import { type BodyPartsEnum, HitTypesEnum, type PlayerStatesEnum, type WeaponsEnum } from "@/shared/enums"
import { Vector3 } from "../../vector3"
import { dispatcher } from "@/modules/dispatcher"
import { playerHandler } from "../handler"
import { vehicleHandler } from "@/modules/vehicle"

nativeEvents.onPlayerSpawn((playerId: number) => {
    const player = playerHandler.at(playerId)
    if (player === undefined) {
        return
    }

    sampNatives.setPlayerTeam(playerId, CONFIG.player.team)

    if (player.getVariable("internal::firstSpawn") === undefined) {
        player.setVariable("internal::firstSpawn", true)
        dispatcher.emit("playerFirstSpawn", player)
    }

    dispatcher.emit("playerSpawn", player)
})

nativeEvents.onPlayerRequestClass((playerId: number) => {
    const player = playerHandler.at(playerId)

    if (player !== undefined) {
        player.spawn()
    }
})

nativeEvents.onPlayerText((playerId: number, text: string) => {
    const player = playerHandler.at(playerId)
    if (player !== undefined) {
        dispatcher.emit("playerText", player, text)
    }

    return 0
})

nativeEvents.onPlayerStateChange((playerId: number, newState: PlayerStatesEnum, oldState: PlayerStatesEnum) => {
    const player = playerHandler.at(playerId)
    if (player !== undefined) {
        dispatcher.emit("playerStateChange", player, newState, oldState)
    }
})

nativeEvents.onPlayerEnterVehicle((playerId: number, vehicleId: number, asPassenger: boolean) => {
    const player = playerHandler.at(playerId)
    const vehicle = vehicleHandler.at(vehicleId)

    if (player !== undefined && vehicle !== undefined) {
        dispatcher.emit("playerStartEnterVehicle", player, vehicle, asPassenger)
    }
})

nativeEvents.onPlayerExitVehicle((playerId: number, vehicleId: number) => {
    const player = playerHandler.at(playerId)
    const vehicle = vehicleHandler.at(vehicleId)

    if (player !== undefined && vehicle !== undefined) {
        dispatcher.emit("playerStartExitVehicle", player, vehicle)
    }
})

nativeEvents.onPlayerDeath((playerId: number, killerId: number, weapon: WeaponsEnum) => {
    const player = playerHandler.at(playerId)
    if (player) {
        dispatcher.emit("playerDeath", player, playerHandler.at(killerId), weapon)
    }
})

nativeEvents.onPlayerTakeDamage((playerId: number, issuerId: number, amount: number, weapon: WeaponsEnum, bodyPart: BodyPartsEnum) => {
    const player = playerHandler.at(playerId)
    if (player) {
        dispatcher.emit("playerDamage", player, playerHandler.at(issuerId), amount, weapon, bodyPart)
    }
})

nativeEvents.onPlayerWeaponShot(
    (playerId: number, weapon: WeaponsEnum, hitType: HitTypesEnum, hitId: number, fX: number, fY: number, fZ: number) => {
        const player = playerHandler.at(playerId)
        if (player) {
            const hitEntity =
                hitType === HitTypesEnum.Player
                    ? playerHandler.at(hitId)
                    : hitType === HitTypesEnum.Vehicle
                      ? vehicleHandler.at(hitId)
                      : undefined

            dispatcher.emit("playerShoot", player, weapon, hitEntity, new Vector3(fX, fY, fZ))
        }
        return 1
    },
)
