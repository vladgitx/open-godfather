import { dispatcher } from "@/modules/dispatcher"
import { nativeEvents } from "@/wrapper"

nativeEvents.onGameModeInit(() => {
    dispatcher.emit("init")
})
