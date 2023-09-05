import { EventEmitter } from "stream"
import {
    CommandResponseEnum,
    KickReasonEnum,
    Player,
    PlayerStateEnum,
    Players,
    Vehicle,
} from ".."
import { SampNode } from "../scripting-api"

export const playerEvent = new EventEmitter()
let lastUniqueId = 0

SampNode.on("OnPlayerConnect", (playerId: number) => {
    const player = new Player(playerId, lastUniqueId++)
    Players.pool.set(playerId, player)

    playerEvent.emit("preConnect", player)
    playerEvent.emit("connect", player)
})

SampNode.on("OnPlayerDisconnect", (playerId: number, reasonId: KickReasonEnum) => {
    const player = Players.at(playerId)
    if (player !== undefined) {
        playerEvent.emit("disconnect", player, reasonId)
        playerEvent.emit("postDisconnect", player, reasonId)

        player.uniqueId = lastUniqueId++
    }
    Players.pool.delete(playerId)
})

SampNode.on("OnPlayerSpawn", (playerId: number) => {
    const player = Players.at(playerId)
    if (player !== undefined) {
        if (player.spawnCount++ === 0) {
            playerEvent.emit("firstSpawn", player)
        }
        playerEvent.emit("spawn", player)
    }
})

export class PlayerEvent {
    static preConnect(callback: (player: Player) => void) {
        playerEvent.on("preConnect", callback)
    }

    static connect(callback: (player: Player) => void) {
        playerEvent.on("connect", callback)
    }

    static disconnect(callback: (player: Player, reasonId: KickReasonEnum) => void) {
        playerEvent.on("disconnect", callback)
    }

    static postDisconnect(callback: (player: Player, reasonId: KickReasonEnum) => void) {
        playerEvent.on("postDisconnect", callback)
    }

    static requestClass(callback: (player: Player, classId: number) => void) {
        SampNode.on("OnPlayerRequestClass", (playerId: number, classId: number) => {
            const player = Players.at(playerId)
            if (player !== undefined) {
                callback(player, classId)
            }
        })
    }

    static spawn(callback: (player: Player) => void) {
        playerEvent.on("spawn", callback)
    }

    static firstSpawn(callback: (player: Player) => void) {
        playerEvent.on("firstSpawn", callback)
    }

    static text(callback: (player: Player, text: string) => void) {
        SampNode.on("OnPlayerText", (playerId: number, text: string) => {
            const player = Players.at(playerId)
            if (player !== undefined) {
                callback(player, text)
            }
        })
    }

    static stateChange(callback: (player: Player, newState: PlayerStateEnum, oldState: PlayerStateEnum) => void) {
        SampNode.on("OnPlayerStateChange", (playerId: number, newState: PlayerStateEnum, oldState: PlayerStateEnum) => {
            const player = Players.at(playerId)
            if (player !== undefined) {
                callback(player, newState, oldState)
            }
        })
    }

    static commandPerformed(callback: (player: Player, command: string, response: CommandResponseEnum) => void) {
        playerEvent.on("commandPerformed", callback)
    }

    static enterVehicle(callback: (player: Player, vehicle: Vehicle) => void) {
        playerEvent.on("enterVehicle", callback)
    }

    static exitVehicle(callback: (player: Player, vehicle: Vehicle | undefined) => void) {
        playerEvent.on("exitVehicle", callback)
    }
}