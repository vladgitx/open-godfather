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
    #plate: string
    #engine: "on" | "off"
    #lights: "on" | "off"
    #alarm: "on" | "off"
    #doors: "locked" | "unlocked"
    #bonnet: "open" | "closed"
    #trunk: "open" | "closed"

    constructor(id: number, model: number, primaryColor = -1, secondaryColor = -1) {
        super(id, vehiclesPool)

        this.#primaryColor = primaryColor
        this.#secondaryColor = secondaryColor
        this.#interior = 0
        this.model = model
        this.name = getVehicleModelName(model)
        this.#plate = ""

        const params = SampNatives.getVehicleParamsEx(this.id)
        this.#engine = params.engine ? "on" : "off"
        this.#lights = params.lights ? "on" : "off"
        this.#alarm = params.alarm ? "on" : "off"
        this.#doors = params.doors ? "locked" : "unlocked"
        this.#bonnet = params.bonnet ? "open" : "closed"
        this.#trunk = params.boot ? "open" : "closed"
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

    set engine(state: "on" | "off") {
        this.#engine = state
        const res = SampNatives.getVehicleParamsEx(this.id)
        SampNatives.setVehicleParamsEx(this.id, state === "on", res.lights, res.alarm, res.doors, res.bonnet, res.boot, res.objective)
    }

    get engine() {
        return this.#engine
    }

    set lights(state: "on" | "off") {
        this.#lights = state
        const res = SampNatives.getVehicleParamsEx(this.id)
        SampNatives.setVehicleParamsEx(this.id, res.engine, state === "on", res.alarm, res.doors, res.bonnet, res.boot, res.objective)
    }

    get lights() {
        return this.#lights
    }

    set alarm(state: "on" | "off") {
        this.#alarm = state
        const res = SampNatives.getVehicleParamsEx(this.id)
        SampNatives.setVehicleParamsEx(this.id, res.engine, res.lights, state === "on", res.doors, res.bonnet, res.boot, res.objective)
    }

    get alarm() {
        return this.#alarm
    }

    set doors(state: "locked" | "unlocked") {
        this.#doors = state
        const res = SampNatives.getVehicleParamsEx(this.id)
        SampNatives.setVehicleParamsEx(this.id, res.engine, res.lights, res.alarm, state === "locked", res.bonnet, res.boot, res.objective)
    }

    get doors() {
        return this.#doors
    }

    set bonnet(state: "open" | "closed") {
        this.#bonnet = state
        const res = SampNatives.getVehicleParamsEx(this.id)
        SampNatives.setVehicleParamsEx(this.id, res.engine, res.lights, res.alarm, res.doors, state === "open", res.boot, res.objective)
    }

    get bonnet() {
        return this.#bonnet
    }

    set trunk(state: "open" | "closed") {
        this.#trunk = state
        const res = SampNatives.getVehicleParamsEx(this.id)
        SampNatives.setVehicleParamsEx(this.id, res.engine, res.lights, res.alarm, res.doors, res.bonnet, state === "open", res.objective)
    }

    get trunk() {
        return this.#trunk
    }

    set plate(plate: string) {
        this.#plate = plate
        SampNatives.setVehicleNumberPlate(this.id, plate)
    }

    get plate() {
        return this.#plate
    }
}