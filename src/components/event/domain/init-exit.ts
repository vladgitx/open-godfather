import { EventEmit } from ".."
import SampNatives from "../../../shared/samp-natives"

SampNatives.on("OnGameModeInit", () => {
    EventEmit.init()
})

SampNatives.on("OnGameModeExit", () => {
    EventEmit.exit()
})