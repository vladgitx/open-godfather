import { Player } from "."
import { Natives } from "../scripting-api"
import { EntityPosition } from "../types"
import { getVehicleModelName } from "../vehicle-names"

export class Vehicle {
    #id: number
    exists = true
    #primaryColor: number
    #secondaryColor: number
    #interior = 0
    occupants = new Set<Player>()

    constructor(vehicleId: number, primaryColor = -1, secondaryColor = -1) {
        this.#id = vehicleId
        this.#primaryColor = primaryColor
        this.#secondaryColor = secondaryColor
    }

    get id() {
        return this.#id
    }

    setPosition(position: EntityPosition) {
        return Natives.setVehiclePosition(this.#id, position.x, position.y, position.z)
    }

    getPosition() {
        return Natives.getVehiclePosition(this.#id)
    }

    getDistance(position: EntityPosition, world?: number, interior?: number) {
        if (world !== undefined && this.world !== world) {
            return Number.POSITIVE_INFINITY
        }
        if (interior !== undefined && this.interior !== interior) {
            return Number.POSITIVE_INFINITY
        }
        return Natives.getVehicleDistanceFromPoint(this.#id, position.x, position.y, position.z)
    }

    setVelocity(x: number, y: number, z: number) {
        return Natives.setVehicleVelocity(this.#id, x, y, z)
    }

    getVelocity() {
        return Natives.getVehicleVelocity(this.#id)
    }

    get model() {
        return Natives.getVehicleModel(this.#id)
    }

    get name() {
        return getVehicleModelName(this.model)
    }

    set rotation(angle: number) {
        Natives.setVehicleZAngle(this.#id, angle)
    }

    get rotation() {
        return Natives.getVehicleZAngle(this.#id)
    }

    set world(value: number) {
        Natives.setVehicleVirtualWorld(this.#id, value)
    }

    get world() {
        return Natives.getVehicleVirtualWorld(this.#id)
    }

    set interior(value: number) {
        this.#interior = value
        Natives.linkVehicleToInterior(this.#id, value)
    }

    get interior() {
        return this.#interior
    }

    set health(health: number) {
        Natives.setVehicleHealth(this.#id, health)
    }

    get health() {
        return Natives.getVehicleHealth(this.#id)
    }

    set primaryColor(color: number) {
        this.#primaryColor = color
        Natives.changeVehicleColor(this.#id, this.#primaryColor, this.#secondaryColor)
    }

    get primaryColor() {
        return this.#primaryColor
    }

    set secondaryColor(color: number) {
        this.#secondaryColor = color
        Natives.changeVehicleColor(this.#id, this.#primaryColor, this.#secondaryColor)
    }

    get secondaryColor() {
        return this.#secondaryColor
    }
}