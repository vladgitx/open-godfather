import {
    PlayerStateEnum,
    og,
} from "../.."
import { SampNode } from "../../scripting-api"

SampNode.on("OnPlayerSpawn", (playerId: number) => {
    const player = og.players.at(playerId)
    if (player === undefined) {
        return
    }

    if (player.getVariable("firstSpawn") === undefined) {
        player.setVariable("firstSpawn", true)
        og.events.emit("playerFirstSpawn", player)
    }

    og.events.emit("playerSpawn", player)
})

SampNode.on("OnPlayerRequestClass", (playerId: number, classId: number) => {
    const player = og.players.at(playerId)
    if (player !== undefined) {
        og.events.emit("playerRequestClass", player, classId)
    }
})

SampNode.on("OnPlayerText", (playerId: number, text: string) => {
    const player = og.players.at(playerId)
    if (player !== undefined) {
        og.events.emit("playerText", player, text)
    }
})

SampNode.on("OnPlayerStateChange", (playerId: number, newState: PlayerStateEnum, oldState: PlayerStateEnum) => {
    const player = og.players.at(playerId)
    if (player !== undefined) {
        og.events.emit("playerStateChange", player, newState, oldState)
    }
})