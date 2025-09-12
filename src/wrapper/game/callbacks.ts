import type { BODY_PARTS, HIT_TYPES, KICK_REASONS, PLAYER_BONES, PLAYER_STATES, WEAPONS } from "@/wrapper/game/enums.public"
import type { EnumValue } from "@/lib/types"
import { charset } from "@/lib/charset"

samp.registerEvent("OnPlayerTextI18n", "iai")
samp.registerEvent("OnPlayerCommandTextI18n", "iai")
samp.registerEvent("OnDialogResponseI18n", "iiiiai")

class GameCallbacks {
    onPlayerClickTextDraw(callback: (playerId: number, clickedId: number) => void) {
        samp.on("OnPlayerClickTextDraw", callback)
    }

    onPlayerClickPlayerTextDraw(callback: (playerId: number, clickedId: number) => void) {
        samp.on("OnPlayerClickPlayerTextDraw", callback)
    }

    onPlayerKeyStateChange(callback: (playerId: number, newKeys: number, oldKeys: number) => void) {
        samp.on("OnPlayerKeyStateChange", callback)
    }

    onPlayerConnect(callback: (playerId: number) => void) {
        samp.on("OnPlayerConnect", callback)
    }

    onPlayerDisconnect(callback: (playerId: number, reason: EnumValue<typeof KICK_REASONS>) => void) {
        samp.on("OnPlayerDisconnect", callback)
    }

    onPlayerSpawn(callback: (playerId: number) => void) {
        samp.on("OnPlayerSpawn", callback)
    }

    onPlayerDeath(callback: (playerId: number, killerid: number, reason: EnumValue<typeof WEAPONS>) => void) {
        samp.on("OnPlayerDeath", callback)
    }

    onPlayerText(callback: (playerId: number, text: string) => void) {
        samp.on("OnPlayerTextI18n", (playerId: number, text) => {
            callback(playerId, charset.decode(text))
        })
    }

    onPlayerCommandText(callback: (playerId: number, cmdText: string) => void) {
        samp.on("OnPlayerCommandTextI18n", (playerId: number, cmdText) => {
            callback(playerId, charset.decode(cmdText))

            return 1 // Prevents the "SERVER: Unknown Command" message
        })
    }

    onPlayerRequestClass(callback: (playerId: number, classId: number) => void) {
        samp.on("OnPlayerRequestClass", callback)
    }

    onPlayerEnterVehicle(callback: (playerId: number, vehicleId: number, isPassenger: 0 | 1) => void) {
        samp.on("OnPlayerEnterVehicle", callback)
    }

    onPlayerExitVehicle(callback: (playerId: number, vehicleId: number) => void) {
        samp.on("OnPlayerExitVehicle", callback)
    }

    onPlayerStateChange(
        callback: (playerId: number, newState: EnumValue<typeof PLAYER_STATES>, oldState: EnumValue<typeof PLAYER_STATES>) => void,
    ) {
        samp.on("OnPlayerStateChange", callback)
    }

    onPlayerTakeDamage(
        callback: (
            playerId: number,
            issuerId: number,
            amount: number,
            weaponId: EnumValue<typeof WEAPONS>,
            bodyPart: EnumValue<typeof BODY_PARTS>,
        ) => void,
    ) {
        samp.on("OnPlayerTakeDamage", callback)
    }

    onPlayerWeaponShot(
        callback: (
            playerId: number,
            weaponId: EnumValue<typeof WEAPONS>,
            hitType: EnumValue<typeof HIT_TYPES>,
            hitId: number,
            x: number,
            y: number,
            z: number,
        ) => void,
    ) {
        samp.on("OnPlayerWeaponShot", callback)
    }

    onDialogResponse(callback: (playerId: number, dialogId: number, response: 1 | 0, listitem: number, inputText: string) => void) {
        samp.on("OnDialogResponseI18n", (playerId: number, dialogId: number, response: 1 | 0, listitem: number, inputText) => {
            callback(playerId, dialogId, response, listitem, charset.decode(inputText))
        })
    }

    onGameModeExit(callback: () => void) {
        samp.on("OnGameModeExit", callback)
    }

    onGameModeInit(callback: () => void) {
        samp.on("OnGameModeInit", callback)
    }

    onVehiclePaintjob(callback: (playerId: number, vehicleId: number, paintjobId: number) => void) {
        samp.on("OnVehiclePaintjob", callback)
    }

    onPlayerEditAttachedObject(
        callback: (
            playerId: number,
            response: 0 | 1,
            index: number,
            model: number,
            bone: EnumValue<typeof PLAYER_BONES>,
            offX: number,
            offY: number,
            offZ: number,
            rotX: number,
            rotY: number,
            rotZ: number,
            scaleX: number,
            scaleY: number,
            scaleZ: number,
        ) => void,
    ) {
        samp.on("OnPlayerEditAttachedObject", callback)
    }

    onVehicleSpawn(callback: (vehicleId: number) => void) {
        samp.on("OnVehicleSpawn", callback)
    }

    onVehicleDeath(callback: (vehicleId: number, killerId: number) => void) {
        samp.on("OnVehicleDeath", callback)
    }
}

export const gameCallbacks = new GameCallbacks()
