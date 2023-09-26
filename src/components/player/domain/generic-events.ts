import SampNatives from "../../../shared/samp-natives"
import { BodyParts, PlayerStates, Weapons } from "../../../shared/enums"
import { EventEmit } from "../../event"
import { getPlayer } from "../public/api"
import { getVehicle } from "../../vehicle"

SampNatives.on("OnPlayerSpawn", (playerId: number) => {
    const player = getPlayer(playerId)
    if (player === undefined) {
        return
    }

    player.team = player.team

    if (player.getVariable("internal::firstSpawn") === undefined) {
        player.setVariable("internal::firstSpawn", true)
        EventEmit.playerFirstSpawn(player)
    }

    EventEmit.playerSpawn(player)
})

SampNatives.on("OnPlayerRequestClass", (playerId: number, classId: number) => {
    const player = getPlayer(playerId)
    if (player !== undefined) {
        EventEmit.playerRequestClass(player, classId)
    }
})

SampNatives.on("OnPlayerText", (playerId: number, text: string) => {
    const player = getPlayer(playerId)
    if (player !== undefined) {
        EventEmit.playerText(player, text)
    }
})

SampNatives.on("OnPlayerStateChange", (playerId: number, newState: PlayerStates, oldState: PlayerStates) => {
    const player = getPlayer(playerId)
    if (player !== undefined) {
        EventEmit.playerStateChange(player, newState, oldState)
    }
})

SampNatives.on("OnPlayerEnterVehicle", (playerId: number, vehicleId: number, asPassenger: boolean) => {
    const player = getPlayer(playerId)
    const vehicle = getVehicle(vehicleId)

    if (player !== undefined && vehicle !== undefined) {
        EventEmit.playerStartEnterVehicle(player, vehicle, asPassenger)
    }
})

SampNatives.on("OnPlayerExitVehicle", (playerId: number, vehicleId: number) => {
    const player = getPlayer(playerId)
    const vehicle = getVehicle(vehicleId)

    if (player !== undefined && vehicle !== undefined) {
        EventEmit.playerStartExitVehicle(player, vehicle)
    }
})

SampNatives.on("OnPlayerDeath", (playerId: number, killerId: number, weapon: Weapons) => {
    const player = getPlayer(playerId)
    if (player) {
        EventEmit.playerDeath(player, getPlayer(killerId), weapon)
    }
})

SampNatives.on("OnPlayerTakeDamage", (playerId: number, issuerId: number, amount: number, weapon: Weapons, bodyPart: BodyParts) => {
    const player = getPlayer(playerId)
    if (player) {
        EventEmit.playerDamage(player, getPlayer(issuerId), amount, weapon, bodyPart)
    }
})