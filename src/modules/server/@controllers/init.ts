import { eventsMp } from "../../../singletons/events"

samp.on("OnGameModeInit", () => {
	eventsMp.emit("init")
})
