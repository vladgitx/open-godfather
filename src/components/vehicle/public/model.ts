import SampNatives from "../../../shared/samp-natives"
import { WorldPosition } from "../../../shared/types"
import { Entity, WorldEntity } from "../../entity"
import { getVehicleOccupants } from "../domain/occupants"
import { vehiclesPool } from "../domain/pool"
import { getVehicleModelName } from "./vehicle-names"

export class Vehicle extends Entity implements WorldEntity {
    #primaryColor: number
    #secondaryColor: number
    #interior: number
    readonly model: number
    readonly name: string

    constructor(id: number, model: number, primaryColor = -1, secondaryColor = -1) {
        super(id, vehiclesPool)

        this.#primaryColor = primaryColor
        this.#secondaryColor = secondaryColor
        this.#interior = 0
        this.model = model
        this.name = getVehicleModelName(model)
    }

    setPosition(position: WorldPosition) {
        return SampNatives.setVehiclePosition(this.id, position.x, position.y, position.z)
    }

    getPosition() {
        return SampNatives.getVehiclePosition(this.id)
    }

    getDistance(position: WorldPosition, world?: number, interior?: number) {
        if (world !== undefined && this.world !== world) {
            return Number.POSITIVE_INFINITY
        }
        if (interior !== undefined && this.interior !== interior) {
            return Number.POSITIVE_INFINITY
        }
        return SampNatives.getVehicleDistanceFromPoint(this.id, position.x, position.y, position.z)
    }

    setVelocity(x: number, y: number, z: number) {
        return SampNatives.setVehicleVelocity(this.id, x, y, z)
    }

    getVelocity() {
        return SampNatives.getVehicleVelocity(this.id)
    }

    get occupants() {
        return getVehicleOccupants(this)
    }

    set rotation(angle: number) {
        SampNatives.setVehicleZAngle(this.id, angle)
    }

    get rotation() {
        return SampNatives.getVehicleZAngle(this.id)
    }

    set world(value: number) {
        SampNatives.setVehicleVirtualWorld(this.id, value)
    }

    get world() {
        return SampNatives.getVehicleVirtualWorld(this.id)
    }

    set interior(value: number) {
        this.#interior = value
        SampNatives.linkVehicleToInterior(this.id, value)
    }

    get interior() {
        return this.#interior
    }

    set health(health: number) {
        SampNatives.setVehicleHealth(this.id, health)
    }

    get health() {
        return SampNatives.getVehicleHealth(this.id)
    }

    set primaryColor(color: number) {
        this.#primaryColor = color
        SampNatives.changeVehicleColor(this.id, this.#primaryColor, this.#secondaryColor)
    }

    get primaryColor() {
        return this.#primaryColor
    }

    set secondaryColor(color: number) {
        this.#secondaryColor = color
        SampNatives.changeVehicleColor(this.id, this.#primaryColor, this.#secondaryColor)
    }

    get secondaryColor() {
        return this.#secondaryColor
    }
}