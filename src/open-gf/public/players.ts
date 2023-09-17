import {
    getAllPlayers,
    getPlayer,
    getPlayersInRange,
} from "../../components/player"
import SampNatives from "../../shared/samp-natives"
import { WorldPosition } from "../../shared/types"

export class OpenPlayers {
    at(playerId: number) {
        return getPlayer(playerId)
    }

    getInRange(position: WorldPosition, range: number, world?: number, interior?: number) {
        return getPlayersInRange(position, range, world, interior)
    }

    broadcast(message: string, color = "FFFFFF") {
        return SampNatives.sendClientMessageToAll(color, message)
    }

    get all() {
        return getAllPlayers()
    }
}