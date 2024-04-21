import { dispatcher } from "@/modules/dispatcher"
import { SampEvents } from "@/wrapper"

SampEvents.onGameModeExit(() => {
    dispatcher.emit("exit")
})
