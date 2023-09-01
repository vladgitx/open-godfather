import { EventEmitter } from "stream"
import { SampNode } from "../scripting-api"

export const globalEvent = new EventEmitter()

export class GlobalEvent {
    static gameModeInit(callback: () => void) {
        globalEvent.on("gameModeInit", callback)
    }

    static gameModeExit(callback: () => void) {
        SampNode.on("OnGameModeExit", callback)
    }
}