import { dispatcher } from "@/modules/dispatcher"
import { nativeEvents } from "@/wrapper"

nativeEvents.onGameModeExit(() => {
    dispatcher.emit("exit")
})
