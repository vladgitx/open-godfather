import { dispatcher } from "@/modules/dispatcher"
import { SampEvents } from "@/wrapper"

SampEvents.onGameModeInit(() => {
    dispatcher.emit("init")
})
