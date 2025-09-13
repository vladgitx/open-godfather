import { dispatcher } from "@/lib/dispatcher"
import { EventBus } from "@/lib/event-bus"

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type VehicleEventMap = {
    engineStateChange: [newState: "on" | "off"]
}

dispatcher.on("vehicleEngineStateChange", (vehicle, newState) => {
    EventBus.emit(vehicle.events, "engineStateChange", newState)
})
