import { dispatcher } from "@/modules/dispatcher"
import { nativeEvents } from "@/natives"

nativeEvents.onGameModeExit(() => {
    dispatcher.emit("exit")
})
