import { EventEmitter } from "stream"
import { Vehicle } from "."

export const vehicleEvent = new EventEmitter()

export class VehicleEvent {
    static create(callback: (vehicle: Vehicle) => void) {
        vehicleEvent.on("onCreate", callback)
    }

    static destroy(callback: (vehicle: Vehicle) => void) {
        vehicleEvent.on("onDestroy", callback)
    }
}