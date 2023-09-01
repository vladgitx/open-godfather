import { Player, Vehicles } from "."
import { vehicleEvent } from "./vehicle-event"
import { Natives } from "../scripting-api"

export class Vehicle {
    id: number
    #primaryColor: number
    #secondaryColor: number
    occupants: Player[] = []

    constructor(vehicleId: number, primaryColor = -1, secondaryColor = -1) {
        this.id = vehicleId
        this.#primaryColor = primaryColor
        this.#secondaryColor = secondaryColor
    }

    destroy() {
        const response = Natives.destroyVehicle(this.id)
        if (response) {
            const vehicle = Vehicles.get(this.id)
            if (vehicle !== undefined) {
                vehicleEvent.emit("destroy", vehicle)
            }
            delete Vehicles.pool[this.id]
            return true
        }
        return false
    }

    get model() {
        return Natives.getVehicleModel(this.id)
    }

    get name() {
        return Vehicles.getModelName(this.model)
    }

    set health(health: number) {
        Natives.setVehicleHealth(this.id, health)
    }

    get health() {
        return Natives.getVehicleHealth(this.id)
    }

    get isValid() {
        return Natives.isValidVehicle(this.id)
    }

    set primaryColor(color: number) {
        this.#primaryColor = color
        Natives.changeVehicleColor(this.id, this.#primaryColor, this.#secondaryColor)
    }

    get primaryColor() {
        return this.#primaryColor
    }

    set secondaryColor(color: number) {
        this.#secondaryColor = color
        Natives.changeVehicleColor(this.id, this.#primaryColor, this.#secondaryColor)
    }

    get secondaryColor() {
        return this.#secondaryColor
    }
}