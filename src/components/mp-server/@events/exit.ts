import { dispatcher } from "@/lib/dispatcher"
import { nativeEvents } from "@/natives"

nativeEvents.onGameModeExit(() => {
    dispatcher.emit("exit")
})
