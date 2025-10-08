import { Vector3 } from "../../../lib/vector3"
import { dispatcher } from "@/lib/dispatcher"
import { players } from "../handler"
import { vehicles } from "@/components/vehicle"
import { DEFAULT_PLAYER_TEAM } from "../entity"
import { getEnumKeyByValue } from "@/lib/utils"
import {
    gameCallbacks,
    gameNatives,
    BODY_PARTS,
    HIT_TYPES,
    type HitType,
    PLAYER_BONES,
    PLAYER_STATES,
    type Weapon,
    WEAPONS,
    type CameraMode,
} from "@/wrapper/game"
import { textdraws } from "@/components/textdraw"
import { gameObjects } from "@/components/game-object"

gameCallbacks.onPlayerUpdate((playerId) => {
    const player = players.pool.at(playerId)

    if (player) {
        dispatcher.emit("playerUpdate", player)

        const currentWeapon = player.weapons.holding
        const lastWeapon = (player.variables.get("internal::lastWeapon") as Weapon | undefined) ?? "fist"

        if (currentWeapon !== lastWeapon) {
            dispatcher.emit("playerWeaponChange", player, currentWeapon, lastWeapon)
            player.variables.set("internal::lastWeapon", currentWeapon)
        }

        const currentMode = player.cameraMode
        const lastMode = (player.variables.get("internal::lastCameraMode") as CameraMode | undefined) ?? "none"

        if (currentMode !== lastMode) {
            dispatcher.emit("playerCameraModeChange", player, currentMode, lastMode)
            player.variables.set("internal::lastCameraMode", currentMode)
        }
    }

    return 1
})

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
        const getHitEntity = {
            none: () => undefined,
            player: (id) => players.pool.at(id),
            vehicle: (id) => vehicles.pool.at(id),
            object: (id) => gameObjects.pool.at(id),
            "player-object": () => undefined, // TODO: Figure out what to return here. The attached object slot, the player, etc?
        } as const satisfies Record<HitType, (hitId: number) => unknown>

        dispatcher.emit(
            "playerShoot",
            player,
            getEnumKeyByValue(WEAPONS, weapon),
            getHitEntity[getEnumKeyByValue(HIT_TYPES, hitType)](hitId),
            new Vector3(fX, fY, fZ),
        )
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
            getEnumKeyByValue(PLAYER_BONES, bone),
            new Vector3(offX, offY, offZ),
            new Vector3(rotX, rotY, rotZ),
            new Vector3(scaleX, scaleY, scaleZ),
        )
    },
)

gameCallbacks.onPlayerClickPlayerTextDraw((playerId, clickedId) => {
    const player = players.pool.at(playerId)

    if (player) {
        const playerTextdraw = player.textdraws.pool.at(clickedId)

        if (playerTextdraw) {
            dispatcher.emit("playerClickPlayerTextDraw", player, playerTextdraw)
        }
    }
})

gameCallbacks.onPlayerClickTextDraw((playerId, clickedId) => {
    const player = players.pool.at(playerId)

    if (player) {
        dispatcher.emit("playerClickTextDraw", player, textdraws.pool.at(clickedId))
    }
})
