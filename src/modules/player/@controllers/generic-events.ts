import { SampEvents, SampNatives } from "../../../wrapper"
import { CONFIG } from "../../../shared/config"
import { BodyPartsEnum, HitTypesEnum, PlayerStatesEnum, WeaponsEnum } from "../../../shared/enums"
import { playersMp } from "../../../singletons/players"
import { eventsMp } from "../../../singletons/events"
import { vehiclesMp } from "../../../singletons/vehicles"
import { Vector3 } from "../../vector3"

SampEvents.onPlayerSpawn((playerId: number) => {
    const player = playersMp.at(playerId)
    if (player === undefined) {
        return
    }

    SampNatives.setPlayerTeam(playerId, CONFIG.player.team)

    if (player.getVariable("internal::firstSpawn") === undefined) {
        player.setVariable("internal::firstSpawn", true)
        eventsMp.emit("playerFirstSpawn", player)
    }

    eventsMp.emit("playerSpawn", player)
})

SampEvents.onPlayerRequestClass((playerId: number, classId: number) => {
    const player = playersMp.at(playerId)
    if (player !== undefined) {
        player.spawn()
    }
})

SampEvents.onPlayerText((playerId: number, text: string) => {
    const player = playersMp.at(playerId)
    if (player !== undefined) {
        eventsMp.emit("playerText", player, text)
    }

    return 0
})

SampEvents.onPlayerStateChange((playerId: number, newState: PlayerStatesEnum, oldState: PlayerStatesEnum) => {
    const player = playersMp.at(playerId)
    if (player !== undefined) {
        eventsMp.emit("playerStateChange", player, newState, oldState)
    }
})

SampEvents.onPlayerEnterVehicle((playerId: number, vehicleId: number, asPassenger: boolean) => {
    const player = playersMp.at(playerId)
    const vehicle = vehiclesMp.at(vehicleId)

    if (player !== undefined && vehicle !== undefined) {
        eventsMp.emit("playerStartEnterVehicle", player, vehicle, asPassenger)
    }
})

SampEvents.onPlayerExitVehicle((playerId: number, vehicleId: number) => {
    const player = playersMp.at(playerId)
    const vehicle = vehiclesMp.at(vehicleId)

    if (player !== undefined && vehicle !== undefined) {
        eventsMp.emit("playerStartExitVehicle", player, vehicle)
    }
})

SampEvents.onPlayerDeath((playerId: number, killerId: number, weapon: WeaponsEnum) => {
    const player = playersMp.at(playerId)
    if (player) {
        eventsMp.emit("playerDeath", player, playersMp.at(killerId), weapon)
    }
})

SampEvents.onPlayerTakeDamage((playerId: number, issuerId: number, amount: number, weapon: WeaponsEnum, bodyPart: BodyPartsEnum) => {
    const player = playersMp.at(playerId)
    if (player) {
        eventsMp.emit("playerDamage", player, playersMp.at(issuerId), amount, weapon, bodyPart)
    }
})

SampEvents.onPlayerWeaponShot(
    (playerId: number, weapon: WeaponsEnum, hitType: HitTypesEnum, hitId: number, fX: number, fY: number, fZ: number) => {
        const player = playersMp.at(playerId)
        if (player) {
            const hitEntity =
                hitType === HitTypesEnum.Player ? playersMp.at(hitId) : hitType === HitTypesEnum.Vehicle ? vehiclesMp.at(hitId) : undefined

            eventsMp.emit("playerShoot", player, weapon, hitEntity, new Vector3(fX, fY, fZ))
        }
        return 1
    },
)
