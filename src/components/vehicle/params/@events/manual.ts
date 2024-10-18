import { dispatcher } from "@/lib/dispatcher"
import { gameNatives } from "@/wrapper/game"

dispatcher.on("init", () => {
    gameNatives.manualVehicleEngineAndLights()
})
