import { eventsMp } from "../../../singletons/events"
import { SampEvents } from "../../../wrapper"

SampEvents.onGameModeExit(() => {
    eventsMp.emit("exit")
})
