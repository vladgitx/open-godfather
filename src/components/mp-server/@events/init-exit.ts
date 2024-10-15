import { dispatcher } from "@/core/dispatcher"
import { nativeEvents } from "@/wrapper"

nativeEvents.onGameModeInit(() => {
    dispatcher.emit("init")
})

nativeEvents.onGameModeExit(() => {
    dispatcher.emit("exit")
})
