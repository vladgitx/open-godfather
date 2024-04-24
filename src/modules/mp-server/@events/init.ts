import { dispatcher } from "@/modules/dispatcher"
import { nativeEvents } from "@/natives"

nativeEvents.onGameModeInit(() => {
    dispatcher.emit("init")
})
