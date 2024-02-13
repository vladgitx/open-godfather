import { eventsMp } from "../../../singletons/events"

samp.on("OnGameModeExit", () => {
    eventsMp.emit("exit")
})
