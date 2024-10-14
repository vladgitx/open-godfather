import { nativeEvents, nativeFunctions } from "@/natives"
import { type BodyPartsEnum, HitTypesEnum, type PlayerStatesEnum, type WeaponsEnum } from "@/common/enums"
import { Vector3 } from "../../../modules/vector3"
import { dispatcher } from "@/modules/dispatcher"
import { playerHandler } from "../handler"
import { vehicleHandler } from "@/components/vehicle"
import { DEFAULT_PLAYER_TEAM } from "../entity"

samp.on("OnPlayerKeyStateChange", (playerId, newKeys, oldKeys) => {
    const player = playerHandler.at(playerId)

    if (player !== undefined) {
        dispatcher.emit("playerKeyStateChange", player, newKeys, oldKeys)
    }
})

nativeEvents.onPlayerSpawn((playerId: number) => {
    const player = playerHandler.at(playerId)
    if (player === undefined) {
        return
    }

    nativeFunctions.setPlayerTeam(playerId, DEFAULT_PLAYER_TEAM)

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
        const hasListeners = dispatcher.emit("playerText", player, text)

        if (!hasListeners && text) {
            playerHandler.broadcast(`${player.name}: ${text}`)
        }
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
        const issuer = playerHandler.at(issuerId)
        const hasListeners = dispatcher.emit("playerDamage", player, issuer, amount, weapon, bodyPart)

        if (!hasListeners && issuer) {
            // All players have the same team, so they can't damage each other
            // Do the default SA-MP behavior if the developer doesn't define a "playerDamage" event
            player.health -= amount
        }
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
