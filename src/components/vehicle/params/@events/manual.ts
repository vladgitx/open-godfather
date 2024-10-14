import { dispatcher } from "@/lib/dispatcher"
import { nativeFunctions } from "@/natives"

dispatcher.on("init", () => {
    nativeFunctions.manualVehicleEngineAndLights()
})
