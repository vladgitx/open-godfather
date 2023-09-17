import { WorldPosition } from "../../../shared/types"
import { playersPool } from "../domain/create-destroy"
import { Player } from "./model"

export function getPlayer(playerId: number) {
    return playersPool.get(playerId)
}

export function getAllPlayers() {
    const players = new Set<Player>()
    for (const [playerId, player] of playersPool) {
        players.add(player)
    }
    return players
}

export function getPlayersInRange(position: WorldPosition, range: number, world?: number, interior?: number) {
    const players = new Map<Player, number>()
    
    for (const [playerId, player] of playersPool) {
        const distance = player.getDistance(position, world, interior)
        
        if (distance < range) {
            players.set(player, distance)
        }
    }
    return players
}