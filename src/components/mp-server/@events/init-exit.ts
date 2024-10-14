import { dispatcher } from "@/lib/dispatcher"
import { nativeEvents } from "@/natives"

nativeEvents.onGameModeInit(() => {
    dispatcher.emit("init")
})

nativeEvents.onGameModeExit(() => {
    dispatcher.emit("exit")
})