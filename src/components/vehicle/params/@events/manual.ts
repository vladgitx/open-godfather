import { dispatcher } from "@/modules/dispatcher"
import { nativeFunctions } from "@/natives"

dispatcher.on("init", () => {
    nativeFunctions.manualVehicleEngineAndLights()
})
