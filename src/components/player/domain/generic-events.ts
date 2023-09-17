import SampNatives from "../../../shared/samp-natives"
import { PlayerStateEnum } from "../../../shared/enums"
import { EventEmit } from "../../event"
import { getPlayer } from "../public/api"

SampNatives.on("OnPlayerSpawn", (playerId: number) => {
    const player = getPlayer(playerId)
    if (player === undefined) {
        return
    }

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

SampNatives.on("OnPlayerStateChange", (playerId: number, newState: PlayerStateEnum, oldState: PlayerStateEnum) => {
    const player = getPlayer(playerId)
    if (player !== undefined) {
        EventEmit.playerStateChange(player, newState, oldState)
    }
})