import { dispatcher } from "@/lib/dispatcher"
import { gameCallbacks } from "@/wrapper/game"

gameCallbacks.onGameModeInit(() => {
    dispatcher.emit("init")
})

gameCallbacks.onGameModeExit(() => {
    dispatcher.emit("exit")
})
