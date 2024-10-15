import { dispatcher } from "@/core/dispatcher"
import { nativeFunctions } from "@/wrapper"

dispatcher.on("init", () => {
    nativeFunctions.manualVehicleEngineAndLights()
})
