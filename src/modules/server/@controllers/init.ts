import { eventsMp } from "../../../singletons/events"
import { SampEvents } from "../../../wrapper"

SampEvents.onGameModeInit(() => {
    eventsMp.emit("init")
})
