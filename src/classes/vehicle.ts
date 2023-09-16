import { Natives } from "../scripting-api"
import { WorldPosition } from "../common/types"
import { getVehicleModelName } from "../common/vehicle-names"
import { Entity, WorldEntity } from "./entity"
import { og } from ".."

export class Vehicle extends Entity implements WorldEntity {
    #primaryColor: number
    #secondaryColor: number
    #interior: number
    occupants: Set<number>
    readonly model: number
    readonly name: string

    constructor(id: number, model: number, primaryColor = -1, secondaryColor = -1) {
        super(id)

        this.#primaryColor = primaryColor
        this.#secondaryColor = secondaryColor
        this.#interior = 0
        this.occupants = new Set()
        this.model = model
        this.name = getVehicleModelName(model)
    }

    get exists() {
        return og.vehicles.at(this.id) === this
    }

    setPosition(position: WorldPosition) {
        return Natives.setVehiclePosition(this.id, position.x, position.y, position.z)
    }

    getPosition() {
        return Natives.getVehiclePosition(this.id)
    }

    getDistance(position: WorldPosition, world?: number, interior?: number) {
        if (world !== undefined && this.world !== world) {
            return Number.POSITIVE_INFINITY
        }
        if (interior !== undefined && this.interior !== interior) {
            return Number.POSITIVE_INFINITY
        }
        return Natives.getVehicleDistanceFromPoint(this.id, position.x, position.y, position.z)
    }

    setVelocity(x: number, y: number, z: number) {
        return Natives.setVehicleVelocity(this.id, x, y, z)
    }

    getVelocity() {
        return Natives.getVehicleVelocity(this.id)
    }

    setTimeout(callback: () => void, delay: number) {
        return setTimeout(() => {
            if (this.exists) {
                callback()
            }
        }, delay)
    }

    setInterval(callback: () => void, delay: number) {
        const intervalId = setInterval(() => {
            if (this.exists) {
                callback()
            } else {
                clearInterval(intervalId)
            }
        }, delay)
        return intervalId
    }

    set rotation(angle: number) {
        Natives.setVehicleZAngle(this.id, angle)
    }

    get rotation() {
        return Natives.getVehicleZAngle(this.id)
    }

    set world(value: number) {
        Natives.setVehicleVirtualWorld(this.id, value)
    }

    get world() {
        return Natives.getVehicleVirtualWorld(this.id)
    }

    set interior(value: number) {
        this.#interior = value
        Natives.linkVehicleToInterior(this.id, value)
    }

    get interior() {
        return this.#interior
    }

    set health(health: number) {
        Natives.setVehicleHealth(this.id, health)
    }

    get health() {
        return Natives.getVehicleHealth(this.id)
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