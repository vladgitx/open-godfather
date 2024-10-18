import { Vector3 } from "../../../lib/vector3"
import { dispatcher } from "@/lib/dispatcher"
import { players } from "../handler"
import { vehicles } from "@/components/vehicle"
import { DEFAULT_PLAYER_TEAM } from "../entity"
import { BODY_PARTS, HIT_TYPES, PLAYER_STATES, WEAPONS } from "@/wrapper/game/enums.public"
import { getEnumKeyByValue } from "@/lib/utils"
import { gameCallbacks, gameNatives } from "@/wrapper/game"

gameCallbacks.onPlayerKeyStateChange((playerId, newKeys, oldKeys) => {
    const player = players.pool.at(playerId)

    if (player) {
        dispatcher.emit("playerKeyStateChange", player, newKeys, oldKeys)
    }
})

gameCallbacks.onPlayerSpawn((playerId: number) => {
    const player = players.pool.at(playerId)

    if (player === undefined) {
        return
    }

    gameNatives.setPlayerTeam(playerId, DEFAULT_PLAYER_TEAM)

    if (!player.variables.has("internal::firstSpawn")) {
        player.variables.set("internal::firstSpawn", true)
        dispatcher.emit("playerFirstSpawn", player)
    }

    dispatcher.emit("playerSpawn", player)
})

gameCallbacks.onPlayerRequestClass((playerId: number) => {
    const player = players.pool.at(playerId)

    if (player !== undefined) {
        player.spawn()
    }
})

gameCallbacks.onPlayerText((playerId: number, text: string) => {
    const player = players.pool.at(playerId)

    if (player !== undefined) {
        const hasListeners = dispatcher.emit("playerText", player, text)

        if (!hasListeners && text) {
            players.broadcast(`${player.name}: ${text}`)
        }
    }

    return 0
})

gameCallbacks.onPlayerStateChange((playerId, newState, oldState) => {
    const player = players.pool.at(playerId)

    if (player !== undefined) {
        dispatcher.emit("playerStateChange", player, getEnumKeyByValue(PLAYER_STATES, newState), getEnumKeyByValue(PLAYER_STATES, oldState))
    }
})

gameCallbacks.onPlayerEnterVehicle((playerId, vehicleId, asPassenger) => {
    const player = players.pool.at(playerId)
    const vehicle = vehicles.pool.at(vehicleId)

    if (player !== undefined && vehicle !== undefined) {
        dispatcher.emit("playerStartEnterVehicle", player, vehicle, asPassenger === 1)
    }
})

gameCallbacks.onPlayerExitVehicle((playerId: number, vehicleId: number) => {
    const player = players.pool.at(playerId)
    const vehicle = vehicles.pool.at(vehicleId)

    if (player !== undefined && vehicle !== undefined) {
        dispatcher.emit("playerStartExitVehicle", player, vehicle)
    }
})

gameCallbacks.onPlayerDeath((playerId, killerId, weapon) => {
    const player = players.pool.at(playerId)

    if (player) {
        dispatcher.emit("playerDeath", player, players.pool.at(killerId), getEnumKeyByValue(WEAPONS, weapon))
    }
})

gameCallbacks.onPlayerTakeDamage((playerId, issuerId, amount, weapon, bodyPart) => {
    const player = players.pool.at(playerId)

    if (player) {
        const issuer = players.pool.at(issuerId)

        const hasListeners = dispatcher.emit(
            "playerDamage",
            player,
            issuer,
            amount,
            getEnumKeyByValue(WEAPONS, weapon),
            getEnumKeyByValue(BODY_PARTS, bodyPart),
        )

        if (!hasListeners && issuer) {
            // All players have the same team, so they can't damage each other
            // Do the default SA-MP behavior if the developer doesn't define a "playerDamage" event
            player.health -= amount
        }
    }
})

gameCallbacks.onPlayerWeaponShot((playerId, weapon, hitType, hitId, fX, fY, fZ) => {
    const player = players.pool.at(playerId)

    if (player) {
        const hitEntity =
            hitType === HIT_TYPES.player ? players.pool.at(hitId) : hitType === HIT_TYPES.vehicle ? vehicles.pool.at(hitId) : undefined

        dispatcher.emit("playerShoot", player, getEnumKeyByValue(WEAPONS, weapon), hitEntity, new Vector3(fX, fY, fZ))
    }
    return 1
})

gameCallbacks.onPlayerEditAttachedObject(
    (playerId, response, index, model, bone, offX, offY, offZ, rotX, rotY, rotZ, scaleX, scaleY, scaleZ) => {
        const player = players.pool.at(playerId)

        if (!player) {
            return
        }

        if (response === 0) {
            dispatcher.emit("playerCancelObjectEditMode", player)
            return
        }

        dispatcher.emit(
            "playerEditAttachedObject",
            player,
            index,
            model,
            bone,
            new Vector3(offX, offY, offZ),
            new Vector3(rotX, rotY, rotZ),
            new Vector3(scaleX, scaleY, scaleZ),
        )
    },
)
